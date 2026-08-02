import type { MediaPlatform } from '../types'

export type CuratedRemedy = {
  slug: string
  collection: 'Acupressure points'
  title: string
  titleEs: string
  description: string
  descriptionEs: string
  category: string
  categoryEs: string
  expectedDaysToResult: number
  mediaPlatform: MediaPlatform
  mediaUrl: string
  imageUrl: string
  steps: string[]
  stepsEs: string[]
  pressMinutes: string
  caution?: string
  cautionEs?: string
}

/** Curated acupressure library — educational self-care, not medical advice. */
export const ACUPRESSURE_CURATED: CuratedRemedy[] = [
  {
    slug: 'acu-li4',
    collection: 'Acupressure points',
    title: 'Acupressure points — LI4 (Hegu)',
    titleEs: 'Puntos de acupresión — LI4 (Hegu)',
    description:
      'Large Intestine 4 · Hegu (“Union Valley”). Classic point for tension headaches, facial pain, and stress. On the back of the hand in the fleshy webbing between thumb and index finger. Press firmly toward the index-finger bone until you feel a dull ache. Hold 1–2 minutes per hand. Traditionally avoided in pregnancy.',
    descriptionEs:
      'Intestino Grueso 4 · Hegu (“Valle de la unión”). Punto clásico para cefaleas tensionales, dolor facial y estrés. En el dorso de la mano, en el tejido entre pulgar e índice. Presiona hacia el hueso del índice hasta notar un dolor sordo. Mantén 1–2 minutos por mano. Tradicionalmente se evita en el embarazo.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 14,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupressure+LI4+Hegu+location',
    imageUrl: '/acupressure/li4.svg',
    pressMinutes: '1–2',
    caution: 'Avoid if pregnant.',
    cautionEs: 'Evitar si estás embarazada.',
    steps: [
      'Bring thumb and index finger together; find the highest point of the muscle mound, then relax the hand.',
      'Press firmly with the opposite thumb, angling toward the index-finger bone (de qi: dull ache).',
      'Hold 1–2 minutes while breathing slowly; switch hands.',
      'Repeat once or twice daily as needed for head tension.',
    ],
    stepsEs: [
      'Junta pulgar e índice; localiza el punto más alto del músculo y luego relaja la mano.',
      'Presiona con el pulgar contrario hacia el hueso del índice (de qi: dolor sordo).',
      'Mantén 1–2 minutos respirando despacio; cambia de mano.',
      'Repite 1–2 veces al día si hay tensión de cabeza.',
    ],
  },
  {
    slug: 'acu-pc6',
    collection: 'Acupressure points',
    title: 'Acupressure points — PC6 (Neiguan)',
    titleEs: 'Puntos de acupresión — PC6 (Neiguan)',
    description:
      'Pericardium 6 · Neiguan (“Inner Pass”). Best-studied point for nausea, motion sickness, and anxiety. On the inner forearm, about three finger-widths above the wrist crease, between the two central tendons. Moderate sustained pressure 1–3 minutes.',
    descriptionEs:
      'Pericardio 6 · Neiguan (“Paso interno”). El punto con más evidencia para náuseas, mareo y ansiedad. En el antebrazo interno, a unos tres dedos por encima del pliegue de la muñeca, entre los dos tendones centrales. Presión moderada 1–3 minutos.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 7,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupressure+PC6+Neiguan+nausea',
    imageUrl: '/acupressure/pc6.svg',
    pressMinutes: '1–3',
    steps: [
      'Palm up: stack three fingers from the wrist crease; PC6 is just above the top finger.',
      'Feel the groove between the two central tendons.',
      'Press moderately 1–3 minutes (or use circular motions); both wrists.',
      'Useful before travel or when queasy.',
    ],
    stepsEs: [
      'Palma arriba: coloca tres dedos desde el pliegue de la muñeca; PC6 queda justo encima.',
      'Nota el surco entre los dos tendones centrales.',
      'Presiona de forma moderada 1–3 minutos (o círculos); ambas muñecas.',
      'Útil antes de viajar o si hay náuseas.',
    ],
  },
  {
    slug: 'acu-st36',
    collection: 'Acupressure points',
    title: 'Acupressure points — ST36 (Zusanli)',
    titleEs: 'Puntos de acupresión — ST36 (Zusanli)',
    description:
      'Stomach 36 · Zusanli (“Leg Three Miles”). Supports digestion, energy, and immunity. Four finger-widths below the kneecap, one finger-width lateral to the shinbone. Firm pressure 1–3 minutes each leg.',
    descriptionEs:
      'Estómago 36 · Zusanli (“Tres millas de la pierna”). Apoya digestión, energía e inmunidad. Cuatro dedos bajo la rótula, un dedo por fuera del borde de la tibia. Presión firme 1–3 minutos por pierna.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 21,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupressure+ST36+Zusanli+location',
    imageUrl: '/acupressure/st36.svg',
    pressMinutes: '1–3',
    steps: [
      'Sit with legs bent; measure four fingers down from the bottom of the kneecap.',
      'Move one finger-width to the outer side of the shinbone; feel for tenderness.',
      'Press firmly 1–3 minutes; breathe slowly; repeat on the other leg.',
      'Good mid-morning or before meals if bloated.',
    ],
    stepsEs: [
      'Siéntate con las piernas flexionadas; mide cuatro dedos bajo el borde inferior de la rótula.',
      'Desplázate un dedo hacia fuera de la tibia; busca sensibilidad.',
      'Presiona con firmeza 1–3 minutos; respira despacio; cambia de pierna.',
      'Ideal a media mañana o antes de comer si hay hinchazón.',
    ],
  },
  {
    slug: 'acu-sp6',
    collection: 'Acupressure points',
    title: 'Acupressure points — SP6 (Sanyinjiao)',
    titleEs: 'Puntos de acupresión — SP6 (Sanyinjiao)',
    description:
      'Spleen 6 · Sanyinjiao (“Three Yin Intersection”). Versatile for sleep, stress, digestion, and menstrual comfort. Four finger-widths above the inner ankle bone, just behind the tibia. Moderate pressure 2–3 minutes. Traditionally avoided in pregnancy.',
    descriptionEs:
      'Bazo 6 · Sanyinjiao (“Cruce de los tres yin”). Versátil para sueño, estrés, digestión y molestias menstruales. Cuatro dedos por encima del maléolo interno, detrás de la tibia. Presión moderada 2–3 minutos. Tradicionalmente se evita en el embarazo.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 14,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupressure+SP6+Sanyinjiao+location',
    imageUrl: '/acupressure/sp6.svg',
    pressMinutes: '2–3',
    caution: 'Avoid if pregnant.',
    cautionEs: 'Evitar si estás embarazada.',
    steps: [
      'Find the inner ankle bone; place four fingers above it along the shin.',
      'Press inward against the back edge of the tibia until tender.',
      'Hold moderate pressure 2–3 minutes with slow exhales; both legs.',
      'Often used 30–60 minutes before bed for sleep.',
    ],
    stepsEs: [
      'Localiza el maléolo interno; coloca cuatro dedos por encima a lo largo de la tibia.',
      'Presiona hacia el borde posterior de la tibia hasta notar sensibilidad.',
      'Mantén presión moderada 2–3 minutos con exhalaciones largas; ambas piernas.',
      'A menudo se usa 30–60 minutos antes de dormir.',
    ],
  },
  {
    slug: 'acu-lv3',
    collection: 'Acupressure points',
    title: 'Acupressure points — LV3 (Taichong)',
    titleEs: 'Puntos de acupresión — LV3 (Taichong)',
    description:
      'Liver 3 · Taichong (“Great Rushing”). Used for stress, irritability, headaches, and menstrual tension. On the top of the foot in the depression between the first and second metatarsal bones. Firm pressure 1–2 minutes each foot.',
    descriptionEs:
      'Hígado 3 · Taichong (“Gran embestida”). Para estrés, irritabilidad, cefaleas y tensión menstrual. En el dorso del pie, en la depresión entre el 1.º y 2.º metatarsiano. Presión firme 1–2 minutos por pie.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 14,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupressure+LV3+Taichong+location',
    imageUrl: '/acupressure/lv3.svg',
    pressMinutes: '1–2',
    steps: [
      'On the top of the foot, slide a finger from between the big toe and second toe toward the ankle until you feel a hollow.',
      'Press firmly into the hollow 1–2 minutes (ache is OK; sharp pain is not).',
      'Switch feet; breathe slowly.',
      'Pairs well with LI4 for head tension.',
    ],
    stepsEs: [
      'En el dorso del pie, desliza el dedo desde entre el gordo y el segundo hacia el tobillo hasta notar un hueco.',
      'Presiona con firmeza 1–2 minutos (dolor sordo sí; dolor agudo no).',
      'Cambia de pie; respira despacio.',
      'Combina bien con LI4 si hay tensión de cabeza.',
    ],
  },
  {
    slug: 'acu-ren12',
    collection: 'Acupressure points',
    title: 'Acupressure points — Ren12 (Zhongwan)',
    titleEs: 'Puntos de acupresión — Ren12 (Zhongwan)',
    description:
      'Conception Vessel 12 · Zhongwan (“Middle Cavity”). Central digestive point on the midline of the abdomen, roughly midway between the bottom of the breastbone and the navel. Gentle firm pressure or small circles 1–2 minutes for bloating and stomach comfort.',
    descriptionEs:
      'Vaso Concepción 12 · Zhongwan (“Cavidad media”). Punto digestivo central en la línea media del abdomen, a mitad de camino entre el esternón y el ombligo. Presión suave o círculos 1–2 minutos para hinchazón y confort gástrico.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 14,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupressure+Ren12+Zhongwan+location',
    imageUrl: '/acupressure/ren12.svg',
    pressMinutes: '1–2',
    steps: [
      'Lie or sit comfortably; find the midline between sternum and navel.',
      'Press gently but firmly for 1–2 minutes, or make slow clockwise circles.',
      'Do not press hard on a full stomach or if there is sharp abdominal pain.',
      'Useful after meals if bloated (wait until comfortable).',
    ],
    stepsEs: [
      'Siéntate o túmbate; localiza la línea media entre esternón y ombligo.',
      'Presiona con suavidad 1–2 minutos, o haz círculos lentos a favor de las agujas del reloj.',
      'No presiones fuerte con el estómago lleno ni si hay dolor abdominal agudo.',
      'Útil tras las comidas si hay hinchazón (cuando te sientas cómoda).',
    ],
  },
  {
    slug: 'acu-gb20',
    collection: 'Acupressure points',
    title: 'Acupressure points — GB20 (Fengchi)',
    titleEs: 'Puntos de acupresión — GB20 (Fengchi)',
    description:
      'Gallbladder 20 · Fengchi (“Wind Pool”). Two hollows at the base of the skull, either side of the neck. Excellent for screen-related neck tension and headaches that start at the back of the head. Press upward and inward 1–2 minutes.',
    descriptionEs:
      'Vesícula Biliar 20 · Fengchi (“Estanque del viento”). Dos huecos en la base del cráneo, a ambos lados del cuello. Excelente para tensión cervical por pantallas y cefaleas que empiezan atrás. Presiona hacia arriba y adentro 1–2 minutos.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 14,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupressure+GB20+Fengchi+location',
    imageUrl: '/acupressure/gb20.svg',
    pressMinutes: '1–2',
    steps: [
      'Run thumbs up the back of the neck to the base of the skull; find the two soft hollows.',
      'Press both thumbs upward and slightly inward; tilt head gently back.',
      'Hold 1–2 minutes with eyes closed and slow breathing.',
      'Ideal after long computer sessions.',
    ],
    stepsEs: [
      'Sube los pulgares por la nuca hasta la base del cráneo; busca los dos huecos blandos.',
      'Presiona ambos pulgares hacia arriba y un poco hacia dentro; inclina la cabeza suavemente.',
      'Mantén 1–2 minutos con los ojos cerrados y respiración lenta.',
      'Ideal tras muchas horas delante de la pantalla.',
    ],
  },
  {
    slug: 'acu-ht7',
    collection: 'Acupressure points',
    title: 'Acupressure points — HT7 (Shenmen)',
    titleEs: 'Puntos de acupresión — HT7 (Shenmen)',
    description:
      'Heart 7 · Shenmen (“Spirit Gate”). Calming point for anxiety and sleep onset. On the wrist crease at the pinky side, in the small hollow by the pisiform bone. Light to moderate pressure 1–2 minutes.',
    descriptionEs:
      'Corazón 7 · Shenmen (“Puerta del espíritu”). Punto calmante para ansiedad e inicio del sueño. En el pliegue de la muñeca, lado del meñique, en el hueco junto al pisiforme. Presión ligera a moderada 1–2 minutos.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 14,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupressure+HT7+Shenmen+location',
    imageUrl: '/acupressure/ht7.svg',
    pressMinutes: '1–2',
    steps: [
      'Palm up: find the wrist crease on the pinky side; feel the small hollow.',
      'Use the thumb pad with light–moderate pressure 1–2 minutes.',
      'Breathe in for 4, out for 6.',
      'Nice as a pre-sleep ritual in bed.',
    ],
    stepsEs: [
      'Palma arriba: localiza el pliegue de la muñeca del lado del meñique; nota el hueco.',
      'Usa la yema del pulgar con presión ligera–moderada 1–2 minutos.',
      'Inhala en 4 tiempos, exhala en 6.',
      'Ideal como ritual antes de dormir.',
    ],
  },
  {
    slug: 'acu-bl40',
    collection: 'Acupressure points',
    title: 'Acupressure points — BL40 (Weizhong)',
    titleEs: 'Puntos de acupresión — BL40 (Weizhong)',
    description:
      'Bladder 40 · Weizhong (“Commanding Middle”). Center of the crease behind the knee. Commonly used for lower-back tension and spasms. Two-finger pressure 1–2 minutes per side while seated.',
    descriptionEs:
      'Vejiga 40 · Weizhong (“Medio de mando”). Centro del pliegue detrás de la rodilla. Muy usado para tensión y espasmos lumbares. Presión con dos dedos 1–2 minutos por lado, sentada.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 14,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupressure+BL40+Weizhong+back+pain',
    imageUrl: '/acupressure/bl40.svg',
    pressMinutes: '1–2',
    steps: [
      'Sit and reach behind the knee; find the middle of the popliteal crease between the tendons.',
      'Press with two fingers for 1–2 minutes.',
      'Switch legs; stand and notice lower-back ease.',
      'Do not press on varicose veins or recent injury.',
    ],
    stepsEs: [
      'Siéntate y alcanza detrás de la rodilla; encuentra el centro del pliegue entre los tendones.',
      'Presiona con dos dedos 1–2 minutos.',
      'Cambia de pierna; levántate y nota la zona lumbar.',
      'No presiones sobre varices ni lesiones recientes.',
    ],
  },
  {
    slug: 'acu-yintang',
    collection: 'Acupressure points',
    title: 'Acupressure points — Yintang',
    titleEs: 'Puntos de acupresión — Yintang',
    description:
      'Yintang (“Hall of Impression”). Midline between the eyebrows. Soft calming point for mental chatter, light headache, and pre-sleep wind-down. Gentle press or small circles 1–2 minutes.',
    descriptionEs:
      'Yintang (“Sala de la impresión”). Línea media entre las cejas. Punto suave para calmar la mente, cefalea leve y bajar revoluciones antes de dormir. Presión gentil o círculos 1–2 minutos.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 7,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupressure+Yintang+third+eye+point',
    imageUrl: '/acupressure/yintang.svg',
    pressMinutes: '1–2',
    steps: [
      'Sit or lie down; place a fingertip between the eyebrows on the midline.',
      'Apply gentle pressure or tiny circles for 1–2 minutes.',
      'Keep the jaw soft; lengthen the exhale.',
      'Combine with HT7 before sleep if helpful.',
    ],
    stepsEs: [
      'Siéntate o túmbate; coloca la yema entre las cejas en la línea media.',
      'Presión suave o círculos pequeños 1–2 minutos.',
      'Mantén la mandíbula relajada; alarga la exhalación.',
      'Combina con HT7 antes de dormir si te ayuda.',
    ],
  },
  {
    slug: 'acu-evening-set',
    collection: 'Acupressure points',
    title: 'Acupressure points — Evening set (ST36 · SP6 · Ren12 · LV3)',
    titleEs: 'Puntos de acupresión — Set nocturno (ST36 · SP6 · Ren12 · LV3)',
    description:
      'A short bedtime sequence for digestion and calm: ST36 (digestion/energy), SP6 (sleep/spleen), Ren12 (stomach), LV3 (liver/stress). About 8–12 minutes total. Skip SP6 if pregnant.',
    descriptionEs:
      'Secuencia corta nocturna para digestión y calma: ST36 (digestión/energía), SP6 (sueño/bazo), Ren12 (estómago), LV3 (hígado/estrés). Unos 8–12 minutos en total. Omite SP6 si estás embarazada.',
    category: 'Acupressure',
    categoryEs: 'Acupresión',
    expectedDaysToResult: 21,
    mediaPlatform: 'youtube',
    mediaUrl:
      'https://www.youtube.com/results?search_query=acupresion+ST36+SP6+Ren12+higado+3',
    imageUrl: '/acupressure/st36.svg',
    pressMinutes: '8–12 total',
    caution: 'Skip SP6 if pregnant.',
    cautionEs: 'Omite SP6 si estás embarazada.',
    steps: [
      'ST36 — 1–2 min each leg (below knee, outer shin).',
      'SP6 — 2 min each leg (above inner ankle) unless pregnant.',
      'Ren12 — 1–2 min gentle circles on midline abdomen.',
      'LV3 — 1–2 min each foot (between big & second toe).',
      'Finish with 5 slow breaths.',
    ],
    stepsEs: [
      'ST36 — 1–2 min por pierna (bajo la rodilla, tibia externa).',
      'SP6 — 2 min por pierna (sobre el tobillo interno), salvo embarazo.',
      'Ren12 — 1–2 min de círculos suaves en el abdomen.',
      'LV3 — 1–2 min por pie (entre el gordo y el segundo).',
      'Cierra con 5 respiraciones lentas.',
    ],
  },
]

export function curatedToSuggestion(
  item: CuratedRemedy,
  locale: 'es' | 'en',
): {
  id: string
  title: string
  description: string
  category: string
  expectedDaysToResult: number
  mediaPlatform: MediaPlatform
  mediaUrl: string
  imageUrl: string
  steps: string[]
} {
  const es = locale === 'es'
  return {
    id: item.slug,
    title: es ? item.titleEs : item.title,
    description: es
      ? `${item.descriptionEs}${item.cautionEs ? ` ${item.cautionEs}` : ''} Técnica: ${item.pressMinutes} min. No sustituye consejo médico.`
      : `${item.description}${item.caution ? ` ${item.caution}` : ''} Technique: ${item.pressMinutes} min. Not medical advice.`,
    category: es ? item.categoryEs : item.category,
    expectedDaysToResult: item.expectedDaysToResult,
    mediaPlatform: item.mediaPlatform,
    mediaUrl: item.mediaUrl,
    imageUrl: item.imageUrl,
    steps: es ? item.stepsEs : item.steps,
  }
}
