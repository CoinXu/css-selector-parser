/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */

import parse from '../src/parse'
import combine from '../src/combine'
import { separator, extract_id, extract_class, extract_tag_name, extract_nth, extract_attr } from '../src/reg'
import { equal, ok } from 'assert'

describe('Reg.separator', function () {
  const selectors = [
    {
      str: '.container .items #first',
      arr: ['.container', ' ', '.items', ' ', '#first']
    },
    {
      str: '.container.extract .items > .box',
      arr: ['.container.extract', ' ', '.items', ' > ', '.box']
    },
    {
      str: '.container .items .box span.text',
      arr: ['.container', ' ', '.items', ' ', '.box', ' ', 'span.text']
    },
    {
      str: '.a > .b .c + .d .e',
      arr: ['.a', ' > ', '.b', ' ', '.c', ' + ', '.d', ' ', '.e']
    }
  ]

  selectors.forEach(function (desc) {
    it(`separator(${JSON.stringify(desc.str)}) will return ${JSON.stringify(desc.arr)}`, function () {
      separator(desc.str).forEach(function (v, i) {
        equal(v, desc.arr[i])
      })
    })
  })
})

describe('Reg.extract_id', function () {
  const selector = [
    { str: 'div#aa', ret: 'aa' },
    { str: '#aa', ret: 'aa' },
    { str: 'div', ret: null },
    { str: 'div.bc#aa', ret: 'aa' },
    { str: '##aa', ret: 'aa' }
  ]

  selector.forEach(function (desc) {
    it(`extract_id(${JSON.stringify(desc.str)}) will return ${JSON.stringify(desc.ret)}`, function () {
      equal(extract_id(desc.str), desc.ret)
    })
  })
})

describe('Reg.extract_class', function () {
  const selector = [
    { str: 'div.container', ret: ['container'] },
    { str: 'div.container.extract', ret: ['container', 'extract'] },
    { str: 'div', ret: [] }
  ]

  selector.forEach(function (desc) {
    it(`extract_class(${JSON.stringify(desc.str)}) will return ${JSON.stringify(desc.ret)}`, function () {
      equal(extract_class(desc.str).join(''), desc.ret.join(''))
    })
  })
})

describe('Reg.extract_tag_name', function () {
  const selector = [
    { str: 'div', ret: 'div' },
    { str: 'span#identify', ret: 'span' },
    { str: '.a', ret: null },
    { str: '#identify', ret: null },
    { str: '[href*=name]', ret: null },
    { str: 'div[href*=name]', ret: 'div' },
    { str: 'abc[href*=name]', ret: 'abc' },
    { str: '.a > div:nth-child(2)', ret: null },
    { str: 'a.a > div:nth-child(2)', ret: 'a' }
  ]

  selector.forEach(function (desc) {
    it(`extract_tag_name(${JSON.stringify(desc.str)}) will return ${JSON.stringify(desc.ret)}`, function () {
      equal(extract_tag_name(desc.str), desc.ret)
    })
  })
})

describe('Reg.extract_nth', function () {
  const selector = [
    { str: 'div', ret: null },
    { str: 'div:nth-child(1)', ret: ':nth-child(1)' },
    { str: 'div:nth-child(odd)', ret: ':nth-child(odd)' },
    { str: 'div:nth-child(2n+1)', ret: ':nth-child(2n+1)' },
    { str: 'div:nth-child(2n-1)', ret: ':nth-child(2n-1)' }
  ]

  selector.forEach(function (desc) {
    it(`extract_nth(${JSON.stringify(desc.str)}) will return ${JSON.stringify(desc.ret)}`, function () {
      equal(extract_nth(desc.str), desc.ret)
    })
  })
})

describe('Reg.extract_attr', function () {
  const selector = [
    { str: 'div', ret: [] },
    { str: 'div[href*=www]', ret: ['[href*=www]'] },
    { str: 'div[href*=www][data-item^=a]', ret: ['[href*=www]', '[data-item^=a]'] }
  ]

  selector.forEach(function (desc) {
    it(`extract_attr(${JSON.stringify(desc.str)}) will return ${JSON.stringify(desc.ret)}`, function () {
      equal(extract_attr(desc.str).join(''), desc.ret.join(''))
    })
  })
})

