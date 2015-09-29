'use strict';
var Promise = require('lie');
var qs = require('querystring');
var methods = [
  'CHECKOUT',
  'COPY',
  'DELETE',
  'GET',
  'HEAD',
  'LOCK',
  'M-SEARCH',
  'MERGE',
  'MKACTIVITY',
  'MKCALENDAR',
  'MKCOL',
  'MOVE',
  'NOTIFY',
  'OPTIONS',
  'PATCH',
  'POST',
  'PROPFIND',
  'PROPPATCH',
  'PURGE',
  'PUT',
  'REPORT',
  'SEARCH',
  'SUBSCRIBE',
  'UNLOCK',
  'UNSUBSCRIBE'
];
module.exports = ajax;
function ajax(url, method, body) {
  return new Promise(function(resolve, reject) {
    if ((typeof method !== 'string' || methods.indexOf(method.toUpperCase()) === -1) && typeof body === 'undefined') {
      body = method || {};
      method = 'GET';
    }
    var data = qs.stringify(body);
    method = method.toLowerCase();
    if (method === 'get') {
      url = url + '?' + data;
    }

    var ajax = new XMLHttpRequest();

    ajax.open(method, url, true);
    try {
      ajax.responseType = 'json';
    } catch (e) {}
    function onLoad() {
      if (ajax.status > 299) {
        reject(new Error(ajax.response || ajax.status));
      } else {
        if (ajax.responseType === 'json') {
          return resolve(ajax.response);
        }
        try {
          resolve(JSON.parse(ajax.response));
        } catch(e) {
          resolve(ajax.response);
        }
      }

      ajax.removeEventListener('load', onLoad, false);
      ajax.removeEventListener('error', onError, false);
    }
    function onError(e) {
      ajax.removeEventListener('load', onLoad, false);
      ajax.removeEventListener('error', onError, false);
      reject(e);
    }
    ajax.addEventListener('error', reject, false);
    ajax.addEventListener('load', onLoad, false);

    if (method === 'get') {
      ajax.send();
    } else {
      ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      ajax.send(data);
    }
  });
}
