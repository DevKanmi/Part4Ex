const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const config = require("../utils/config");

const Blog = require("../models/blog");
const blog = require("../models/blog");
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

  let blogObject; //Makes this objects available in other test
beforeEach(async () => {
  await Blog.deleteMany({});
  blogObject = new Blog(Blogs[0])
  await blogObject.save()
  blogObject = new Blog(Blogs[1])
  await blogObject.save()
});

describe('HTTP GET requests', async()=>{
    test('HTTP GET request to blog url retuns req length', async()=>{
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, Blogs.length)
    })

    test('Post returns required format', async()=>{
        const response = await Blog.findById(blogObject._id)
        const resToJson = response.toJSON() //toJson is used because it triggers any transformation made in our schemas
        console.log(resToJson)

        assert.strictEqual(resToJson.hasOwnProperty('id'), true, 'Response should have an id property');
      })
})

test('HTTP POST requests', async()=>{
  const newBlogpost = new Blog(Blogs[0])
    await api
      .post('/api/blogs/')
      .send(newBlogpost)
      .expect(201)
      .expect('Content-type', /application\/json/)
   
      const response = await api.get('/api/blogs')
      console.log(response.body.length)
      assert.strictEqual(response.body.length, Blogs.length+1)
})

//4.11 Verify likes return 0 if no likes
test('Likes return 0', async() =>{
  const newBlogPost = new Blog (
    {
      title: "The alchemist",
      author: "Murphy",
      url: "http://alchemist.br",
    }
  )

  await api
    .post('/api/blogs')
  
  const response = await api.get('/api/blogs')
  const likes = response.body.map(like =>like.likes)
  console.log(likes);
  
  assert(likes.includes(0))

      
  
})


after(async () => {
  await mongoose.connection.close();
  console.log("Closed connection");
});
