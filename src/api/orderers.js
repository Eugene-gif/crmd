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

  createOrderers(data) {
    const formData = new FormData()
    formData.append("user_id", data.user_id)
    formData.append("first_name", data.first_name)
    formData.append("second_name", data.second_name)
    formData.append("last_name", data.last_name)
    formData.append("birth_date", data.birth_date)
    formData.append("phone", data.phone)
    formData.append("email", data.email)
    formData.append("soc_inst", data.soc_inst)
    formData.append("soc_wa", data.soc_wa)
    formData.append("soc_tg", data.soc_tg)
    formData.append("photo", data.photo)
    formData.append("personal_info", data.personal_info)
    formData.append("second_name", data.second_name)
    try {
      return httpClient({
        method: "post",
        url: `${url}/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(response => {
        return response
      })
    } catch (err) {
      console.log(err)
    }
  }
}