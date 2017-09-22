/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */

import {
  separator,
  extract_id, extract_class, extract_tag_name, extract_nth, extract_attr
} from './reg'
import { ASSOCIATE_MAP } from './constants'

/**
 * @typedef {Object} Token
 * @property {?string} tag_name
 * @property {?string} id
 * @property {Array<string>} class_name
 * @property {?string} nth_child
 * @property {Array<string>} attributes
 * @property {Token} [child]
 * @property {Token} [inside]
 * @property {Token} [after]
 * @property {Token} [precede]
 * @property {Token} [undef]
 */

/**
 * 解析一个selector，返回其Token结构
 * @param {string} selector
 * @return {Token}
 */
export default function (selector) {
  const list = separator(selector)
  const len = list.length
  const token = {}

  if (len === 0) {
    return token
  }

  let str, i
  let store = token

  for (i = 0; i < len; i += 2) {
    str = list[i]
    store.tag_name = extract_tag_name(str)
    store.id = extract_id(str)
    store.class_name = extract_class(str)
    store.nth_child = extract_nth(str)
    store.attributes = extract_attr(str)

    let as = list[i + 1]
    if (as) {
      as = as.trim() || ' '
      store = store[ASSOCIATE_MAP[as] || ASSOCIATE_MAP.undef] = {}
    }
  }

  return token
}
