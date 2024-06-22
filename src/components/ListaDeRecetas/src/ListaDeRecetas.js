
import { useGlobalStore } from '@/stores/global.js';
import axios from 'axios';

export default {
  data() {
    return {
      recetas: [],
      recetasFavoritas: [],
      mostrarModalEditar: false,
      recetaEditando: {},
      globalStore : useGlobalStore()
      
    };
   
  },
  beforeMount() {
    this.cargarRecetas();
  },
  methods: {
    async cargarRecetas() {
      try {
        const response = await axios.get('https://66663bb1a2f8516ff7a2e4b0.mockapi.io/recetas');
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
    },
    abrirModalEditar(receta) {
      this.recetaEditando = { ...receta };
      this.mostrarModalEditar = true;
    },
    cerrarModalEditar() {
      this.mostrarModalEditar = false;
      this.recetaEditando = {};
    },
    async guardarEdicion() {
      try {
        await axios.put(`https://66663bb1a2f8516ff7a2e4b0.mockapi.io/recetas/${this.recetaEditando.id}`, this.recetaEditando);
        this.cargarRecetas();
        this.cerrarModalEditar();
      } catch (error) {
        console.error('Error al guardar la edición de la receta:', error);
      }
    }
  },
  computed: {
    contarCantidadRecetas() {
      return this.recetas.length;
    }
  }
};
