#!/usr/bin/env node
/**
 * @fileoverview Puppeteer-based image fetcher for product URLs in Product-URLs.md
 * Renders pages (works better for Amazon), extracts primary image, and downloads to public/product-images.
 */

import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import puppeteer from 'puppeteer'

const ROOT = process.cwd()
const MD_PATH = path.join(ROOT, 'project_brainstorm', 'Product-URLs.md')
const OUT_DIR = path.join(ROOT, 'public', 'product-images')
const MAP_PATH = path.join(ROOT, 'public', 'product-images.json')

const ALLOWED_HOSTS = new Set([
  'amzn.to', 'www.amazon.com', 'amazon.com',
  'go.shopmy.us', 'shopmy.us',
  'fas.st',
  'cellcore.com', 'www.cellcore.com',
  'biopureus.com', 'www.biopureus.com',
  'mymedlab.com', 'www.mymedlab.com',
  'daveasprey.com', 'www.daveasprey.com',
])

async function readJsonIfExists(p) {
  try { const s = await fs.readFile(p, 'utf8'); return JSON.parse(s) } catch { return {} }
}

async function readUrlsFromMarkdown(mdPath) {
  const md = await fs.readFile(mdPath, 'utf8')
  const lines = md.split(/\r?\n/)
  const items = []
  const re = /^\*\s+([^:]+):\s*\[[^\]]+\]\(([^\)]+)\)/
  for (const line of lines) {
    const m = line.match(re)
    if (m) {
      const name = m[1].trim()
      const url = m[2].trim()
      items.push({ name, url })
    }
  }
  return items
}

function fileNameFor(url) {
  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 16)
  return hash
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function downloadWithPage(browser, imageUrl) {
  const page = await browser.newPage()
  try {
    const resp = await page.goto(imageUrl, { waitUntil: 'networkidle2', timeout: 60000 })
    if (!resp || !resp.ok()) throw new Error(`Image GET ${resp ? resp.status() : 'no response'}`)
    const buf = await resp.buffer()
    const ct = resp.headers()['content-type'] || ''
    let ext = '.jpg'
    if (ct.includes('png')) ext = '.png'
    else if (ct.includes('webp')) ext = '.webp'
    else if (ct.includes('jpeg') || ct.includes('jpg')) ext = '.jpg'
    else if (ct.includes('gif')) ext = '.gif'
    await page.close()
    return { buf, ext }
  } catch (e) {
    await page.close()
    throw e
  }
}

async function extractImageUrl(page) {
  // Try og:image
  let url = await page.$eval('meta[property="og:image"]', el => el.getAttribute('content')).catch(() => null)
  if (url) return url
  // twitter:image
  url = await page.$eval('meta[name="twitter:image"]', el => el.getAttribute('content')).catch(() => null)
  if (url) return url
  // Amazon landing image
  url = await page.$eval('#landingImage', el => el.getAttribute('src')).catch(() => null)
  if (url) return url
  // First product image
  url = await page.$eval('img', el => el.getAttribute('src')).catch(() => null)
  return url
}

;(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] })
  try {
    await ensureDir(OUT_DIR)
    const mapping = await readJsonIfExists(MAP_PATH)
    const entries = await readUrlsFromMarkdown(MD_PATH)
    const seenUrl = {}
    const failures = []

    for (const item of entries) {
      try {
        const parsed = new URL(item.url)
        if (!ALLOWED_HOSTS.has(parsed.hostname)) {
          console.warn(`[skip] Host not allowed: ${item.url}`)
          continue
        }
        const count = (seenUrl[item.url] = (seenUrl[item.url] || 0) + 1)
        const key = count === 1 ? item.url : `${item.url}#${count}`
        if (mapping[key]) {
          console.log(`[skip] Exists: ${key}`)
          continue
        }
        process.stdout.write(`Puppeteer fetching ${item.name} -> ${item.url} ... `)
        const page = await browser.newPage()
        try {
          await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36')
          await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' })
          await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 90000 })
          // Small delay to allow dynamic meta tags to settle
          await new Promise((r) => setTimeout(r, 1500))
          let imgUrl = await extractImageUrl(page)
          if (imgUrl) {
            const { buf, ext } = await downloadWithPage(browser, imgUrl)
            const base = fileNameFor(key) + ext
            const outPath = path.join(OUT_DIR, base)
            await fs.writeFile(outPath, buf)
            mapping[key] = `/product-images/${base}`
            console.log('ok')
          } else {
            // Fallback: page screenshot
            const base = fileNameFor(key) + '.png'
            const outPath = path.join(OUT_DIR, base)
            const buf = await page.screenshot({ type: 'png', fullPage: false })
            await fs.writeFile(outPath, buf)
            mapping[key] = `/product-images/${base}`
            console.log('screenshot')
          }
        } finally {
          await page.close()
        }
      } catch (e) {
        console.log('fail')
        failures.push({ url: item.url, error: e.message || String(e) })
      }
    }

    await fs.writeFile(MAP_PATH, JSON.stringify(mapping, null, 2), 'utf8')
    console.log(`Wrote mapping to ${MAP_PATH}`)
    if (failures.length) {
      console.log(`Failures (${failures.length}):`)
      for (const f of failures) console.log('-', f.url, '=>', f.error)
      process.exitCode = 1
    }
  } catch (err) {
    console.error('Fatal:', err)
    process.exit(1)
  } finally {
    await browser.close()
  }
})()
