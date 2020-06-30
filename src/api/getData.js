import axios from 'axios';
// import { baseUrl } from '../config/env';

// export const getAll = data => axios(baseUrl + '/Home/GetNewsClass', data);
// 取消关注
export const userAttentionRemove = apiParams => {
  return axios({
    method: 'delete',
    url: '/userAttention/remove',
    params: apiParams
  })
}