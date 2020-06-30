import axios from 'axios';

export const log = params => {
  return axios({
    method: 'get',
    url: '/account/back-sys-log/page',
    params
  })
}

