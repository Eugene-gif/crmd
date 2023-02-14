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
      formData.append(`images[]`, file);
    }

    try {
      return httpClient({
        method: "post",
        url: `${url}/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return {
          id: data.data.id,
          description: data.data.description,
          name: data.data.name,
          images: data.data.images
        }
      })
    } catch (err) {
      console.log(err)
    }
  },

  addImagesInAlbum(data, id) {
    const formData = new FormData();
    formData.append("album_id", id)
    for( var i = 0; i < data.length; i++ ){
      let file = data[i];
      formData.append(`images[]`, file);
    }

    try {
      return httpClient({
        method: "post",
        url: `${url}/addImages`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return data.data
      })
    } catch (err) {
      console.log(err)
    }
  },

  updateAlbum(datas) {
    const formData = new FormData();
    formData.append("album_id", datas.id)
    formData.append("name", datas.name)
    formData.append("description", datas.description)

    try {
      return httpClient({
        method: "post",
        url: `${url}/update`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return data.data
      })
    } catch (err) {
      console.log(err)
    }
  },

  addImagesInAlbum(data) {
    const formData = new FormData();
    formData.append("album_id", data.album_id)
    for( var i = 0; i < data.images.length; i++ ){
      let file = data.images[i];
      formData.append(`images[]`, file);
    }

    try {
      return httpClient({
        method: "post",
        url: `${url}/addImages`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return data.data
      })
    } catch (err) {
      console.log(err)
    }
  },

  getAllAlbums() {
    try {
      return httpClient.post(`${url}/getAll`)
      .then(({ data }) => {
        return data = data.data.map(el => {
          // let imgs = []
          // el.images.forEach(img => {
          //   imgs.push(img.file)
          // })
          return {
            id: el.id,
            description: el.description,
            name: el.name,
            images: el.images
          }
        })
      });
    } catch(err) {
      console.log(err)
    }
  },

  getAlbum(alb_id) {
    try {
      return httpClient.post(`${url}/get`, {album_id: alb_id})
      .then(({ data }) => {
        return data.data.images
      });
    } catch(err) {
      console.log(err)
    }
  },

  delAlbum(id) {
    try {
      return httpClient.post(`${url}/delete`, {
        album_id: id 
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  },

  delUserAlbum(id) {
    try {
      return httpClient.post(`${url}/clear`, {
        album_id: id 
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  }

}