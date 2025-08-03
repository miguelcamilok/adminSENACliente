<template>
  <div class="container py-5">
    <!-- Loader al cargar profesores -->
    <div v-if="loading" class="d-flex justify-content-center align-items-center" style="min-height: 300px;">
      <div class="text-center">
        <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status"></div>
        <p class="mt-3 fw-semibold">Cargando profesores...</p>
      </div>
    </div>

    <!-- Contenido -->
    <div v-else>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0 fw-bold text-primary-emphasis text-dark">Listado de Profesores</h3>
        <router-link to="/teachers/create" class="btn btn-dark">+</router-link>
      </div>

      <div v-if="teachers.length === 0" class="alert alert-info text-center">
        <i class="bi bi-info-circle"></i> No hay profesores registrados.
      </div>

      <div v-else class="table-responsive rounded-4 shadow-sm border border-2 border-light-subtle">
        <table class="table align-middle text-center mb-0">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Detalles</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="teacher in teachers" :key="teacher.id">
              <td class="fw-semibold">{{ teacher.id }}</td>
              <td class="fw-semibold">{{ teacher.name }}</td>
              <td class="fw-semibold">{{ teacher.email }}</td>
              <td>
                <router-link :to="`/teachers/${teacher.id}`" class="btn btn-light btn-sm rounded-circle" title="Ver">
                  <i class="bi bi-eye"></i>
                </router-link>
              </td>
              <td>
                <router-link :to="`/teachers/${teacher.id}/edit`" class="btn btn-warning btn-sm rounded-circle" title="Editar">
                  <i class="bi bi-pencil-square"></i>
                </router-link>
              </td>
              <td>
                <button @click="handleDeleteClick(teacher.id)" class="btn btn-danger btn-sm rounded-circle" title="Eliminar">
                  <i class="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Reutilizables -->
    <ModalConfirm ref="confirmModal" />
    <ModalStatus ref="statusModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ModalConfirm from '../../components/ModalConfirm.vue'
import ModalStatus from '../../components/ModalStatus.vue'

const teachers = ref([])
const loading = ref(true)

const confirmModal = ref()
const statusModal = ref()

const teacherToDelete = ref(null)

const fetchTeachers = async () => {
  try {
    const response = await axios.get('http://api.adminsena/api/teachers')
    teachers.value = response.data
  } catch (error) {
    console.error('Error al cargar los profesores:', error)
  } finally {
    setTimeout(() => (loading.value = false), 500)
  }
}

const handleDeleteClick = (id) => {
  teacherToDelete.value = id
  confirmModal.value.open({
    title: '¿Eliminar profesor?',
    message: '¿Estás seguro de eliminar este profesor?',
    onConfirm: deleteTeacher
  })
}

const deleteTeacher = async () => {
  statusModal.value.show({
    loadingText: 'Eliminando profesor...',
    successText: '¡Profesor eliminado correctamente!',
    onFinish: () => {
      teachers.value = teachers.value.filter(t => t.id !== teacherToDelete.value)
      teacherToDelete.value = null
    }
  })

  try {
    await axios.delete(`http://api.adminsena/api/teachers/${teacherToDelete.value}`)
  } catch (error) {
    console.error('Error al eliminar:', error)
    statusModal.value.visible = false
    alert('Error al eliminar el profesor.')
  }
}

onMounted(fetchTeachers)
</script>
