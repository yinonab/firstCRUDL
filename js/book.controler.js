'use strict'

function onInit() {
    renderStatistic()
    renderBooks()
}

{/* <p> <button  class="btcard" onclick="onUpdateBook('${book.id}')">Update</button></p>
    <p><button class="btcard" onclick="onReadBook('${book.id}')">Details</button></p>
    <p><button class="btcard" title="Delete Book" class="btn-remove" onclick="onRemoveBook('${book.id}')">X</button></p> */}
function renderBooks() {
    var books = getBooks()
    var strCardHtml = books.map(book => `
    <div class="user-card">
        <p><strong>ID:</strong> ${book.id}</p>
        <p><strong>NAME:</strong> ${book.name}</p>
        <p><strong>PRICE<br></strong> ${book.Price}</p>
        <p><strong>RATE</strong> ${book.rate}</p>
    </div>
    `).join('')

    setElHtml('user-list', strCardHtml)
    var strHtml = books.map(book =>
        `
          <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.Price}</td>
            <td>${book.rate}</td>
            <td> <button onclick="onUpdateBook('${book.id}')">Update</button></td>
            <td><button onclick="onReadBook('${book.id}')">Details</button></td>
            <td><button title="Delete Book" class="btn-remove" onclick="onRemoveBook('${book.id}')">X</button></td>
          </tr>   
    `).join('')
    setElHtml('table-body', strHtml)
}
function onGrid() {
    console.log('hi');
    addClass('hidden', 'table-body')
    addClass('hidden', 'head')
    removeClass('hidden','card-container' )
}
function onTable() {
    removeClass('hidden', 'head')
    addClass('hidden','card-container' )
    removeClass('hidden', 'table-body')
}
function onAddBook(name, price) {
    var name = prompt('enter new book name :')
    var price = prompt('enter new price :')
    if (name && price) {
        const book = addBook(name, price)
        renderBooks()
    }
}
function onReadBook(bookId) {
    const book = getBookById(bookId)
    const elModal = document.querySelector('.modal')

    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4 span').innerText = book.Price
    elModal.querySelector('p').innerText = book.desc
    elModal.classList.add('open')
}
function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt('please enter new price', book.Price)
    if (newPrice && book.Price !== newPrice) {
        const book = updateBook(bookId, newPrice)
        renderBooks()
    }
}
function renderStatistic(){
    var stat =getBookCountByPriceMap()
    console.log('statistics:', stat)
    var strHtml =
        `
          <tr>
            <td>In Discount: ${stat.cheep}</td>
            <td> Affordable Price: ${stat.normal}</td>
            <td> Expensive: ${stat.expensive}</td>
          </tr>   
    `
    setElHtml('diagram', strHtml)
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
    flashMsg('Book Removed')
}
function onNextPage() {
    nextPage()
    renderBooks()
}

function onPrevPage() {
    prevPage()
    renderBooks()
}
function onSetFilterBy(ev,filterBy) { // { minSpeed: 74 }
    console.log('filterBy:', filterBy)
    ev.preventDefault()
    filterBy = setBookFilter(filterBy)
    renderBooks()
    var elInput=document.getElementById('searchInput')
    console.log('elInput:', elInput)
    elInput.value=''
    const queryParams = `?name=${filterBy.name}&price=${filterBy.price}&rate=${filterBy.rate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryParams

    window.history.pushState({ path: newUrl }, '', newUrl)
     
}
function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value
    const isDesc = document.querySelector('.sort-desc').checked

    if (!prop) return

    const sortBy = {}
    sortBy[prop] = (isDesc) ? -1 : 1 // { maxSpeed: 1 }

    console.log('sortBy', sortBy)

    // Shorter Syntax:
    // const sortBy = {
    //     [prop] : (isDesc)? -1 : 1
    // }

    setBookSort(sortBy)
    renderBooks()

}

function flashMsg(msg) {
    const elMsg = document.querySelector('.user-msg')

    elMsg.innerText = msg
    elMsg.classList.add('open')
    setTimeout(() => elMsg.classList.remove('open'), 3000)
}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('open')
}
