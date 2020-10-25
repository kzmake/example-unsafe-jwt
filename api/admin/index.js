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

    const payload = jwt.verify(token, PUBLIC_KEY)

    var isAdmin = payload['is_admin']
    if (!isAdmin) {
      throw new Error('is not admin')
    }

    res.status(200).json({
      message: 'i am admin',
      secret: 'passw0rd1234',
    })
  } catch (err) {
    if (err.message == 'cannot find x-token') {
      res.status(400).json({
        code: 'RequiredParam',
        message: 'Request is missing a required header: x-token.'
      })
    } else if (err.message == 'jwt signature is required') {
      res.status(400).json({
        code: 'InvalidParam',
        message: `Requested token '${token}' is invalid: ${err.message}.`
      })
    } else {
      res.status(401).json({
        code: 'Unauthorized',
        message: `User is not authorized to access this resource: payload: {"is_admin": ${isAdmin}}.`
      })
    }
  }
}
