const { test , describe} = require('node:test')
const assert = require('node:assert')

const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        const result = totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('When list has only one blog equals the like of that', () =>{
        const blogs = [2]
        const result = totalLikes(blogs)
        assert.strictEqual(result,2)
    })

    test('Of a bigger list is calculated right',() => {
        const blogs = [3,6,8,20,14,12,4,2,16]
        const result = totalLikes(blogs)
        assert.strictEqual(result, 85)
    }) 

})