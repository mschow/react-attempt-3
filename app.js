'use strict'

import express from 'express'
import config from 'config'

const app = express()
const PORT = config.port

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
