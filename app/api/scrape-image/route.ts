/**
 * @fileoverview API route to scrape primary product images from external URLs.
 * Extracts og:image/twitter:image or known selectors and returns an absolute URL.
 */

import { NextResponse } from 'next/server'

const ALLOWED_HOSTS = new Set([
  'amzn.to',
  'www.amazon.com',
  'amazon.com',
  'go.shopmy.us',
  'shopmy.us',
  'fas.st',
  'cellcore.com',
  'www.cellcore.com',
  'biopureus.com',
  'www.biopureus.com',
  'mymedlab.com',
  'www.mymedlab.com',
  'daveasprey.com',
  'www.daveasprey.com',
])

function normalizeUrl(url: string): URL | null {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

function absolutize(possiblyRelativeUrl: string, baseUrl: string): string {
  try {
    const u = new URL(possiblyRelativeUrl, baseUrl)
    return u.href
  } catch {
    return possiblyRelativeUrl
  }
}

function extractImageFromHtml(html: string, finalUrl: string): string | null {
  // og:image
  const ogMatch = html.match(
    /<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i
  )
  if (ogMatch?.[1]) return absolutize(ogMatch[1], finalUrl)

  // twitter:image
  const twMatch = html.match(
    /<meta[^>]+name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i
  )
  if (twMatch?.[1]) return absolutize(twMatch[1], finalUrl)

  // link rel=image_src
  const linkMatch = html.match(/<link[^>]+rel=["']image_src["'][^>]*href=["']([^"']+)["'][^>]*>/i)
  if (linkMatch?.[1]) return absolutize(linkMatch[1], finalUrl)

  // Amazon-specific: landingImage
  const landingMatch = html.match(/id=["']landingImage["'][^>]*src=["']([^"']+)["']/i)
  if (landingMatch?.[1]) return absolutize(landingMatch[1], finalUrl)

  // Fallback: first img src
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
  if (imgMatch?.[1]) return absolutize(imgMatch[1], finalUrl)

  return null
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const target = searchParams.get('url')
  if (!target) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  const parsed = normalizeUrl(target)
  if (!parsed) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 400 })
  }

  try {
    const res = await fetch(target, {
      // Follow redirects (e.g., amzn.to → amazon.com)
      redirect: 'follow',
      headers: {
        // Pretend to be a browser to increase chance of getting proper HTML/meta tags
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream responded with ${res.status}` }, { status: 502 })
    }

    const finalUrl = res.url
    const html = await res.text()
    const imageUrl = extractImageFromHtml(html, finalUrl)

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Basic caching headers (60 minutes)
    return NextResponse.json(
      { imageUrl },
      {
        headers: {
          'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 500 })
  }
}
