
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
        await axios.post('https://66663bb1a2f8516ff7a2e4b0.mockapi.io/users', this.user);
        alert('Registro exitoso');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
