import { useMemo, useState } from 'react'
import type { MediaPlatform } from '../types'
import { useI18n } from '../i18n/I18nProvider'

function youtubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.split('/').filter(Boolean)[0]
      return id?.split('?')[0] || null
    }
    if (u.pathname.startsWith('/embed/')) {
      return u.pathname.split('/')[2] || null
    }
    if (u.pathname.startsWith('/shorts/')) {
      return u.pathname.split('/')[2] || null
    }
    return u.searchParams.get('v')
  } catch {
    return null
  }
}

function isYoutubeSearch(url: string): boolean {
  try {
    const u = new URL(url)
    return (
      u.hostname.includes('youtube.com') &&
      (u.pathname.includes('/results') || u.searchParams.has('search_query'))
    )
  } catch {
    return false
  }
}

function searchQueryFromUrl(url: string): string | null {
  try {
    const u = new URL(url)
    return u.searchParams.get('search_query')
  } catch {
    return null
  }
}

function searchUrlFromTitle(title: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`
}

function thumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

export function VideoEmbed({
  platform,
  url,
  fallbackTitle,
}: {
  platform: MediaPlatform
  url: string
  fallbackTitle?: string
}) {
  const { t } = useI18n()
  const [playing, setPlaying] = useState(false)
  const [thumbBroken, setThumbBroken] = useState(false)

  const resolved = useMemo(() => {
    if ((!url || platform === 'none') && !fallbackTitle) return null

    if (platform !== 'youtube' && platform !== 'none' && url) {
      return { kind: 'outbound' as const, href: url, platform }
    }

    const effectiveUrl =
      url || (fallbackTitle ? searchUrlFromTitle(fallbackTitle) : '')
    if (!effectiveUrl && !fallbackTitle) return null

    const search = effectiveUrl ? isYoutubeSearch(effectiveUrl) : Boolean(fallbackTitle)
    const query =
      (effectiveUrl && searchQueryFromUrl(effectiveUrl)) ||
      fallbackTitle ||
      ''
    const id = search || !effectiveUrl ? null : youtubeId(effectiveUrl)
    const openHref = id
      ? `https://www.youtube.com/watch?v=${id}`
      : effectiveUrl || (fallbackTitle ? searchUrlFromTitle(fallbackTitle) : '')

    if (id) {
      return {
        kind: 'video' as const,
        id,
        openHref,
        embedSrc: `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`,
      }
    }

    // Preview via YouTube's search-embed player (real matching videos, not invented IDs)
    if (query) {
      return {
        kind: 'search' as const,
        query,
        openHref:
          openHref ||
          `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
        embedSrc: `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`,
      }
    }

    return openHref
      ? { kind: 'outbound' as const, href: openHref, platform: 'youtube' as const }
      : null
  }, [platform, url, fallbackTitle])

  if (!resolved) return null

  if (resolved.kind === 'outbound') {
    const label =
      resolved.platform === 'tiktok'
        ? t('watchTiktok')
        : resolved.platform === 'instagram'
          ? t('watchInstagram')
          : resolved.platform === 'youtube'
            ? t('watchYoutube')
            : t('openVideo')
    return <OutboundLink href={resolved.href} label={label} />
  }

  if (resolved.kind === 'search') {
    return (
      <div className="space-y-2">
        <div className="overflow-hidden rounded-2xl bg-ink ring-1 ring-ink/8">
          <div className="relative aspect-video">
            <iframe
              title={t('routineVideo')}
              className="absolute inset-0 h-full w-full"
              src={resolved.embedSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-ink/45">{t('videoPreviewHint')}</p>
          <a
            href={resolved.openHref}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-sm font-medium text-sage-deep"
          >
            {t('watchYoutube')} ↗
          </a>
        </div>
      </div>
    )
  }

  // Concrete video ID — thumbnail preview, tap to play embed
  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-2xl bg-ink ring-1 ring-ink/8">
        <div className="relative aspect-video">
          {playing ? (
            <iframe
              title={t('routineVideo')}
              className="absolute inset-0 h-full w-full"
              src={resolved.embedSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              className="absolute inset-0 group"
              onClick={() => setPlaying(true)}
              aria-label={t('playPreview')}
            >
              {!thumbBroken ? (
                <img
                  src={thumbnailUrl(resolved.id)}
                  alt=""
                  className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
                  onError={() => setThumbBroken(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-ink text-sm text-mist/70">
                  YouTube
                </div>
              )}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition group-hover:scale-105">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
      <a
        href={resolved.openHref}
        target="_blank"
        rel="noreferrer"
        className="inline-block text-sm font-medium text-sage-deep"
      >
        {t('watchYoutube')} ↗
      </a>
    </div>
  )
}

function OutboundLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="surface flex items-center justify-between gap-3 !py-4 text-sm font-medium text-ink"
    >
      <span>{label}</span>
      <span className="text-ink/40">↗</span>
    </a>
  )
}
