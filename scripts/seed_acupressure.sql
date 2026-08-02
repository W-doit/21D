
delete from public.remedies
where is_curated = true
  and category = 'Acupresión'
  and title like 'Puntos de acupresión%';

insert into public.remedies (
  title, description, category, expected_days_to_result,
  media_platform, media_url, image_url, steps, is_curated
) values
(
    'Puntos de acupresión — LI4 (Hegu)',
    'Intestino Grueso 4 · Hegu (“Valle de la unión”). Punto clásico para cefaleas tensionales, dolor facial y estrés. En el dorso de la mano, en el tejido entre pulgar e índice. Presiona hacia el hueso del índice hasta notar un dolor sordo. Mantén 1–2 minutos por mano. Tradicionalmente se evita en el embarazo. Evitar si estás embarazada. Técnica: 1–2 min. No sustituye consejo médico.',
    'Acupresión',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+LI4+Hegu+location',
    '/acupressure/li4.svg',
    '["Junta pulgar e índice; localiza el punto más alto del músculo y luego relaja la mano.","Presiona con el pulgar contrario hacia el hueso del índice (de qi: dolor sordo).","Mantén 1–2 minutos respirando despacio; cambia de mano.","Repite 1–2 veces al día si hay tensión de cabeza."]'::jsonb,
    true
  ),
(
    'Puntos de acupresión — PC6 (Neiguan)',
    'Pericardio 6 · Neiguan (“Paso interno”). El punto con más evidencia para náuseas, mareo y ansiedad. En el antebrazo interno, a unos tres dedos por encima del pliegue de la muñeca, entre los dos tendones centrales. Presión moderada 1–3 minutos. Técnica: 1–3 min. No sustituye consejo médico.',
    'Acupresión',
    7,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+PC6+Neiguan+nausea',
    '/acupressure/pc6.svg',
    '["Palma arriba: coloca tres dedos desde el pliegue de la muñeca; PC6 queda justo encima.","Nota el surco entre los dos tendones centrales.","Presiona de forma moderada 1–3 minutos (o círculos); ambas muñecas.","Útil antes de viajar o si hay náuseas."]'::jsonb,
    true
  ),
(
    'Puntos de acupresión — ST36 (Zusanli)',
    'Estómago 36 · Zusanli (“Tres millas de la pierna”). Apoya digestión, energía e inmunidad. Cuatro dedos bajo la rótula, un dedo por fuera del borde de la tibia. Presión firme 1–3 minutos por pierna. Técnica: 1–3 min. No sustituye consejo médico.',
    'Acupresión',
    21,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+ST36+Zusanli+location',
    '/acupressure/st36.svg',
    '["Siéntate con las piernas flexionadas; mide cuatro dedos bajo el borde inferior de la rótula.","Desplázate un dedo hacia fuera de la tibia; busca sensibilidad.","Presiona con firmeza 1–3 minutos; respira despacio; cambia de pierna.","Ideal a media mañana o antes de comer si hay hinchazón."]'::jsonb,
    true
  ),
(
    'Puntos de acupresión — SP6 (Sanyinjiao)',
    'Bazo 6 · Sanyinjiao (“Cruce de los tres yin”). Versátil para sueño, estrés, digestión y molestias menstruales. Cuatro dedos por encima del maléolo interno, detrás de la tibia. Presión moderada 2–3 minutos. Tradicionalmente se evita en el embarazo. Evitar si estás embarazada. Técnica: 2–3 min. No sustituye consejo médico.',
    'Acupresión',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+SP6+Sanyinjiao+location',
    '/acupressure/sp6.svg',
    '["Localiza el maléolo interno; coloca cuatro dedos por encima a lo largo de la tibia.","Presiona hacia el borde posterior de la tibia hasta notar sensibilidad.","Mantén presión moderada 2–3 minutos con exhalaciones largas; ambas piernas.","A menudo se usa 30–60 minutos antes de dormir."]'::jsonb,
    true
  ),
(
    'Puntos de acupresión — LV3 (Taichong)',
    'Hígado 3 · Taichong (“Gran embestida”). Para estrés, irritabilidad, cefaleas y tensión menstrual. En el dorso del pie, en la depresión entre el 1.º y 2.º metatarsiano. Presión firme 1–2 minutos por pie. Técnica: 1–2 min. No sustituye consejo médico.',
    'Acupresión',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+LV3+Taichong+location',
    '/acupressure/lv3.svg',
    '["En el dorso del pie, desliza el dedo desde entre el gordo y el segundo hacia el tobillo hasta notar un hueco.","Presiona con firmeza 1–2 minutos (dolor sordo sí; dolor agudo no).","Cambia de pie; respira despacio.","Combina bien con LI4 si hay tensión de cabeza."]'::jsonb,
    true
  ),
