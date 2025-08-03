<template>
  <div class="container mt-4">
    <h4 class="mb-4 fw-bold text-primary-emphasis">Crear un nuevo profesor</h4>

    <form @submit.prevent="handleConfirm">
      <div class="mb-3">
        <input v-model="form.name" type="text" class="form-control" placeholder="Ingrese el nombre" required />
        <input v-model="form.email" type="email" class="form-control mt-3" placeholder="Ingrese el email" required />
      </div>

      <div class="mb-3">
        <select v-model="form.area_id" class="form-select" required>
          <option value="">Seleccione un área</option>
          <option v-for="area in areas" :key="area.id" :value="area.id">{{ area.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <select v-model="form.training_center_id" class="form-select" required>
          <option value="">Seleccione un centro de formación</option>
          <option v-for="center in trainingCenters" :key="center.id" :value="center.id">{{ center.name }}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-success">Guardar</button>
      <router-link to="/teachers" class="btn btn-secondary ms-2">Cancelar</router-link>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

    <!-- Modales reutilizables -->
    <ModalConfirm ref="confirmModal" />
    <ModalStatus ref="statusModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Componentes reutilizables
import ModalConfirm from '../../components/ModalConfirm.vue'
import ModalStatus from '../../components/ModalStatus.vue'

const router = useRouter()

// Refs para los modales
const confirmModal = ref()
const statusModal = ref()

// Formulario
const form = ref({
  name: '',
  email: '',
  area_id: '',
  training_center_id: ''
})

// Datos select
const areas = ref([])
const trainingCenters = ref([])
const error = ref(null)

const fetchSelects = async () => {
  try {
    const [a, c] = await Promise.all([
      axios.get('http://api.adminsena/api/areas'),
      axios.get('http://api.adminsena/api/trainingcenters')
    ])
    areas.value = a.data
    trainingCenters.value = c.data
  } catch (err) {
    error.value = 'Error cargando datos'
  }
}

const handleConfirm = () => {
  confirmModal.value.open({
    title: '¿Guardar profesor?',
    message: 'Confirma que deseas guardar este registro.',
    onConfirm: submitForm
  })
}

const submitForm = async () => {
  error.value = null

  statusModal.value.show({
    loadingText: 'Guardando profesor...',
    successText: '¡Profesor creado exitosamente!',
    onFinish: () => router.push('/teachers')
  })

  try {
    await axios.post('http://api.adminsena/api/teachers', form.value)
  } catch (err) {
    statusModal.value.visible = false
    if (err.response?.data?.errors) {
      error.value = Object.values(err.response.data.errors).flat().join(', ')
    } else {
      error.value = 'No se pudo guardar el profesor.'
    }
  }
}

onMounted(fetchSelects)
</script>
