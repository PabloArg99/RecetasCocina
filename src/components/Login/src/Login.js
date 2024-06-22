
import { useGlobalStore } from '@/stores/global';
import axios from 'axios';

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        
      },
      globalStore : useGlobalStore()
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.get('https://66663bb1a2f8516ff7a2e4b0.mockapi.io/users', {
          params: {
            username: this.credentials.username,
            password: this.credentials.password,
          },
        });
        if (response.data.length > 0) {
          alert('Inicio de sesión exitoso');
          this.globalStore.setActiveUsername(this.credentials.username)
          // Aquí podrías redirigir al usuario a otra página, por ejemplo:
           this.$router.push('/');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
