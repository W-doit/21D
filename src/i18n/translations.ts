export type Locale = 'es' | 'en'

export type MessageKey = keyof typeof es

const es = {
  brandTag: 'Hábito · Cielo · Prueba',
  signIn: 'Entrar',
  landingHeadline: 'Cualquier hábito nuevo tarda veintiún días en formarse.',
  landingSub:
    'Crea rutinas diarias y semanales con suaves señales astrológicas, guías visuales y fotos de progreso.',
  downloadApp: 'Descargar app',
  addToHomeScreen: 'Añadir a inicio',
  installed: 'Instalada en este dispositivo',
  iosInstallHint:
    'Toca Compartir y luego Añadir a pantalla de inicio.',
  androidInstallHint:
    'Ábrela en Chrome en el móvil y usa el aviso de instalación del navegador.',
  openApp: 'Abrir app',
  getStarted: 'Empezar',
  footer: 'Gratis para siempre · Gracias a nuestros canales de vídeo',

  welcomeBack: 'Bienvenido de nuevo',
  createSpace: 'Crea tu espacio',
  authCloud: 'Entra con email para sincronizar entre dispositivos.',
  authDemo: 'Modo demo — añade tu clave de Supabase después para activar la nube.',
  name: 'Nombre',
  namePlaceholder: 'Cómo te saludamos',
  email: 'Email',
  password: 'Contraseña',
  continue: 'Continuar',
  oneMoment: 'Un momento…',
  needAccount: '¿No tienes cuenta? Regístrate',
  haveAccount: '¿Ya tienes cuenta? Entrar',
  continueGuest: 'Continuar como invitado',

  step1: 'Paso 1',
  onboardingTitle: '¿Qué quieres mejorar?',
  onboardingSub:
    'Sé específico. Te sugeriremos rutinas de 21 días — con fotos de progreso en el camino.',
  yourFocus: 'Tu enfoque',
  goalPlaceholder:
    'p. ej. Cabello más fuerte, dormir mejor, sentirme más calmado por las mañanas…',
  viewDetails: 'Ver detalle',
  closeDetail: 'Cerrar',
  visualGuide: 'Guía visual',
  suggestRoutines: 'Sugerir rutinas',

  suggestions: 'Sugerencias',
  forYourGoal: 'Para tu objetivo',
  skip: 'Saltar',
  gathering: 'Reuniendo remedios…',
  usingAi: 'Sugerencias con IA',
  usingFallback:
    'IA no disponible ahora — mostrando sugerencias locales. Añade GEMINI_API_KEY en secretos de Supabase.',
  addToPlan: 'Añadir a mi rutina',
  addedToPlan: 'Añadida al plan',
  goToToday: 'Ir a hoy',
  daysApprox: '~{n}d',

  hello: 'Hola, {name}',
  today: 'Hoy',
  yourRoutines: 'Tus rutinas',
  add: '+ Añadir',
  noRoutines: 'Aún no hay rutinas',
  noRoutinesHint:
    'Cuéntanos qué quieres mejorar y te sugeriremos un plan.',
  start21: 'Empezar un plan de 21 días',
  there: 'tú',

  thisWeek: 'Esta semana',
  weekSub: 'Mira el ritmo. Toca un día para ver qué toca.',
  activePlans: 'Planes activos',
  noActive: 'No hay rutinas activas.',
  dayOf: 'Día {day} de {total}',

  backToday: '← Hoy',
  routineNotFound: 'Rutina no encontrada.',
  steps: 'Pasos',
  alarm: 'Alarma',
  alarmHint: 'Recordatorio local en este dispositivo. El push en la nube llega después.',
  notifyMe: 'Avisarme',
  saveSchedule: 'Guardar horario',
  notifOn: 'Notificaciones activas para esta rutina.',
  notifBlocked:
    'Notificaciones bloqueadas — actívalas en ajustes del navegador.',
  notifUnsupported: 'Este navegador no admite notificaciones.',
  progressPhotos: 'Fotos de progreso',
  day0Baseline: 'Día 0 — punto de partida',
  day0Hint: 'Captura cómo se ve hoy, antes de que el hábito sume.',
  describeLook: 'Describe cómo se ve / se siente…',
  takeBaseline: 'Tomar foto inicial',
  checkinPhoto: 'Foto de control · día {n}',
  checkinHint: 'Momento de comparar y valorar este remedio.',
  uploadFollowup: 'Subir foto de seguimiento',
  dayLabel: 'Día {n}',
  rateRoutine: 'Valorar esta rutina',
  rateHint: 'Ayuda a curar remedios para todos. No es consejo médico.',
  whatWorked: '¿Qué funcionó? ¿Qué no?',
  saveRating: 'Guardar valoración',
  ratingAria: 'Valoración',
  starsAria: '{n} estrellas',
  markDone: 'Marcar hecho',
  markIncomplete: 'Marcar incompleto',

  you: 'Tú',
  guestDevice: 'Invitado en este dispositivo',
  localDemo: 'Perfil demo local',
  displayName: 'Nombre visible',
  saveProfile: 'Guardar perfil',
  saved: 'Guardado',
  natalOptional: 'Datos natales (opcional)',
  natalHint: 'Puedes añadirlos más tarde para los tránsitos.',
  natalStub: 'Carta natal (opcional)',
  natalStubHint:
    'Añádela cuando quieras. Más adelante usaremos estos datos para tránsitos personalizados.',
  birthDate: 'Fecha de nacimiento',
  birthTime: 'Hora de nacimiento',
  birthPlace: 'Lugar de nacimiento',
  install: 'Instalar',
  runningInstalled: 'Funcionando como app instalada.',
  addHomescreen:
    'Añade 21D a la pantalla de inicio para la experiencia completa.',
  notifications: 'Notificaciones',
  status: 'Estado: {perm}',
  enableNotifs: 'Activar notificaciones',
  newGoal: 'Nuevo objetivo / sugerencias',
  backHome: 'Volver al inicio',
  signOut: 'Cerrar sesión',

  navToday: 'Hoy',
  navWeek: 'Semana',
  navAdd: 'Añadir',
  navYou: 'Tú',

  transitDaily: 'tránsito diario',
  transitWeekly: 'tránsito semanal',
  transitUpcoming: 'próximo tránsito',
  fallbackTransitTitle: 'Cielo estable',
  fallbackTransitBody:
    'Favorece rituales simples y repetibles hoy. Mantén el cuidado de esta noche corto y amable.',
  weeklyTransitTitle: 'Semana de paciencia',
  weeklyTransitBody:
    'Los resultados se acumulan en silencio: fotografiá el progreso, no apresures el espejo.',
  upcomingTransitTitle: 'Ventana de claridad por delante',
  upcomingTransitBody:
    'En unos días, revisa qué funciona y ajusta tus alarmas.',

  watchYoutube: 'Ver en YouTube',
  watchTiktok: 'Ver en TikTok',
  watchInstagram: 'Ver en Instagram',
  openVideo: 'Abrir vídeo',
  routineVideo: 'Vídeo de la rutina',
  videoOpenHint:
    'Abrimos búsqueda en YouTube (los IDs inventados por la IA no se pueden incrustar).',
  videoPreviewHint: 'Vista previa de vídeos relacionados en YouTube',
  playPreview: 'Reproducir vista previa',
  videoUnavailableAction: '¿No carga? Abrir en YouTube',
  addProgressPhoto: 'Añadir foto de progreso',
  progressPreview: 'Vista previa del progreso',

  langEs: 'ES',
  langEn: 'EN',
} as const

