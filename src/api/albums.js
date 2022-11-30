import httpClient from "./httpClient.js";
import axios from "axios";
import store from '../store';

// const store = useStore(); 
const url = 'albums'

export const albumsApi = {

  createAlbum(data) {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    for( var i = 0; i < data.images.length; i++ ){
      let file = data.images[i];
      formData.append(`files[]`, file);
    }

    try {
      return httpClient({
        method: "post",
        url: `${url}/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return data.data
      })
    } catch (err) {
      console.log(err)
    }
  }

}