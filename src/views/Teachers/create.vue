<template>
  <div class="container mt-4">
    <h4 class="mb-4">Crear un nuevo profesor</h4>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <input v-model="form.name" type="text" class="form-control" placeholder="Ingrese el nombre" required>
        <input v-model="form.email" type="email" class="form-control mt-3" placeholder="Ingrese el email" required>
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

    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>
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
  area_id: '',
  training_center_id: ''
})

const areas = ref([])
const trainingCenters = ref([])
const error = ref(null)

const fetchSelects = async () => {
  try {
    const areasResponse = await axios.get('http://api.adminsena/api/areas')
    const centersResponse = await axios.get('http://api.adminsena/api/trainingcenters')

    areas.value = areasResponse.data
    trainingCenters.value = centersResponse.data
  } catch (err) {
    error.value = 'Error cargando datos'
  }
}

const submitForm = async () => {
  try {
    await axios.post('http://api.adminsena/api/teachers', form.value)
    router.push('/teachers')
  } catch (err) {
    if (err.response && err.response.data && err.response.data.errors) {
      error.value = Object.values(err.response.data.errors).flat().join(', ')
    } else {
      error.value = 'No se pudo guardar el profesor.'
    }
  }
}

onMounted(fetchSelects)
</script>
