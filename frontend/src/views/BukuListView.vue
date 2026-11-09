<script setup>
import { ref, computed, onMounted } from "vue";
import bukuService from "../services/bukuService.js";

const buku = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");

const fetchData = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await bukuService.getAll();
    buku.value = res.data.data;
  } catch (e) {
    error.value =
      e.response?.data?.message ||
      "Gagal memuat data dari server. Pastikan backend aktif.";
  } finally {
    loading.value = false;
  }
};

const hapus = async (id, judul) => {
  if (!confirm(`Yakin ingin menghapus buku "${judul}"?`)) return;
  try {
    await bukuService.remove(id);
    fetchData();
  } catch (e) {
    alert("Gagal menghapus buku: " + (e.response?.data?.message || e.message));
  }
};

// Fitur pencarian berdasarkan judul, pengarang, penerbit, atau ISBN
const filteredBuku = computed(() => {
  if (!searchQuery.value.trim()) return buku.value;
  const q = searchQuery.value.toLowerCase();
  return buku.value.filter(
    (b) =>
      b.judul?.toLowerCase().includes(q) ||
      b.pengarang?.toLowerCase().includes(q) ||
      b.penerbit?.toLowerCase().includes(q) ||
      b.isbn?.toLowerCase().includes(q),
  );
});

// Hitung total stok keseluruhan buku
const totalStok = computed(() => {
  return buku.value.reduce((acc, item) => acc + (Number(item.stok) || 0), 0);
});

onMounted(fetchData);
</script>

<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6">
    <!-- Header & Tombol Tambah -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          Katalog Buku Perpustakaan
        </h1>
        <p class="text-sm text-gray-500">
          Kelola data koleksi buku, tahun terbit, dan ketersediaan stok
        </p>
      </div>
      <RouterLink
        to="/buku/create"
        class="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition"
      >
        + Tambah Buku
      </RouterLink>
    </div>

    <!-- Ringkasan Dashboard & Pencarian -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div
        class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
      >
        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase">
            Total Judul Buku
          </p>
          <p class="text-2xl font-bold text-gray-800">{{ buku.length }}</p>
        </div>
        <span
          class="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full"
          >Koleksi</span
        >
      </div>

      <div
        class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
      >
        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase">
            Total Eksemplar / Stok
          </p>
          <p class="text-2xl font-bold text-emerald-600">{{ totalStok }}</p>
        </div>
        <span
          class="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
          >Eksemplar</span
        >
      </div>

      <!-- Kotak Pencarian -->
      <div
        class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari judul, ISBN, pengarang..."
          class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        />
      </div>
    </div>

    <!-- State Loading -->
    <div
      v-if="loading"
      class="bg-white shadow-sm rounded-xl p-12 text-center text-gray-500"
    >
      Memuat data katalog buku...
    </div>

    <!-- State Error -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex justify-between items-center"
    >
      <span>{{ error }}</span>
      <button
        @click="fetchData"
        class="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
      >
        Coba Lagi
      </button>
    </div>

    <!-- State Kosong -->
    <div
      v-else-if="filteredBuku.length === 0"
      class="bg-white shadow-sm rounded-xl p-12 text-center text-gray-500"
    >
      Tidak ada data buku yang ditemukan.
    </div>

    <!-- Tabel Data Buku (Responsif) -->
    <div
      v-else
      class="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                ISBN
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Judul Buku
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Pengarang
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Penerbit
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Tahun
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Stok
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="b in filteredBuku"
              :key="b.id"
              class="hover:bg-gray-50 transition"
            >
              <td
                class="px-4 py-3 text-sm font-mono text-gray-700 whitespace-nowrap"
              >
                {{ b.isbn }}
              </td>
              <td class="px-4 py-3 text-sm font-medium text-gray-900">
                {{ b.judul }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-700">
                {{ b.pengarang }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">
                <span
                  class="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full"
                >
                  {{ b.penerbit || "-" }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-center text-gray-700">
                {{ b.tahun }}
              </td>
              <td class="px-4 py-3 text-sm text-center">
                <span
                  :class="
                    b.stok > 5
                      ? 'bg-green-100 text-green-700'
                      : b.stok > 0
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                  "
                  class="inline-block font-semibold text-xs px-2.5 py-1 rounded-full"
                >
                  {{ b.stok }}
                </span>
              </td>
              <td
                class="px-4 py-3 text-sm text-center whitespace-nowrap space-x-2"
              >
                <RouterLink
                  :to="`/buku/edit/${b.id}`"
                  class="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-md transition"
                >
                  Edit
                </RouterLink>
                <button
                  @click="hapus(b.id, b.judul)"
                  class="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-md transition"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
