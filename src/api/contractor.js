import httpClient from "./httpClient.js";

const url = 'contractors'

export const contractorApi = {

  // info
  getBankingInfo(formData) {
    try {
      return httpClient.post(`${url}/info/updateBankingInfo`, formData)
      .then(( response ) => {
        
        let myObject = {}
        Object.keys(response.data.data).forEach(key => {
          if (key != 'id' && key != 'contractor_id' && key != 'created_at' && key != 'updated_at') {
            myObject[key] = response.data.data[key]
          }
        });
        return myObject
      })
    } catch(err) {
      console.log(err)
    }
  },
  getInfoContractor() {
    try {
      return httpClient.post(`${url}/getFullInfo`)
      .then(( {data} ) => {
        let formData = {}
        Object.keys(data.data).forEach(key => {
          if (
            key === 'name' ||
            key === 'city' ||
            key === 'region' ||
            key === 'public_email' ||
            key === 'public_phone' ||
            key === 'public_address' ||
            key === 'url' ||
            key === 'soc_wa' ||
            key === 'soc_tg' ||
            key === 'soc_inst' 
          ) {
            formData[key] = data.data[key]
          }
        });
        return formData
      })
    } catch(err) {
      console.log(err)
    }
  },
  updateContractor(formData) {
    try {
      return httpClient.post(`${url}/update`, formData)
      .then(( {data} ) => {
        return data.data
      })
    } catch(err) {
      console.log(err)
    }
  },

  // Affiliate
  getAllAffiliate() {
    try {
      return httpClient.post(`${url}/info/getAllManagers`)
      .then(( response ) => {
        return response = response.data.data.affiliates.map(el => {
          return {
            id: el.id,
            title: el.address,
            timework: el.info
          }
        })
      })
    } catch(err) {
      console.log(err)
    }
  },
  AddAffiliate(formData) {
    try {
      return httpClient.post(`${url}/info/createManager`, formData)
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },
  updateAffiliate(formData) {
    try {
      return httpClient.post(`${url}/info/updateManager`, formData)
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },
  delAffiliate(man_id) {
    try {
      return httpClient.post(`${url}/info/deleteManager`, {
        id: man_id,
        type: 'a'
      })
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },

  // manager
  getAllManagers() {
    try {
      return httpClient.post(`${url}/info/getAllManagers`)
      .then(( response ) => {
        // return response.data.data.managers
        return response = response.data.data.managers.map(el => {
          return {
            id: el.id,
            title: el.name,
            jobtitle: el.info,
            email: el.email,
            phone: el.phone,
          }
        })
      })
    } catch(err) {
      console.log(err)
    }
  },
  AddManager(formData) {
    try {
      return httpClient.post(`${url}/info/createManager`, formData)
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },
  updateManager(formData) {
    try {
      return httpClient.post(`${url}/info/updateManager`, formData)
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },
  delManager(man_id, val) {
    try {
      return httpClient.post(`${url}/info/deleteManager`, {
        id: man_id,
        type: val
      })
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },

  // tags gategories
  getListTags() {
    try {
      return httpClient.post(`${url}/info/categories/getList`)
      .then(( {data} ) => {
        return data = data.data.map(el => {
          return {
            id: el.id,
            name: el.name,
            description: el.description,
            tags: el.tags
          }
        })
      })
    } catch(err) {
      console.log(err)
    }
  },
  getActiveListTags() {
    try {
      return httpClient.post(`${url}/info/categories/getAll`)
      .then(( {data} ) => {
        return data.data
      })
    } catch(err) {
      console.log(err)
    }
  },
  addTagInCategory(formData) {
    try {
      return httpClient.post(`${url}/info/categories/tag/create`, formData)
      .then(( {data} ) => {
        return data.data
      })
    } catch(err) {
      console.log(err)
    }
  },
}