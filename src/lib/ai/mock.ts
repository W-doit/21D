import type { RemedySuggestion } from '../../types'
import type { Locale } from '../../i18n/translations'

type CatalogItem = RemedySuggestion & {
  keywords: string[]
  es: Pick<RemedySuggestion, 'title' | 'description' | 'category' | 'steps'>
}

const CATALOG: CatalogItem[] = [
  {
    id: 'ginger-hair-spray',
    title: 'Ginger root hair spray',
    description:
      'Brew fresh ginger water, cool, and mist scalp nightly to support circulation and hair density.',
    category: 'Hair',
    expectedDaysToResult: 21,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=ginger+scalp+spray+hair+growth+tutorial',
    steps: [
      'Boil sliced ginger in water for 10 minutes',
      'Cool and pour into a spray bottle',
      'Mist scalp at night after washing or dry',
      'Leave in; rinse in the morning if desired',
    ],
    keywords: [
      'hair', 'thin', 'bald', 'scalp', 'growth', 'cabello', 'pelo', 'calvicie', 'cuero', 'crecimiento',
    ],
    es: {
      title: 'Spray de jengibre para el cabello',
      description:
        'Hierve jengibre fresco, enfría y vaporiza el cuero cabelludo cada noche para apoyar la circulación y la densidad.',
      category: 'Cabello',
      steps: [
        'Hierve jengibre en rodajas 10 minutos',
        'Enfría y vierte en un pulverizador',
        'Vaporiza el cuero cabelludo por la noche',
        'Déjalo actuar; enjuaga por la mañana si quieres',
      ],
    },
  },
  {
    id: 'scalp-oil-massage',
    title: 'Warm oil scalp massage',
    description:
      'Weekly warm oil massage to nourish the scalp and make nightly care feel intentional.',
    category: 'Hair',
    expectedDaysToResult: 28,
    mediaPlatform: 'tiktok',
    mediaUrl: 'https://www.tiktok.com/',
    steps: [
      'Warm a teaspoon of coconut or castor oil',
      'Massage into scalp for 5 minutes',
      'Leave for at least 30 minutes',
      'Wash gently',
    ],
    keywords: ['hair', 'scalp', 'dry', 'oil', 'cabello', 'aceite', 'masaje'],
    es: {
      title: 'Masaje capilar con aceite tibio',
      description:
        'Masaje semanal con aceite tibio para nutrir el cuero cabelludo y dar intención al cuidado nocturno.',
      category: 'Cabello',
      steps: [
        'Calienta una cucharadita de aceite de coco o ricino',
        'Masajea el cuero cabelludo 5 minutos',
        'Deja actuar al menos 30 minutos',
        'Lava con suavidad',
      ],
    },
  },
  {
    id: 'morning-sunlight',
    title: '10 minutes morning light',
    description:
      'Step outside within an hour of waking to anchor your circadian rhythm.',
    category: 'Energy',
    expectedDaysToResult: 14,
    mediaPlatform: 'instagram',
    mediaUrl: 'https://www.instagram.com/',
    steps: [
      'Set an alarm for daylight hours',
      'Go outside without sunglasses for 10 minutes',
      'Breathe slowly; no phone if possible',
    ],
    keywords: [
      'energy', 'sleep', 'mood', 'tired', 'focus', 'energía', 'sueño', 'ánimo', 'cansancio',
    ],
    es: {
      title: '10 minutos de luz matutina',
      description:
        'Sal al exterior en la primera hora tras despertar para anclar tu ritmo circadiano.',
      category: 'Energía',
      steps: [
        'Pon una alarma en horario de luz',
        'Sal sin gafas de sol durante 10 minutos',
        'Respira despacio; sin móvil si puedes',
      ],
    },
  },
  {
    id: 'sleep-wind-down',
    title: 'Phone-free wind-down',
    description:
      'A 30-minute screen-free buffer before bed to deepen sleep quality.',
    category: 'Sleep',
    expectedDaysToResult: 21,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=ginger+scalp+spray+hair+growth+tutorial',
    steps: [
      'Set a nightly reminder 30 minutes before bed',
      'Put the phone in another room',
      'Read, stretch, or journal instead',
    ],
    keywords: ['sleep', 'insomnia', 'rest', 'night', 'sueño', 'insomnio', 'descanso'],
    es: {
      title: 'Desconexión sin móvil',
      description:
        'Media hora sin pantallas antes de dormir para profundizar la calidad del sueño.',
      category: 'Sueño',
      steps: [
        'Pon un recordatorio 30 minutos antes de dormir',
        'Deja el móvil en otra habitación',
        'Lee, estírate o escribe en su lugar',
      ],
    },
  },
  {
    id: 'hydration-ritual',
    title: 'Morning hydration ritual',
    description: 'Start each day with 500ml water before coffee or tea.',
    category: 'Body',
    expectedDaysToResult: 14,
    mediaPlatform: 'none',
    mediaUrl: '',
    steps: [
      'Fill a bottle the night before',
      'Drink it within 20 minutes of waking',
      'Optionally add lemon or a pinch of salt',
    ],
    keywords: [
      'water', 'hydrat', 'skin', 'body', 'health', 'agua', 'hidratación', 'piel', 'cuerpo',
    ],
    es: {
      title: 'Ritual de hidratación matutina',
      description: 'Empieza el día con 500 ml de agua antes del café o el té.',
      category: 'Cuerpo',
      steps: [
        'Llena una botella la noche anterior',
        'Bébela en los primeros 20 minutos al despertar',
        'Opcional: limón o una pizca de sal',
      ],
    },
  },
  {
    id: 'anxiety-box-breath',
    title: 'Box breathing twice daily',
    description:
      'Four-count inhale, hold, exhale, hold — two short sessions a day.',
    category: 'Mind',
    expectedDaysToResult: 21,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=box+breathing+technique+tutorial',
    steps: [
      'Sit upright for 2 minutes',
      'Inhale 4 · hold 4 · exhale 4 · hold 4',
      'Repeat for 4 cycles morning and evening',
    ],
    keywords: [
      'anxiety', 'stress', 'calm', 'mind', 'focus', 'ansiedad', 'estrés', 'calma', 'mente',
    ],
    es: {
      title: 'Respiración en caja dos veces al día',
      description:
        'Inhala, retén, exhala y retén en cuatro tiempos — dos sesiones cortas al día.',
      category: 'Mente',
      steps: [
        'Siéntate erguido 2 minutos',
        'Inhala 4 · retén 4 · exhala 4 · retén 4',
        'Repite 4 ciclos por la mañana y por la noche',
      ],
    },
  },
  {
    id: 'walk-after-meals',
    title: '10-minute post-meal walk',
    description:
      'A short walk after lunch or dinner to support digestion and blood sugar.',
    category: 'Body',
    expectedDaysToResult: 14,
    mediaPlatform: 'none',
    mediaUrl: '',
    steps: [
      'Finish eating',
      'Walk outdoors or indoors for 10 minutes',
      'Keep a comfortable pace',
    ],
    keywords: [
      'weight', 'digestion', 'walk', 'fitness', 'energy', 'peso', 'digestión', 'caminar',
    ],
    es: {
      title: 'Caminata de 10 minutos tras comer',
      description:
        'Un paseo corto después de comer para apoyar la digestión y el azúcar en sangre.',
      category: 'Cuerpo',
      steps: [
        'Termina de comer',
        'Camina 10 minutos dentro o fuera',
        'Mantén un ritmo cómodo',
      ],
    },
  },
]

