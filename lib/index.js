'use strict';

exports.__esModule = true;
exports.Regulation = exports.separator = exports.extract_attr = exports.extract_nth = exports.extract_tag_name = exports.extract_class = exports.extract_id = exports.combine = exports.parse = undefined;

var _reg = require('./reg');

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _combine = require('./combine');

var _combine2 = _interopRequireDefault(_combine);

var _regulation = require('./regulation');

var Regulation = _interopRequireWildcard(_regulation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */

exports.parse = _parse2['default'];
exports.combine = _combine2['default'];
exports.extract_id = _reg.extract_id;
exports.extract_class = _reg.extract_class;
exports.extract_tag_name = _reg.extract_tag_name;
exports.extract_nth = _reg.extract_nth;
exports.extract_attr = _reg.extract_attr;
exports.separator = _reg.separator;
exports.Regulation = Regulation;