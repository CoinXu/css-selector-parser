/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */

import parse from '../src/parse'
import combine from '../src/combine'
import { equal } from 'assert'

describe("css selector parser", function () {
  const s = '#issuecomment-331380634 > div.timeline-comment-header > div > span > button > svg.octicon.octicon-smiley > path'

  let token
  it('parse method will return token object', function () {
    token = parse(s)
    console.log(JSON.stringify(token, null, 2))
    equal(token.id, 'issuecomment-331380634')
    equal(token.child.tag_name, 'div')
    equal(token.child.class_name.join('.'), 'timeline-comment-header')
    equal(token.child.child.tag_name, 'div')
    equal(token.child.child.child.tag_name, 'span')
    equal(token.child.child.child.child.tag_name, 'button')
    equal(token.child.child.child.child.child.tag_name, 'svg')
    equal(token.child.child.child.child.child.class_name.join('.'), 'octicon.octicon-smiley')
    equal(token.child.child.child.child.child.child.tag_name, 'path')
  })

  it('combine method will return string', function () {
    const selector = combine(token)
    equal(selector, s)
  })
})