import * as servicioRecetas from '@/servicios/recetas.js';
import { useGlobalStore } from '@/stores/global.js';

export default {
  data() {
    return {
      receta: {
        nombre: '',
        descripcion: '',
        ingredientes: [],
        pasos: [],
        imagen: '',
        autor: ''
      },
      nuevoIngrediente: '',
      nuevoPaso: '',
      nombreError: '',
      descripcionError: '',
      ingredientesError: '',
      pasosError: '',
      loginError: '',
      globalStore: useGlobalStore() 
    };
  },
  methods: {
    validateCampo(valor, campo, error) {
      this[campo] = '';
      if (!valor) {
        this[campo] = error;
      } else if (valor.length < 2) {
        this[campo] = `El campo debe tener al menos 2 caracteres.`;
        // this[campo] = `El ${campo} debe tener al menos 2 caracteres.`;
      }
    },
    validateNombre() {
      this.validateCampo(this.receta.nombre, 'nombreError', 'El nombre es requerido.');
    },
    validateDescripcion() {
      this.validateCampo(this.receta.descripcion, 'descripcionError', 'La descripción es requerida.');
    },
    validateIngredientes() {
      this.ingredientesError = '';
      if (this.receta.ingredientes.length === 0) {
        this.ingredientesError = 'Debe agregar al menos un ingrediente.';
      }
    },
    validatePasos() {
      this.pasosError = '';
      if (this.receta.pasos.length === 0) {
        this.pasosError = 'Debe agregar al menos un paso.';
      }
    },
    agregarIngrediente() {
      if (this.nuevoIngrediente) {
        this.receta.ingredientes.push(this.nuevoIngrediente);
        this.nuevoIngrediente = '';
        this.validateIngredientes();
      }
    },
    agregarPaso() {
      if (this.nuevoPaso) {
        this.receta.pasos.push(this.nuevoPaso);
        this.nuevoPaso = '';
        this.validatePasos();
      }
    },
    async submitForm() {
      this.validateNombre();
      this.validateDescripcion();
      this.validateIngredientes();
      this.validatePasos();

      if (!this.nombreError && !this.descripcionError && !this.ingredientesError && !this.pasosError) {
        const globalStore = this.globalStore; 

        if (!globalStore.isUserLoggedIn) {
          this.loginError = 'Debes estar logueado para agregar una receta.';
          console.error(this.loginError);
          return;
        }

        try {
          const usuarioActual = globalStore.getActiveUsername;
          this.receta.autor = usuarioActual;

          const response = await servicioRecetas.create(this.receta);
          console.log('Receta enviada:', response);

          this.receta.nombre = '';
          this.receta.descripcion = '';
          this.receta.ingredientes = [];
          this.receta.pasos = [];
          this.receta.imagen = '';

          this.$emit('recetaAgregada', response);
          this.$router.push('/'); 
        } catch (error) {
          console.error('Error al enviar la receta:', error);
        }
      } else {
        console.log('Corrige los errores antes de enviar la receta.');
      }
    },
    handleFormSubmit(event) {
      event.preventDefault(); 
      this.submitForm();
    }
  },
  computed: {
    validarBotonEnvio() {
      return (
        this.receta.nombre.length < 2 ||
        this.receta.descripcion.length < 2 ||
        this.receta.ingredientes.length === 0 ||
        this.receta.pasos.length === 0
      
      );
    }
  }
};
