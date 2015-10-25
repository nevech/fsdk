var vfs = require('vinyl-fs');
var map = require('map-stream');

var mode = 'admin';

function parseFile(file, callback) {
  if (!file.isBuffer()) {
    return callback(null, file);
  }

  var contents = parseContents(file.contents.toString(), mode);

  file.contents = new Buffer(contents, 'utf-8');

  callback(null, file);
}

function parseContents(contents, mode) {
  var startMatch = contents.match(/(\n)?.*fsdk:start.*\n/i);
  var endMatch = contents.match(/\n.*fsdk:end.*(\n)?/i);

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

  var modesStr = str.replace(/\n?.*\((.*)\).*\n?/, '$1');
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

vfs.src('./test_src/*.*')
  .pipe(map(parseFile))
  .pipe(vfs.dest('./dist_src'));