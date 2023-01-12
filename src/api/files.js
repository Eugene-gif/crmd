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
        return data
      })
    } catch (err) {
      console.log(err)
    }
  },

}