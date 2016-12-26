# fsdk

[![NPM version](https://img.shields.io/npm/v/fsdk.svg)](https://www.npmjs.com/package/fsdk) [![Build Status](https://travis-ci.org/nevech/fsdk.svg?branch=master)](https://travis-ci.org/nevech/fsdk) [![Coverage Status](https://coveralls.io/repos/nevech/fsdk/badge.svg?branch=master&service=github)](https://coveralls.io/github/nevech/fsdk?branch=master)

Managing your front-end sdk. Cuts source code by environment.

## Install
```
npm install fsdk
```

## Usage

```js
var fsdk = require('fsdk');

fsdk.compile({
  src: './sdk/**/*.*',
  dest: './dist/',
  env: 'user-part'
});
```

or using with gulp:

```js
var gulp = require('gulp');
var fsdk = require('fsdk');

gulp.task('compileSDK', function () {
  return gulp.src('sdk/*.*')
    .pipe(fsdk.parseFile('user-part'))
    .pipe(gulp.dest('dist/sdk'))
});
```

Example source file (not good example):

```js
function User () {

}

User.prototype.get = function() {

};

User.prototype.update = function() {

};

// fsdk:start(admin-part)
User.prototype.delete = function(first_argument) {

};
// fsdk:end
```

Result:

```js
function User () {

}

User.prototype.get = function() {

};

User.prototype.update = function() {

};
```

#### Supported comments

- JS: `// fsdk:start(env)`
- CoffeeScript: `# fsdk:start(env)`

## API

### fsdk.compile(options)

#### options
Type: `object`

All options is *required*

##### options.src
Type: `string` or `array`

Glob or array of globs to read ([node-glob syntax](https://github.com/isaacs/node-glob)). [More info](https://github.com/gulpjs/vinyl-fs#srcglobs-opt)

##### options.dest
Type: `string`

The path (output folder) to write files to. [More info](https://github.com/gulpjs/vinyl-fs#destfolder-opt)


##### options.env
Type: `string`

Source code environment

### fsdk.parseFile(env)
Returns a [stream](https://nodejs.org/api/stream.html)

#### env
Type: `string`

Source code environment

## License
[The MIT License](./LICENSE)
