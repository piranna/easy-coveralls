#!/usr/bin/env node

const resolve = require('path').resolve

const easyCoveralls = require('.')


const PKG = require(resolve('package.json'))

const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'main', alias: 'm', type: String },
  { name: 'command', alias: 'c', type: String },
  { name: 'script', alias: 'v', type: String, defaultOption: 'test' }
]

const options = commandLineArgs(optionDefinitions)

easyCoveralls(PKG, options, function(error)
{
  if(error)
  {
    console.trace(error)

    if(typeof code !== 'number') code = 1

    process.exit(code)
  }
})
