import httpClient from "./httpClient.js";

const url = 'contractors'

export const contractorApi = {
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


  // Affiliate
  getAllAffiliate() {
    try {
      return httpClient.post(`${url}/info/getAllManagers`)
      .then(( response ) => {
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
  delAffiliate(man_id, val) {
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
}