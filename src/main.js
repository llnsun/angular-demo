import './assets/main.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import Cookies from 'js-cookie';
const app = createApp(App)
app.use(router);
document.addEventListener('auth-required', () => {
    localStorage.removeItem('is$$Login$$xxm&&ccb');
    Cookies.remove('isLogin');
    Cookies.remove('session');
    router.push('/login');
});

app.mount('#app')

