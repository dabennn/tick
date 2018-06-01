Object.setPrototypeOf = Object.setPrototypeOf ||
  function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
  };

/**
 * Tick 日期处理
 * @class Tick
 * @extends Date
 * @param {String|Number} date 同Date类接受的参数
 * @example
 * new Tick(Date.now()).format('YYYY-MM-DD')
 * new Tick(Date.now()).getMap()
 * new Tick(Date.now()).getDiff()
 */
function Tick() {
  if (/^\d{10}$/.test(arguments[0])) {
    arguments[0] = arguments[0] * 1000;
  }
  if (typeof arguments[0] === 'string' && /[-.]/.test(arguments[0])) {
    arguments[0] = arguments[0].replace(/[-.]/g, '/');
  }
  var DateInstance = new (Function.prototype.bind.apply(Date, [Date].concat(Array.prototype.slice.call(arguments))))();

  if (DateInstance.toString() === 'Invalid Date') throw TypeError('Invalid time input: ' + arguments[0]);

  Tick.prototype._timestamp = DateInstance.getTime();
  Tick.prototype._year = DateInstance.getFullYear();
  Tick.prototype._month = DateInstance.getMonth() + 1;
  Tick.prototype._week = DateInstance.getDay();
  Tick.prototype._day = DateInstance.getDate();
  Tick.prototype._hour = DateInstance.getHours();
  Tick.prototype._minute = DateInstance.getMinutes();
  Tick.prototype._second = DateInstance.getSeconds();

  Object.setPrototypeOf(DateInstance, Tick.prototype);
  return DateInstance;
}

Object.setPrototypeOf(Tick.prototype, Date.prototype);

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365;
const WEEK_LIST = ['日', '一', '二', '三', '四', '五', '六'];

function bit2Ten(num) {
  return +num < 10 ? '0' + num : num + '';
}

/**
 * 格式化时间
 * @param {String} timeTpl 日期格式化模板字符串 Y-年 M-月 D-日 h-时 m-分 s-秒
 * @return {String} 格式化后的字符串
 */
Tick.prototype.format = function (timeTpl = 'YYYY-MM-DD hh:mm:ss') {
  return timeTpl.replace('YYYY', this._year)
    .replace('Mm', this._month)
    .replace('Dd', this._day)
    .replace('WW', '周' + WEEK_LIST[this._week])
    .replace('MM', bit2Ten(this._month))
    .replace('DD', bit2Ten(this._day))
    .replace('hh', bit2Ten(this._hour))
    .replace('mm', bit2Ten(this._minute))
    .replace('ss', bit2Ten(this._second))
}
/**
 * 获取对象形式的时间解析结果
 * @return {Object} 包含具体时间解析的对象
 */
Tick.prototype.getMap = function () {
  return {
    year: this._year,
    month: this._month,
    day: this._day,
    hour: this._hour,
    minute: this._minute,
    second: this._second,
    $year: bit2Ten(this._year),
    $month: bit2Ten(this._month),
    $day: bit2Ten(this._day),
    $hour: bit2Ten(this._hour),
    $minute: bit2Ten(this._minute),
    $second: bit2Ten(this._second),
  };
}
/**
 * 多久前 用于评论等显示 "多久前"
 * @return {String} 多久前的字符串 "刚刚" "2天前"
 */
Tick.prototype.getDiff = function () {
  const diffValue = Date.now() - this._timestamp;

  if (diffValue < 0) { return '刚刚'; }

  const diffYear = Math.floor(diffValue / YEAR);
  const diffMonth = Math.floor(diffValue / MONTH);
  const diffDay = Math.floor(diffValue / DAY);
  const diffHour = Math.floor(diffValue / HOUR);
  const diffMinute = Math.floor(diffValue / MINUTE);
  const diffSecond = Math.floor(diffValue / SECOND);

  if (diffYear >= 1) {
    return `${diffYear}年前`;
  } else if (12 > diffMonth && diffMonth >= 1) {
    return `${diffMonth}个月前`;
  } else if (30 > diffDay && diffDay >= 1) {
    return `${diffDay}天前`;
  } else if (60 > diffHour && diffHour >= 1) {
    return `${diffHour}小时前`;
  } else if (60 > diffMinute && diffMinute >= 1) {
    return `${diffMinute}分钟前`;
  } else if (60 > diffSecond && diffSecond >= 0) {
    return '刚刚';
  }
}

/**
 * 计算多久之前或后一段时间
 * @param {String} offset 之前或之后多少时间
 */
Tick.prototype.offset = function (offset = '') {
  const isBefore = /^-/.test(offset);
  offset = offset.replace(/[+-]g/, '');
  const signs = {
    D: DAY,
    h: HOUR,
    m: MINUTE,
    s: SECOND,
  };

  let n = '';
  let t = 0;
  for (let i = 0; i < offset.length; i++) {
    const s = offset[i];
    if (/\d/.test(s)) {
      n += s;
    } else {
      if (s === 'Y') {
        n = +n;
        this.setFullYear(isBefore ? this.getFullYear() - n : this.getFullYear() + n);
        n = '';
      } else if (s === 'M') {
        n = +n;
        if (n >= 12) {
          const q = n % 12;
          const y = Math.floor(n / 12);
          this.setFullYear(isBefore ? this.getFullYear() - y : this.getFullYear() + y);
          this.setMonth(isBefore ? this.getMonth() - q : this.getMonth() + q);
          n = '';
        } else {
          this.setMonth(isBefore ? this.getMonth() - n: this.getMonth() + n);
          n = '';
        }
      } else {
        t += n * (signs[s] || 0);
        n = '';
      }
    }
  }
  t = isBefore ? -t : t;
  return new Tick(this.getTime() + t);
}

/**
 * 比较时间的三个方法
 * @author   daben<dabennn07@gmail.com>
 * @param    {String|Number}                 date 任何可以被Date对象解析的时间
 * @return   {Boolean}
 */
Tick.prototype.isBefore = function (date) {
  return this._timestamp < new Tick(date).getTime();
}

Tick.prototype.isAfter = function (date) {
  return this._timestamp > new Tick(date).getTime();
}

Tick.prototype.isEqual = function (date) {
  return this._timestamp === new Tick(date).getTime();
}

/**
 * 判断是否是闰年
 * @author   daben<dabennn07@gmail.com>
 * @param    {Number}                   year 年份
 * @return   {Boolean}
 */
Tick.isLeapYear = function (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export default Tick;
