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

// Export an array of separate configurations, one per source file
// This prevents code-splitting and allows IIFE format
export default entries.map(({ name, fullPath }) => ({
  input: fullPath,
  output: {
    file: `dist/${name}.js`,
    format: 'iife',
    // Add the UserScript metadata as a banner for each output file
    banner: () => {
      const meta = extractUserscriptMeta(fullPath)
      // Add a newline after the metadata if it exists
      return meta ? meta + '\n' : ''
    },
  },
  plugins: [typescript()],
}))
