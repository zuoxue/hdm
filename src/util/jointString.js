'use strict';

const kitx = require('kitx');

function firstLetterUpper(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function formatParams(params) {
  var keys = Object.keys(params);
  var newParams = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    // newParams[firstLetterUpper(key)] = params[key];
    newParams[key] = params[key];
  }
  return newParams;
}

function encode(str) {
  var result = encodeURIComponent(str);

  return result.replace(/\!/g, '%21')
    .replace(/\'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

function replaceRepeatList(target, key, repeat) {
  for (var i = 0; i < repeat.length; i++) {
    var item = repeat[i];

    if (item && typeof item === 'object') {
      const keys = Object.keys(item);
      for (var j = 0; j < keys.length; j++) {
        target[`${key}.${i + 1}.${keys[j]}`] = item[keys[j]];
      }
    } else {
      target[`${key}.${i + 1}`] = item;
    }
  }
}

function flatParams(params) {
  var target = {};
  var keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = params[key];
    if (Array.isArray(value)) {
      replaceRepeatList(target, key, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

function normalize(params) {
  var list = [];
  var flated = flatParams(params);
  var keys = Object.keys(flated).sort();
  for (let i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = flated[key];
    list.push([encode(key), encode(value)]); //push []
  }
  return list;
}

function canonicalize(normalized) {
  var fields = [];
  for (var i = 0; i < normalized.length; i++) {
    var [key, value] = normalized[i];
    fields.push(key + '=' + value);
  }
  return fields.join('&');
}

class RPCClient {
  constructor(config, verbose) {
    if (!config.endpoint.startsWith('https://') &&
      !config.endpoint.startsWith('http://')) {
      throw new Error(`"config.endpoint" must starts with 'https://' or 'http://'.`);
    }

    var accessKeySecret = config.secretAccessKey || config.accessKeySecret;

    if (config.endpoint.endsWith('/')) {
      config.endpoint = config.endpoint.slice(0, -1);
    }

    this.endpoint = config.endpoint;
    this.apiVersion = config.apiVersion;
    // this.accessKeyId = config.accessKeyId;
    this.accessKeySecret = accessKeySecret;
    this.securityToken = config.securityToken;
    this.verbose = verbose === true;
    // 非 codes 里的值，将抛出异常
    this.codes = new Set([200, '200', 'OK', 'Success']);
    if (config.codes) {
      // 合并 codes
      for (var elem of config.codes) {
        this.codes.add(elem);
      }
    }

    this.opts = config.opts || {};

    // var httpModule = this.endpoint.startsWith('https://')
    //   ? require('https') : require('http');
    // this.keepAliveAgent = new httpModule.Agent({
    //   keepAlive: true,
    //   keepAliveMsecs: 3000
    // });
  }

  request(action, params = {}, opts = {}) {
    // 1. compose params and opts
    opts = Object.assign({}, this.opts, opts);

    // format action until formatAction is false
    if (opts.formatAction !== false) {
      action = firstLetterUpper(action);
    }

    // format params until formatParams is false
    if (opts.formatParams !== false) {
      params = formatParams(params);
    }

    // 2. caculate signature
    var method = (opts.method || 'GET').toUpperCase();
    var normalized = normalize(params);
    var canonicalized = canonicalize(normalized);
    // 2.1 get string to sign
    var stringToSign = `${method}&${encode('/')}&${encode(canonicalized)}`;
    // 2.2 get signature
    console.log(stringToSign)
    const key = this.accessKeySecret;

    var signature = kitx.sha1(stringToSign, key, 'base64');
    // add signature
    normalized.push(['Signature', encode(signature)]);
    // 3. generate final url
    const url = opts.method === 'POST' ? `${this.endpoint}/` : `${this.endpoint}?${canonicalize(normalized)}`;
    // 4. send request

    return { url: `${this.endpoint}?${canonicalize(normalized)}`, signature: signature }

  }

}

export default RPCClient;
