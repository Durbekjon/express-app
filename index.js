const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const booksRoute = require('./routes/booksRoute') 

app.use(booksRoute)

app.listen(port, () => {
  console.log(`Server port ${port} da ishlayapti`)
})
