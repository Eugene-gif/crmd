import httpClient from "./httpClient.js";

const url = 'projects'

export const projectsApi = {
  getAll(params) {
    try {
      return httpClient.post(`${url}/getall`, {
        user_id: params
      }).then(({ data }) => data || []);
    } catch(err) {
      console.log(err)
    }
  },
}