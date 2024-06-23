<template>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <router-link class="navbar-brand" to="/">Inicio</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Ingreso</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Registro</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/agregar">Agregar Receta</router-link>
          </li>
        </ul>
      </div>
    </nav>

</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>

</style>
