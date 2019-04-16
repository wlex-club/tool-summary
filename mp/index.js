const global = {
    wx
}

function assembly(api) {
    return (options) => new Promise((resolve, reject) => {
      //  let pagereg =/^\/pages\//g
        // pagereg.test(options.url)
        api({
            ...options,
            success(...args) {
                resolve(...args)
            },
            fail(error) {
                if (error && error.errMsg) {
                    return reject(new Error(error.errMsg))
                }
                if (error instanceof Error) {
                    return reject(error)
                }
                reject(new Error(error))
            },
        })
    })
}

const APIS = ['switchTab', 'redirectTo', 'navigateTo', 'navigateBack', 'reLaunch']

const $mp = {}
APIS.forEach((name) => {
    $mp[name] = assembly(global.wx[name])
})

export default $mp
