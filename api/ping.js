import fs from 'fs'

const files = fs.readdirSync(process.cwd(), 'utf8');

module.exports = (req, res) => {
  res.json({ status: 'ok', files: files })
}
