/**
 * Global variables
 */
const books = []

/**
 * Fungsi-fungsi yang akan dijalankan setelah dokumen HTML dimuat
 */
document.addEventListener('DOMContentLoaded', () => {
    isStorageExist()
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
