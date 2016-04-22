'use strict'

import { renderToString } from 'react-dom/server'
import Todo from '../models/todo'
import client from '../client/root'

export default function serverRendered(req, res, next) {

  Todo.find().exec().then((todos) => {

    const initialState = {
      todos: {
        error: null,
        items: todos
      },
      filter: 'ALL'
    }

    const appState = JSON.stringify(initialState)
    const appHtml = renderToString(client(initialState))

    const html = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>React Todo App</title>
        </head>
        <body>
          <script>window.__INITIAL_STATE__ = ${appState}</script>
          <div id="root">${appHtml}</div>
          <script src="bundle.js"></script>
        </body>
      </html>
    `
    res.set('Content-Type', 'text/html')
    res.send(html)
  }).catch(next)
}
