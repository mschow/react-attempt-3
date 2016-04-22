'use strict'

import express from 'express'

const { Router } = express
const todosRouter = new Router()

const todos = []

todosRouter.get('/', (req, res, next) => {
  res.json(todos)
})

export default todosRouter
