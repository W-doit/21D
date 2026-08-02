
delete from public.remedies
where is_curated = true
  and category = 'AcupresiÃ³n'
  and title like 'Puntos de acupresiÃ³n%';

insert into public.remedies (
  title, description, category, expected_days_to_result,
  media_platform, media_url, image_url, steps, is_curated
) values
(
    'Puntos de acupresiÃ³n â€” LI4 (Hegu)',
    'Intestino Grueso 4 Â· Hegu (â€œValle de la uniÃ³nâ€). Punto clÃ¡sico para cefaleas tensionales, dolor facial y estrÃ©s. En el dorso de la mano, en el tejido entre pulgar e Ã­ndice. Presiona hacia el hueso del Ã­ndice hasta notar un dolor sordo. MantÃ©n 1â€“2 minutos por mano. Tradicionalmente se evita en el embarazo. Evitar si estÃ¡s embarazada. TÃ©cnica: 1â€“2 min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+LI4+Hegu+location',
    '/acupressure/li4.svg',
    '["Junta pulgar e Ã­ndice; localiza el punto mÃ¡s alto del mÃºsculo y luego relaja la mano.","Presiona con el pulgar contrario hacia el hueso del Ã­ndice (de qi: dolor sordo).","MantÃ©n 1â€“2 minutos respirando despacio; cambia de mano.","Repite 1â€“2 veces al dÃ­a si hay tensiÃ³n de cabeza."]'::jsonb,
    true
  ),
(
    'Puntos de acupresiÃ³n â€” PC6 (Neiguan)',
    'Pericardio 6 Â· Neiguan (â€œPaso internoâ€). El punto con mÃ¡s evidencia para nÃ¡useas, mareo y ansiedad. En el antebrazo interno, a unos tres dedos por encima del pliegue de la muÃ±eca, entre los dos tendones centrales. PresiÃ³n moderada 1â€“3 minutos. TÃ©cnica: 1â€“3 min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    7,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+PC6+Neiguan+nausea',
    '/acupressure/pc6.svg',
    '["Palma arriba: coloca tres dedos desde el pliegue de la muÃ±eca; PC6 queda justo encima.","Nota el surco entre los dos tendones centrales.","Presiona de forma moderada 1â€“3 minutos (o cÃ­rculos); ambas muÃ±ecas.","Ãštil antes de viajar o si hay nÃ¡useas."]'::jsonb,
    true
  ),
(
    'Puntos de acupresiÃ³n â€” ST36 (Zusanli)',
    'EstÃ³mago 36 Â· Zusanli (â€œTres millas de la piernaâ€). Apoya digestiÃ³n, energÃ­a e inmunidad. Cuatro dedos bajo la rÃ³tula, un dedo por fuera del borde de la tibia. PresiÃ³n firme 1â€“3 minutos por pierna. TÃ©cnica: 1â€“3 min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    21,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+ST36+Zusanli+location',
    '/acupressure/st36.svg',
    '["SiÃ©ntate con las piernas flexionadas; mide cuatro dedos bajo el borde inferior de la rÃ³tula.","DesplÃ¡zate un dedo hacia fuera de la tibia; busca sensibilidad.","Presiona con firmeza 1â€“3 minutos; respira despacio; cambia de pierna.","Ideal a media maÃ±ana o antes de comer si hay hinchazÃ³n."]'::jsonb,
    true
  ),
(
    'Puntos de acupresiÃ³n â€” SP6 (Sanyinjiao)',
    'Bazo 6 Â· Sanyinjiao (â€œCruce de los tres yinâ€). VersÃ¡til para sueÃ±o, estrÃ©s, digestiÃ³n y molestias menstruales. Cuatro dedos por encima del malÃ©olo interno, detrÃ¡s de la tibia. PresiÃ³n moderada 2â€“3 minutos. Tradicionalmente se evita en el embarazo. Evitar si estÃ¡s embarazada. TÃ©cnica: 2â€“3 min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+SP6+Sanyinjiao+location',
    '/acupressure/sp6.svg',
    '["Localiza el malÃ©olo interno; coloca cuatro dedos por encima a lo largo de la tibia.","Presiona hacia el borde posterior de la tibia hasta notar sensibilidad.","MantÃ©n presiÃ³n moderada 2â€“3 minutos con exhalaciones largas; ambas piernas.","A menudo se usa 30â€“60 minutos antes de dormir."]'::jsonb,
    true
  ),
(
    'Puntos de acupresiÃ³n â€” LV3 (Taichong)',
    'HÃ­gado 3 Â· Taichong (â€œGran embestidaâ€). Para estrÃ©s, irritabilidad, cefaleas y tensiÃ³n menstrual. En el dorso del pie, en la depresiÃ³n entre el 1.Âº y 2.Âº metatarsiano. PresiÃ³n firme 1â€“2 minutos por pie. TÃ©cnica: 1â€“2 min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+LV3+Taichong+location',
    '/acupressure/lv3.svg',
    '["En el dorso del pie, desliza el dedo desde entre el gordo y el segundo hacia el tobillo hasta notar un hueco.","Presiona con firmeza 1â€“2 minutos (dolor sordo sÃ­; dolor agudo no).","Cambia de pie; respira despacio.","Combina bien con LI4 si hay tensiÃ³n de cabeza."]'::jsonb,
    true
  ),
