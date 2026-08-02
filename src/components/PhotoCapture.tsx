import { useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'

export function PhotoCapture({
  onCapture,
  label,
}: {
  onCapture: (dataUrl: string) => void
  label?: string
}) {
  const { t } = useI18n()
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const buttonLabel = label ?? t('addProgressPhoto')

  const onChange = (file: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result)
      setPreview(dataUrl)
      onCapture(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <button
        type="button"
        className="btn-secondary w-full"
        onClick={() => inputRef.current?.click()}
      >
        {buttonLabel}
      </button>
      {preview && (
        <img
          src={preview}
          alt={t('progressPreview')}
          className="mt-3 aspect-[4/3] w-full rounded-2xl object-cover ring-1 ring-ink/8"
        />
      )}
    </div>
  )
}
