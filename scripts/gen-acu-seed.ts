import { writeFileSync } from 'node:fs'
import { ACUPRESSURE_CURATED } from '../src/data/curatedAcupressure.ts'

const esc = (s: string) => s.replace(/'/g, "''")

const values = ACUPRESSURE_CURATED.map((c) => {
  const desc =
    c.descriptionEs +
    (c.cautionEs ? ` ${c.cautionEs}` : '') +
    ` Técnica: ${c.pressMinutes} min. No sustituye consejo médico.`
  const steps = JSON.stringify(c.stepsEs)
  return `('${esc(c.titleEs)}','${esc(desc)}','${esc(c.categoryEs)}',${c.expectedDaysToResult},'${c.mediaPlatform}','${esc(c.mediaUrl)}','${c.imageUrl}','${esc(steps)}'::jsonb,true)`
}).join(',\n')

const sql = `delete from public.remedies where is_curated = true and category = 'Acupresión';
insert into public.remedies (
  title, description, category, expected_days_to_result,
  media_platform, media_url, image_url, steps, is_curated
) values
${values};
`

writeFileSync(new URL('./seed_acupressure.sql', import.meta.url), sql)
console.log('wrote seed_acupressure.sql', ACUPRESSURE_CURATED.length)
