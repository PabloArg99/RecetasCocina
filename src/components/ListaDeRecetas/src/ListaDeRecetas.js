import { useGlobalStore } from '@/stores/global.js';
import * as servicioRecetas from '@/servicios/recetas.js';

export default {
  data() {
    return {
      recetas: [],
      recetasFavoritas: [],
      mostrarModalEditar: false,
      recetaEditando: {},
      globalStore: useGlobalStore(),
    };
  },
  beforeMount() {
    this.cargarRecetas();
  },
  methods: {
    async cargarRecetas() {
      const recetas = await servicioRecetas.getAll();
      this.recetas = recetas;
    },
    async eliminarReceta(id) {
      const receta = this.recetas.find(receta => receta.id === id);
      if (receta.autor === this.globalStore.getActiveUsername) {
        try {
          await servicioRecetas.remove(id);
          this.recetas = this.recetas.filter(receta => receta.id !== id);
          this.recetasFavoritas = this.recetas.filter(receta => receta.esFavorita);
        } catch (error) {
          console.error('Error al eliminar la receta:', error);
        }
      } else {
        alert('No tienes permiso para eliminar esta receta.');
      }
    },
    async marcarFavorita(receta) {
      try {
        receta.esFavorita = !receta.esFavorita;
        await servicioRecetas.update(receta.id, receta);
        this.recetasFavoritas = this.recetas.filter(receta => receta.esFavorita);
      } catch (error) {
        console.error('Error al marcar la receta como favorita:', error);
      }
    },
    abrirModalEditar(receta) {
      if (receta.autor === this.globalStore.getActiveUsername) {
        this.recetaEditando = { ...receta };
        this.mostrarModalEditar = true;
      } else {
        alert('No tienes permiso para editar esta receta.');
      }
    },
    cerrarModalEditar() {
      this.mostrarModalEditar = false;
      this.recetaEditando = {};
    },
    async guardarEdicion() {
      try {
        await servicioRecetas.update(this.recetaEditando.id, this.recetaEditando);
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
