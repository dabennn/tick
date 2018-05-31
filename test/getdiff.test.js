const Tick = require('../dist/tick');
const should = require('should');

describe('test getDiff', () => {
  it(`get time diff`, () => {
    const now = Date.now();
    const t = now - 1000 * 60 * 30;
    const t1 = now - 1000 * 59;
    const t2 = now - 1000 * 60 * 60 * 3;
    const t3 = now - 1000 * 60 * 60 * 24 * 7;
    new Tick(t).getDiff().should.be.deepEqual('30分钟前').and.be.a.String();
    new Tick(t1).getDiff().should.be.deepEqual('刚刚').and.be.a.String();
    new Tick(t2).getDiff().should.be.deepEqual('3小时前').and.be.a.String();
    new Tick(t3).getDiff().should.be.deepEqual('7天前').and.be.a.String();
  });
});
