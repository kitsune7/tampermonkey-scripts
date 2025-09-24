import typescript from '@rollup/plugin-typescript'
import { globSync } from 'glob'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Function to extract UserScript metadata from source files
function extractUserscriptMeta(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8')
  const metaMatch = content.match(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/)
  return metaMatch ? metaMatch[0] : ''
}

// Get all top-level TypeScript files in src directory
const entries = globSync('src/*.ts').map((file) => {
  const name = path.basename(file, '.ts')
  const fullPath = fileURLToPath(new URL(file, import.meta.url))
  return { name, file, fullPath }
})

// Create input object for Rollup
const input = Object.fromEntries(entries.map(({ name, fullPath }) => [name, fullPath]))

export default {
  input,
  output: {
    dir: 'dist',
    format: 'iife',
    // Add the UserScript metadata as a banner for each output file
    banner(chunk) {
      // Find the corresponding source file for this chunk
      const entry = entries.find((e) => e.name === chunk.name)
      if (entry) {
        const meta = extractUserscriptMeta(entry.fullPath)
        // Add a newline after the metadata if it exists
        return meta ? meta + '\n' : ''
      }
      return ''
    },
  },
  plugins: [typescript()],
}
