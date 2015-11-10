var vfs = require('vinyl-fs');
var extend = require('util')._extend;
var parser = require('./lib/parser')

module.exports = {
  parse: parser.parse,
  compile: compile
};

function compile (options) {
  var options = extend({}, options);

  return vfs.src(options.src)
    .pipe(parser.parseFile(options))
    .pipe(vfs.dest(options.dest));
}