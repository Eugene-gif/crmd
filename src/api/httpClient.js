import axios from "axios";
import { useStore } from 'vuex';

const store = useStore();
function logOut() {
  store.dispatch('auth/singOut')
  window.location.href = '/'
}
const config = {
  baseURL: "https://crmd.crookedweb.site/api/"
};

const httpClient = axios.create(config);
const token = JSON.parse(localStorage.getItem('token'))

httpClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    const { data } = error?.response || {}
    console.error(data);

    switch (error.response?.status) {
      case 401: {
        showError(data || { message: 'Неавторизован' })
        logOut() 
        break
      }
      case 403: {
        showError(data || { message: 'Нет доступа' })
        break
      }
      case 404: {
        showError(data || { message: 'Не найдено' })
        break
      }
    }
    return Promise.reject(error)
  }
);


export default httpClient