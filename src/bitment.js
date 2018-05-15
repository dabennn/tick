function bit2Ten(num) {
  return +num < 10 ? '0' + num : num + '';
}

/**
 * Bitment 日期处理
 * @param 同Date类接受的参数
 * @example
 * new Bitment(Date.now()).format('YYYY-MM-DD')
 * new Bitment(Date.now()).getMap()
 * new Bitment(Date.now()).getDiff()
 */
class Bitment extends Date {
  constructor(...time) {
    if (typeof time[0] === 'string' && /^\d{10}$/.test(time[0])) {
      time[0] = time[0] * 1000;
    }
    if (typeof time[0] === 'string' && /[-.]/.test(time[0])) {
      time[0] = time[0].replace(/[-.]/g, '/');
    }

    const _date = super(...time);
    if (_date.toString() === 'Invalid Date') throw TypeError('Invalid time input: ' + time);

    this._timestamp = _date.getTime();
    this._year = _date.getFullYear();
    this._month = _date.getMonth() + 1;
    this._day = _date.getDate();
    this._hour = _date.getHours();
    this._minute = _date.getMinutes();
    this._second = _date.getSeconds();
  }
  /**
   * 格式化时间
   * @param {string} timeTpl 日期格式化模板字符串 Y-年 M-月 D-日 h-时 m-分 s-秒
   * @return {string} 格式化后的字符串
   */
  format(timeTpl = 'YYYY-MM-DD hh:mm:ss') {
    return timeTpl.replace('YYYY', this._year)
      .replace('MM', bit2Ten(this._month))
      .replace('DD', bit2Ten(this._day))
      .replace('hh', bit2Ten(this._hour))
      .replace('mm', bit2Ten(this._minute))
      .replace('ss', bit2Ten(this._second))
  }
  /**
   * 获取对象形式的时间解析结果
   * @return {object} 包含具体时间解析的对象
   */
  getMap() {
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
   * @return {string} 多久前的字符串 "刚刚" "2天前"
   */
  getDiff() {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = month * 12;
    const now = new Date().getTime();
    const diffValue = now - this._timestamp;

    if (diffValue < 0) { return '刚刚'; }

    const diffYear = Math.floor(diffValue / year);
    const diffMonth = Math.floor(diffValue / month);
    const diffDay = Math.floor(diffValue / day);
    const diffHour = Math.floor(diffValue / hour);
    const diffMinute = Math.floor(diffValue / minute);
    const diffSecond = Math.floor(diffValue / second);

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
}

export default Bitment;
