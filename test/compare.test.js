const Tick = require('../dist/tick');
const should = require('should');

describe('test compare', () => {
  it(`compare times`, () => {
    const b = new Tick('2018-05-01');
    b.isBefore('2018-06-01').should.be.ok;
    b.isAfter('2018-04-01').should.be.ok;
    b.isEqual('2018-05-01').should.be.ok;
  });
})
