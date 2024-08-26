const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const config = require("../utils/config");

const Blog = require("../models/blog");
const api = supertest(app);

const Blogs = [
  {
    title: "Mindset",
    author: "socrates",
    url: "http:/many.com",
    likes: 24,
  },
  {
    title: "Return of Zeus",
    author: "achimedes",
    url: "http://remin.za",
    likes: 12,
  },
];

beforeEach(async () => {
  Blog.deleteMany({});
  let blogObject = new Note(Blogs[0])
  await blogObject.save()
  let blogObject = new Note(Blogs[1])
  await blogObject.save()
});

describe('HTTP GET requests', async()=>{
    test('HTTP GET request to blog url', async()=>{
        let result = await api
                        .get('api/blogs')
                        .expect(200)
                        .expect('Content-type:', /application\/json/)
    })
})

after(async () => {
  await mongoose.connection.close();
  console.log("Closed connection");
});
