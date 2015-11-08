var through = require('through2');
var extend = require('util')._extend;

var startRE = /\n?.*fsdk:start(\(.+\)).*\n/i;
var endRE = /\n.*fsdk:end.*(\n)?/i;
var groupMode = '$1';

module.exports = function (options) {
  var options = extend({}, options);

  function Parser (file, enc, callback) {
    if (!file.isBuffer()) {
      return callback(null, file);
    }

    var compiled = parseContents(file.contents.toString(), options.mode);

    file.contents = new Buffer(compiled);

    callback(null, file);
  };

  return through.obj(Parser);
}

function parseContents (content, mode, startIndex) {
  var startIndex = startIndex || 0;
  var str = content.slice(startIndex, content.length);

  var startMatch = str.match(startRE);
  var endMatch = str.match(endRE);

  if (startMatch === null) {
    return content;
  }

  var startSliceIndex = startMatch.index + startIndex;
  var endSliceIndex = content.length;

  if (endMatch !== null) {
    endSliceIndex = endMatch.index + endMatch[0].length  + startIndex;
  }

  var detectedModes = parseModes(startMatch[0]);

  if (detectedModes.indexOf(mode) === -1) {
    content = cutContent(content, startSliceIndex, endSliceIndex);
    startIndex = startSliceIndex;
  } else {
    startIndex = endSliceIndex;
  }

  return parseContents(content, mode, startIndex);
}

function parseModes (str) {
  var modesStr = str
    .replace(startRE, groupMode)
    .replace('(', '')
    .replace(')', '');

  return modesStr.split(',');
}

function cutContent (content, startIndex, endIndex) {
  var startContents = content.slice(0, startIndex);
  var endContents = content.slice(endIndex);

  return startContents + endContents;
}