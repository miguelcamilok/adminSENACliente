<template>
  <div v-if="loading" class="d-flex justify-content-center align-items-center" style="min-height: 300px;">
    <div class="text-center">
      <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status"></div>
      <p class="mt-3 fw-semibold">Cargando profesores...</p>
    </div>
  </div>

  <div class="container"  v-else>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0 fw-bold text-primary-emphasis text-dark">Listado de Aprendices</h3>
      <router-link to="/apprentices/create" class="btn btn-dark">+</router-link>
    </div>

    <div v-if="apprentices.length === 0" class="alert alert-info text-center">
      <i class="bi bi-info-circle"></i> No hay aprendices registrados.
    </div>

    <div v-else class="table-responsive rounded-4 shadow-sm border border-2 border-light-subtle">
      <table class="table align-middle text-center mb-0">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Gmail</th>
            <th>Teléfono</th>
            <th>Ver</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="apprentice in apprentices" :key="apprentice.id">
            <td class="fw-semibold">{{ apprentice.id }}</td>
            <td class="fw-semibold">{{ apprentice.name }}</td>
            <td class="fw-semibold">{{ apprentice.email }}</td>
            <td class="fw-semibold">{{ apprentice.cell_number }}</td>
            <td>
              <router-link :to="`/apprentices/${apprentice.id}`" class="btn btn-light btn-sm rounded-circle"
                title="Ver">
                <i class="bi bi-eye"></i>
              </router-link>
            </td>
            <td>
              <router-link :to="`/apprentices/${apprentice.id}/edit`" class="btn btn-warning btn-sm rounded-circle"
                title="Editar">
                <i class="bi bi-pencil-square"></i>
              </router-link>
            </td>
            <td>
              <button @click="deleteApprentice(apprentice.id)" class="btn btn-danger btn-sm rounded-circle"
                title="Eliminar">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apprentices = ref([])
const loading = ref(true)

const fetchApprentices = async () => {
  try {
    const response = await axios.get('http://api.adminsena/api/apprentices')
    apprentices.value = response.data
  } catch (error) {
    console.error('Error al cargar aprendices:', error)
  } finally {
    // Forzar duración del loader por 10 segundos
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
}

const deleteApprentice = async (id) => {
  if (!confirm('¿Seguro que quieres eliminar este aprendiz?')) return

  try {
    await axios.delete(`http://api.adminsena/api/apprentices/${id}`)
    apprentices.value = apprentices.value.filter(a => a.id !== id)
  } catch (error) {
    alert('Error eliminando el aprendiz.')
    console.error(error)
  }
}

onMounted(fetchApprentices)
</script>
