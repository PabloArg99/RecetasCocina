<template>
  <div class="container mt-5">
    <h2>Registro</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="username" class="form-label">Nombre de Usuario</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="user.username"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="user.password"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="user.email"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Registrarse</button>
    </form>
  </div>
</template>

<script>
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
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
