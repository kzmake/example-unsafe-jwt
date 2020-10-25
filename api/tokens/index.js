import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'
import jwt from 'jsonwebtoken'

const { serverRuntimeConfig } = getConfig()

const PRIVATE_KEY = fs.readFileSync(path.join(serverRuntimeConfig.PROJECT_ROOT, '_files', 'private_key'), 'utf8');

const PAYLOAD = { is_admin: false }

export default function handler(req, res) {
  res.json({ token: jwt.sign(PAYLOAD, PRIVATE_KEY, { algorithm: 'RS256' }) })
}
