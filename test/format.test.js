const Bitment = require('../dist/bitment');
const should = require('should');

describe('test format', () => {
  it(`format timestamp 1525132800 to date string`, () => {
    const b = new Bitment(1525132800);
    b.format('YYYY.MM.DD').should.be.deepEqual('2018.05.01').and.be.a.String;
    b.format('hh:mm:ss').should.be.deepEqual('08:00:00').and.be.a.String;
  });

  it(`format timestamp '1525132800' to date string`, () => {
    const b = new Bitment('1525132800');
    b.format('YYYY.MM.DD').should.be.deepEqual('2018.05.01').and.be.a.String;
    b.format('hh:mm:ss').should.be.deepEqual('08:00:00').and.be.a.String;
  });

  it(`format date '2018-05-01' to other date like`, () => {
    const b = new Bitment('2018-05-01');
    b.format('YYYY.MM.DD').should.be.deepEqual('2018.05.01').and.be.a.String;
    b.format('YYYY/Mm/Dd').should.be.deepEqual('2018/5/1').and.be.a.String;
    b.format('YYYY年Mm月Dd日').should.be.deepEqual('2018年5月1日').and.be.a.String;
  });

  it(`format date '2018-05-01' to other time like`, () => {
    const b = new Bitment('2018-05-01');
    b.format('YYYY.Mm.Dd hh:mm:ss').should.be.deepEqual('2018.5.1 00:00:00').and.be.a.String;
    b.format('YYYY/MM/DD hh:mm:ss').should.be.deepEqual('2018/05/01 00:00:00').and.be.a.String;
    b.format('YYYY-MM-DD hh:mm:ss').should.be.deepEqual('2018-05-01 00:00:00').and.be.a.String;
    b.format('YYYY年MM月DD日 hh:mm:ss').should.be.deepEqual('2018年05月01日 00:00:00').and.be.a.String;
  });

  it('all format paramters', () => {
    const b = new Bitment('2018-05-15 14:56:53')
    b.format('YYYY').should.be.deepEqual('2018').and.be.a.String;
    b.format('WW').should.be.deepEqual('周二').and.be.a.String;
    b.format('MM').should.be.deepEqual('05').and.be.a.String;
    b.format('DD').should.be.deepEqual('15').and.be.a.String;
    b.format('Mm').should.be.deepEqual('5').and.be.a.Number;
    b.format('Dd').should.be.deepEqual('15').and.be.a.Number;
    b.format('hh').should.be.deepEqual('14').and.be.a.String;
    b.format('mm').should.be.deepEqual('56').and.be.a.String;
    b.format('ss').should.be.deepEqual('53').and.be.a.String;
  });
})
