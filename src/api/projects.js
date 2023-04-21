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
      return httpClient.post(`${url}/getAll`, {})
      .then(({ data }) => {
        const currentDate = new Date()
        return data = data.data.map(el => {

          let readiness = 0
          if (el.services.length) {
            readiness = el.services.reduce(function(total, obj) {
              return total + obj.service_term === null || undefined ? obj.unit_term : obj.service_term
            }, 0)
          }
          
          const projectDueDate = new Date(Date.parse(el.created_at))
          let projectCompletionDate = new Date(projectDueDate)
          projectCompletionDate.setDate(projectDueDate.getDate() + readiness);
          const timeElapsedInMilliseconds = currentDate.getTime() - projectDueDate.getTime()
          const projectTimeInMilliseconds = projectCompletionDate.getTime() - projectDueDate.getTime()
          let projectCompletionPercentage = Math.round((timeElapsedInMilliseconds / projectTimeInMilliseconds) * 100)

          const totalDaysForProject = readiness
          const daysElapsed = Math.floor(timeElapsedInMilliseconds / (1000 * 60 * 60 * 24))
          let daysRemaining = totalDaysForProject - daysElapsed

          if (projectCompletionPercentage === Infinity) {
            projectCompletionPercentage = 0
          } else if (projectCompletionPercentage < 1) {
            projectCompletionPercentage = 1
          } else if (projectCompletionPercentage > 100) {
            projectCompletionPercentage = 100
          }

          if (daysRemaining < 0) daysRemaining = 0
          
          return {
            id: el.id,
            status: 1,
            iconName: el.emoji,
            name: el.name,
            type: el.project_type,
            typeName: el.project_type.name,
            address: el.address,
            square: el.square,
            customer: `${el.orderer.data.first_name} ${el.orderer.data.last_name}`,
            changed: getMyDate(el.created_at),
            created: getMyDate(el.updated_at),
            timing: daysRemaining,
            orderer: el.orderer,
            payment: 80,
            readiness: projectCompletionPercentage,
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



  getTypes() {
    try {
      return httpClient.post(`${url}/types/get`, {})
      .then(({ data }) => {
        return data.data
      })
    } catch(err) {
      console.log(err)
    }
  },

  createProject(formData) {
    try {
      let data = {
        name: formData.name,
        address: formData.adress,
        square: formData.square,
        project_type_id: formData.project_type_id,
        orderer_id: formData.orderer_id,
        orderer: formData.orderer,
        emoji: formData.emoji,
        cost: formData.price
      };
      
      if (formData.services.length > 0) {
        data.services = formData.services;
      }
      return httpClient.post(`${url}/create`, data).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  },

  cloneProject(formData) {
    try {
      return httpClient.post(`${url}/create`, {
        name: formData.name,
        address: formData.adress,
        square: formData.square,
        project_type_id: formData.project_type_id,
        orderer_id: formData.orderer_id,
        orderer: formData.orderer,
        emoji: formData.emoji,
        cost: formData.price
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  },

  delProject(id) {
    try {
      return httpClient.post(`${url}/delete`, {
        project_id: id 
      }).then(({ data }) => {
        return data
      })
    } catch (err) {
      console.log(err)
    }
  }
}