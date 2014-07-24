'use strict';

var promise = require('lie');
var qs = require('querystring');

function ajax(url, method, body) {
  body = body || {};
  
  return promise(function(resolve,reject) {
    var data = qs.stringify(body);
    
    if (method === 'get') {
      url = url + '?' + data;
    }
    
    var ajax = new XMLHttpRequest();
    
    ajax.open(method, url, true);
    
    function onLoad() {
      if (ajax.status>399) {
        reject(new Error(ajax.status));
      } else {
        resolve(JSON.parse(ajax.response));
      }
      
      ajax.removeEventListener('load', onLoad, false);
    }
    
    ajax.addEventListener('load', onLoad, false);
    
    if (method === 'get') {
      ajax.send();
    } else {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      ajax.send(data);
    }
  });
}

module.exports = function (url, data) {
  return ajax(url, 'get', data);
};

exports.get = function (url, data) {
  return ajax(url, 'get', data);
};

exports.post = function (url, data) {
  return ajax(url, 'post', data);
};
