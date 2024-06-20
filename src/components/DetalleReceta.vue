<template>
  <div>
    <h1>{{ receta.nombre }}</h1>
    <img :src="receta.imagen" alt="Imagen de la receta">
    <p>{{ receta.descripcion }}</p>
    <h3>Ingredientes</h3>
    <ul>
      <li v-for="ingrediente in receta.ingredientes" :key="ingrediente">{{ ingrediente }}</li>
    </ul>
    <h3>Pasos</h3>
    <ul>
      <li v-for="paso in receta.pasos" :key="paso">{{ paso }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      receta: {},
    };
  },
  created() {
    this.fetchReceta();
  },
  methods: {
    async fetchReceta() {
      try {
        const id = this.$route.params.id;
        const response = await axios.get(`https://66663bb1a2f8516ff7a2e4b0.mockapi.io/recetas/${id}`);
        this.receta = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
