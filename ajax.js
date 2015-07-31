'use strict';

var http = require('http');
var https = require('https');
var Promise = require('lie');
var qs = require('querystring');
var url = require('url');

module.exports = ajax;

function ajax(reqUrl, method, body) {

  return new Promise(function(resolve, reject) {
    if ((typeof method !== 'string' || http.METHODS.indexOf(method.toUpperCase()) === -1) && typeof body === 'undefined') {
      body = method;
      method = 'GET';
    }
    body = body || {};
    var data = typeof body === 'string' ? body : qs.stringify(body);

    if (method.toLowerCase() === 'get') {
      reqUrl = reqUrl + '?' + data;
    }
    var options = url.parse(reqUrl);
    var verb;
    if (options.protocol === 'https:') {
      verb = https;
    } else if (options.protocol === 'http://') {
      verb = http;
    } else {
      return reject(new TypeError('unknown protocol'));
    }
    options.method = method;
    var req = verb.request(options, function (res) {
      var out = '';
      res.on('data', function (d) {
        out += d.toString();
      }).on('error', reject)
      .on('end', function () {
        if (res.statusCode > 299) {
          return reject(out || http.STATUS_CODES[res.statusCode]);
        }
        try {
          out = JSON.parse(out);
        } catch(e) {
        } finally {
          return resolve(out);
        }
      });
    }).on('error', reject);
    if (method.toLowerCase() === 'post') {
      req.write(data);
    }
    req.end();
  });
}
