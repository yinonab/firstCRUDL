'use strict'

const STORAGE_KEY = 'bookDB'
var gFilterBy = { name :'', rate: 5 , price:300 }
var gNames = [
    'Harry Pother',
    'Stay close',
    'Red Alert',
    'Slow Horses',
    'The Stranger',
    'jeck reacher',
    'Win',
    'I will Find You',
    'Safe',
    'Hold tight',
    'The Five',
    'Fool Me Once',
]
var gBooks
const PAGE_SIZE = 6
var gPageIdx = 0



_createBooks()


function getBooks() {
    var books = gBooks.filter(book =>
        book.name.toLowerCase().includes(gFilterBy.name.toLowerCase()) &&
        book.rate<=gFilterBy.rate&&
        book.Price<=gFilterBy.price
        )
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    console.log('books:', books)
    return books
}
function nextPage() {
    if (gBooks===[])return
    gPageIdx++
    if(gPageIdx * PAGE_SIZE > gBooks.length-gPageIdx) gPageIdx = 0
}
function prevPage() {
    if (gBooks===[])return

    gPageIdx--
    if(gPageIdx * PAGE_SIZE <gBooks.length) gPageIdx = 0
}
function addBook(name,price) {   //create
    const book = _createBook(name,price)
    gBooks.unshift(book)
    _saveBookToStorage()
    return book
}
function getBookById(bookId) {            // Read   
    const book = gBooks.find(book => bookId === book.id)
    return book
}
function getBookCountByPriceMap() {
    const BookCountByPriceMap = gBooks.reduce((map, book) => {
    if (book.Price < 40) map.cheep++
    else if (book.Price < 80) map.normal++
    else map.expensive++
    return map
    }, { cheep: 0, normal: 0, expensive: 0 })
    console.log('BookCountByPriceMap:', BookCountByPriceMap)
    return BookCountByPriceMap
    }

function updateBook(bookId, newPrice) {  //update
    const book = gBooks.find(book => bookId === book.id)
    book.Price = newPrice
    _saveBookToStorage()
    return book
}
function removeBook(bookId) {  ///delate
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBookToStorage
}

function setBookFilter(FilterBy = {}) {
    console.log('filterByt:', FilterBy)
    if (FilterBy.name !== undefined) gFilterBy.name = FilterBy.name
    if (FilterBy.rate !== undefined) gFilterBy.rate = FilterBy.rate
    if (FilterBy.price !== undefined) gFilterBy.price = FilterBy.price
    console.log('filterByt:', FilterBy)
    return gFilterBy
}

function setBookSort(sortBy = {}) {
    if (sortBy.price !== undefined)
        gBooks.sort((b1, b2) => (b1.Price - b2.Price) * sortBy.price)
    if (sortBy.rate !== undefined)
        gBooks.sort((b1, b2) => (b1.rate - b2.rate) * sortBy.rate)
    if (sortBy.name !== undefined)
    gBooks.sort((b1,b2)=>b1.name.localeCompare(b2.name)*sortBy.name)

}
function getNames(){
    return gNames
}




function _createBook(name,Price= getRandomIntInclusive(10, 150)) {
    return {
        id: makeId(),
        name,
        Price,
        desc: makeLorem(),
        rate:getRandomIntInclusive(1, 5)
    }
}
function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < gNames.length; i++) {
            var name = gNames[i]
            books.push(_createBook(name))
        }
        console.log('books:', books)
    }
    gBooks = books
    _saveBookToStorage()
}
function _saveBookToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}