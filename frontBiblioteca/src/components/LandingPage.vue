<template>
    <div class="landing-page">
      <div class="container">
        <h1>Bienvenido a nuestra pagina</h1>
        <p>Esta es una examen simple creada con Vue.js</p>
        <router-link to="/categorias" class="btn btn-primary">Explorar Categorias</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
  };
  </script>
  
  <style scoped>
  .landing-page {
    text-align: center;
    padding: 50px 0;
  }
  </style>
  