import httpClient from "./httpClient.js";

const url = 'projects'

function getMyDate(time) {
  let respDate = new Date(time)
  let year = respDate.getFullYear()
  let date = respDate.getDate()
  let mounth = respDate.getMonth()
  return `${year} ${date} ${mounth}`
}

export const projectsApi = {
  getAll() {
    try {
      return httpClient.post(`${url}/getall`, {})
      .then(({ data }) => {
        return data = data.data.map(el => {
          return {
            id: el.id,
            status: 1,
            iconName: el.emoji,
            name: el.name,
            type: el.project_type_id,
            typeName: el.project_type.name,
            address: el.address,
            square: el.square,
            customer: `${el.orderer.last_name} ${el.orderer.first_name}`,
            changed: getMyDate(el.created_at),
            created: getMyDate(el.updated_at),
            timing: 50,
            payment: 80,
            readiness: 40,
            share: [
              {
                icon: '/icons/anton.jpg',
                link: 's'
              },
              {
                icon: '/icons/stroipro.jpg',
                link: ''
              },
              {
                icon: '/icons/anton.jpg',
                link: ''
              },
              {
                icon: '/icons/anton.jpg',
                link: ''
              },
              {
                icon: '/icons/stroipro.jpg',
                link: ''
              },
              {
                icon: '/icons/stroipro.jpg',
                link: ''
              }
            ]   
          }
        })
      });
    } catch(err) {
      console.log(err)
    }
  },
  createProject(formData) {
    try {
      return httpClient.post(`${url}/create`, {
        project: {
          data: {
            name: formData.name,
            address: formData.adress,
            square: formData.square,
            project_type_id: formData.project_type_id,
            orderer: formData.orderer
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