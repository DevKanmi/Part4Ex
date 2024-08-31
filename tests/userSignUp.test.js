const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const config = require("../utils/config");

const User = require("../models/signUpSchema");
const api = supertest(app);

beforeEach(async()=>{
   await User.deleteMany({}) //Clears the database anything we want to use it
})

test('Checks if Invalid user is Created', async()=>{
    const user = {
        username: "ma",
        name: "Mannie",
        password: "Together"
    }

   const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-type', /application\/json/)

    assert.strictEqual(response.body.error,'Min length required')
    
})






after(async()=>{
    await mongoose.connection.close()
})