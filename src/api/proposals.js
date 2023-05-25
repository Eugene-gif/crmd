import httpClient from "./httpClient.js"

const url = 'proposals'

export const proposalsApi = {

  async create(data) {
    try {
      let resp = await httpClient.post(`${url}/create`, data)
      resp = resp.data.data
      
      return resp
    } catch (err) {
      throw err
    }
  },



  async getAll() {
    try {
      let resp = await httpClient.post(`${url}/getAll`)
      resp = resp.data.data
      return resp
    } catch (err) {
      throw err
    }
  },

}