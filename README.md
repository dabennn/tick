# Bitment

A tiny time format lib

### install

```bash
npm i bitment -S
```

### Usage

As CommonJs module
```javascript
const Bitment = require('bitment');

const today = new Bitment().format('YYYY-MM-DD');
```

As ES module
```javascript
import Bitment from 'bitment';

const today = new Bitment().format('YYYY-MM-DD');
```

### Documentation

**Paramters**

Bitment inherit [Date instance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). So the paramters are the same as Date instance.

**Methods**

##### format(template)
- Arguments:
  - {string} template
- Usage:
  Format a time template string.
  ```javascript
  new Bitment().format('YYYY-MM-DD');
  // YYYY -> Year
  // MM -> Month
  // DD -> Day
  // hh -> Hour
  // mm -> Minute
  // ss -> Second
  ```

##### getMap()
- Usage:
  Get the object of time.
  ```javascript
  new Bitment().getMap(); // { year: '..', month: '..', day: '..', ... }
  ```

##### getDiff
- Usage:
  Get the description of time difference.
  ```javascript
  new Bitment(Date.now() - 20000000).getDiff(); // 5小时前
  ```

### LICENSE
MIT
