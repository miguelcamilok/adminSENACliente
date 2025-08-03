<template>
  <div class="container py-5">
    <div class="row g-5 justify-content-center">

      <!-- Tarjeta Áreas -->
      <div class="col-md-4" v-for="item in cards" :key="item.title">
        <div class="card h-100 border-0 shadow-lg rounded-4 bg-light hover-card">
          <div class="card-body text-center">
            <i :class="`bi ${item.icon} display-4 ${item.color} mb-3`"></i>
            <h5 class="card-title fw-bold">{{ item.title }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <router-link :to="item.route" :class="`btn w-100 ${item.btnClass}`">
              {{ item.button }}
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const cards = [
  {
    title: 'Áreas',
    description: 'Listado de áreas con sus profesores y cursos asignados.',
    route: '/areas',
    icon: 'bi-grid-fill',
    color: 'text-success',
    btnClass: 'btn-success',
    button: 'Ver Áreas',
  },
  {
    title: 'Profesores',
    description: 'Consulta los profesores registrados y sus asignaciones.',
    route: '/teachers',
    icon: 'bi-person-badge-fill',
    color: 'text-primary',
    btnClass: 'btn-primary',
    button: 'Ver Profesores',
  },
  {
    title: 'Centros de Formación',
    description: 'Consulta los centros de formación con cursos y profesores asociados.',
    route: '/trainingcenters',
    icon: 'bi-building',
    color: 'text-danger',
    btnClass: 'btn-danger',
    button: 'Ver Centros',
  },
  {
    title: 'Cursos',
    description: 'Revisa todos los cursos registrados y sus detalles.',
    route: '/courses',
    icon: 'bi-journal-code',
    color: 'text-warning',
    btnClass: 'btn-warning',
    button: 'Ver Cursos',
  },
  {
    title: 'Aprendices',
    description: 'Explora el listado de aprendices con su curso y computador asignado.',
    route: '/apprentices',
    icon: 'bi-people-fill',
    color: 'text-info',
    btnClass: 'btn-info text-white',
    button: 'Ver Aprendices',
  },
  {
    title: 'Computadores',
    description: 'Visualiza el inventario de computadores y su aprendiz asignado.',
    route: '/computers',
    icon: 'bi-pc-display-horizontal',
    color: 'text-dark',
    btnClass: 'btn-dark',
    button: 'Ver Computadores',
  }
]
</script>
