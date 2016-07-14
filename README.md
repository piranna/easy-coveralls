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
   your project on `Coveralls.io`.

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

4. configure your CI server to exec `easy-coveralls`. For `TravisCI` add to
   your project `.travis.yml` file:
   ```yaml
   after_script:
   - npm run coveralls
   ```
   For `SemaphoreCI` just set `npm run coveralls` as a Post-Thread script.

5. Ta-Da! :-D

## How it works

First create an instrumented version of your module or library and swap it with
the original one. Later exec the tests as usual generating a `lcov` compatible
report in the case your tests works just by executing the `mocha` command and
update the coverture statistics to `Coveralls.io`, and finally delete the
instrumented library and restore your original one. No less, no more.
