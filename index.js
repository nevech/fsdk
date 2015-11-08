var vfs = require('vinyl-fs');
var extend = require('util')._extend;
var parser = require('./lib/parser')

var fsdk = module.exports = {
  parse: parser.parse
};

fsdk.compile = function (options) {
  var options = extend({}, options);

  return vfs.src(options.src)
    .pipe(fsdk.parse(options))
    .pipe(vfs.dest(options.dest));
};