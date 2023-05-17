import httpClient from "./httpClient.js"

const url = 'estimates'
// import getFormatDate from 'src/composable/getFormatDate'
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

  getById(id) {
    try {
      return httpClient.post(`${url}/get`, {
        estimate_id: id
      })
      .then(({ data }) => {
        return data.data
      })
    } catch(err) {
      console.log(err)
    }
  },

  getId(id) {
    try {
      return httpClient.post(`${url}/getForProject`, {
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
    console.log(data)
    const formData = new FormData()
    formData.append("project_id", data.project_id)
    formData.append("name", data.name)

    try {
      const resp = await httpClient({
        method: "post",
        url: `${url}/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      return resp.data.data
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
  },


  // estimates items
  async create(idEstimate) {

    const formData = new FormData()
    formData.append("estimate_id", idEstimate)

    formData.append("name", data.name)
    formData.append("link", data.link)
    formData.append("room_type", data.room_type)
    formData.append("description", data.description)
    formData.append("quantity", data.quantity)
    formData.append("price_forecast", data.price_forecast)
    formData.append("term_forecast", data.term_forecast)
    formData.append("rate_forecast", data.rate_forecast)
    formData.append("article", data.article)
    formData.append("color", data.color)
    formData.append("manufacturer", data.manufacturer)
    
    try {
      const resp = await httpClient({
        method: "post",
        url: `${url}/items/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      return resp.data.data
    } catch (err) {
      throw err
    }
  },

  updateItem(idItem) {
    try {
      return httpClient.post(`${url}/items/update`, {
        id: idItem
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  },
  
  delItem(id) {
    try {
      return httpClient.post(`${url}/items/delete`, {
        estimate_item_id: id 
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  },

}