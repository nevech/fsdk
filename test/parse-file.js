var should = require('should');
var fs = require('fs');
var path = require('path');
var helper = require('./helper');
var fsdk = require('../index.js');

describe('fsdk #parseFile', function () {

  before(helper.wipeOut);
  after(helper.wipeOut);

  it('should be have #parseFile', function () {
    should(fsdk).have.property('parseFile').which.is.a.Function();
  });

  it('should compile file', function (done) {
    var stream = fsdk.compile({
      src: path.join(__dirname, '../examples/user-model.js'),
      dest: path.join(__dirname, './out/'),
      env: 'user-part'
    });

    stream.on('finish', function () {
      var isExists = fs.existsSync(helper.pathToUserModel);

      should(isExists).be.true();
      done();
    })
  });

  it('compiled file should be have #get, #update and not have #delete', function () {
    var UserModel = require(helper.pathToUserModel);

    should(UserModel.prototype).have.property('get');
    should(UserModel.prototype).have.property('update');
    should(UserModel.prototype).not.have.property('delete');
  });

});