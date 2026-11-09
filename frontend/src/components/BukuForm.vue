<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: { type: Object, required: true },
  isEdit: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits([" update:modelValue", "submit"]);

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <form
    @submit.prevent="emit('submit')"
    class="bg-white shadow-md rounded-xl p-6 space-y-5 border border-gray-100"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- ISBN -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          ISBN <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.isbn"
          type="text"
          required
          placeholder="Contoh: 978-602-03-3295-6"
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
        />
      </div>

      <!-- Judul Buku -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Judul Buku <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.judul"
          type="text"
          required
          placeholder="Masukkan judul buku"
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
        />
      </div>

      <!-- Pengarang -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Pengarang <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.pengarang"
          type="text"
          required
          placeholder="Nama penulis / pengarang"
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
        />
      </div>

      <!-- Penerbit -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Penerbit
        </label>
        <input
          v-model="form.penerbit"
          type="text"
          placeholder="Nama penerbit"
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
        />
      </div>

      <!-- Tahun Terbit -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Tahun Terbit <span class="text-red-500">*</span>
        </label>
        <input
          v-model.number="form.tahun"
          type="number"
          required
          min="1900"
          max="2099"
          placeholder="Contoh: 2024"
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
        />
      </div>

      <!-- Stok -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Stok Buku <span class="text-red-500">*</span>
        </label>
        <input
          v-model.number="form.stok"
          type="number"
          required
          min="0"
          placeholder="Jumlah stok tersedia"
          class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
        />
      </div>
    </div>

    <div class="pt-2">
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition duration-150"
      >
        {{
          loading
            ? "Menyimpan Data..."
            : isEdit
              ? "Update Data Buku"
              : "Simpan Buku Baru"
        }}
      </button>
    </div>
  </form>
</template>
