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
