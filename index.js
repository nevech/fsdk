var vfs = require('vinyl-fs');
var map = require('map-stream');
var through = require('through2');
var extend = require('util')._extend;

var startRE = /\n?.*fsdk:start(\(.*\)).*\n/i;
var endRE = /\n.*fsdk:end.*(\n)?/i;

function parseFile (options) {
  var options = extend({}, options);

  return through.obj(function (file, enc, callback) {
    if (!file.isBuffer()) {
      return callback(null, file);
    }

    var content = parseContents(file.contents.toString(enc), options.mode);

    file.content = new Buffer(content, enc);

    callback(null, file);
  });
}

function parseContents (contents, mode) {
  var startMatch = contents.match(startRE);
  var endMatch = contents.match(endRE);

  if (startMatch === null) {
    return contents;
  }

  var modes = parseModes(startMatch[0]);

  if (modes.length || modes.indexOf(mode) === -1) {
    contents = cutContent(contents, startMatch, endMatch);
  }

  return parseContents(contents, mode);
}

function parseModes (str) {
  if (!/\(.*\)/.test(str)) {
    return [];
  }

  var modesStr = str
    .replace(startRE, '$1')
    .replace('(', '')
    .replace(')', '');

  return modesStr.split(',');
}

function cutContent (contents, startMatch, endMatch) {
  var startIndex = startMatch.index;
  var endIndex = contents.length;

  if (endMatch) {
    endIndex = endMatch.index + endMatch[0].length;
  }

  var startContents = contents.slice(0, startIndex);
  var endContents = contents.slice(endIndex);

  return startContents + endContents;
}

function compile (options) {
  var options = extend({}, options);

  vfs.src(options.glob)
    .pipe(parseFile(options))
    .pipe(vfs.dest(options.dest));
}

compile({
  glob: './test_src/*.*',
  dest: './dist_src',
  mode: 'admin'
});