import httpClient from "./httpClient.js";

const url = 'contractors'

export const contractorApi = {

  getListContractors() {
    try {
      return httpClient.post(`/contractors/getAll`)
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
  
  getInfoContractor() {
    try {
      return httpClient.post(`${url}/getFullInfo`)
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
  updateContractor(data) {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("city", data.city)
    formData.append("region", data.region)
    if (data.public_email === null) {
      formData.append("public_email", '')
    } else {
      formData.append("public_email", data.public_email)
    }
    
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


  // Affiliate
  getAllAffiliate() {
    try {
      return httpClient.post(`${url}/info/getAffiliate`)
      .then(( {data} ) => {
        return data = data.data.map(el => {
          return {
            id: el.id,
            title: el.name,
            timework: el.info
          }
        })
      })
    } catch(err) {
      throw err
    }
  },
  AddAffiliate(formData) {
    try {
      return httpClient.post(`${url}/info/createAffiliate`, formData)
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },
  updateAffiliate(formData) {
    try {
      return httpClient.post(`${url}/info/updateAffiliate`, formData)
      .then(( {response} ) => {
        return response
      })
    } catch(err) {
      console.log(err)
    }
  },
  delAffiliate(man_id) {
    try {
      return httpClient.post(`${url}/info/deleteAffiliate`, {
        affiliate_id: man_id
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
      return httpClient.post(`${url}/info/getManager`)
      .then(( {data} ) => {
        // return response.data.data.managers
        return data = data.data.map(el => {
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
      throw err
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
        manager_id: man_id
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
      return httpClient.post(`${url}/info/getTags`)
      .then(( {data} ) => {
        let arr = []
        Object.keys(data.data).forEach(key => {
          arr.push({name: key, tags: data.data[key], value: true})
        })
        return arr
      })
    } catch(err) {
      console.log(err)
    }
  },
  addTagInCategory(arr) {
    const formData = new FormData();
    for( var i = 0; i < arr.length; i++ ){
      let tag = arr[i];
      formData.append(`tags[]`, tag);
    }

    try {
      return httpClient({
        method: "post",
        url: `${url}/info/setTags`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        let arr = []
        let arr2 = []
        Object.keys(data.data).forEach(key => {
          arr2.push({name: key, tags: data.data[key], value: true})
          data.data[key].forEach(el => {
            arr.push(el.id)
          })
        })
        return {arr, arr2}
      })
    } catch (err) {
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