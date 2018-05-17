const Bitment = require('../dist/bitment');
const should = require('should');

describe('test bitment getMap', () => {
  it(`format timestamp 1525132800 to date string`, () => {
    const b = new Bitment(1525132800);
    b.getMap().should.be.deepEqual({
      year: 2018,
      month: 5,
      day: 1,
      hour: 8,
      minute: 0,
      second: 0,
      $year: '2018',
      $month: '05',
      $day: '01',
      $hour: '08',
      $minute: '00',
      $second: '00'
    }).and.be.an.Object;
  });
})
