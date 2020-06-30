import axios from 'axios';

// 应用管理
// 列表
export const applicationList = params => {
  return axios({
    method: 'get',
    url: '/app/back-app/page',
    params
  })
}
// 新增
export const applicationAdd = params => {
  return axios({
    method: 'post',
    url: '/app/back-app/page',
    data: params
  })
}
// 修改
export const applicationModify = params => {
  return axios({
    method: 'put',
    url: '/app/back-app/page',
    data: params
  })
}
// 删除
export const applicationDelete = params => {
  console.log('params: ', params);
  return axios({
    method: 'delete',
    url: '/app/back-app/page/' + params.id,
    params: {}
  })
}
// 详情
export const applicationDetail = params => {
  return axios({
    method: 'get',
    url: '/app/back-app/page/' + params.id,
    params: {}
  })
}