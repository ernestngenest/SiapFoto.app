const express = require('express')
const { route } = require('./routers')
const router = require('./routers')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})