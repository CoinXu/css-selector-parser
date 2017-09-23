'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.separator = exports.extract_attr = exports.extract_nth = exports.extract_tag_name = exports.extract_class = exports.extract_id = exports.combine = exports.parse = undefined;

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _combine = require('./combine');

var _combine2 = _interopRequireDefault(_combine);

var _reg = require('./reg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.parse = _parse2.default;
exports.combine = _combine2.default;
exports.extract_id = _reg.extract_id;
exports.extract_class = _reg.extract_class;
exports.extract_tag_name = _reg.extract_tag_name;
exports.extract_nth = _reg.extract_nth;
exports.extract_attr = _reg.extract_attr;
exports.separator = _reg.separator; /**
                                     * @Author sugo.io<asd>
                                     * @Date 17-9-22
                                     */