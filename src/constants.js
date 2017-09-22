/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */

const ASSOCIATE_MAP = {
  '>': 'child',
  ' ': 'inside',
  '+': 'after',
  '~': 'preceded',
  'undef': 'undef'
}

const ASSOCIATE_MAP_MIRROR = {
  child: '>',
  inside: ' ',
  after: '+',
  preceded: '~',
  undef: 'undef'
}

export {
  ASSOCIATE_MAP,
  ASSOCIATE_MAP_MIRROR
}
