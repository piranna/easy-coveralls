const child_process = require('child_process')
const resolve       = require('path').resolve

const fs         = require('fs-extra')
const jscoverage = require('jscoverage')


function onexit(cmd, code, signal)
{
  if(code)   console.error(cmd,'exited with code:',code)
  if(signal) console.error(cmd,'exited with signal:',signal)
}

function spawn()
{
  var cmd = arguments[0]

  var cp = child_process.spawn.apply(child_process, arguments)
  .on('error', console.error.bind(console, cmd,'has errored:'))
  .on('exit', onexit.bind(null, cmd))

  cp.stderr.pipe(process.stderr)

  return cp
}


function easyCoveralls(pkg, script, callback)
{
  fs.stat(resolve(pkg.main || 'index.js'), function(err, stats)
  {
    if(err) return callback(err)

    if(stats.isDirectory())
    {
      var coverage = jscoverage.processDir

      var LIB  = 'lib'
      var COV  = 'lib_cov'
      var ORIG = 'lib_orig'
    }
    else
    {
      var coverage = jscoverage.processFile

      var LIB  = 'index.js'
      var COV  = 'index_cov.js'
      var ORIG = 'index_orig.js'
    }

    function cleanUp(code)
    {
      // Restore original not-instrumented library
      fs.remove(LIB, function(error)
      {
        if(error) console.trace(error)

        fs.move(ORIG, LIB, {clobber: true}, function(error)
        {
          callback(error, code)
        })
      })
    }

    // Generate instrumented library
    coverage(LIB, COV)

    // Swap original library for instrumented one
    fs.move(LIB, ORIG, {clobber: true}, function(error)
    {
      if(error) console.trace(error)

      fs.move(COV, LIB, function(error)
      {
        if(error) console.trace(error)

        // Exec test and fetch coverage data
        child_process.execFile(pkg.scripts[script], function(error)
        {
          if(error)
          {
            console.trace(error)
            return cleanUp(1)
          }

          // Create and upload new coverage data
          const LCOV_FILE='reports/'+pkg.name+'.lcov'

          fs.createReadStream(LCOV_FILE).pipe(spawn('coveralls').stdin)
        })
        .on('exit', function(code, signal)
        {
          onexit('test', code, signal)
          cleanUp(code)
        })
      })
    })
  })
}


module.exports = easyCoveralls
