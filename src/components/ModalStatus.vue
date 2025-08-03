<template>
  <div v-if="visible" class="modal-backdrop-blur">
    <div class="modal-content-loader">
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-success" role="status" style="width: 4rem; height: 4rem;"></div>
        <p class="mt-3">{{ loadingText }}</p>
      </div>

      <div v-else class="text-center animate__animated animate__fadeIn">
        <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
        <p class="mt-3 fs-5">{{ successText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const loading = ref(true)
const loadingText = ref('Procesando...')
const successText = ref('¡Operación exitosa!')
const onFinish = ref(() => {})

const show = ({ loadingText: lt, successText: st, onFinish: callback }) => {
  visible.value = true
  loading.value = true
  loadingText.value = lt
  successText.value = st
  onFinish.value = callback

  setTimeout(() => {
    loading.value = false

    setTimeout(() => {
      visible.value = false
      onFinish.value?.()
    }, 1000)
  }, 1000)
}

defineExpose({ show, visible })
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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
}

.animate__animated {
  animation-duration: 1s;
}
</style>
