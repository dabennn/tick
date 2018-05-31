const Tick = require('../dist/tick');
const should = require('should');

describe('test offset', () => {
  it(`calculate time before '2018-05-01'`, () => {
    new Tick('2018-05-01').offset('-1Y').getTime().should.be.equal(new Date('2017-05-01 00:00:00').getTime()).and.be.a.Number();
    new Tick('2018-05-01').offset('-1Y13M').getTime().should.be.equal(new Date('2016-04-01 00:00:00').getTime()).and.be.a.Number();
    new Tick('2018-05-01').offset('-1Y10D').getTime().should.be.equal(new Date('2017-04-21 00:00:00').getTime()).and.be.a.Number();
    new Tick('2018-05-01').offset('-1M5D1h50m20s').getTime().should.be.equal(new Date('2018-03-26 22:09:40').getTime()).and.be.a.Number();
    new Tick('2018-05-01').offset('-1M50D36h300m90s').getTime().should.be.equal(new Date('2018-02-08 06:58:30').getTime()).and.be.a.Number();
  });

  it(`calculate time after '2018-05-01'`, () => {
    new Tick('2018-05-01').offset('1Y').getTime().should.be.equal(new Date('2019-05-01 00:00:00').getTime()).and.be.a.Number();
    new Tick('2018-05-01').offset('1Y12M').getTime().should.be.equal(new Date('2020-05-01 00:00:00').getTime()).and.be.a.Number();
    new Tick('2018-05-01').offset('1Y13M').getTime().should.be.equal(new Date('2020-06-01 00:00:00').getTime()).and.be.a.Number();
    new Tick('2018-05-01').offset('1Y10D').getTime().should.be.equal(new Date('2019-05-11 00:00:00').getTime()).and.be.a.Number();
    new Tick('2018-05-01').offset('1M5D1h50m20s').getTime().should.be.equal(new Date('2018-06-06 01:50:20').getTime()).and.be.a.Number();
    new Tick('2018-05-01').offset('1M50D36h300m90s').getTime().should.be.equal(new Date('2018-07-22 17:01:30').getTime()).and.be.a.Number();
  });
});
