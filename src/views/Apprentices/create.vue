<template>
  <div class="container mt-4">
    <h4 class="mb-4 fw-bold text-primary-emphasis">Crear un nuevo aprendiz</h4>

    <form @submit.prevent="handleConfirm">
      <div class="mb-3">
        <input v-model="form.name" type="text" class="form-control" placeholder="Ingrese el nombre del aprendiz"
          required />
        <input v-model="form.email" type="email" class="form-control mt-3" placeholder="Ingrese el email del aprendiz"
          required />
        <input v-model="form.cell_number" type="text" class="form-control mt-3"
          placeholder="Ingrese el número de teléfono" required />
      </div>

      <div class="mb-3">
        <select v-model="form.course_id" class="form-select" required>
          <option value="">Seleccione un curso</option>
          <option v-for="course in courses" :key="course.id" :value="course.id">
            {{ course.course_number }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <select v-model="form.computer_id" class="form-select" required>
          <option value="">Seleccione un computador</option>
          <option v-for="computer in computers" :key="computer.id" :value="computer.id">
            {{ computer.number }}
          </option>
        </select>
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-success">Guardar</button>
        <router-link to="/apprentices" class="btn btn-secondary">Cancelar</router-link>
      </div>
    </form>

    <!-- Error visual -->
    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>

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

const form = ref({
  name: '',
  email: '',
  cell_number: '',
  course_id: '',
  computer_id: ''
})

const courses = ref([])
const computers = ref([])
const error = ref(null)

const fetchSelects = async () => {
  try {
    const [a, c] = await Promise.all([
      axios.get('http://api.adminsena/api/courses'),
      axios.get('http://api.adminsena/api/computers')
    ])
    courses.value = a.data
    computers.value = c.data
  } catch (err) {
    error.value = 'Error cargando datos'
  }
}

const handleConfirm = () => {
  confirmModal.value.open({
    title: '¿Guardar aprendiz?',
    message: 'Confirma que deseas guardar este registro.',
    onConfirm: submitForm
  })
}

const submitForm = async () => {
  error.value = null

  statusModal.value.show({
    loadingText: 'Guardando aprendiz...',
    successText: '¡Aprendiz creado exitosamente!',
    onFinish: () => router.push('/apprentices')
  })

  try {
    await axios.post('http://api.adminsena/api/apprentices', form.value)
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
