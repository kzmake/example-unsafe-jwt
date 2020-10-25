import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'
import jwt from 'jsonwebtoken'

const { serverRuntimeConfig } = getConfig()

const PUBLIC_KEY = fs.readFileSync(path.join(serverRuntimeConfig.PROJECT_ROOT, '_files', 'public_key'), 'utf8');

export default function handler(req, res) {
  try {
    var token = req.headers['x-token']
    if (!token) {
      throw new Error('cannot find x-token')
    }

    jwt.verify(token, PUBLIC_KEY)

    const { query: { name } } = req

    res.status(200).json({ message: `hello, ${name}` })
  } catch (err) {
    if (err.message == 'cannot find x-token') {
      res.status(400).json({
        code: 'RequiredParam',
        message: 'Request is missing a required header: x-token.'
      })
    } else {
      res.status(400).json({
        code: 'InvalidParam',
        message: `Requested token '${token}' is invalid: ${err.message}.`
      })
    }
  }
}
