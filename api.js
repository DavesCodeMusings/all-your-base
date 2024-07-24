#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { createServer } from 'https'
import express from 'express'
const app = express()
const port = 2101
const baseFile = 'data/base.json'

var base = []

try {
  base = JSON.parse(readFileSync(baseFile))
}
catch (ex) {
  console.warn(ex.message, 'Creating sample data instead.')
  base[0] = {
    'name': 'Main Base',
    'x': -764,
    'y': 68,
    'z': 231,
    'description': 'Modern two-story with eco-friendly rooftop garden and free range animals. Deep mine, underwater observatory, nether portal, and more.'
  }
  writeFileSync(baseFile, JSON.stringify(base, null, 2))
}

process.on('SIGHUP', () => {
  console.log('Refreshing data from file.')
  base = JSON.parse(readFileSync(baseFile))
})

app.use(express.static('client'))
app.use(express.urlencoded({extended: false}))

app.get('/base', (req, res) => {
  res.send(base)
})

app.post('/base', (req, res) => {
  console.debug(req.header('Content-Type'))
  console.debug(req.body)

  let newBase = {}
  newBase.name = req.body.name.trim()
  let [x, y, z] = req.body.coordinates.split(',')
  newBase.x = Math.round(parseFloat(x.trim()))
  newBase.y = Math.round(parseFloat(y.trim()))
  newBase.z = Math.round(parseFloat(z.trim()))
  newBase.description = req.body.description.charAt(0).toUpperCase() + req.body.description.slice(1);
  if (newBase.description.slice(-1) != '.') {
    newBase.description += '.'
  }
  base.push(newBase)
  writeFileSync(baseFile, JSON.stringify(base, null, 2))
  res.redirect('/')
})

try {
  let tlsCert = readFileSync('server.crt')
  let tlsKey = readFileSync('server.key')
  createServer({ cert: tlsCert, key: tlsKey }, app).listen(port, () => {
    console.log(`All your base are listening on TLS port: ${port}`)
  })
}
catch (ex) {
  console.warn('Missing or invalid TLS certificate. Running unencrypted.\n' + ex.message)
  app.listen(port, () => {
    console.log(`All your base are listening on port: ${port}`)
  })
}
