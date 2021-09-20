import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { createApp } from 'vue';

const app = createApp(App);

app.config.performance = process.env.NODE_ENV !== 'production';

app.use(router);
app.use(store);
app.mount('#app');