var vfs = require('vinyl-fs');
var extend = require('util')._extend;
var parser = require('./lib/parser')

module.exports = {
  parseFile: parser.parseFile,
  compile: compile
};

function compile (options) {
  var options = extend({}, options);

  return vfs.src(options.src)
    .pipe(parser.parseFile(options.mode))
    .pipe(vfs.dest(options.dest));
}
