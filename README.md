[![Coverage Status](https://coveralls.io/repos/github/piranna/easy-coveralls/badge.svg?branch=master)](https://coveralls.io/github/piranna/easy-coveralls?branch=master)

# easy-coveralls
Easily configure a npm module to generate and upload tests coverage statistics
to [Coveralls.io](https://coveralls.io/)

This module is focused for projects based on `mocha` that use TravisCI as
continuos integration server.


## How to use `easy-coveralls` in 5 steps

1. be sure your tests are passing on `TravisCI` and has enabled your project on
   `Coveralls.io`.

2. add the `easy-coveralls` dependency to your project:
```sh
npm install --save-dev easy-coveralls
```

3. add a script entry on your project `package.json` file for the test coverage:

```json
{
  "scripts": {
    "coveralls": "easy-coveralls"
  }
}
```

4. configure your project `.travis.yml` file to exec `easy-coveralls`:

```yaml
after_script:
- npm run coveralls
```

5. Ta-Da! :-D
