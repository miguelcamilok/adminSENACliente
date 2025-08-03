<template>
    <div class="container mb-3">
        <h4 class="mb-3 fw-bold text-primary-emphasis">
            Actualizar Profesor <span class="text-dark">#{{ form.id }}</span>
        </h4>

        <div class="card shadow-sm rounded-4 border border-2 border-light-subtle">
            <div class="card-body">
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <input v-model="form.name" type="text" class="form-control" placeholder="Nombre"/>
                        <input v-model="form.email" type="email" class="form-control mt-3" placeholder="Correo"/>
                        <!-- Campos ocultos para mantener coherencia con el FormRequest -->
                        <input type="hidden" v-model="form.area_id" />
                        <input type="hidden" v-model="form.training_center_id" />

                    </div>

                    <button type="submit" class="btn btn-success">
                        <i class="bi bi-save"></i> Actualizar Profesor
                    </button>
                    <router-link to="/teachers" class="btn btn-secondary ms-2">Cancelar</router-link>
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
    id: null,
    name: '',
    email: ''
})

const fetchTeacher = async () => {
    try {
        const response = await axios.get(`http://api.adminsena/api/teachers/${route.params.id}`)
        form.value = {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email
        }
    } catch (error) {
        console.error('Error al cargar el profesor:', error)
        alert('Error cargando los datos.')
    }
}

const submitForm = async () => {
    try {
        await axios.put(`http://api.adminsena/api/teachers/${form.value.id}`, {
            name: form.value.name,
            email: form.value.email
        })
        alert('Profesor actualizado correctamente.')
        router.push('/teachers')
    } catch (error) {
        console.error('Error al actualizar el profesor:', error)
        alert('No se pudo actualizar.')
    }
}

onMounted(fetchTeacher)
</script>
