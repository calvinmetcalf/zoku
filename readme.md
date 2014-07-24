ajax
====

Promisified ajax library; browserify compatible.


```bash
npm install calvinmetcalf/ajax --save
```

## Usage

```js
var ajax = require('ajax');

ajax(url, data); // Defaults to 'get'
ajax.get(url, data);
ajax.post(url, data);


// Specify method explicitly
ajax(url, 'get', data);

// Use the result
ajax(url, data).then(function (result) {
  // Use the data (as json)
}, function (err) {
  // error thrown
});
```
