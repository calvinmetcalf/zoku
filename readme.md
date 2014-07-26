zoku
====

Promisified ajax library; browserify compatible.


```bash
npm install zoku --save
```

## Usage

```js
var ajax = require('zoku');

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


## Zoku? WTF?

I was reading *The Causal Angel* by Hannu Rajaniemi when I wrote this, there is a faction known as the Zoku, it's from the Japanese word for 'clan' I believe.