function localize(item: CatalogItem, locale: Locale): RemedySuggestion {
  const base = {
    id: item.id,
    expectedDaysToResult: item.expectedDaysToResult,
    mediaPlatform: item.mediaPlatform,
    mediaUrl: item.mediaUrl,
  }
  if (locale === 'es') {
    return {
      ...base,
      title: item.es.title,
      description: item.es.description,
      category: item.es.category,
      steps: item.es.steps,
    }
  }
  return {
    ...base,
    title: item.title,
    description: item.description,
    category: item.category,
    steps: item.steps,
  }
}

function scoreSuggestion(goal: string, item: CatalogItem): number {
  const g = goal.toLowerCase()
  return item.keywords.reduce((score, kw) => (g.includes(kw) ? score + 2 : score), 0)
}

/** Offline / fallback catalog when Gemini is unavailable. */
export async function mockSuggestRoutines(
  goal: string,
  locale: Locale = 'es',
): Promise<RemedySuggestion[]> {
  await new Promise((r) => setTimeout(r, 400))

  const ranked = [...CATALOG]
    .map((item) => ({ item, score: scoreSuggestion(goal, item) }))
    .sort((a, b) => b.score - a.score)

  const top = ranked.filter((r) => r.score > 0).slice(0, 5)
  const fallback = ranked.slice(0, 5)
  return (top.length >= 3 ? top : fallback).map(({ item }) =>
    localize(item, locale),
  )
}
