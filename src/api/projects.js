import httpClient from "./httpClient.js"
import getFormatDate from 'src/composable/getFormatDate'

const url = 'projects'

function getMyDate(time) {
  let respDate = new Date(time)
  let year = respDate.getFullYear()
  let date = respDate.getDate()
  let mounth = respDate.getMonth()
  return `${year} ${date} ${mounth}`
}

const currentDate = new Date()
function parseCustomDate(dateStr) {
  const timeAndDate = dateStr.split(' ');
  const [hours, minutes, seconds] = timeAndDate[0].split(':').map(Number);
  const [day, month, year] = timeAndDate[1].split('/').map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds);
}

function getProgress(created_at, services) {
  let readiness = 0
  if (services.length) {
    readiness = services.reduce(function(total, obj) {
      return total + obj.service_term === null || undefined ? obj.unit_term : obj.service_term
    }, 0)
  }
  
  const projectDueDate = parseCustomDate(created_at);
  let projectCompletionDate = new Date(projectDueDate)
  projectCompletionDate.setDate(projectDueDate.getDate() + readiness);

  const timeElapsedInMilliseconds = currentDate.getTime() - projectDueDate.getTime()
  const projectTimeInMilliseconds = projectCompletionDate.getTime() - projectDueDate.getTime()
  let projectCompletionPercentage = Math.round((timeElapsedInMilliseconds / projectTimeInMilliseconds) * 100)

  if (projectCompletionPercentage === Infinity) {
    projectCompletionPercentage = 0
  } else if (projectCompletionPercentage < 1) {
    projectCompletionPercentage = 1
  } else if (projectCompletionPercentage > 100) {
    projectCompletionPercentage = 100
  }

  return projectCompletionPercentage
}

function getTiming(created_at, services) {
  let readiness = 0
  if (services.length) {
    readiness = services.reduce(function(total, obj) {
      return total + obj.service_term === null || undefined ? obj.unit_term : obj.service_term
    }, 0)
  }

  const projectDueDate = parseCustomDate(created_at);
  let projectCompletionDate = new Date(projectDueDate)
  projectCompletionDate.setDate(projectDueDate.getDate() + readiness);

  const timeElapsedInMilliseconds = currentDate.getTime() - projectDueDate.getTime()

  const totalDaysForProject = readiness
  const daysElapsed = Math.floor(timeElapsedInMilliseconds / (1000 * 60 * 60 * 24))
  let daysRemaining = totalDaysForProject - daysElapsed

  if (daysRemaining < 0) daysRemaining = 0

  return daysRemaining
}
 



export const projectsApi = {
  getAll() {
    try {
      return httpClient.post(`${url}/getAll`, {})
      .then(({ data }) => {
        
        return data = data.data.map(el => {

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
            changed: getFormatDate(el.updated_at),
            created: getFormatDate(el.created_at),
            timing: getTiming(el.created_at, el.services),
            orderer: el.orderer,
            payment: 80,
            readiness: getProgress(el.created_at, el.services),
            image: el.image,
            share: [
              // {
              //   icon: '/icons/anton.jpg',
              //   link: 's'
              // },
              // {
              //   icon: '/icons/stroipro.jpg',
              //   link: ''
              // },
              // {
              //   icon: '/icons/anton.jpg',
              //   link: ''
              // },
              // {
              //   icon: '/icons/anton.jpg',
              //   link: ''
              // },
              // {
              //   icon: '/icons/stroipro.jpg',
              //   link: ''
              // },
              // {
              //   icon: '/icons/stroipro.jpg',
              //   link: ''
              // }
            ]   
          }
        })
      });
    } catch(err) {
      console.log(err)
    }
  },

  getById(id) {    
    try {
      return httpClient.post(`${url}/get`, {
        project_id: id
      })
      .then(({ data }) => {
        data.data.readiness = getProgress(data.data.created_at, data.data.services)
        return data.data
      })
    } catch(err) {
      throw err
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

  updateInfo(data) {
    const formData = new FormData()
    formData.append("id", data.id)
    formData.append("project_type_id", data.project_type.id)
    formData.append("name", data.name)
    formData.append("address", data.address)
    formData.append("square", data.square)
    formData.append("emoji", data.emoji)
    
    try {
      return httpClient({
        method: "post",
        url: `${url}/update`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return data.data
      })
    } catch (err) {
      console.log(err)
    }
  },

  updateImage(data) {
    const formData = new FormData()
    formData.append("id", data.id)
    formData.append("image", data.uploadFile)

    try {
      return httpClient({
        method: "post",
        url: `${url}/update`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({data}) => {
        return data.data
      })
    } catch (err) {
      console.log(err)
    }
  },

//   id
// project_type_id
// orderer_id
// name
// address
// square
// emoji
// image

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