[![Build Status](https://travis-ci.org/CoinXu/css-selector-parser.svg?branch=master)](https://travis-ci.org/CoinXu/css-selector-parser)

# css-selector-parser
css-selector解析为结构化的token，token再转为css-selector

# Interface
```ts
interface Token {
  id: string
  tag_name: string
  class_name: string[]
  nth_child: string
  attributes: string[]
}
interface Struct extends Token {
  children?: Token
  inside?: Token
  after?: Token
  precede?: Token
  undef?: Token
}
function parse(selector:string): Token
function combine(struct:Struct): string
```

# parse(selector:string): Token
```js
import { parse, combine } from 'css-selector-parser'
const selector = 'div.container #extract > div:nth-child(odd) > span[data-name*=tag]'
const token = parse(selector)
// token structure below
const r_token = {
  id: null,
  tag_name: 'div',
  class_name: ['container'],
  nth_child: null,
  attributes: [],
  insize: {
    id: 'extract',
    tag_name: null,
    class_name: [],
    nth_child: null,
    attributes: [],
    children: {
      id: null,
      tag_name: 'div',
      class_name: [],
      nth_child: ':nth-child(odd)',
      attributes: [],
      children: {
        id: null,
        tag_name: 'span',
        class_name: [],
        nth_child: null,
        attributes: ['[data-name*=tag]']
      }
    }
  }
}
```

# combine(struct:Struct): string
```js
const struct = {
  id: null,
  tag_name: 'div',
  class_name: ['container'],
  nth_child: null,
  attributes: [],
  insize: {
    id: 'extract',
    tag_name: null,
    class_name: [],
    nth_child: null,
    attributes: [],
    children: {
      id: null,
      tag_name: 'div',
      class_name: [],
      nth_child: ':nth-child(odd)',
      attributes: [],
      children: {
        id: null,
        tag_name: 'span',
        class_name: [],
        nth_child: null,
        attributes: ['[data-name*=tag]']
      }
    }
  }
}
combine(struct) // output: 'div.container #extract > div:nth-child(odd) > span[data-name*=tag]'
```
