import * as barangModel from '../models/barangModel.js'

// GET /api/barang
export const getAll = async (req, res) => {
    try {
        const data = await barangModel.getAllBarang()

        return res.status(200).json({
            success: true,
            message: 'Data barang berhasil diambil',
            data
        })
    } catch (err) {
        console.error('Error getAll:', err)

        return res.status(500).json({
            success: false,
            message: 'Gagal mengambil data barang'
        })
    }
}

// GET /api/barang/:id
export const getOne = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: 'ID barang tidak valid'
            })
        }

        const data = await barangModel.getBarangById(id)

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Barang tidak ditemukan'
            })
        }

        return res.status(200).json({
            success: true,
            data
        })
    } catch (err) {
        console.error('Error getOne:', err)

        return res.status(500).json({
            success: false,
            message: 'Gagal mengambil detail barang'
        })
    }
}

// POST /api/barang
export const create = async (req, res) => {
    try {
        const { kode_barang, nama_barang, harga, stok } = req.body || {}

        if (
            !kode_barang ||
            !nama_barang ||
            harga == null ||
            stok == null
        ) {
            return res.status(400).json({
                success: false,
                message: 'Kode barang, nama barang, harga, dan stok wajib diisi'
            })
        }

        if (
            !Number.isFinite(Number(harga)) ||
            !Number.isInteger(Number(stok)) ||
            Number(harga) < 0 ||
            Number(stok) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: 'Harga harus berupa angka dan stok harus berupa bilangan bulat nonnegatif'
            })
        }

        const data = await barangModel.createBarang(req.body)

        return res.status(201).json({
            success: true,
            message: 'Barang berhasil ditambahkan',
            data
        })
    } catch (err) {
        console.error('Error create:', err)

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: 'Kode barang sudah digunakan'
            })
        }

        return res.status(500).json({
            success: false,
            message: 'Gagal menambahkan barang'
        })
    }
}

// PUT /api/barang/:id
export const update = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: 'ID barang tidak valid'
            })
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Data yang akan diperbarui wajib diisi'
            })
        }

        const ok = await barangModel.updateBarang(id, req.body)

        if (!ok) {
            return res.status(404).json({
                success: false,
                message: 'Barang tidak ditemukan'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Barang berhasil diperbarui'
        })
    } catch (err) {
        console.error('Error update:', err)

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: 'Kode barang sudah digunakan'
            })
        }

        return res.status(500).json({
            success: false,
            message: 'Gagal memperbarui barang'
        })
    }
}

// DELETE /api/barang/:id
export const remove = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: 'ID barang tidak valid'
            })
        }

        const ok = await barangModel.deleteBarang(id)

        if (!ok) {
            return res.status(404).json({
                success: false,
                message: 'Barang tidak ditemukan'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Barang berhasil dihapus'
        })
    } catch (err) {
        console.error('Error remove:', err)

        return res.status(500).json({
            success: false,
            message: 'Gagal menghapus barang'
        })
    }
}
