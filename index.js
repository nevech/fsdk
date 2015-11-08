var vfs = require('vinyl-fs');
var extend = require('util')._extend;
var parser = require('./lib/parser')

var fsdk = module.exports.parse = {
  parse: parser
};

fsdk.compile = function (options) {
  var options = extend({}, options);

  vfs.src(options.src)
    .pipe(parser(options))
    .pipe(vfs.dest(options.dest));
};