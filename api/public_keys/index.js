import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

const PUBLIC_KEY = fs.readFileSync(path.join(serverRuntimeConfig.PROJECT_ROOT, '_files', 'public_key'), 'utf8');

export default function handler(req, res) {
  res.json({ public_key: PUBLIC_KEY })
}
