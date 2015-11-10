var through = require('through2');
var cutSubstr = require('cut-substring');
var extend = require('util')._extend;

var startRE = /\n?.*fsdk:start(\(.+\)).*\n/i;
var endRE = /\n.*fsdk:end.*(\n)?/i;
var groupMode = '$1';

module.exports.parse = function (options) {
  var options = extend({}, options);

  function Parser (file, enc, callback) {
    if (!file.isBuffer()) {
      return callback(null, file);
    }

    var compiled = parseContents(file.contents.toString(), options.mode);

    file.contents = new Buffer(compiled);

    callback(null, file);
  }

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

  var beginCut = startMatch.index + startIndex;
  var endCut = content.length;

  if (endMatch !== null) {
    endCut = endMatch.index + endMatch[0].length  + startIndex;
  }

  var modes = getModes(startMatch[0]);

  if (modes.indexOf(mode) === -1) {
    content = cutSubstr(content, beginCut, endCut);
    startIndex = beginCut;
  } else {
    startIndex = endCut;
  }

  return parseContents(content, mode, startIndex);
}

function getModes (str) {
  var modesStr = str
    .replace(startRE, groupMode)
    .replace('(', '')
    .replace(')', '');

  return modesStr.split(',');
}
