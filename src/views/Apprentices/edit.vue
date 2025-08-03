<template>
  <div class="container mb-3">
    <h4 class="mb-3 fw-bold text-primary-emphasis">
      Actualizar Aprendiz <span class="text-dark">#{{ form.id }}</span>
    </h4>

    <div class="card shadow-sm rounded-4 border border-2 border-light-subtle">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <input
              type="text"
              v-model="form.name"
              class="form-control"
              placeholder="Nombre del aprendiz"
              required
            />
            <input
              type="email"
              v-model="form.email"
              class="form-control mt-3"
              placeholder="Correo electrónico"
              required
            />
            <input
              type="text"
              v-model="form.cell_number"
              class="form-control mt-3"
              placeholder="Número de teléfono"
              required
            />
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success">
              <i class="bi bi-save"></i> Actualizar Aprendiz
            </button>
            <router-link to="/apprentices" class="btn btn-secondary">Cancelar</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const form = ref({
  id: '',
  name: '',
  email: '',
  cell_number: ''
})

const fetchApprentice = async () => {
  try {
    const response = await axios.get(`http://api.adminsena/api/apprentices/${route.params.id}`)
    Object.assign(form.value, response.data)
  } catch (error) {
    alert('Error al cargar aprendiz')
    console.error(error)
  }
}

const submitForm = async () => {
  try {
    await axios.put(`http://api.adminsena/api/apprentices/${form.value.id}`, form.value)
    router.push('/apprentices')
  } catch (error) {
    alert('Error al actualizar aprendiz')
    console.error(error)
  }
}

onMounted(fetchApprentice)
</script>
