
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        email: ''
      }
    };
  },
  methods: {
    async register() {
      try {
        // Aquí podrías enviar los datos del usuario al backend para registrarlos
        await axios.post('https://66663bb1a2f8516ff7a2e4b0.mockapi.io/users', this.user);
        alert('Registro exitoso');
        // Aquí podrías redirigir al usuario a la página de inicio de sesión, por ejemplo:
        // this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
