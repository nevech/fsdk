var vfs = require('vinyl-fs');
var extend = require('util')._extend;
var parser = require('./lib/parser')

module.exports.parse = parser;

module.exports.compile = function (options) {
  var options = extend({}, options);

  vfs.src(options.glob)
    .pipe(parser(options))
    .pipe(vfs.dest(options.dest));
};

module.exports.compile({
  glob: './test_src/*.*',
  dest: './dist_src',
  mode: 'admin'
});