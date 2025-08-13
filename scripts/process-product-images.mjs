/**
 * @fileoverview Script to process all product images into uniform 400x400 squares with white backgrounds
 */

import fs from 'fs'
import path from 'path'
import { createCanvas, loadImage } from 'canvas'

const STANDARD_SIZE = 400
const BACKGROUND_COLOR = '#ffffff'
const INPUT_DIR = './public/product-images'
const OUTPUT_DIR = './public/product-images-processed'
const MAPPING_FILE = './public/product-images.json'

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

async function processImage(inputPath, outputPath) {
  try {
    const canvas = createCanvas(STANDARD_SIZE, STANDARD_SIZE)
    const ctx = canvas.getContext('2d')
    
    // Fill with white background
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, STANDARD_SIZE, STANDARD_SIZE)
    
    // Load and draw the image
    const image = await loadImage(inputPath)
    
    // Calculate dimensions to fit image while maintaining aspect ratio
    const scale = Math.min(
      (STANDARD_SIZE - 40) / image.width,  // 20px padding on each side
      (STANDARD_SIZE - 40) / image.height
    )
    
    const scaledWidth = image.width * scale
    const scaledHeight = image.height * scale
    
    // Center the image
    const x = (STANDARD_SIZE - scaledWidth) / 2
    const y = (STANDARD_SIZE - scaledHeight) / 2
    
    ctx.drawImage(image, x, y, scaledWidth, scaledHeight)
    
    // Save the processed image
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(outputPath, buffer)
    
    console.log(`✅ Processed: ${path.basename(inputPath)}`)
    return true
  } catch (error) {
    console.error(`❌ Failed to process ${inputPath}:`, error.message)
    return false
  }
}

async function main() {
  console.log('🎨 Processing product images to standard 400x400 squares...')
  
  // Read the current mapping
  let mapping = {}
  if (fs.existsSync(MAPPING_FILE)) {
    mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'))
  }
  
  const newMapping = {}
  let processed = 0
  let failed = 0
  
  // Process all images in the input directory
  if (fs.existsSync(INPUT_DIR)) {
    const files = fs.readdirSync(INPUT_DIR)
    
    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue
      
      const inputPath = path.join(INPUT_DIR, file)
      const outputPath = path.join(OUTPUT_DIR, file.replace(/\.(jpg|jpeg|webp)$/i, '.png'))
      
      const success = await processImage(inputPath, outputPath)
      if (success) {
        processed++
        // Update mapping to point to processed version
        const relativePath = `/product-images-processed/${path.basename(outputPath)}`
        
        // Find the original mapping key for this file
        for (const [key, value] of Object.entries(mapping)) {
          if (value.includes(file)) {
            newMapping[key] = relativePath
          }
        }
      } else {
        failed++
      }
    }
  }
  
  // Update the mapping file
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(newMapping, null, 2))
  
  console.log(`\n📊 Processing complete:`)
  console.log(`   ✅ Processed: ${processed} images`)
  console.log(`   ❌ Failed: ${failed} images`)
  console.log(`   📁 Output: ${OUTPUT_DIR}`)
  console.log(`   🗺️  Updated: ${MAPPING_FILE}`)
}

main().catch(console.error)
