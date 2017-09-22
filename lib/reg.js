'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */

var TAG_NAME_SET = '[a-zA-Z]';
var ATTRIUTES_NAME_SET = '[a-zA-Z-_]';
var ATTRIBUTES_VALUE_SET = '.';
var IDENTIFY_SET = '[a-zA-Z_].*';
var CLASS_NAME_SET = '[a-zA-Z_-]';

// 匹配元素关系
// TODO 位置交换会出现Bug
var ASSOCIATE = ['\\s*>\\s*', // children
'\\s*\\+\\s*', // after
'\\s+' // insize
].join('\|');

// attributes
var ATTRIBUTES_MATCH = '[~\\|\\$\\*\\^]';
var ATTRIBUTES = '\\[' + ATTRIUTES_NAME_SET + '+' + ATTRIBUTES_MATCH + '?=' + ATTRIBUTES_VALUE_SET + '*\\]';

// 构建正则
var ASSOCIATE_REG = new RegExp('(' + ASSOCIATE + ')');
var TAG_NAME_REG = new RegExp('^(' + TAG_NAME_SET + '+)');
var IDENTIFY_REG = new RegExp('(?:#(' + IDENTIFY_SET + '))');
var CLASS_REG = new RegExp('(?:\\.(' + CLASS_NAME_SET + '+))', 'g');
var NTH_CHILD_REG = new RegExp('(:(nth-child\\((\\w+)\\)))');
var ATTRIBUTE_REG = new RegExp('(' + ATTRIBUTES + ')', 'g');

/**
 * 元素关系分离器
 * @param {string} selector
 * @return {Array<string>}
 *
 * @example
 * ```js
 * separator('div.container > .item .box > li')
 * // output: ['div.container', '>', '.item', ' ', '.box', '>', 'li']
 * ```
 */
function separator(selector) {
  return selector.split(ASSOCIATE_REG);
}

/**
 * 提取选择器中的id字段
 * @param {string} selector
 * @return {?string}
 *
 * @example
 * ```js
 * extract_id('#item-1')     // item-1
 * extract_id('div')         // null
 * extract_id('div#item-1')  // item-1
 * ```
 */
function extract_id(selector) {
  var arr = selector.match(IDENTIFY_REG);
  return arr ? arr[1] : null;
}

/**
 * 提取选择器中的class
 * @param {string} selector
 * @return {Array<string>}
 *
 * @example
 * ```js
 * extract_class('div.item')         // ['item']
 * extract_class('div.item.active')  // ['item', 'active']
 * extract_class('div')              // []
 * ```
 */
function extract_class(selector) {
  var arr = selector.match(CLASS_REG);
  return (arr ? arr : []).map(function (r) {
    return r.replace('.', '');
  });
}

/**
 * 提取selector中的tag name
 * 注：tag name一定是放在最前面的
 * @param {string} selector
 * @return {?string}
 *
 * @example
 * ```js
 * extract_tag_name('div')             // 'div'
 * extract_tag_name('div.container')   // 'div'
 * extract_tag_name('.container')      // 'div'
 * ```
 */
function extract_tag_name(selector) {
  var arr = selector.match(TAG_NAME_REG);
  return arr ? arr[1] : null;
}

/**
 * 提取selector中的nth_child
 * @param {string} selector
 * @return {?string}
 *
 * @example
 * ```js
 * extract_nth('div:nth-child(2)')   // ':nth-child(2)'
 * extract_nth('div:nth-child(odd)') // ':nth-child(odd)'
 * ```
 */
function extract_nth(selector) {
  var arr = selector.match(NTH_CHILD_REG);
  return arr ? arr[1] : null;
}

/**
 * 提取选择器中的attribute部份
 * @param {string} selector
 * @return {Array<string>}
 */
function extract_attr(selector) {
  var arr = selector.match(ATTRIBUTE_REG);
  return arr ? arr : [];
}

exports.separator = separator;
exports.extract_id = extract_id;
exports.extract_class = extract_class;
exports.extract_tag_name = extract_tag_name;
exports.extract_nth = extract_nth;
exports.extract_attr = extract_attr;