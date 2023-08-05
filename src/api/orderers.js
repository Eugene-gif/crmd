import httpClient from "./httpClient.js";

const url = 'orderers'


function getMyDate(time) {
  let respDate = new Date(time)
  let year = respDate.getFullYear()
  let date = respDate.getDate()
  let mounth = respDate.getMonth()
  return `${year} ${date} ${mounth}`
}
let user = JSON.parse(localStorage.getItem('userInfo'))

export const orderersApi = {

  getAll() {
    try {
      return httpClient({
        method: "post",
        url: `${url}/getAll`
      })
        .then(({ data }) => {
          return data = data.data.map(el => {
            return {
              label: `${el.first_name} ${el.last_name}`,
              value: `${el.first_name} ${el.last_name}`,
              icon: el.image.thumbnail !== '' ? el.image.thumbnail : el.image.placeholder,
              email: el.email,
              like: 25,
              dislike: 2,
              reviews: 12,
              whatsapp: el.soc_wa,
              tel: el.phone,
              telegram: `//${el.soc_tg}`,
              instagram: `//${el.soc_inst}`,
              tab: '',
              tab: '',
              id: el.id,
              orderer: el.id,
              orderer_id: el.id,
            }
          })
        })
    } catch (err) {
      console.log(err)
    }
  },

  getClients() {
    try {
      return httpClient({
        method: "post",
        url: `${url}/getList`,
      }).then(({ data }) => {
        return data.data.map(el => {
          let client = {
            id: el.id,
            status: 1,
            image: el.image.thumbnail || el.image.placeholder,
            name: `${el.first_name} ${el.last_name}`,
            second_name: el.second_name,
            tel: el.phone,
            whatsapp: el.soc_wa,
            telegram: el.soc_tg,
            instagram: el.soc_inst,
            email: el.email,
            show: false,
            birth_data: el.birth_data,
            projects: []
          }

          el.projects.forEach(project => {
            client.projects.push({
              icon: project.emoji,
              name: project.name,
              progress: 20,
              pay: 0,
              link: ''
            })
          })

          return client
        })
      })
    } catch (err) {
      console.log(err)
    }
  },

  updateOrderers(data) {
    const formData = new FormData()
    formData.append("id", data.id)
    formData.append("first_name", data.first_name)
    if (data.second_name) formData.append("second_name", data.second_name)
    formData.append("last_name", data.last_name)
    formData.append("birth_date", data.birth_data)
    if (data.phone) formData.append("phone", data.phone)
    if (data.email) formData.append("email", data.email)
    if (data.soc_inst) formData.append("soc_inst", data.soc_inst)
    if (data.soc_wa) formData.append("soc_wa", data.soc_wa)
    if (data.soc_tg) formData.append("soc_tg", data.soc_tg)

    if (data.image) {
      formData.append("image", data.image)
    }
    formData.append("personal_info", data.personal_info)
    formData.append("second_name", data.second_name)
    try {
      return httpClient({
        method: "post",
        url: `${url}/update`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(response => {
        return response.data
      })
    } catch (err) { 
      console.log(err)
    }
  },
  
  createOrderers(data) {
    const formData = new FormData()
    // formData.append("orderer[data][user_id]", data.user_id)
    formData.append("first_name", data.first_name)
    if (data.second_name) formData.append("second_name", data.second_name)
    formData.append("last_name", data.last_name)
    if (data.birth_data) formData.append("birth_date", data.birth_data)
    if (data.phone) formData.append("phone", data.phone)
    if (data.email) formData.append("email", data.email)
    if (data.soc_inst) formData.append("soc_inst", data.soc_inst)
    if (data.soc_wa) formData.append("soc_wa", data.soc_wa)
    if (data.soc_tg) formData.append("soc_tg", data.soc_tg)
    if (data.image) formData.append("image", data.image)
    formData.append("personal_info", data.personal_info)
    try {
      return httpClient({
        method: "post",
        url: `${url}/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(response => {
        return response.data
      })
    } catch (err) {
      console.log(err)
    }
  },

  delOrderer(id) {
    try {
      return httpClient.post(`${url}/delete`, {
        orderer_id: id
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  }
}