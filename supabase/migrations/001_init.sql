-- Create schema for 21D (run in Supabase SQL editor)

create extension if not exists "pgcrypto";

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  birth_date date,
  birth_time time,
  birth_place text,
  timezone text default 'UTC',
  natal_chart_json jsonb,
  goal text,
  onboarding_done boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Curated / community remedies
create table if not exists public.remedies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  expected_days_to_result int not null default 21,
  media_platform text check (media_platform in ('youtube', 'tiktok', 'instagram', 'none')),
  media_url text,
  creator_channel_url text,
  steps jsonb default '[]'::jsonb,
  created_by uuid references auth.users (id) on delete set null,
  is_curated boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.remedy_ratings (
  id uuid primary key default gen_random_uuid(),
  remedy_id uuid not null references public.remedies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  stars int not null check (stars between 1 and 5),
  comment text,
  created_at timestamptz default now(),
  unique (remedy_id, user_id)
);

create table if not exists public.user_routines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  remedy_id uuid references public.remedies (id) on delete set null,
  title text not null,
  description text,
  category text,
  expected_days_to_result int default 21,
  media_platform text,
  media_url text,
  steps jsonb default '[]'::jsonb,
  schedule jsonb not null default '{"time":"21:00","days":[0,1,2,3,4,5,6],"notify":true}'::jsonb,
  start_date date not null default current_date,
  target_days int not null default 21,
  status text not null default 'active' check (status in ('active', 'completed', 'paused')),
  baseline_caption text,
  created_at timestamptz default now()
);

create table if not exists public.routine_checkins (
  id uuid primary key default gen_random_uuid(),
  user_routine_id uuid not null references public.user_routines (id) on delete cascade,
  day_index int not null,
  done_at timestamptz not null default now(),
  note text,
  unique (user_routine_id, day_index)
);

create table if not exists public.progress_photos (
  id uuid primary key default gen_random_uuid(),
  user_routine_id uuid not null references public.user_routines (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  day_index int not null,
  storage_path text not null,
  caption text,
  created_at timestamptz default now()
);

create table if not exists public.transit_prompts (
  id uuid primary key default gen_random_uuid(),
  prompt_date date not null,
  scope text not null check (scope in ('daily', 'weekly', 'upcoming')),
  title text not null,
  body text not null,
  created_at timestamptz default now()
);

-- Seed sample transit prompts
insert into public.transit_prompts (prompt_date, scope, title, body)
values
  (current_date, 'daily', 'Día de Luna estable', 'Favorece rituales simples y repetibles. Mantén la rutina de esta noche corta y amable.'),
  (current_date, 'weekly', 'Semana de paciencia', 'Los resultados se acumulan en silencio esta semana: fotografiá el progreso, no apresures el espejo.'),
  (current_date + 3, 'upcoming', 'Ventana de claridad de Mercurio', 'Buenos días por delante para revisar qué funciona y ajustar tus alarmas.');

-- Auto profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.remedies enable row level security;
alter table public.remedy_ratings enable row level security;
alter table public.user_routines enable row level security;
alter table public.routine_checkins enable row level security;
alter table public.progress_photos enable row level security;
alter table public.transit_prompts enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

create policy "remedies_read" on public.remedies for select using (is_curated or created_by = auth.uid());
create policy "remedies_insert_auth" on public.remedies for insert with check (auth.uid() = created_by);

create policy "ratings_read" on public.remedy_ratings for select using (true);
create policy "ratings_write_own" on public.remedy_ratings for insert with check (auth.uid() = user_id);
create policy "ratings_update_own" on public.remedy_ratings for update using (auth.uid() = user_id);

create policy "routines_own" on public.user_routines for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "checkins_own" on public.routine_checkins for all using (
  exists (select 1 from public.user_routines ur where ur.id = user_routine_id and ur.user_id = auth.uid())
) with check (
  exists (select 1 from public.user_routines ur where ur.id = user_routine_id and ur.user_id = auth.uid())
);

create policy "photos_own" on public.progress_photos for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "transits_read" on public.transit_prompts for select using (true);

-- Storage bucket (create via dashboard if this fails)
insert into storage.buckets (id, name, public)
values ('progress-photos', 'progress-photos', false)
on conflict (id) do nothing;

create policy "photo_storage_own"
on storage.objects for all
using (bucket_id = 'progress-photos' and auth.uid()::text = (storage.foldername(name))[1])
with check (bucket_id = 'progress-photos' and auth.uid()::text = (storage.foldername(name))[1]);
