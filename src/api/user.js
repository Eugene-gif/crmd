import httpClient from "./httpClient.js";
import axios from "axios";
import store from '../store';

// const store = useStore(); 
const url = 'users'

export const userApi = {

  updateUserAvatar(file) {
    const formData = new FormData()
    // formData.append("name", 'yurecblinovgelarm@gmail.com')
    formData.append(`image`, file);
    
    try {
      return httpClient({
        method: "post",
        url: `${url}/update`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return data.data
      })
    } catch(err) {
      console.log(err)
    }
  },

  setRoleForUser() {

    const formData = new FormData()
    formData.append('role_id', 3);
    
    try {
      return httpClient({
        method: "post",
        url: `${url}/setRole`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return data.data
      })
    } catch(err) {
      console.log(err)
    }
  },

  getRoleForUser() {    
    try {
      return httpClient.post(`${url}/getRoles`)
      .then(( response ) => {
        return true
      })
    } catch(err) {
      console.log(err)
    }
  },
  

}