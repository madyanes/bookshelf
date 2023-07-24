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

    const readBookElement = document.querySelector('#read .book-item-container')
    readBookElement.innerHTML = ''

    for (const book of books) {
        const bookItemElement = createBookItemElement(book)
        if (!book.isComplete)
            unreadBookElement.append(bookItemElement)
        else
            readBookElement.append(bookItemElement)
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
    const divBookItem = document.createElement('div')
    divBookItem.classList.add('book-item')

    const divBookCover = document.createElement('div')
    divBookCover.classList.add('book-cover')

    const imgPlaceholder = document.createElement('img')
    imgPlaceholder.setAttribute('src', 'img/book-cover-placeholder.png')
    imgPlaceholder.setAttribute('alt', 'Placeholder Cover Image')

    const divBookDetail = document.createElement('div')
    divBookDetail.classList.add('book-detail')

    const bookTitle = document.createElement('h3')
    bookTitle.innerText = bookObject.title

    const bookAuthor = document.createElement('p')
    bookAuthor.innerText = bookObject.author

    const bookYear = document.createElement('p')
    bookYear.innerText = bookObject.year

    const divButtonActions = document.createElement('div')
    divButtonActions.classList.add('button-actions')

    const buttonRead = document.createElement('button')
    buttonRead.classList.add('read')

    const buttonDelete = document.createElement('button')
    buttonDelete.classList.add('delete')
    buttonDelete.innerText = 'Hapus'

    divBookItem.append(divBookCover)
    divBookItem.append(divBookDetail)
    divBookItem.append(divButtonActions)

    divBookCover.append(imgPlaceholder)

    divBookDetail.append(bookTitle)
    divBookDetail.append(bookAuthor)
    divBookDetail.append(bookYear)

    divButtonActions.append(buttonRead)
    divButtonActions.append(buttonDelete)

    buttonDelete.addEventListener('click', () => {
        deleteBook(bookObject.id)
    })

    buttonRead.addEventListener('click', () => {
        markBookAsReadOrUnread(bookObject.id)
    })

    if (bookObject.isComplete) {
        buttonRead.innerText = 'Belum Selesai Dibaca'
    } else {
        buttonRead.innerText = 'Selesai Dibaca'
    }

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


/**
 * Pencarian buku berdasarkan ID buku
 * @param {Number} bookID ID buku
 * @returns mengembalikan buku, jika tidak ada kembalikan `null`
 */
const findBook = (bookID) => {
    for (const book of books) {
        if (book.id === bookID) {
            return book
        }
    }
    return null
}


/**
 * Tandai buku sebagai telah dibaca atau belum dibaca
 * @param {Number} bookID ID Buku
 * @returns undefined
 */
const markBookAsReadOrUnread = (bookID) => {
    const book = findBook(bookID)

    if (book === null) return;

    book.isComplete ? book.isComplete = false : book.isComplete = true
    document.dispatchEvent(new Event(EVENT_RENDER))
    storeBook()
}


/**
 * Hapus buku dari array dan local storage
 * @param {Number} bookID ID buku
 * @returns undefined
 */
const deleteBook = (bookID) => {
    const book = findBookIndex(bookID)

    if (!confirm(`Apakah kamu yakin menghapus buku ${books[book].title} dari aplikasi?`))
        return;

    if (book === -1) return;

    books.splice(book, 1)
    document.dispatchEvent(new Event(EVENT_RENDER))
    storeBook()
}


/**
 * Pencarian index buku di dalam array buku
 * @param {Number} bookID ID Buku
 * @returns mengembalikan index buku, atau -1 jika tidak ditemukan
 */
const findBookIndex = (bookID) => {
    for (const index in books) {
        if (books[index].id === bookID) {
            return index
        }
    }

    return -1
}
