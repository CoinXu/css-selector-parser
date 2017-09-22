	const s0 = "#js_index2017_wrap > div:nth-child(3) > div.ne_area.ne_index_area > div.cm_area.ns_area_first"
	const s1 = "div   .a > .b  +  .c  > span.text[data-index*=123]"

	// 字符集
	const TAG_NAME_SET = '[a-zA-Z]'
	const ATTRIUTES_NAME_SET = '[a-zA-Z]'
	const ATTRIBUTES_VALUE_SET = '.'
	const IDENTIFY_SET = '[a-zA-Z_].*'
	const CLASS_NAME_SET = '[a-zA-Z_-]'

	// 匹配
	// 元素关系:父子，同级，子集
	const ASSOCIATE = `\\u0020*>\\u0020*\|\\u0020*\\+\\u0020*\|\\u0020+`

	// identify
	const IDENTIFY = `#${IDENTIFY_SET}`
	// class name
	const CLASS_NAME = `\\.${CLASS_NAME_SET}+`
	// nth-child
	const NTH_CHILD = `${TAG_NAME_SET}+:nth-child\\((\w+)\\)`
	// attributes
	const ATTRIBUTES_MATCH = `~|\\||\\^|\\$|\\*`
	const ATTRIBUTES = `\\[(${ATTRIUTES_NAME_SET})+(${ATTRIBUTES_MATCH})?=(${ATTRIBUTES_VALUE_SET})+\\]`

	// 正则字符串
	// s.match(/(\.[a-zA-Z_]+)/g)
	const IDENTIFY_REG_STR = `(${IDENTIFY})`
	const CLASS_NAME_REG_STR = `(${CLASS_NAME})`
	const NTH_CHILD_REG_STR = `(${NTH_CHILD})+`
	const ATTRIBUTES_REG_STR = `(${ATTRIBUTES})+`

	// 构建正则
	const ASSOCIATE_REG = new RegExp(`(${ASSOCIATE})`)
	const IDENTIFY_REG = new RegExp(`(${IDENTIFY})`)
	const CLASS_REG = new RegExp(CLASS_NAME_REG_STR, 'g')
	const NTH_CHILD_REG = new RegExp(`(${NTH_CHILD})+`)
	const ATTRIBUTE_REG = new RegExp(`(${ATTRIBUTES})+`)

	const ASSOCIATE_MAP = {
		'>': 'child',
		' ': 'inside',
		'+': 'after',
		'~': 'preceded',
		'def': 'Exception'
	}

	function create_token(selector) {
		const list = selector.split(ASSOCIATE_REG)
		var start = 0
		var end = list.length
		var as = null
		var s, as, ctoken
		var i = 0
		var token = {}
		var store = token

		for(; i < end; i += 2) {
			s = list[i]
			as = list[i + 1]
			ctoken = {}
			store[ASSOCIATE_MAP[as.trim()] || ASSOCIATE_MAP.def] = ctoken

			// 检测id\class\attributes
			ctoken.id = s.match(IDENTIFY_REG)
			ctoken.className = s.match(CLASS_REG)
			ctoken.attributes = s.match(ATTRIBUTE_REG)
			ctoken.nth_child = s.match(NTH_CHILD_REG)
			store = ctoken
		}

		return token
	}

	console.log(create_token(s0))
	console.log(create_token(s1))
