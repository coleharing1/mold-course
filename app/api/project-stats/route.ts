import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

async function countLinesInFile(filePath: string): Promise<number> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return content.split('\n').length
  } catch {
    return 0
  }
}

async function getFilesRecursively(dir: string): Promise<string[]> {
  const files: string[] = []

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      // Skip node_modules, .git, .next, and other build directories
      if (
        entry.name.startsWith('.') ||
        entry.name === 'node_modules' ||
        entry.name === 'dist' ||
        entry.name === 'build' ||
        entry.name === '.next'
      ) {
        continue
      }

      if (entry.isDirectory()) {
        const subFiles = await getFilesRecursively(fullPath)
        files.push(...subFiles)
      } else if (
        entry.isFile() &&
        (entry.name.endsWith('.ts') ||
          entry.name.endsWith('.tsx') ||
          entry.name.endsWith('.js') ||
          entry.name.endsWith('.jsx') ||
          entry.name.endsWith('.css') ||
          entry.name.endsWith('.mdx'))
      ) {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }

  return files
}

export async function GET() {
  try {
    const projectRoot = process.cwd()

    // Get all relevant files
    const files = await getFilesRecursively(projectRoot)

    // Count lines in all files
    let totalLines = 0
    let fileCount = 0
    const filesByType: Record<string, number> = {}

    for (const file of files) {
      const lines = await countLinesInFile(file)
      totalLines += lines
      fileCount++

      const ext = path.extname(file)
      filesByType[ext] = (filesByType[ext] || 0) + 1
    }

    // Count specific directories
    const componentsDir = path.join(projectRoot, 'components')
    const componentsFiles = await getFilesRecursively(componentsDir)

    const appDir = path.join(projectRoot, 'app')
    const appFiles = await getFilesRecursively(appDir)

    const contentDir = path.join(projectRoot, 'content')
    const contentFiles = await getFilesRecursively(contentDir)

    // Get last commit info (if git is available)
    let lastCommitTime = null
    try {
      // Dynamic imports to avoid ESLint errors
      const { exec } = await import('child_process')
      const { promisify } = await import('util')
      const execAsync = promisify(exec)
      const { stdout } = await execAsync('git log -1 --format=%cI')
      lastCommitTime = stdout.trim()
    } catch {
      // Git not available or not a git repo
    }

    return NextResponse.json({
      linesOfCode: totalLines,
      totalFiles: fileCount,
      filesByType,
      componentsCount: componentsFiles.length,
      pagesCount: appFiles.filter((f) => f.includes('/app/') && f.endsWith('page.tsx')).length,
      contentFiles: contentFiles.length,
      lastUpdate: new Date().toISOString(),
      lastCommit: lastCommitTime,
    })
  } catch (error) {
    console.error('Error generating project stats:', error)
    return NextResponse.json({ error: 'Failed to generate project stats' }, { status: 500 })
  }
}
