<template>
    <div>
      <h2>{{ categoria.idCategoria }}</h2>
      <p>{{ categoria.categoria }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MostrarCategoria',
    data() {
      return {
        categoria: {}
      };
    },
    mounted() {
      this.getCategoria();
    },
    methods: {
      async getCategoria() {
        try {
          const response = await axios.get(`http://127.0.0.1:8080/api/getCategoria/${this.$route.params.id}`);
          this.categoria = response.data;
        } catch (error) {
          console.error('Error al obtener la categoría:', error);
        }
      }
    }
  };
  </script>
  