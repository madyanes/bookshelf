/**
 * Global variables
 */
const books = []
const STORAGE_KEY = 'BOOK_APP'
const EVENT_STORED = 'stored-book'
const EVENT_RENDER = 'render-book'

/**
 * Fungsi-fungsi yang akan dijalankan setelah dokumen HTML dimuat
 */
document.addEventListener('DOMContentLoaded', () => {
    if (isStorageExist()) {
        loadDataFromStorage()
    }

    const bookForm = document.querySelector('form')
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault()
        addBook()
    })
})


/**
 * Kejadian kustom; Tampilkan semua buku dari local storage di konsol peramban
 */
document.addEventListener(EVENT_STORED, () => {
    console.info(localStorage.getItem(STORAGE_KEY))
})


/**
 * Kejadian kustom; Tampilkan semua buku di dokumen
 */
document.addEventListener(EVENT_RENDER, () => {
    const unreadBookElement = document.querySelector('#unread .book-item-container')
    unreadBookElement.innerHTML = ''

    for (const book of books) {
        const bookItemElement = createBookItemElement(book)
        unreadBookElement.innerHTML += bookItemElement
    }
})


/**
 * Periksa apakah browser mendukung local storage
 * @returns boolean
 */
const isStorageExist = () => {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage!')
        return false
    }
    return true
}


/**
 * Generator timestamp
 * @returns timestamp / current number of miliseconds (unix epoch)
 */
const generateId = () => {
    return +new Date()
}


/**
 * Generator objek buku
 * @param {Number} id ID buku
 * @param {String} title Judul buku
 * @param {String} author Penulis
 * @param {Number} year Tahun terbit
 * @param {Boolean} isComplete Status baca
 * @returns Objek buku
 */
const generateBookOject = (id, title, author, year, isComplete) => {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}


/**
 * Tambahkan objek buku ke dalam array dari buku
 */
const addBook = () => {
    const bookTitle = document.querySelector('#title').value
    const bookAuthor = document.querySelector('#author').value
    const bookYear = document.querySelector('#year').value

    const bookID = generateId()
    const bookObject = generateBookOject(bookID, bookTitle, bookAuthor, bookYear, false)
    books.push(bookObject)

    document.dispatchEvent(new Event(EVENT_RENDER))
    storeBook()
}


/**
 * Simpan array dari buku ke dalam local storage
 */
const storeBook = () => {
    if (isStorageExist()) {
        const bookArrayObjectToString = JSON.stringify(books)
        localStorage.setItem(STORAGE_KEY, bookArrayObjectToString)
        document.dispatchEvent(new Event(EVENT_STORED))
    }
}


/**
 * 
 * @param {Object} bookObject data buku dalam bentuk objek
 * @returns Susunan elemen tentang item buku dalam bentuk string
 */
const createBookItemElement = (bookObject) => {
    const divBookItem = `
        <div class="book-item" id="#">
            <div class="book-cover">
                <img src="img/book-cover-placeholder.png" alt="placeholder"></div>
            <div class="book-detail">
                <h3>${bookObject.title}</h3>
                <p>by ${bookObject.author}</p>
                <p>${bookObject.year}</p>
            </div>
        </div>
    `

    return divBookItem
}


/**
 * Masukkan semua data (data buku) ke dalam array buku
 */
const loadDataFromStorage = () => {
    const dataAsString = localStorage.getItem(STORAGE_KEY)
    const dataAsObject = JSON.parse(dataAsString)

    if (dataAsObject !== null) {
        for (const book of dataAsObject) {
            books.push(book)
        }
    }

    document.dispatchEvent(new Event(EVENT_RENDER))
}
