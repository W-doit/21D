-- Local mirror of remote migration: image_url for guide diagrams
alter table public.remedies add column if not exists image_url text;
alter table public.user_routines add column if not exists image_url text;
