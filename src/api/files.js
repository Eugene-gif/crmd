import httpClient from "./httpClient.js";
import axios from "axios";
import store from '../store';

// const store = useStore(); 
const url = 'files'

export const filesApi = {

  uploadFiles(data) {
    const formData = new FormData();

    if (data.link.length > 0) {
      formData.append("links[0][name]", data.name)
      formData.append("links[0][link]", data.link)
    } else {
      formData.append("files[0][name]", data.name)
      formData.append("files[0][file]", data.files[0])
    }

    try {
      return httpClient({
        method: "post",
        url: `${url}/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        if (data.data[0].size) {
          let beforeForm = data.data[0].name.split('.')
          let format = beforeForm[beforeForm.length - 1]
          return {
            file: data.data[0].file,
            id: data.data[0].id,
            name: data.data[0].name,
            size: data.data[0].size,
            format: format
          }
        } else {
          return {
            file: data.data[0].file,
            id: data.data[0].id,
            name: data.data[0].name,
          }
        }
      })
    } catch (err) {
      console.log(err)
    }
  },

  getAllFiles() {
    try {
      return httpClient.post(`${url}/getAll`)
      .then(({ data }) => {
        return data = data.data.map(el => {
          if (el.size) {
            let beforeForm = el.name.split('.')
            let format = beforeForm[beforeForm.length - 1]
            return {
              file: el.file,
              id: el.id,
              name: el.name,
              size: el.size,
              format: format
            }
          } else {
            return {
              file: el.file,
              id: el.id,
              name: el.name,
            }
          }
        })
      })
    } catch(err) {
      console.log(err)
    }
  },

  delFile(id) {
    try {
      return httpClient.post(`${url}/delete`, {
        file_id: id 
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  },

}