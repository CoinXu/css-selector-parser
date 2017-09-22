/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */
import { ASSOCIATE_MAP_MIRROR } from './constants'

/**
 * 将token组装成selector
 * @param {Token} token
 * @return {string}
 */
export default function (token) {
  const selector = []
  let ot = token

  while (ot !== void 0) {

    if (ot.tag_name) {
      selector.push(ot.tag_name)
    }

    if (ot.id) {
      selector.push(`#${ot.id}`)
    }

    if (ot.class_name.length > 0) {
      selector.push(`.${ot.class_name.join('.')}`)
    }

    if (ot.nth_child) {
      selector.push(ot.nth_child)
    }

    if (ot.attributes) {
      selector.push(ot.attributes.join(''))
    }

    if (ot.children) {
      selector.push(` ${ASSOCIATE_MAP_MIRROR.children} `)
      ot = ot.children
      continue
    }

    if (ot.inside) {
      selector.push(ASSOCIATE_MAP_MIRROR.inside)
      ot = ot.inside
      continue
    }

    if (ot.after) {
      selector.push(` ${ASSOCIATE_MAP_MIRROR.after} `)
      ot = ot.after
      continue
    }

    if (ot.preceded) {
      selector.push(` ${ASSOCIATE_MAP_MIRROR.preceded} `)
      ot = ot.preceded
      continue
    }

    if (ot.undef) {
      selector.push(` ${ASSOCIATE_MAP_MIRROR.child} `)
      ot = ot.undef
      continue
    }

    break
  }

  return selector.join('')
}