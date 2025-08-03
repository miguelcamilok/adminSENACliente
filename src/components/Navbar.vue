<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">ADMIN SENA</RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link fw-semibold" to="/">Inicio</RouterLink>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fw-semibold" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="bi bi-table"></i> Tablas
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow">
              <li><RouterLink class="dropdown-item" to="/areas"><i class="bi bi-diagram-3"></i> Áreas</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/teachers"><i class="bi bi-person-fill"></i> Profesores</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/training-centers"><i class="bi bi-building"></i> Centros</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/courses"><i class="bi bi-journal-bookmark"></i> Cursos</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/apprentices"><i class="bi bi-people"></i> Aprendices</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/computers"><i class="bi bi-pc-display"></i> Computadores</RouterLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
