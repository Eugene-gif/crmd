import httpClient from "./httpClient.js";

const url = 'orderers'

function getMyDate(time) {
  let respDate = new Date(time)
  let year = respDate.getFullYear()
  let date = respDate.getDate()
  let mounth = respDate.getMonth()
  return `${year} ${date} ${mounth}`
}

export const orderersApi = {
  createOrderers(formData) {
    try {
      return httpClient.post(`${url}/create`, {
        orderer: {
          data: {
            user_id: formData.user_id,
            first_name: formData.first_name,
            second_name: formData.second_name,
            last_name: formData.last_name,
            birth_date: formData.birth_date,
            phone: formData.phone,
            email: formData.email,
            soc_inst: formData.soc_inst,
            soc_wa: formData.soc_wa,
            soc_tg: formData.soc_tg,
            photo: formData.photo,
            personal_info: formData.personal_info
          }
        }
      }).then(({ data }) => {
        return data
        // return data = data.data.map(el => {
        // })
      });
    } catch (err) {
      console.log(err)
    }
  }
}