'use strict'

import express from 'express'
import Todo from '../lib/todos'

const { Router } = express
const todosRouter = new Router()

// GET /api/todos
// Retrieves all todos
todosRouter.get('/', (req, res, next) => {
  Todo.find((err, todos) => {
    if (err) return next(err)
    res.json(todos)
  })
})

// POST /api/todos
// Creates a new todo. Example body:
// {
//   "name": "{todo name}",
//   "completed": false
// }
todosRouter.post('/', (req, res, next) => {
  Todo.create(req.body, (err, todo) => {
    if (err) return next(err)
    // We set the status to 201 to follow rest guidelines. 201 means "Created"
    res.status(201).json(todo)
  })
})

// GET /api/todos/:id
// Retrieves a single todo
todosRouter.get('/:id', (req, res, next) => {
  Todo.findOne(req.params.id, (err, todo) => {
    if (err) return next(err)
    res.json(todo)
  })
})

// PUT /api/todos/:id
// Updates a todo
// {
//   "name": "{updated name}",
//   "completed": true
// }
todosRouter.put('/:id', (req, res, next) => {
  Todo.update(req.params.id, req.body, (err, todo) => {
    if (err) return next(err)
    res.json(todo)
  })
})

// DELETE /api/todos/:id
// Deletes a todo
todosRouter.delete('/:id', (req, res, next) => {
  Todo.delete(req.params.id, (err) => {
    if (err) return next(err)
    // We just a status 204 to mean "No Content".
    res.sendStatus(204)
  })
})

export default todosRouter
