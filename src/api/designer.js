import httpClient from "./httpClient.js";

const url = 'designers'

export const designerApi = {

  // info
  getBankingInfo(formData) {
    if (typeof formData.company_type_id === 'object') {
      formData.company_type_id = formData.company_type.id
    }
    try {
      return httpClient.post(`/info/updateBankingInfo`, formData)
      .then(( response ) => {
        let myObject = {}
          Object.keys(response.data.data).forEach(key => {
            if (key != 'id' && key != 'contractor_id' && key != 'created_at' && key != 'updated_at') {
              if(response.data.data[key] === '' || response.data.data[key] === null) {
                myObject[key] = null
              } else {
                myObject[key] = response.data.data[key]
              }
            }
          });
        
        return myObject
      })
    } catch(err) {
      console.log(err)
    }
  },
  
  getInfoDesigner() {
    try {
      return httpClient.post(`${url}/getFullInfo `)
      .then(( {data} ) => {
        let formData = {}
        Object.keys(data.data).forEach(key => {
          if(data.data[key] === 'null' || data.data[key] === null) {
            formData[key] = null
          } else {
            formData[key] = data.data[key]
          }
        });
        return formData
      })
    } catch(err) {
      console.log(err)
    }
  },

  updateDesigner(data) {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("city", data.city)
    formData.append("region", data.region)
    formData.append("public_email", data.public_email)
    formData.append("public_phone", data.public_phone)
    formData.append("public_address", data.public_address)
    formData.append("url", data.url)
    formData.append("soc_wa", data.soc_wa)
    formData.append("soc_tg", data.soc_tg)
    formData.append("soc_inst", data.soc_inst)
    formData.append("description", data.description)

    try {
      return httpClient({
        method: "post",
        url: `${url}/update`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        // return data.data
        let formData = {}
        Object.keys(data.data).forEach(key => {
          if(data.data[key] === 'null' || data.data[key] === null) {
            formData[key] = null
          } else {
            formData[key] = data.data[key]
          }
        });
        return formData
      })
    } catch(err) {
      console.log(err)
    }
  },

  // услуги
  getServices() {
    try {
      return httpClient.post(`${url}/info/services/getAll`)
      .then(( {data} ) => {
        return data = data.data.map(el => {
          return {
            id: el.id,
            name: el.name,
            price: el.service_price == null ? el.unit_price : el.service_price,
            deadline: el.service_term == null ? el.unit_term : el.service_term,
            pricename: el.type.text,
            type: el.service_term == null ? 'unit' : 'service'
          }
        })
      })
    } catch(err) {
      console.log(err)
    }
  },
  // id: 1,
  // name: 'Планировочное решение',
  // price: '200 руб.',
  // deadline: '12 дн.',
  // pricename: 'за кв. м.',

//   id "98dd85ee-72e0-4a1f-9a7f-fd4deb1acb3d"
//   name "3D-визуализация"
//   service_price null
//   service_term null
//   sort 200
//   type {code: 'unit', text: 'за кв. м.'}
//   unit_price 1000
//   unit_term 35
  
  addService(formData) {
    try {
      return httpClient.post(`${url}/info/services/create`, formData)
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },
  updateService(formData) {
    try {
      return httpClient.post(`${url}/info/services/update`, formData)
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },
  delService(id) {
    try {
      return httpClient.post(`${url}/info/services/delete`, {
        service_id: id
      })
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },
  


  
  // условия работ с дизайнерами
  getSetTerms() {
    try {
      return httpClient.post(`${url}/info/getTerms`)
      .then(( {data} ) => {
        return data.data
      })
    } catch(err) {
      console.log(err)
    }
  },
  updateSetTerms(data) {
    try {
      return httpClient.post(`${url}/info/setTerms`, data)
      .then(( {data} ) => {
        return data.data
      })
    } catch(err) {
      console.log(err)
    }
  },

  // получение типов компаний
  getCompanyTypes() {
    try {
      return httpClient.post(`${url}/info/getCompanyTypes`)
      .then(( {data} ) => {
        return data.data
      })
    } catch(err) {
      console.log(err)
    }
  },
  
}