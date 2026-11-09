
import db from '../config/db.js'

// GET: Mengambil semua data barang
export const getAllBarang = async () => {
    const [rows] = await db.query(
        'SELECT * FROM barang ORDER BY id DESC'
    )

    return rows
}

// GET: Mengambil barang berdasarkan ID
export const getBarangById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM barang WHERE id = ?',
        [id]
    )

    return rows[0] || null
}

// POST: Menambahkan barang baru
export const createBarang = async (data) => {
    const sql = `
        INSERT INTO barang
        (kode_barang, nama_barang, kategori, harga, stok, satuan)
        VALUES (?, ?, ?, ?, ?, ?)
    `

    const [result] = await db.query(sql, [
        data.kode_barang,
        data.nama_barang,
        data.kategori || null,
        data.harga,
        data.stok,
        data.satuan || 'pcs'
    ])

    return {
        id: result.insertId,
        ...data,
        satuan: data.satuan || 'pcs'
    }
}

// PUT: Memperbarui data barang
export const updateBarang = async (id, data) => {
    const sql = `
        UPDATE barang SET
        kode_barang = ?,
        nama_barang = ?,
        kategori = ?,
        harga = ?,
        stok = ?,
        satuan = ?
        WHERE id = ?
    `

    // Ambil data lama
    const barangLama = await getBarangById(id)

    if (!barangLama) {
        return false
    }

    // Gabungkan data lama dengan data baru
    const barangBaru = {
        ...barangLama,
        ...data
    }

    const [result] = await db.query(sql, [
        barangBaru.kode_barang,
        barangBaru.nama_barang,
        barangBaru.kategori,
        barangBaru.harga,
        barangBaru.stok,
        barangBaru.satuan,
        id
    ])

    return result.affectedRows > 0
}

// DELETE: Menghapus barang berdasarkan ID
export const deleteBarang = async (id) => {
    const [result] = await db.query(
        'DELETE FROM barang WHERE id = ?',
        [id]
    )

    return result.affectedRows > 0
}
