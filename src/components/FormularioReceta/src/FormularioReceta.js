
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
      descripcionError: '',
      ingredientesError: '',
      pasosError: ''
    };
  },
  methods: {
    validateCampo(valor, campo, error) {
      this[campo] = '';
      if (!valor) {
        this[campo] = error;
      } else if (valor.length < 2) {
        this[campo] = `El ${campo} debe tener al menos 2 caracteres.`;
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
    agregarCampo(campo, valor) {
      if (valor) {
        this.receta[campo].push(valor);
        this[campo] = '';
        this.validateIngredientes();
      }
    },
    agregarIngrediente() {
      this.agregarCampo('ingredientes', this.nuevoIngrediente, 'Debe ingresar un ingrediente.');
    },
    agregarPaso() {
      this.agregarCampo('pasos', this.nuevoPaso, 'Debe ingresar un paso.');
    },
    async submitForm() {
      this.validateNombre();
      this.validateDescripcion();
      this.validateIngredientes();
      this.validatePasos();

      if (!this.nombreError && !this.descripcionError && !this.ingredientesError && !this.pasosError) {
        try {
          const response = await axios.post('https://66663bb1a2f8516ff7a2e4b0.mockapi.io/recetas', this.receta);
          console.log('Receta enviada:', response.data);

          this.receta.nombre = '';
          this.receta.descripcion = '';
          this.receta.ingredientes = [];
          this.receta.pasos = [];
          this.receta.imagen = '';

          this.$emit('recetaAgregada', response.data); 
        } catch (error) {
          console.error('Error al enviar la receta:', error);
        }
      } else {
        console.log('Corrige los errores antes de enviar la receta.');
      }
    }
  },
  computed: {
    validarBotonEnvio() {
      return (
        !!this.nombreError ||
        !!this.descripcionError ||
        !!this.ingredientesError ||
        !!this.pasosError ||
        !this.receta.nombre ||
        !this.receta.descripcion ||
        this.receta.nombre.length < 2 ||
        this.receta.descripcion.length < 2 ||
        this.receta.ingredientes.length === 0 ||
        this.receta.pasos.length === 0
      );
    }
  }
};
