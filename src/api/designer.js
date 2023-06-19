import httpClient from "./httpClient.js";

const url = 'designers'

export const designerApi = {

  async get(id) {
    try {
      const resp = await httpClient.post(`${url}/get`, {
        user_id: id
      })

      return resp.data.data
    } catch (err) {
      throw err
    }
  },

  getListDesigners() {
    try {
      return httpClient.post(`${url}/getAll`)
      .then(( {data} ) => {
        console.log(data.data)
        return data = data.data.map(el => {
          return {
            id: el.id,
            image: el.image.thumbnail ? el.image.thumbnail : el.image.placeholder,
            name: el.name,
            status: 1,
            statusName: el.status,
            tab: '',
            like: 7,
            dislike: 5,
            reviews: 12,
            documents: 2,
            pay: true,
            bid: el.rate,
            city: el.city ? el.city : 'Нет города',
            email: el.public_email,
            sait: el.url,
            whatsapp: el.soc_wa,
            tel: el.public_phone,
            telegram: el.soc_tg,
            instagram: el.soc_inst,
            show: false,
            projects: el.work_category_tags
          }
        })
      })
      
    } catch(err) {
      throw err
    }
  },

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
        data.data.sort((a, b) => {
          let dateTimeA = a.updated_at.split(' ')
          let dateA = dateTimeA[1].split('/').map(part => parseInt(part, 10))
          let timeA = dateTimeA[0].split(':').map(part => parseInt(part, 10))
        
          let dateTimeB = b.updated_at.split(' ')
          let dateB = dateTimeB[1].split('/').map(part => parseInt(part, 10))
          let timeB = dateTimeB[0].split(':').map(part => parseInt(part, 10))
          
          // Сначала сравниваем годы
          if (dateA[2] != dateB[2]) {
            return dateA[2] - dateB[2] // по возрастанию
          }
        
          // Затем сравниваем месяцы
          if (dateA[1] != dateB[1]) {
            return dateA[1] - dateB[1] // по возрастанию
          }
        
          // Если месяцы одинаковые, сравниваем дни
          if (dateA[0] != dateB[0]) {
            return dateA[0] - dateB[0] // по возрастанию
          }
        
          // Если дни одинаковые, сравниваем часы
          if (timeA[0] != timeB[0]) {
            return timeA[0] - timeB[0] // по возрастанию
          }
        
          // Если часы одинаковые, сравниваем минуты
          return timeA[1] - timeB[1] // по возрастанию
        })
        
        let sortedData = data.data.map(el => {
          return {
            id: el.id,
            name: el.name,
            price: el.service_price == null ? el.unit_price : el.service_price,
            deadline: el.service_term == null ? el.unit_term : el.service_term,
            pricename: el.type.text,
            value: false,
            type: el.service_term == null ? 'unit' : 'service',
            updated_at: el.updated_at
          }
        })
        
        return sortedData
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
  getSetTerms(userId) {
    try {
      return httpClient.post(`${url}/info/getTerms`, {user_id: userId})
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