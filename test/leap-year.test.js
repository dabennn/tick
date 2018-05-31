const Tick = require('../dist/tick');
const should = require('should');

describe('test isLeapYear', () => {
  it(`current year is leap year`, () => {
    Tick.isLeapYear('2018').should.be.false();
    Tick.isLeapYear(2016).should.be.true();
    Tick.isLeapYear('2000').should.be.true();
    Tick.isLeapYear(1900).should.be.false();
  });
})
