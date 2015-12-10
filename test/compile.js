var should = require('should');
var fsdk = require('../index.js');
var helper = require('./helper');

describe('fsdk #compile', function () {

  before(helper.wipeOut);
  after(helper.wipeOut);

  it('should be have #compile', function () {
    should(fsdk).have.property('compile').which.is.a.Function();
  });

});