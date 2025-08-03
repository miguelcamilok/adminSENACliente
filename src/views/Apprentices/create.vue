<template>
  <div class="container mt-4">
    <h4 class="mb-4 fw-bold text-primary-emphasis">Crear un nuevo aprendiz</h4>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          placeholder="Ingrese el nombre del aprendiz"
          required
        />
        <input
          v-model="form.email"
          type="email"
          class="form-control mt-3"
          placeholder="Ingrese el email del aprendiz"
          required
        />
        <input
          v-model="form.cell_number"
          type="text"
          class="form-control mt-3"
          placeholder="Ingrese el número de teléfono"
          required
        />
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  cell_number: '',
  course_id: '',
  computer_id: '',
})

const courses = ref([])
const computers = ref([])

const fetchData = async () => {
  try {
    const [resCourses, resComputers] = await Promise.all([
      axios.get('http://api.adminsena/api/courses'),
      axios.get('http://api.adminsena/api/computers'),
    ])
    courses.value = resCourses.data
    computers.value = resComputers.data
  } catch (error) {
    console.error('Error al cargar cursos o computadores:', error)
  }
}

const submitForm = async () => {
  try {
    await axios.post('http://api.adminsena/api/apprentices', form.value)
    router.push('/apprentices')
  } catch (error) {
    alert('Error al guardar el aprendiz.')
    console.error(error)
  }
}

onMounted(fetchData)
</script>
