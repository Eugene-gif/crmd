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
            user_id: '',
            first_name: '',
            second_name: '',
            last_name: '',
            birth_date: '',
            phone: '',
            email: '',
            soc_inst: '',
            soc_wa: '',
            soc_tg: '',
            photo: '',
            personal_info: ''
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