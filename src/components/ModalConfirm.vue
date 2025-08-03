<template>
  <div class="modal fade" ref="modalRef" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="close">Cancelar</button>
          <button class="btn btn-success" @click="confirm">Sí, continuar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'

const modalRef = ref(null)
let modalInstance = null

const title = ref('¿Estás seguro?')
const message = ref('¿Deseas continuar con esta acción?')
let confirmCallback = () => {}

onMounted(() => {
  modalInstance = new bootstrap.Modal(modalRef.value)
})

const open = ({ title: t, message: m, onConfirm }) => {
  title.value = t || title.value
  message.value = m || message.value
  confirmCallback = onConfirm
  modalInstance.show()
}

const close = () => {
  modalInstance.hide()
}

const confirm = () => {
  modalInstance.hide()
  if (confirmCallback) confirmCallback()
}

defineExpose({ open })
</script>


<style scoped>
.modal-backdrop-blur {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content-loader {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
}
</style>
