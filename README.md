# Tick

A tiny time format lib

### install

```bash
npm i tickjs -S
```

### Usage

As CommonJS module
```javascript
const Tick = require('tickjs');

const today = new Tick().format('YYYY-MM-DD');
```

As ES module
```javascript
import Tick from 'tickjs';

const today = new Tick().format('YYYY-MM-DD');
```

### Documentation

**Paramters**

Tick inherit [Date instance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). So the paramters are the same as Date instance.

**Methods**

##### format(template)
- Arguments:
  - {string} template
- Usage:
  Format a time template string.
  ```javascript
  new Tick().format('YYYY-MM-DD');
  // YYYY -> Year
  // WW -> Week
  // MM -> Month
  // DD -> Day
  // Md -> Month(Number)
  // Dd -> Day(Nubmer)
  // hh -> Hour
  // mm -> Minute
  // ss -> Second
  ```

##### getMap()
- Usage:
  Get the object of time.
  ```javascript
  new Tick().getMap(); // { year: '..', month: '..', day: '..', ... }
  ```

##### getDiff
- Usage:
  Get the description of time difference.
  ```javascript
  new Tick(Date.now() - 20000000).getDiff(); // 5小时前
  ```

### LICENSE
MIT