(
    'Puntos de acupresión — Ren12 (Zhongwan)',
    'Vaso Concepción 12 · Zhongwan (“Cavidad media”). Punto digestivo central en la línea media del abdomen, a mitad de camino entre el esternón y el ombligo. Presión suave o círculos 1–2 minutos para hinchazón y confort gástrico. Técnica: 1–2 min. No sustituye consejo médico.',
    'Acupresión',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+Ren12+Zhongwan+location',
    '/acupressure/ren12.svg',
    '["Siéntate o túmbate; localiza la línea media entre esternón y ombligo.","Presiona con suavidad 1–2 minutos, o haz círculos lentos a favor de las agujas del reloj.","No presiones fuerte con el estómago lleno ni si hay dolor abdominal agudo.","Útil tras las comidas si hay hinchazón (cuando te sientas cómoda)."]'::jsonb,
    true
  ),
(
    'Puntos de acupresión — GB20 (Fengchi)',
    'Vesícula Biliar 20 · Fengchi (“Estanque del viento”). Dos huecos en la base del cráneo, a ambos lados del cuello. Excelente para tensión cervical por pantallas y cefaleas que empiezan atrás. Presiona hacia arriba y adentro 1–2 minutos. Técnica: 1–2 min. No sustituye consejo médico.',
    'Acupresión',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+GB20+Fengchi+location',
    '/acupressure/gb20.svg',
    '["Sube los pulgares por la nuca hasta la base del cráneo; busca los dos huecos blandos.","Presiona ambos pulgares hacia arriba y un poco hacia dentro; inclina la cabeza suavemente.","Mantén 1–2 minutos con los ojos cerrados y respiración lenta.","Ideal tras muchas horas delante de la pantalla."]'::jsonb,
    true
  ),
(
    'Puntos de acupresión — HT7 (Shenmen)',
    'Corazón 7 · Shenmen (“Puerta del espíritu”). Punto calmante para ansiedad e inicio del sueño. En el pliegue de la muñeca, lado del meñique, en el hueco junto al pisiforme. Presión ligera a moderada 1–2 minutos. Técnica: 1–2 min. No sustituye consejo médico.',
    'Acupresión',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+HT7+Shenmen+location',
    '/acupressure/ht7.svg',
    '["Palma arriba: localiza el pliegue de la muñeca del lado del meñique; nota el hueco.","Usa la yema del pulgar con presión ligera–moderada 1–2 minutos.","Inhala en 4 tiempos, exhala en 6.","Ideal como ritual antes de dormir."]'::jsonb,
    true
  ),
(
    'Puntos de acupresión — BL40 (Weizhong)',
    'Vejiga 40 · Weizhong (“Medio de mando”). Centro del pliegue detrás de la rodilla. Muy usado para tensión y espasmos lumbares. Presión con dos dedos 1–2 minutos por lado, sentada. Técnica: 1–2 min. No sustituye consejo médico.',
    'Acupresión',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+BL40+Weizhong+back+pain',
    '/acupressure/bl40.svg',
    '["Siéntate y alcanza detrás de la rodilla; encuentra el centro del pliegue entre los tendones.","Presiona con dos dedos 1–2 minutos.","Cambia de pierna; levántate y nota la zona lumbar.","No presiones sobre varices ni lesiones recientes."]'::jsonb,
    true
  ),
(
    'Puntos de acupresión — Yintang',
    'Yintang (“Sala de la impresión”). Línea media entre las cejas. Punto suave para calmar la mente, cefalea leve y bajar revoluciones antes de dormir. Presión gentil o círculos 1–2 minutos. Técnica: 1–2 min. No sustituye consejo médico.',
    'Acupresión',
    7,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+Yintang+third+eye+point',
    '/acupressure/yintang.svg',
    '["Siéntate o túmbate; coloca la yema entre las cejas en la línea media.","Presión suave o círculos pequeños 1–2 minutos.","Mantén la mandíbula relajada; alarga la exhalación.","Combina con HT7 antes de dormir si te ayuda."]'::jsonb,
    true
  ),
(
    'Puntos de acupresión — Set nocturno (ST36 · SP6 · Ren12 · LV3)',
    'Secuencia corta nocturna para digestión y calma: ST36 (digestión/energía), SP6 (sueño/bazo), Ren12 (estómago), LV3 (hígado/estrés). Unos 8–12 minutos en total. Omite SP6 si estás embarazada. Omite SP6 si estás embarazada. Técnica: 8–12 total min. No sustituye consejo médico.',
    'Acupresión',
    21,
    'youtube',
    'https://www.youtube.com/results?search_query=acupresion+ST36+SP6+Ren12+higado+3',
    '/acupressure/st36.svg',
    '["ST36 — 1–2 min por pierna (bajo la rodilla, tibia externa).","SP6 — 2 min por pierna (sobre el tobillo interno), salvo embarazo.","Ren12 — 1–2 min de círculos suaves en el abdomen.","LV3 — 1–2 min por pie (entre el gordo y el segundo).","Cierra con 5 respiraciones lentas."]'::jsonb,
    true
  );
