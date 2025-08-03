<template>
  <div class="container mb-3">
    <h4 class="mb-3 fw-bold text-primary-emphasis">
      Actualizar Profesor <span class="text-dark">#{{ form.id }}</span>
    </h4>

    <div class="card shadow-sm rounded-4 border border-2 border-light-subtle">
      <div class="card-body">
        <form @submit.prevent="handleUpdateRequest">
          <div class="mb-3">
            <input v-model="form.name" type="text" class="form-control" placeholder="Nombre" />
            <input v-model="form.email" type="email" class="form-control mt-3" placeholder="Correo" />
            <input type="hidden" v-model="form.area_id" />
            <input type="hidden" v-model="form.training_center_id" />
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success" :disabled="!hasChanges()">
              <i class="bi bi-save"></i> Actualizar Profesor
            </button>
            <router-link to="/teachers" class="btn btn-secondary ms-2">Cancelar</router-link>
          </div>

        </form>
      </div>
    </div>

    <!-- Modales -->
    <ModalConfirm ref="confirmModal" />
    <ModalStatus ref="statusModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

// Modales reutilizables
import ModalConfirm from '../../components/ModalConfirm.vue'
import ModalStatus from '../../components/ModalStatus.vue'

const route = useRoute()
const router = useRouter()

const form = ref({
  id: null,
  name: '',
  email: '',
  area_id: '',
  training_center_id: ''
})
const originalForm = ref({})

// Refs para modales
const confirmModal = ref()
const statusModal = ref()

const fetchTeacher = async () => {
  try {
    const res = await axios.get(`http://api.adminsena/api/teachers/${route.params.id}`)
    form.value = {
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
      area_id: res.data.area_id,
      training_center_id: res.data.training_center_id
    }
    originalForm.value = { ...form.value }
  } catch (error) {
    console.error('Error al cargar el profesor:', error)
  }
}

const hasChanges = () => {
  return (
    form.value.name !== originalForm.value.name ||
    form.value.email !== originalForm.value.email ||
    form.value.area_id !== originalForm.value.area_id ||
    form.value.training_center_id !== originalForm.value.training_center_id
  )
}

const handleUpdateRequest = () => {
  if (hasChanges()) {
    confirmModal.value.open({
      title: '¿Actualizar profesor?',
      message: '¿Estás seguro de que deseas actualizar este registro?',
      onConfirm: submitForm
    })
  }
}

const submitForm = async () => {
  statusModal.value.show({
    loadingText: 'Actualizando profesor...',
    successText: '¡Profesor actualizado correctamente!',
    onFinish: () => router.push('/teachers')
  })

  try {
    await axios.put(`http://api.adminsena/api/teachers/${form.value.id}`, {
      name: form.value.name,
      email: form.value.email
    })
  } catch (error) {
    console.error('Error al actualizar:', error)
    statusModal.value.visible = false
  }
}

onMounted(fetchTeacher)
</script>
