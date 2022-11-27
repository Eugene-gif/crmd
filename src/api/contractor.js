import httpClient from "./httpClient.js";

const url = 'contractors'

export const contractorApi = {
  getBankingInfo(formData) {
    try {
      return httpClient.post(`${url}/info/updateBankingInfo`, {formData})
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
}