describe('parse', function () {
  function compare (a, b) {
    return Object.keys(a).every(function (n) {
      return JSON.stringify(a[n]) === JSON.stringify(b[n])
    })
  }

  function creator (o) {
    return ['id', 'tag_name', 'class_name', 'nth_child', 'attributes'].reduce(function (p, c) {
      p[c] = o[c]
      return p
    }, {})
  }

  const selector = [
    {
      str: '#identify > div.container',
      token: {
        selector: '#identify',
        id: 'identify',
        tag_name: null,
        class_name: [],
        nth_child: null,
        attributes: [],
        children: {
          selector: 'div.container',
          id: null,
          tag_name: 'div',
          nth_child: null,
          class_name: ['container'],
          attributes: []
        }
      },
      check (a, b) {
        if (!compare(creator(a), creator(b))) {
          return false
        }

        return compare(creator(a.children), creator(b.children))
      }
    },
    {
      str: '#identify .container',
      token: {
        selector: '#identify',
        id: 'identify',
        tag_name: null,
        class_name: [],
        nth_child: null,
        attributes: [],
        inside: {
          selector: '.container',
          id: null,
          tag_name: null,
          nth_child: null,
          class_name: ['container'],
          attributes: []
        }
      },
      check (a, b) {
        if (!compare(creator(a), creator(b))) {
          return false
        }
        return compare(creator(a.inside), creator(b.inside))
      }
    },
    {
      str: 'div.container .extract > span',
      token: {
        selector: 'div.container',
        id: null,
        tag_name: 'div',
        class_name: ['container'],
        nth_child: null,
        attributes: [],
        inside: {
          selector: '.extract',
          id: null,
          tag_name: null,
          class_name: ['extract'],
          nth_child: null,
          attributes: [],
          children: {
            selector: 'span',
            id: null,
            tag_name: 'span',
            class_name: [],
            nth_child: null,
            attributes: []
          }
        }
      },
      check (a, b) {
        if (!compare(creator(a), creator(b))) {
          return false
        }

        if (!compare(creator(a.inside), creator(a.inside))) {
          return false
        }

        return compare(creator(a.inside.children), creator(a.inside.children))
      }
    }
  ]

  selector.forEach(function (desc) {
    it(`parse(${JSON.stringify(desc.str)}) will return ${JSON.stringify(desc.token)}`, function () {
      ok(desc.check(parse(desc.str), desc.token))
    })
  })
})

describe('combine', function () {

  const selector = [
    {
      str: '#identify > div.container',
      token: {
        selector: '#identify',
        id: 'identify',
        tag_name: null,
        class_name: [],
        nth_child: null,
        attributes: [],
        children: {
          selector: 'div.container',
          id: null,
          tag_name: 'div',
          nth_child: null,
          class_name: ['container'],
          attributes: []
        }
      }
    },
    {
      str: '#identify .container',
      token: {
        selector: '#identify',
        id: 'identify',
        tag_name: null,
        class_name: [],
        nth_child: null,
        attributes: [],
        inside: {
          selector: '.container',
          id: null,
          tag_name: null,
          nth_child: null,
          class_name: ['container'],
          attributes: []
        }
      }
    },
    {
      str: 'div.container .extract > span',
      token: {
        selector: 'div.container',
        id: null,
        tag_name: 'div',
        class_name: ['container'],
        nth_child: null,
        attributes: [],
        inside: {
          selector: '.extract',
          id: null,
          tag_name: null,
          class_name: ['extract'],
          nth_child: null,
          attributes: [],
          children: {
            selector: 'span',
            id: null,
            tag_name: 'span',
            class_name: [],
            nth_child: null,
            attributes: []
          }
        }
      }
    }
  ]

  selector.forEach(function (desc) {
    it(`combine(${JSON.stringify(desc.token)}) will return ${JSON.stringify(desc.str)}`, function () {
      equal(combine(desc.token), desc.str)
    })
  })
})