const en: Record<MessageKey, string> = {
  brandTag: 'Habit · Sky · Proof',
  signIn: 'Sign in',
  landingHeadline: 'Any new habit takes twenty-one days to form.',
  landingSub:
    'Build daily and weekly routines with gentle astrology cues, visual guides, and photo progress.',
  downloadApp: 'Download app',
  addToHomeScreen: 'Add to Home Screen',
  installed: 'Installed on this device',
  iosInstallHint: 'Tap Share, then Add to Home Screen.',
  androidInstallHint:
    'Open in Chrome on your phone, then use the browser install prompt.',
  openApp: 'Open app',
  getStarted: 'Get started',
  footer: 'Free forever · Supported by our video channels',

  welcomeBack: 'Welcome back',
  createSpace: 'Create your space',
  authCloud: 'Sign in with email to sync across devices.',
  authDemo: 'Demo mode — add your Supabase anon key later to enable cloud auth.',
  name: 'Name',
  namePlaceholder: 'How we say hello',
  email: 'Email',
  password: 'Password',
  continue: 'Continue',
  oneMoment: 'One moment…',
  needAccount: 'Need an account? Sign up',
  haveAccount: 'Have an account? Sign in',
  continueGuest: 'Continue as guest',

  step1: 'Step 1',
  onboardingTitle: 'What do you want to improve?',
  onboardingSub:
    'Be specific. We’ll suggest routines you can run for 21 days — with photo proof along the way.',
  yourFocus: 'Your focus',
  goalPlaceholder:
    'e.g. Grow thicker hair, sleep deeper, feel calmer in the mornings…',
  viewDetails: 'View details',
  closeDetail: 'Close',
  visualGuide: 'Visual guide',
  suggestRoutines: 'Suggest routines',

  suggestions: 'Suggestions',
  forYourGoal: 'For your goal',
  skip: 'Skip',
  gathering: 'Gathering remedies…',
  usingAi: 'AI suggestions',
  usingFallback:
    'AI unavailable right now — showing local suggestions. Add GEMINI_API_KEY in Supabase secrets.',
  addToPlan: 'Add to my routine',
  addedToPlan: 'Added to plan',
  goToToday: 'Go to today',
  daysApprox: '~{n}d',

  hello: 'Hello, {name}',
  today: 'Today',
  yourRoutines: 'Your routines',
  add: '+ Add',
  noRoutines: 'No routines yet',
  noRoutinesHint:
    'Tell us what you want to improve and we’ll suggest a plan.',
  start21: 'Start a 21-day plan',
  there: 'there',

  thisWeek: 'This week',
  weekSub: 'Glance at the rhythm. Tap a day to see what’s due.',
  activePlans: 'Active plans',
  noActive: 'No active routines.',
  dayOf: 'Day {day} of {total}',

  backToday: '← Today',
  routineNotFound: 'Routine not found.',
  steps: 'Steps',
  alarm: 'Alarm',
  alarmHint: 'Local reminder on this device. Cloud push comes later.',
  notifyMe: 'Notify me',
  saveSchedule: 'Save schedule',
  notifOn: 'Notifications on for this routine.',
  notifBlocked:
    'Notifications blocked — you can enable them in browser settings.',
  notifUnsupported: 'This browser does not support notifications.',
  progressPhotos: 'Progress photos',
  day0Baseline: 'Day 0 — baseline',
  day0Hint: 'Capture how it looks today, before the habit compounds.',
  describeLook: 'Describe how it looks / feels…',
  takeBaseline: 'Take baseline photo',
  checkinPhoto: 'Check-in photo · day {n}',
  checkinHint: 'Time to compare and rate this remedy.',
  uploadFollowup: 'Upload follow-up photo',
  dayLabel: 'Day {n}',
  rateRoutine: 'Rate this routine',
  rateHint: 'Helps curate remedies for everyone. Not medical advice.',
  whatWorked: 'What worked? What didn’t?',
  saveRating: 'Save rating',
  ratingAria: 'Rating',
  starsAria: '{n} stars',
  markDone: 'Mark done',
  markIncomplete: 'Mark incomplete',

  you: 'You',
  guestDevice: 'Guest on this device',
  localDemo: 'Local demo profile',
  displayName: 'Display name',
  saveProfile: 'Save profile',
  saved: 'Saved',
  natalOptional: 'Natal data (optional)',
  natalHint: 'You can add this later for transit nudges.',
  natalStub: 'Natal chart (optional)',
  natalStubHint:
    'Add it whenever you like. We’ll use this later for personalized transits.',
  birthDate: 'Birth date',
  birthTime: 'Birth time',
  birthPlace: 'Birth place',
  install: 'Install',
  runningInstalled: 'Running as an installed app.',
  addHomescreen:
    'Add 21D to your home screen for the full phone experience.',
  notifications: 'Notifications',
  status: 'Status: {perm}',
  enableNotifs: 'Enable notifications',
  newGoal: 'New goal / suggestions',
  backHome: 'Back to home',
  signOut: 'Sign out',

  navToday: 'Today',
  navWeek: 'Week',
  navAdd: 'Add',
  navYou: 'You',

  transitDaily: 'daily transit',
  transitWeekly: 'weekly transit',
  transitUpcoming: 'upcoming transit',
  fallbackTransitTitle: 'Steady sky',
  fallbackTransitBody:
    'Favor simple, repeatable rituals today. Keep tonight’s care short and kind.',
  weeklyTransitTitle: 'Week of patience',
  weeklyTransitBody:
    'Results compound quietly — photograph progress, don’t rush the mirror.',
  upcomingTransitTitle: 'Clarity window ahead',
  upcomingTransitBody:
    'In a few days, review what is working and adjust your alarms.',

  watchYoutube: 'Watch on YouTube',
  watchTiktok: 'Watch on TikTok',
  watchInstagram: 'Watch on Instagram',
  openVideo: 'Open video',
  routineVideo: 'Routine video',
  videoOpenHint:
    'Opens a YouTube search (AI-invented video IDs cannot be embedded).',
  videoPreviewHint: 'Preview of related YouTube videos',
  playPreview: 'Play preview',
  videoUnavailableAction: 'Won’t load? Open on YouTube',
  addProgressPhoto: 'Add progress photo',
  progressPreview: 'Progress preview',

  langEs: 'ES',
  langEn: 'EN',
}

export const messages: Record<Locale, Record<MessageKey, string>> = {
  es,
  en,
}

export function formatMessage(
  template: string,
  vars?: Record<string, string | number>,
) {
  if (!vars) return template
  return Object.entries(vars).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template,
  )
}
