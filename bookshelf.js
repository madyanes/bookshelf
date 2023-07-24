/**
 * Global variables
 */
const books = []
const STORAGE_KEY = 'BOOK_APP'

/**
 * Fungsi-fungsi yang akan dijalankan setelah dokumen HTML dimuat
 */
document.addEventListener('DOMContentLoaded', () => {
    isStorageExist()

    const bookForm = document.querySelector('form')
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault()
        addBook()
    })
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

    storeBook()
}


/**
 * Simpan array dari buku ke dalam local storage
 */
const storeBook = () => {
    if (isStorageExist()) {
        const bookArrayObjectToString = JSON.stringify(books)
        localStorage.setItem(STORAGE_KEY, bookArrayObjectToString)
    }
}
