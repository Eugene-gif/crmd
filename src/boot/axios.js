import { boot } from 'quasar/wrappers'
import axios from 'axios'
const tokenPost = JSON.parse(localStorage.getItem('token'))

const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
  // headers: {
  //   'Authorization': `Bearer ${tokenPost}`
  // }
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }
