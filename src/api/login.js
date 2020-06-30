import axios from 'axios';

export const login = params => {
  return axios({
    method: 'post',
    url: '/account/back-admin/login',
    params
  })
}

export const logout = params => {
  return axios({
    method: 'post',
    url: '/account/back-admin/logout',
    params
  })
}

