# fsdk [![Build Status](https://travis-ci.org/nevech/fsdk.svg?branch=master)](https://travis-ci.org/nevech/fsdk)

Managing your front-end sdk.

## Usage

```js
var fsdk = require('fsdk');

fsdk.compile({
  src: './sdk/*.*',
  dest: './dist/',
  mode: 'user-part'
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

Example source file:

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

## API

### fsdk.compile(options)

#### options

*Required*  
Type: `object`

##### options.src
*Required*  
Type: `string`

##### options.dest
*Required*  
Type: `string`

##### options.mode
*Required*  
Type: `string`

### fsdk.parseFile(mode)

##### mode
*Required*  
Type: `string`

## License
[The MIT License](./LICENSE)
