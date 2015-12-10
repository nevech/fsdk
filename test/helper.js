var rimraf = require('rimraf');
var path = require('path');

module.exports = {
  wipeOut: wipeOut,
  pathToUserModel: path.join(__dirname, './out/user-model.js')
};

function wipeOut (done) {
  rimraf(path.join(__dirname, './out/'), done);
}