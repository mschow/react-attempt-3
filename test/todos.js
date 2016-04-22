'use strict'

// import Promise from 'bluebird' change this
import chai from 'chai'
import supertest from 'supertest-as-promised'
import Todo from '../models/todo' // Change this
import app from '../app'

// Remove this
// Promise.promisifyAll(Todo)

const request = supertest(app)
const expect = chai.expect

describe('todos', () => {

  beforeEach(() => {
    return Todo.remove() // Change this
  })

  it('gets empty array with no todos', () => {
    return request.get('/api/todos')
      .expect(200, [])
  })

  it('gets a list of todos with a few todos', () => {
    return Promise
      .all([
        Todo.create({ name: 'foo' }), // Change this
        Todo.create({ name: 'bar' }), // Change this
        Todo.create({ name: 'hello' }) // Change this
      ])
      .then((todos) => {
        expect(todos).to.have.length(3)
        return request.get('/api/todos')
          .expect(200)
      })
      .then((response) => {
        expect(response.body).to.have.length(3)
        response.body.forEach((todo) => {
          expect(todo).to.have.keys('name', 'completed', 'id', 'updatedAt', 'createdAt') // Change this
        })
      })
  })

  it('creates a todo', () => {
    return request.post('/api/todos')
      .send({ name: 'foo', completed: true })
      .expect(201)
      .then((res) => {
        const todo = res.body
        expect(todo).to.have.property('name', 'foo')
        expect(todo).to.have.property('completed', true)
        expect(todo).to.have.property('id')
        return Todo.findOne({ _id: todo.id }).exec() // Change this
      })
      .then((todo) => {
        expect(todo).to.have.property('name', 'foo')
        expect(todo).to.have.property('completed', true)
      })
  })

  it('defaults created to false', () => {
    return request.post('/api/todos')
      .send({ name: 'foo' })
      .expect(201)
      .then((res) => {
        const todo = res.body
        expect(todo).to.have.property('completed', false)
      })
  })

  it('updates a todo', () => {
    let id
    return Todo.create({ name: 'foo' }) // Change this
      .then((todo) => {
        id = todo.id
        expect(todo.name).to.be.equal('foo')
        return request.put(`/api/todos/${todo.id}`)
          .send({ name: 'bar' })
          .expect(200)
      })
      .then(() => {
        return Todo.findOne({ _id: id }).exec() // Change this
      })
      .then((todo) => {
        expect(todo.name).to.be.equal('bar')
      })
  })

  it('deletes a todo', () => {
    let id
    return Todo.create({ name: 'bar' }) // Change this
      .then((todo) => {
        id = todo.id
        return request.delete(`/api/todos/${todo.id}`)
          .expect(204)
      })
      .then((todo) => {
        return Todo.findOne({ _id: id }).exec() // Change this
          .catch((err) => {
            expect(err).to.match(/not found/)
          })
      })
  })

  it('fails to update if id does not exist', () => {
    return request.put('/api/todos/1')
      .send({ name: 'won\'t update' })
      .expect(500)
  })

  it('fails to delete if id does not exist', () => {
    return request.delete('/api/todos/1')
      .expect(500)
  })

})
