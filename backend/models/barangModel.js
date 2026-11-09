
import db from '../config/db.js'

// GET: Mengambil semua data produk
export const getAllBarang = async () => {
    const [rows] = await db.query(
        'SELECT * FROM produk ORDER BY id DESC'
    )

    return rows
}

// GET: Mengambil produk berdasarkan ID
export const getBarangById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM produk WHERE id = ?',
        [id]
    )

    return rows[0] || null
}

// POST: Menambahkan produk baru
export const createBarang = async (data) => {
    const sql = `
        INSERT INTO produk
        (sku, nama_produk, harga, stok, deskripsi)
        VALUES (?, ?, ?, ?, ?)
    `

    const [result] = await db.query(sql, [
        data.sku ?? data.kode_barang,
        data.nama_produk ?? data.nama_barang,
        data.harga,
        data.stok,
        data.deskripsi || null
    ])

    return {
        id: result.insertId,
        ...data
    }
}

// PUT: Memperbarui produk
export const updateBarang = async (id, data) => {
    const produkLama = await getBarangById(id)

    if (!produkLama) {
        return false
    }

    const produkBaru = {
        ...produkLama,
        sku: data.sku ?? data.kode_barang ?? produkLama.sku,
        nama_produk: data.nama_produk ?? data.nama_barang ?? produkLama.nama_produk,
        harga: data.harga ?? produkLama.harga,
        stok: data.stok ?? produkLama.stok,
        deskripsi: data.deskripsi ?? produkLama.deskripsi
    }

    const sql = `
        UPDATE produk SET
        sku = ?,
        nama_produk = ?,
        harga = ?,
        stok = ?,
        deskripsi = ?
        WHERE id = ?
    `

    const [result] = await db.query(sql, [
        produkBaru.sku,
        produkBaru.nama_produk,
        produkBaru.harga,
        produkBaru.stok,
        produkBaru.deskripsi,
        id
    ])

    return result.affectedRows > 0
}

// DELETE: Menghapus produk
export const deleteBarang = async (id) => {
    const [result] = await db.query(
        'DELETE FROM produk WHERE id = ?',
        [id]
    )

    return result.affectedRows > 0
}
