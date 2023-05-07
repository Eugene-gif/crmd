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

  async create(data) {
    console.log(data);
    const formData = new FormData();
    formData.append("project_id", data.project_id);
    formData.append("name", data.name);

    try {
      const resp = await httpClient({
        method: "post",
        url: `${url}/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return resp.data.data;
    } catch (err) {
      throw err
    }
  },

  del(id) {
    try {
      return httpClient.post(`${url}/delete`, {
        estimate_id: id 
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  }
}