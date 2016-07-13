#!/usr/bin/env node

const resolve = require('path').resolve

const easyCoveralls = require('.')


const PKG = require(resolve('package.json'))

const script = process.argv[2] || 'test'


easyCoveralls(PKG, script, function(error, code)
{
  if(error) console.trace(error)

  if(code) process.exit(code)
})
