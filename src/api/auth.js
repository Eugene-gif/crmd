import httpClient from "./httpClient.js";
import store from '../store';
import { doRegister } from "src/store/auth/actions.js";

// const store = useStore(); 
const url = 'auth'

export const authApi = {
  
  doLogin(formData) {
    try {
      return httpClient.post(`${url}/login`, {
        email: formData.email,
        password: formData.password
      }).then(response => {
        return response
      })
    } catch (err) {
      console.log(err)
    }
  },

  doRegister(formData) {
    try {
      return httpClient.post(`${url}/register`, {
        name: formData.email,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        user_name: formData.name,
        user_lastname: formData.lastName
      }).then(response => {
        return response
      })
    } catch (err) {
      console.log(err)
    }

  }

}