(
    'Puntos de acupresiÃ³n â€” Ren12 (Zhongwan)',
    'Vaso ConcepciÃ³n 12 Â· Zhongwan (â€œCavidad mediaâ€). Punto digestivo central en la lÃ­nea media del abdomen, a mitad de camino entre el esternÃ³n y el ombligo. PresiÃ³n suave o cÃ­rculos 1â€“2 minutos para hinchazÃ³n y confort gÃ¡strico. TÃ©cnica: 1â€“2 min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+Ren12+Zhongwan+location',
    '/acupressure/ren12.svg',
    '["SiÃ©ntate o tÃºmbate; localiza la lÃ­nea media entre esternÃ³n y ombligo.","Presiona con suavidad 1â€“2 minutos, o haz cÃ­rculos lentos a favor de las agujas del reloj.","No presiones fuerte con el estÃ³mago lleno ni si hay dolor abdominal agudo.","Ãštil tras las comidas si hay hinchazÃ³n (cuando te sientas cÃ³moda)."]'::jsonb,
    true
  ),
(
    'Puntos de acupresiÃ³n â€” GB20 (Fengchi)',
    'VesÃ­cula Biliar 20 Â· Fengchi (â€œEstanque del vientoâ€). Dos huecos en la base del crÃ¡neo, a ambos lados del cuello. Excelente para tensiÃ³n cervical por pantallas y cefaleas que empiezan atrÃ¡s. Presiona hacia arriba y adentro 1â€“2 minutos. TÃ©cnica: 1â€“2 min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+GB20+Fengchi+location',
    '/acupressure/gb20.svg',
    '["Sube los pulgares por la nuca hasta la base del crÃ¡neo; busca los dos huecos blandos.","Presiona ambos pulgares hacia arriba y un poco hacia dentro; inclina la cabeza suavemente.","MantÃ©n 1â€“2 minutos con los ojos cerrados y respiraciÃ³n lenta.","Ideal tras muchas horas delante de la pantalla."]'::jsonb,
    true
  ),
(
    'Puntos de acupresiÃ³n â€” HT7 (Shenmen)',
    'CorazÃ³n 7 Â· Shenmen (â€œPuerta del espÃ­rituâ€). Punto calmante para ansiedad e inicio del sueÃ±o. En el pliegue de la muÃ±eca, lado del meÃ±ique, en el hueco junto al pisiforme. PresiÃ³n ligera a moderada 1â€“2 minutos. TÃ©cnica: 1â€“2 min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+HT7+Shenmen+location',
    '/acupressure/ht7.svg',
    '["Palma arriba: localiza el pliegue de la muÃ±eca del lado del meÃ±ique; nota el hueco.","Usa la yema del pulgar con presiÃ³n ligeraâ€“moderada 1â€“2 minutos.","Inhala en 4 tiempos, exhala en 6.","Ideal como ritual antes de dormir."]'::jsonb,
    true
  ),
(
    'Puntos de acupresiÃ³n â€” BL40 (Weizhong)',
    'Vejiga 40 Â· Weizhong (â€œMedio de mandoâ€). Centro del pliegue detrÃ¡s de la rodilla. Muy usado para tensiÃ³n y espasmos lumbares. PresiÃ³n con dos dedos 1â€“2 minutos por lado, sentada. TÃ©cnica: 1â€“2 min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    14,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+BL40+Weizhong+back+pain',
    '/acupressure/bl40.svg',
    '["SiÃ©ntate y alcanza detrÃ¡s de la rodilla; encuentra el centro del pliegue entre los tendones.","Presiona con dos dedos 1â€“2 minutos.","Cambia de pierna; levÃ¡ntate y nota la zona lumbar.","No presiones sobre varices ni lesiones recientes."]'::jsonb,
    true
  ),
(
    'Puntos de acupresiÃ³n â€” Yintang',
    'Yintang (â€œSala de la impresiÃ³nâ€). LÃ­nea media entre las cejas. Punto suave para calmar la mente, cefalea leve y bajar revoluciones antes de dormir. PresiÃ³n gentil o cÃ­rculos 1â€“2 minutos. TÃ©cnica: 1â€“2 min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    7,
    'youtube',
    'https://www.youtube.com/results?search_query=acupressure+Yintang+third+eye+point',
    '/acupressure/yintang.svg',
    '["SiÃ©ntate o tÃºmbate; coloca la yema entre las cejas en la lÃ­nea media.","PresiÃ³n suave o cÃ­rculos pequeÃ±os 1â€“2 minutos.","MantÃ©n la mandÃ­bula relajada; alarga la exhalaciÃ³n.","Combina con HT7 antes de dormir si te ayuda."]'::jsonb,
    true
  ),
(
    'Puntos de acupresiÃ³n â€” Set nocturno (ST36 Â· SP6 Â· Ren12 Â· LV3)',
    'Secuencia corta nocturna para digestiÃ³n y calma: ST36 (digestiÃ³n/energÃ­a), SP6 (sueÃ±o/bazo), Ren12 (estÃ³mago), LV3 (hÃ­gado/estrÃ©s). Unos 8â€“12 minutos en total. Omite SP6 si estÃ¡s embarazada. Omite SP6 si estÃ¡s embarazada. TÃ©cnica: 8â€“12 total min. No sustituye consejo mÃ©dico.',
    'AcupresiÃ³n',
    21,
    'youtube',
    'https://www.youtube.com/results?search_query=acupresion+ST36+SP6+Ren12+higado+3',
    '/acupressure/st36.svg',
    '["ST36 â€” 1â€“2 min por pierna (bajo la rodilla, tibia externa).","SP6 â€” 2 min por pierna (sobre el tobillo interno), salvo embarazo.","Ren12 â€” 1â€“2 min de cÃ­rculos suaves en el abdomen.","LV3 â€” 1â€“2 min por pie (entre el gordo y el segundo).","Cierra con 5 respiraciones lentas."]'::jsonb,
    true
  );

