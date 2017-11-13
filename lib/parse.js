'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (selector) {
  var list = (0, _reg.separator)(selector);
  var len = list.length;
  var token = {};

  if (len === 0) {
    return token;
  }

  var str = void 0,
      i = void 0;
  var store = token;

  for (i = 0; i < len; i += 2) {
    str = list[i];
    store.selector = str;
    store.entire_selector = list.slice(0, i + 1).join('');
    store.id = (0, _reg.extract_id)(str);
    store.tag_name = (0, _reg.extract_tag_name)(str);
    store.class_name = (0, _reg.extract_class)(str);
    store.nth_child = (0, _reg.extract_nth)(str);
    store.attributes = (0, _reg.extract_attr)(str);

    var as = list[i + 1];
    if (as) {
      as = as.trim() || ' ';
      store = store[_constants.ASSOCIATE_MAP[as] || _constants.ASSOCIATE_MAP.undef] = {};
    }
  }

  return token;
};

var _reg = require('./reg');

var _constants = require('./constants');