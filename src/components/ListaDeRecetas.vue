<template>
  <div class="container mt-5">
    <h2>Lista de Recetas</h2>
    <h3>Cantidad de Recetas: <span v-text="contarCantidadRecetas"></span></h3>

    <!-- Lista de recetas -->
    <ul class="list-group">
      <li
        v-for="receta in recetas"
        :key="receta.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <router-link :to="'/receta/' + receta.id">{{ receta.nombre }}</router-link>
        <img v-if="receta.imagen" :src="receta.imagen" alt="Imagen de la receta" class="img-fluid rounded" style="max-height: 100px;">
        <div>
          <button @click="eliminarReceta(receta.id)" class="btn btn-danger btn-sm">Eliminar</button>
          <button @click="marcarFavorita(receta)" class="btn btn-primary btn-sm">
            {{ receta.esFavorita ? 'Quitar de Favoritas' : 'Marcar Favorita' }}
          </button>
        </div>
      </li>
    </ul>

    <!-- Lista de recetas favoritas -->
    <h3 class="mt-4">Recetas Favoritas</h3>
    <ul v-if="recetasFavoritas.length > 0" class="list-group">
      <li v-for="receta in recetasFavoritas" :key="receta.id" class="list-group-item">
        {{ receta.nombre }}
      </li>
    </ul>
    <p v-else>No hay recetas favoritas.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recetas: [],
      recetasFavoritas: []
    };
  },
  beforeMount() {
    console.log("Cargando lista de recetas antes de montar componente")
    this.cargarRecetas();
    
  },
  methods: {
    async cargarRecetas() {
      try {
        const response = await axios.get('https://66663bb1a2f8516ff7a2e4b0.mockapi.io/recetas');
        console.log(response.data); // Verifica aquí que se están recibiendo las recetas
        this.recetas = response.data;
        
        this.recetasFavoritas = this.recetas.filter(receta => receta.esFavorita);
      } catch (error) {
        console.error('Error al cargar las recetas:', error);
      }
    },
    async eliminarReceta(id) {
      try {
        await axios.delete(`https://66663bb1a2f8516ff7a2e4b0.mockapi.io/recetas/${id}`);
        this.recetas = this.recetas.filter(receta => receta.id !== id);
        this.recetasFavoritas = this.recetas.filter(receta => receta.esFavorita);
      } catch (error) {
        console.error('Error al eliminar la receta:', error);
      }
    },
    async marcarFavorita(receta) {
      try {
        receta.esFavorita = !receta.esFavorita;
        await axios.put(`https://66663bb1a2f8516ff7a2e4b0.mockapi.io/recetas/${receta.id}`, receta);
        this.recetasFavoritas = this.recetas.filter(receta => receta.esFavorita);
      } catch (error) {
        console.error('Error al marcar la receta como favorita:', error);
      }
    }
  },
  computed :{
     contarCantidadRecetas(){
      let cantidadRecetas = 0
      try {
        console.log("Cantidad de recetas" +  this.recetas.length)
        cantidadRecetas = this.recetas.length
      } catch (error) {
        console.error('Error al contar las recetas:', error);
      }
      return cantidadRecetas

    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
