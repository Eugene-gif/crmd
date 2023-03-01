import httpClient from "./httpClient.js";

const url = 'estimates'

export const estimatesApi = {
  getAll() {
    try {
      return httpClient.post(`${url}/getAll`, {})
      .then(({ data }) => {
        return data
      })
    } catch(err) {
      console.log(err)
    }
  },

  getId(id) {
    try {
      return httpClient.post(`${url}/get`, {
        project_id: id
      })
      .then(({ data }) => {
        return data
      })
    } catch(err) {
      console.log(err)
    }
  },

  createEstimates(formData) {
    try {
      return httpClient.post(`${url}/create`, {
        project_id: '',
        name: ''
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  },

  delEstimates(id) {
    try {
      return httpClient.post(`${url}/delete`, {
        id: id 
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  }
}