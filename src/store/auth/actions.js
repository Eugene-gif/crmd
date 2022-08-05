import { api } from 'boot/axios'

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