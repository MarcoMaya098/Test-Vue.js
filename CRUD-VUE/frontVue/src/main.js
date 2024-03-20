

// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router/router'; 
// import 'bootstrap/dist/css/bootstrap.min.css';

// const app = createApp(App);
// app.use(router);
// app.mount('#app');


import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // Importa el enrutador
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.use(router); // Usa el enrutador
app.mount('#app');
