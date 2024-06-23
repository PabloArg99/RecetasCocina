
import axios from 'axios';

export default {
  data() {
    return {
      receta: null,
      showDescripcion: false,
      showIngredientes: false,
      showPasos: false,
      showAutor: false
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
    toggleSection(section) {
      this[section] = !this[section];
    }
  }
};
