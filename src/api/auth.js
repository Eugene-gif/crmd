import httpClient from "./httpClient.js";
import axios from "axios";
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

  
  


  doRegister(data) {
    const formData = new FormData();
    formData.append("email", data.email)
    formData.append("name", data.email)
    formData.append("password", data.password)
    formData.append("password_confirmation", data.confirmPassword)
    formData.append("first_name", data.name)
    formData.append("last_name", data.lastName)
    // formData.append("verify", 'y')
    formData.append("role_id", 3)
    if (data.image !== null && data.image !== '') {
      formData.append("image", data.image)
    }
    
    try {
      return httpClient({
        method: "post",
        url: `${url}/register`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(response => {
        return response
      })
    } catch (err) {
      console.log(err)
    }
  }

}