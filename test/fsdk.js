var should = require('should');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var fsdk = require('../index.js');
var pathToUserModel = path.join(__dirname, './out/user-model.js');

var wipeOut = function (done) {
  rimraf(path.join(__dirname, './out/'), done)
};

describe('fsdk', function () {

  before(wipeOut);
  after(wipeOut);

  it('should be have #parse', function () {
    should(fsdk).have.property('parse').which.is.a.Function();
  });

  it('should be have #compile', function () {
    should(fsdk).have.property('compile').which.is.a.Function();
  });

  it('should compile file', function (done) {
    var stream = fsdk.compile({
      src: path.join(__dirname, './user-model.js'),
      dest: path.join(__dirname, './out/'),
      mode: 'user-part'
    });

    stream.on('finish', function () {
      var isExists = fs.existsSync(pathToUserModel);

      should(isExists).be.true();
      done();
    })
  });

  it('compiled file should be have #get, #update and not have #delete', function () {
    var UserModel = require(pathToUserModel);

    should(UserModel.prototype).have.property('get');
    should(UserModel.prototype).have.property('update');
    should(UserModel.prototype).not.have.property('delete');
  });

});