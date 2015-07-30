'use strict';

var ajax = require('./ajax');

module.exports = ajax;

ajax.get = ajax;

ajax.post = function (url, data) {
  return ajax(url, 'post', data);
};
