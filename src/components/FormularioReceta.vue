<template>
  <div class="container mt-5">
    <h2>Agregar Receta</h2>
    <form @submit.prevent="submitForm" class="mb-5">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="receta.nombre"
          @input="validateNombre"
        />
        <div v-if="nombreError" class="text-danger">{{ nombreError }}</div>
      </div>

      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <textarea
          class="form-control"
          id="descripcion"
          v-model="receta.descripcion"
          @input="validateDescripcion"
        ></textarea>
        <div v-if="descripcionError" class="text-danger">{{ descripcionError }}</div>
      </div>

      <div class="mb-3">
        <label for="ingredientes" class="form-label">Ingredientes</label>
        <input
          type="text"
          class="form-control"
          id="ingredientes"
          v-model="nuevoIngrediente"
          @keyup.enter="agregarIngrediente"
        />
        <ul>
          <li v-for="(ingrediente, index) in receta.ingredientes" :key="index">{{ ingrediente }}</li>
        </ul>
      </div>

      <div class="mb-3">
        <label for="pasos" class="form-label">Pasos</label>
        <input
          type="text"
          class="form-control"
          id="pasos"
          v-model="nuevoPaso"
          @keyup.enter="agregarPaso"
        />
        <ul>
          <li v-for="(paso, index) in receta.pasos" :key="index">{{ paso }}</li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="imagen" class="form-label">Imagen (opcional)</label>
        <input
          type="text"
          class="form-control"
          id="imagen"
          v-model="receta.imagen"
        />
      </div>
      <button 
        class="btn btn-success my-3" 
        :disabled="validarBotonEnvio()"
      >Agregar Receta</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      receta: {
        nombre: '',
        descripcion: '',
        ingredientes: [],
        pasos: [],
        imagen: ''
      },
      nuevoIngrediente: '',
      nuevoPaso: '',
      nombreError: '',
      descripcionError: ''
    };
  },
  methods: {
    validateNombre() {
      if (!this.receta.nombre) {
        this.nombreError = 'El nombre es requerido.';
      } else if (this.receta.nombre.length < 2) {
        this.nombreError = 'El nombre debe tener al menos 2 caracteres.';
      } else {
        this.nombreError = '';
      }
    },
    validateDescripcion() {
      if (!this.receta.descripcion) {
        this.descripcionError = 'La descripción es requerida.';
      } else if (this.receta.descripcion.length < 2) {
        this.descripcionError = 'La descripción debe tener al menos 2 caracteres.';
      } else {
        this.descripcionError = '';
      }
    },
    agregarIngrediente() {
      if (this.nuevoIngrediente) {
        this.receta.ingredientes.push(this.nuevoIngrediente);
        this.nuevoIngrediente = '';
      }
    },
    agregarPaso() {
      if (this.nuevoPaso) {
        this.receta.pasos.push(this.nuevoPaso);
        this.nuevoPaso = '';
      }
    },
    validarBotonEnvio() {
      return (
        !this.nombreError && !this.nombreError 
      ) 
    },
    async submitForm() {
      this.validateNombre();
      this.validateDescripcion();

      if (!this.nombreError && !this.descripcionError) {
        try {
          // Enviar receta a la API
          const response = await axios.post('https://66663bb1a2f8516ff7a2e4b0.mockapi.io/recetas', this.receta);
          console.log('Receta enviada:', response.data);

          // Limpiar formulario después del envío
          this.receta.nombre = '';
          this.receta.descripcion = '';
          this.receta.ingredientes = [];
          this.receta.pasos = [];
          this.receta.imagen = '';

          // Actualizar la lista de recetas en ListaDeRecetas.vue
          this.$emit('recetaAgregada', response.data); // Emitir evento con la nueva receta
        } catch (error) {
          console.error('Error al enviar la receta:', error);
        }
      } else {
        console.log('Corrige los errores antes de enviar la receta.');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
