/**
 * @author  wangweile | wangweile@shuidihuzhu.com
 * @version 2.0 |
 * @describe
 * @example 这三个方法的区别？？？
 */


function mapObj(obj, traverse = o => o) {
    let result = {}
    for (let key in obj) {
        result[key] = traverse(obj[key], key, obj)
    }
    return result
}

function filterObject(obj, predicate = o => o) {
    let result = {}
    for (let key in obj) {
        if (predicate(obj[key], key, obj)) {
            result[key] = obj[key]
        }
    }
    return result
}


// context:{},handlers:function(){}
function addHooks(context, handlers, isPrepend = false) {
    let result = {}
    for (let name in handlers) {
        result[name] = function handler(...args) {
            if (isPrepend) {
                handlers[name].apply(this, args)
            }
            if (typeof context[name] === 'function') {
                context[name].apply(this, args)
            }
            if (!isPrepend) {
                handlers[name].apply(this, args)
            }
        }
    }
    console.log(context)
    console.log(result)
    return {
        ...context,
        ...result,
    }
}

let page = {a: 1, b: 2}

addHooks(page, {
    beforeLoad(options) {
        this.$route = {
            path: `/${this.route}`,
            query: {...options},
            fullPath: isEmpty(options) ? `/${this.route}` : `/${this.route}?${querystring.stringify(options)}`,
        }
        this.data = model.data || {}
        this.setData({})
    },
}, true)

/*
{ a: 1, b: 2 }
{ beforeLoad: [Function: handler] }
 */

