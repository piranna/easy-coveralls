const assert = require('assert')

const easyCoveralls = require('.')


it('test successful', function(done)
{
  const pkg =
  {
    main: 'test.js',
    scripts:
    {
      test: 'exit 0'
    }
  }

  easyCoveralls(pkg, function(error)
  {
    assert.strictEqual(error, 'Failed to parse string')

    done()
  })
})

it('test failure', function(done)
{
  const pkg =
  {
    main: 'test.js',
    scripts:
    {
      test: 'exit 1'
    }
  }

  easyCoveralls(pkg, function(error)
  {
    assert.strictEqual(error, 1)

    done()
  })
})

xit('test itself', function(done)
{
  const pkg =
  {
    main: 'test.js',
    scripts:
    {
      test: 'mocha'
    }
  }

  easyCoveralls(pkg, done)
})
