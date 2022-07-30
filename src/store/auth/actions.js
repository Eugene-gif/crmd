import { api } from 'boot/axios'

export const doLogin = async ({commit}, payload) => {
  api.post(`/auth/login`, {
    email: payload.email,
    password: payload.password
  })
  .then(response => {
    let token = response.data.data.token
    commit('setToken', token)
    token = localStorage.getItem('token')
    api.defaults.headers.common.Authorization = 'Bearer ' + token
    window.location.href = '/';
  })
}

export const doRegister = async ({commit}, payload) => {
  api.post(`/auth/register`, {
    name: payload.email,
    email: payload.email,
    password: payload.password,
    password_confirmation: payload.confirmPassword,
    user_name: payload.name,
    user_lastname: payload.lastName
  })
  .then(response => {
    const token = response.data.data.token
    commit('setToken', token)
    api.defaults.headers.common.Authorization = 'Bearer ' + token
    window.location.href = '/';
  }).catch ((error) => {
    alert(error.response.data.message)
  })
}

export const singOut = ({commit}) => {
  api.defaults.headers.common.Authorization = ''
  commit('removeToken')
}

export const getMe = async ({commit, dispatch}, token) => {
  // await api
}

export const init = async ({commit}) => {
  const token = localStorage.getItem('token')
  if (token) await commit('setToken', JSON.parse(token))
  else commit('removeToken')
}