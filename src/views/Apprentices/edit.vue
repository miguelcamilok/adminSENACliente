<template>
  <div class="container mb-3">
    <h4 class="mb-3 fw-bold text-primary-emphasis">
      Actualizar Aprendiz <span class="text-dark">#{{ form.id }}</span>
    </h4>

    <div class="card shadow-sm rounded-4 border border-2 border-light-subtle">
      <div class="card-body">
        <form @submit.prevent="handleUpdateRequest">
          <div class="mb-3">
            <input type="text" v-model="form.name" class="form-control" placeholder="Nombre del aprendiz" required />
            <input type="email" v-model="form.email" class="form-control mt-3" placeholder="Correo electrónico"
              required />
            <input type="text" v-model="form.cell_number" class="form-control mt-3" placeholder="Número de teléfono"
              required />
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success" :disabled="!hasChanges()">
              <i class="bi bi-save"></i> Actualizar Aprendiz
            </button>
            <router-link to="/teachers" class="btn btn-secondary ms-2">Cancelar</router-link>
          </div>
        </form>
      </div>
    </div>
    <ModalConfirm ref="confirmModal" />
    <ModalStatus ref="statusModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import ModalConfirm from '../../components/ModalConfirm.vue'
import ModalStatus from '../../components/ModalStatus.vue'

const route = useRoute()
const router = useRouter()

const form = ref({
  id: '',
  name: '',
  email: '',
  cell_number: ''
})
const originalForm = ref({})

// Refs para modales
const confirmModal = ref()
const statusModal = ref()

const fetchApprentice = async () => {
  try {
    const res = await axios.get(`http://api.adminsena/api/apprentices/${route.params.id}`)
    form.value = {
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
      cell_number: res.data.cell_number,
    }
    originalForm.value = { ...form.value }
  } catch (error) {
    console.error('Error al cargar el aprendiz:', error)
  }
}

const hasChanges = () => {
  return (
    form.value.name !== originalForm.value.name ||
    form.value.email !== originalForm.value.email ||
    form.value.cell_number !== originalForm.value.cell_number
  )
}

const handleUpdateRequest = () => {
  if (hasChanges()) {
    confirmModal.value.open({
      title: '¿Actualizar aprendiz?',
      message: '¿Estás seguro de que deseas actualizar este registro?',
      onConfirm: submitForm
    })
  }
}

const submitForm = async () => {
  statusModal.value.show({
    loadingText: 'Actualizando aprendiz...',
    successText: '¡Aprendiz actualizado correctamente!',
    onFinish: () => router.push('/apprentices')
  })

  try {
    await axios.put(`http://api.adminsena/api/apprentices/${form.value.id}`, {
      name: form.value.name,
      email: form.value.email
    })
  } catch (error) {
    console.error('Error al actualizar:', error)
    statusModal.value.visible = false
  }
}

onMounted(fetchApprentice)
</script>
