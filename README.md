[![Build Status](https://travis-ci.org/piranna/easy-coveralls.svg?branch=master)](https://travis-ci.org/piranna/easy-coveralls)
[![Coverage Status](https://coveralls.io/repos/github/piranna/easy-coveralls/badge.svg?branch=master)](https://coveralls.io/github/piranna/easy-coveralls?branch=master)

# easy-coveralls
Easily configure a npm module to generate and upload tests coverage statistics
to [Coveralls.io](https://coveralls.io/). This module is focused for projects
based on `mocha` as test library, pull-requests to add support for other testing
libraries are welcome.

And of course, it's executed against itself! :-D

## How to use `easy-coveralls` in 5 steps

1. be sure your tests are passing on your CI server and that you has enabled
   your project on [Coveralls.io](https://coveralls.io/).

2. add the `easy-coveralls` dependency to your project:
   ```sh
   npm install --save-dev easy-coveralls
   ```

3. add a script entry on your project `package.json` file for the test
   coverage:
   ```json
   {
     "scripts": {
       "coveralls": "easy-coveralls"
     }
   }
   ```

4. configure your CI server to exec `easy-coveralls`.
   * For `TravisCI` add to your project `.travis.yml` file:
   ```yaml
   after_script:
   - npm run coveralls
   ```
   * For `SemaphoreCI` just set `npm run coveralls` as a Post-Thread script.

5. there's no fifth step. Ta-Da! :-D

## Configuration options

Easy-coveralls will by default use the `main` entry in `package.json`or `index.js` in the project root to do coverage on. You can override this default by calling `easy-coveralls` with the `--main` or `-m` option:

`--main src/index.js` or `-m src/index.js`

The script entry used to detemine the command is by default `test`. You can override this by setting the `--script` or `-s` option.

`-s test:mocha`

The command executed is by default the `script['test']` entry of `package.json`. You can override this by setting the `--command` or `-c` option

`-c "junit test"`

Full config example:

`easy-coveralls -m src/index.js -s test:mocha`

You may even run coverage stats for different testing engines:

  ```json
   {
     "scripts": {
       "coveralls:mocha": "easy-coveralls -m src/index.js -s test:mocha",
       "coveralls:karma": "easy-coveralls -m src/index.js -s test:mocha"
     }
   }
  ```

## How it works

`easy-coveralls` internally do several tasks. First it creates an instrumented
version of your module or library and swap it with the original one. Later it
exec the tests as usual generating a `lcov` compatible report in the case your
tests works just by executing the `mocha` command and update the coverture
statistics to `Coveralls.io`, and finally it delete the instrumented library
and restore your original one. No less, no more.
