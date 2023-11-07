
const fs = require('fs')
const path = require('path')
const booksFilePath = path.join(__dirname, '..', 'models', 'books.json')

function getBooks() {
  return JSON.parse(fs.readFileSync(booksFilePath))
}

function saveBooks(books) {
  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2))
}

function readBooks(req, res) {
  const books = getBooks()
  res.json(books)
}

function readBook(req, res) {
  const id = Number(req.params.id)
  const books = JSON.parse(fs.readFileSync(booksFilePath))
  const book = books.find((book) => book.id === id)
  if (book) {
    res.json(book)
  } else {
    res.status(404).json({ message: 'Kitob topilmadi' })
  }
}

function createBook(req, res) {
  const { title, author } = req.body
  const books = JSON.parse(fs.readFileSync(booksFilePath))
  const bookId = books.length + 1
  const existingBook = books.find((book) => book.title === title)
  if (existingBook) {
    res.status(400).json({ message: 'Bu kitob allaqachon mavjud' })
  } else {
    const newBook = { id: bookId, title, author }
    books.push(newBook)
    saveBooks(books)
    res.json(newBook)
  }
}

function updateBook(req, res) {
  const id = Number(req.params.id)
  const { title, author } = req.body
  const books = getBooks()
  const bookIndex = books.findIndex((book) => book.id === id)
  if (bookIndex !== -1) {
    books[bookIndex] = { id, title, author }
    saveBooks(books)
    res.json(books[bookIndex])
  } else {
    res.status(404).json({ message: 'Kitob topilmadi' })
  }
}

function deleteBook(req, res) {
  const id = Number(req.params.id)
  const books = getBooks()
  const bookIndex = books.findIndex((book) => book.id === id)
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1)
    saveBooks(books)
    res.json({ message: "Kitob o'chirildi" })
  } else {
    res.status(404).json({ message: 'Kitob topilmadi' })
  }
}

module.exports = {
  readBooks,
  readBook,
  createBook,
  updateBook,
  deleteBook,
}
