/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */

const ASSOCIATE_MAP = {
  '>': 'children',
  ' ': 'inside',
  '+': 'after',
  '~': 'preceded',
  'undef': 'undef'
}

const ASSOCIATE_MAP_MIRROR = {
  children: '>',
  inside: ' ',
  after: '+',
  preceded: '~',
  undef: 'undef'
}

export {
  ASSOCIATE_MAP,
  ASSOCIATE_MAP_MIRROR
}
