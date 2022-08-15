import httpClient from "./httpClient.js";

const url = 'orderers'
const photoUrl = 

function getMyDate(time) {
  let respDate = new Date(time)
  let year = respDate.getFullYear()
  let date = respDate.getDate()
  let mounth = respDate.getMonth()
  return `${year} ${date} ${mounth}`
}

export const orderersApi = {

  getAll() {
    try {
      return httpClient({
        method: "post",
        url: `${url}/get`
      }).then(response => {
        return response = response.data.map(el => {
          return {
            label: `${el.first_name} ${el.last_name}`,
            value: `${el.first_name} ${el.last_name}`,
            icon: `https://crmd.crookedweb.site/${el.photo}`,
            email: el.email,
            like: 25,
            dislike: 2,
            reviews: 12,
            whatsapp: el.soc_wa,
            tel: el.phone,
            telegram: `//${el.soc_tg}`,
            instagram: `//${el.soc_inst}`,
            tab: '',
            user_id: el.id
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
        url: `${url}/get`
      }).then(response => {
        return response = response.data.map(el => {
          return {
            id: el.id,
            status: 1,
            image: `/${el.photo}`,
            name: `${el.first_name} ${el.last_name}`,
            city: 'города нет в апи',
            tel: el.phone,
            whatsapp: el.soc_wa,
            telegram: el.soc_tg,
            instagram: el.soc_inst,
            email: el.email,
            show: false,
            projects: [
              {
                icon: '🏰',
                name: 'Квартира на Мира',
                progress: 20,
                pay: 0,
                city: 'Краснодар',
                link: ''
              },
              {
                icon: '🏰',
                name: 'Название объекта, заданное пользователем',
                progress: 50,
                pay: 20,
                city: 'Сочи',
                link: ''
              }
            ]    
          }
        })
      })
    } catch (err) {
      console.log(err)
    }
  },

  createOrderers(data) {
    const formData = new FormData()
    // formData.append("orderer[data][user_id]", data.user_id)
    formData.append("orderer[data][first_name]", data.first_name)
    formData.append("orderer[data][second_name]", data.second_name)
    formData.append("orderer[data][last_name]", data.last_name)
    formData.append("orderer[data][birth_date]", data.birth_date)
    formData.append("orderer[data][phone]", data.phone)
    formData.append("orderer[data][email]", data.email)
    formData.append("orderer[data][soc_inst]", data.soc_inst)
    formData.append("orderer[data][soc_wa]", data.soc_wa)
    formData.append("orderer[data][soc_tg]", data.soc_tg)
    formData.append("orderer[data][photo]", data.photo)
    formData.append("orderer[data][personal_info]", data.personal_info)
    formData.append("orderer[data][second_name]", data.second_name)
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
  }
}