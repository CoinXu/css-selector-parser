'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @Author sugo.io<asd>
 * @Date 17-8-17
 * @description 通配符正则匹配
 */

// TODO 查资料找合法的URL字符集
var URI_STR = '.';
var REGULATION_REG = /\*/g;

/**
 * 将路径通配符转为正则
 * @param {String} regulation
 * @return {RegExp}
 *
 * /a/b => /a/b$
 * /a/b* => /a/b(.?)$
 */
function creator(regulation) {
  var str = '^' + regulation.replace(REGULATION_REG, '(?:' + URI_STR + '*?)') + '$';
  return new RegExp(str);
}

/**
 * 单个匹配
 * @param {String} str
 * @param {String} regulation
 * @return {Boolean}
 */
function test(str, regulation) {
  return creator(regulation).test(str);
}

/**
 * 取出目录最深的regulation
 * @param {Array<String>} regulations
 * @return {Array<String>}
 */
function max_directory(regulations) {

  var rec = [];
  var len = regulations.length;

  var total = 0;
  var max = -1;
  var i = 0;
  var reg = void 0;

  for (; i < len; i++) {
    reg = regulations[i];
    total = (reg.match(/\//g) || []).length;

    rec.push({
      total: total,
      regulation: reg
    });

    if (total > max) {
      max = total;
    }
  }

  return rec.filter(function (r) {
    return r.total === max;
  }).map(function (r) {
    return r.regulation;
  });
}

/**
 * 最出最长的regulation
 * @param {Array<String>} regulations
 * @return {Array<String>}
 */
function max_length(regulations) {
  // 取最长匹配的
  var len = regulations.length;
  var rec = [];

  var i = 0;
  var max = -1;
  var total = 0;
  var reg = void 0;

  for (; i < len; i++) {
    reg = regulations[i];
    total = reg.length;
    rec.push({
      total: total,
      regulation: reg
    });

    if (total > max) {
      max = total;
    }
  }

  return rec.filter(function (r) {
    return r.total === max;
  }).map(function (r) {
    return r.regulation;
  });
}

/**
 * @param {String} str
 * @param {Array<String>} regulations
 * @return {Array<String>}
 */
function match(str, regulations) {

  var match = [];
  var len = regulations.length;
  var i = 0;
  var reg = void 0;

  if (str.length === 0 || regulations.length === 0) {
    return match;
  }

  for (; i < len; i++) {
    reg = regulations[i];
    if (test(str, reg)) {
      match.push(reg);
    }
  }

  return match;
}

/**
 * 多个regulation匹配
 * 如果有多个匹配
 * 则取目录最多的
 * @param {String} str
 * @param {Array<String>} regulations
 * @return {?String}
 */
function exec(str, regulations) {

  var matched = match(str, regulations);

  if (matched.length === 0) {
    return null;
  }

  if (matched.length === 1) {
    return matched[0];
  }

  // 取目录最深匹配的
  matched = max_directory(matched);

  if (matched.length === 1) {
    return matched[0];
  }

  // 取最长匹配的
  matched = max_length(matched);

  // 如果还有重复的，就取第一个匹配结果
  return matched[0] || null;
}

exports.test = test;
exports.creator = creator;
exports.exec = exec;
exports.match = match;