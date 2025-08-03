import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TeachersView from '../views/Teachers/index.vue'
import TeacherCreate from '../views/Teachers/create.vue'
import TeacherEdit from '../views/Teachers/edit.vue'
import TeacherShow from '../views/Teachers/show.vue'

import ApprenticeIndex from '../views/Apprentices/index.vue'
import ApprenticeCreate from '../views/Apprentices/create.vue'
import ApprenticeEdit from '../views/Apprentices/edit.vue'
import ApprenticeShow from '../views/Apprentices/show.vue'


const routes = [
  { path: '/', name: 'home', component: Home },

  { path: '/teachers', name: 'teachers', component: TeachersView },
  { path: '/teachers/create', name: 'teachers.create', component: TeacherCreate, },
  { path: '/teachers/:id/edit', name: 'teacher.edit',component: TeacherEdit, },
  { path: '/teachers/:id', name: 'teacher.show',component: TeacherShow, },

  { path: '/apprentices', name: 'aprentices',component: ApprenticeIndex, },
  { path: '/apprentices/create', name: 'apprentices.create', component: ApprenticeCreate, },
  { path: '/apprentices/:id/edit', name: 'apprentice.edit', component: ApprenticeEdit, },
  { path: '/apprentices/:id', name: 'apprentice.show', component: ApprenticeShow, },


]

export default createRouter({
  history: createWebHistory(),
  routes
})
