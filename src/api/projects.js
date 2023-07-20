import httpClient from "./httpClient.js"
import { getFormatDate } from 'src/composable/getFormatDate'

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
  const timeAndDate = dateStr.split(' ')
  const [hours, minutes, seconds] = timeAndDate[0].split(':').map(Number)
  const [day, month, year] = timeAndDate[1].split('/').map(Number)

  return new Date(year, month - 1, day, hours, minutes, seconds)
}

function getProgress(created_at, services) {
  let readiness = 0
  if (services !== null && services.length) {
    readiness = services.reduce(function(total, obj) {
      return total + obj.service_term + obj.unit_term
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
  if (services !== null && services.length) {
    readiness = services.reduce(function(total, obj) {
      return total + obj.service_term + obj.unit_term
    }, 0)
  }

  const projectDueDate = parseCustomDate(created_at)
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

  async getAll() {
    try {
      let resp = await httpClient.post(`${url}/getAll`)
      resp = resp.data.data

      resp.filter(el => {
        el.status = 1
        el.creater = {
          name: `${el.user.first_name} ${el.user.last_name}`,
          image: el.user.image.thumbnail ? el.user.image.thumbnail : el.user.image.placeholder
        }
        el.orderer = `${el.orderer.data.first_name} ${el.orderer.data.last_name}`
        el.changed = getFormatDate(el.updated_at)
        el.created = getFormatDate(el.created_at)
        el.timing = getTiming(el.created_at, el.services)
        el.payment = 80
        el.readiness = getProgress(el.created_at, el.services)
        el.share = [
          // {
              //   icon: '/icons/stroipro.jpg',
              //   link: ''
              // }
        ]
      })
      return resp
    } catch (err) {
      throw err
    }
  },

  async getAllMy() {
    try {
      let resp = await httpClient.post(`${url}/getMy`)
      resp = resp.data.data

      resp.filter(el => {
        el.status = 1
        el.orderer = `${el.orderer.data.first_name} ${el.orderer.data.last_name}`
        el.changed = getFormatDate(el.updated_at)
        el.created = getFormatDate(el.created_at)
        el.timing = getTiming(el.created_at, el.services)
        el.payment = 80
        el.readiness = getProgress(el.created_at, el.services)
        el.share = []
      })
      return resp
    } catch (err) {
      throw err
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
