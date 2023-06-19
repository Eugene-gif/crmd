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
        let resp = data.data
        resp.items.sort((a, b) => {
          const aType = a.room_type !== null ? a.room_type : "яяяя";
          const bType = b.room_type !== null ? b.room_type : "яяяя";
          return aType.localeCompare(bType, 'ru');
        })
        resp.items = resp.items.map((row, index) => {
          return {
            ...row,
            iterationId: index + 1,
            smetaVal: row.proposals.length ? false : null
          }
        })

        return resp
      })
    } catch(err) {
      throw err
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

  async duble(estimate) {
    try {
      const resp = await httpClient.post(`${url}/duplicate`, {
        estimate_id: estimate.id,
        project_id: estimate.project_id,
        name: estimate.name
      })
      return resp.data.data
    } catch (err) {
      console.log(err)
    }
  },

  async update(estimate_id, name) {
    try {
      const resp = await httpClient.post(`${url}/update`, {
        id: estimate_id,
        name: name
      })
      return resp.data.data
    } catch (err) {
      console.log(err)
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

  getItemById(id) {
    try {
      return httpClient.post(`${url}/items/get`, {
        estimate_item_id: id
      })
      .then(({ data }) => {
        const resp = data.data
        resp.price_forecast = resp.forecast.price
        resp.term_forecast = resp.forecast.term
        resp.rate_forecast = resp.forecast.rate
        resp.room_type = {id: 1,name:resp.room_type}
        return resp
      })
    } catch(err) {
      console.log(err)
    }
  },


  async getStatuses() {
    try {
      const resp = await httpClient.post(`${url}/items/getStatuses`)
      return resp.data.data.statuses
    } catch (err) {
      console.log(err)
    }
  },

  async setStatus(estimate_item_id, status) {
    try {
      const resp = await httpClient.post(`${url}/items/setStatus`, {
        estimate_item_id: estimate_item_id,
        status: status
      })
      return resp.data.data
    } catch (err) {
      console.log(err)
    }
  },
  
  async createItem(data) {

    const formData = new FormData()
    formData.append("estimate_id", data.estimate_id)

    formData.append("name", data.name)
    formData.append("link", data.link)
    if (data.room_type) formData.append("room_type", data.room_type.name)
    if (data.description) formData.append("description", data.description)
    formData.append("quantity", Number(data.quantity))
    formData.append("price_forecast", Number(data.price_forecast))
    formData.append("term_forecast", Number(data.term_forecast))
    formData.append("rate_forecast", Number(data.rate_forecast))
    if (data.article) formData.append("article", data.article)
    if (data.color) formData.append("color", data.color)
    if (data.manufacturer) formData.append("manufacturer", data.manufacturer)

    if (data.image) formData.append("image", data.image)
    if (data.file) formData.append("file", data.file)
    
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

  async updateItem(data) {
    const formData = new FormData()
    formData.append("id", data.id)

    formData.append("name", data.name)
    formData.append("link", data.link === null ? '': data.link)
    if (data.room_type.name !== null) formData.append("room_type", data.room_type.name)
    formData.append("description", data.description === null ? '': data.description)
    formData.append("quantity", Number(data.quantity))
    formData.append("price_forecast", Number(data.price_forecast))
    formData.append("term_forecast", Number(data.term_forecast))
    formData.append("rate_forecast", Number(data.rate_forecast))
    formData.append("article", data.article === null ? '': data.article)
    formData.append("color", data.color === null ? '': data.color)
    formData.append("manufacturer", data.manufacturer === null ? '': data.manufacturer)

    // formData.append("image", data.image)
    // formData.append("file", data.file)
    
    try {
      const resp = await httpClient({
        method: "post",
        url: `${url}/items/update`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      return resp.data.data
    } catch (err) {
      throw err
    }
  },

  async updateObjItem(id, obj, name) {
    const formData = new FormData()
    formData.append("id", id)

    if (name === 'img') formData.append("image", obj)
    if (name === 'file') formData.append("file", obj)

    try {
      const resp = await httpClient({
        method: "post",
        url: `${url}/items/update`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      return resp.data.data
    } catch (err) {
      throw err
    }
  },

  setSelectedProposal(estimateId, proposalId) {
    try {
      return httpClient.post(`${url}/items/setSelectedProposal`, {
        estimate_item_id: estimateId,
        proposal_id: proposalId
      }).then(({ data }) => {
        return data.data
      })
    } catch (err) {
      console.log(err)
    }
  },

  duplicateItem(id) {
    try {
      return httpClient.post(`${url}/items/duplicate`, {
        estimate_item_id: id 
      }).then(({ data }) => {
        return data.data
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