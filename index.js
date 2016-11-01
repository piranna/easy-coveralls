const cp      = require('child_process')
const resolve = require('path').resolve

const coveralls  = require('coveralls').handleInput
const fs         = require('fs-extra')
const jscoverage = require('jscoverage')


/**
 * @param {Object} pkg
 * @param {string} [scriptName='test']
 * @param {Function} callback
 */
function easyCoveralls(pkg, options, callback)
{
  let scriptName = options.script

  if(scriptName instanceof Function)
  {
    callback   = scriptName
    scriptName = 'test'
  }


  const LIB = resolve(options.main || pkg.main || 'index.js')
  const command = options.command || pkg.scripts[scriptName]


  fs.stat(LIB, function(err, stats)
  {
    if(err) return callback(err)

    if(stats.isDirectory())
    {
      var coverage = jscoverage.processDir

      var COV  = LIB+'_cov'
      var ORIG = LIB+'_orig'
    }
    else
    {
      var coverage = jscoverage.processFile

      var COV  = LIB+'_cov.js'
      var ORIG = LIB+'_orig.js'
    }

    /**
     * Restore original not-instrumented library
     */
    function restoreLib(err1)
    {
      fs.move(ORIG, LIB, {clobber: true}, function(err2)
      {
        callback(err1 || err2)
      })
    }

    function execResult(error, stdout, stderr)
    {
      // If there has not been an error, create and upload new coverage data
      if(!error) return coveralls(stdout, restoreLib)

      // There has been an error, notify it
      console.error(error)

      const code   = error.code
      const signal = error.signal

      if(code)   console.error('test exited with code:'  , code)
      if(signal) console.error('test exited with signal:', signal)

      restoreLib(code || signal)
    }

    // Generate instrumented library
    coverage(LIB, COV, function(error)
    {
      if(error) return restoreLib(error)

      // Swap original library for instrumented one
      fs.move(LIB, ORIG, {clobber: true}, function(error)
      {
        if(error) console.trace(error)

        fs.move(COV, LIB, function(error)
        {
          if(error) console.trace(error)

          // Exec test and fetch coverage data
          if(command !== 'mocha') return cp.exec(command, execResult)

          cp.execFile(command, ['-R', 'mocha-lcov-reporter'], execResult)
        })
      })
    })
  })
}


module.exports = easyCoveralls
