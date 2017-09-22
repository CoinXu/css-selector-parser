'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */

var ASSOCIATE_MAP = {
  '>': 'children',
  ' ': 'inside',
  '+': 'after',
  '~': 'preceded',
  'undef': 'undef'
};

var ASSOCIATE_MAP_MIRROR = {
  children: '>',
  inside: ' ',
  after: '+',
  preceded: '~',
  undef: 'undef'
};

exports.ASSOCIATE_MAP = ASSOCIATE_MAP;
exports.ASSOCIATE_MAP_MIRROR = ASSOCIATE_MAP_MIRROR;