'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (token) {
  var selector = [];
  var ot = token;

  while (ot !== void 0) {

    if (ot.tag_name) {
      selector.push(ot.tag_name);
    }

    if (ot.id) {
      selector.push('#' + ot.id);
    }

    if (ot.class_name.length > 0) {
      selector.push('.' + ot.class_name.join('.'));
    }

    if (ot.nth_child) {
      selector.push(ot.nth_child);
    }

    if (ot.attributes) {
      selector.push(ot.attributes.join(''));
    }

    if (ot.children) {
      selector.push(' ' + _constants.ASSOCIATE_MAP_MIRROR.children + ' ');
      ot = ot.children;
      continue;
    }

    if (ot.inside) {
      selector.push(_constants.ASSOCIATE_MAP_MIRROR.inside);
      ot = ot.inside;
      continue;
    }

    if (ot.after) {
      selector.push(' ' + _constants.ASSOCIATE_MAP_MIRROR.after + ' ');
      ot = ot.after;
      continue;
    }

    if (ot.preceded) {
      selector.push(' ' + _constants.ASSOCIATE_MAP_MIRROR.preceded + ' ');
      ot = ot.preceded;
      continue;
    }

    if (ot.undef) {
      selector.push(' ' + _constants.ASSOCIATE_MAP_MIRROR.undef + ' ');
      ot = ot.undef;
      continue;
    }

    break;
  }

  return selector.join('');
};

var _constants = require('./constants');