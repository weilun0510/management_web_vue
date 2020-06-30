import axios from 'axios';

// 用户管理

// 用户
// 列表
export const userList = params => {
  return axios({
    method: 'get',
    url: '/account/back-customer/page',
    params
  })
}
// 新增
export const userAdd = params => {
  return axios({
    method: 'post',
    url: '/account/back-customer',
    data: params
  })
}
// 修改
export const userModify = params => {
  return axios({
    method: 'put',
    url: '/account/back-customer',
    data: params
  })
}
// 删除
export const userDelete = params => {
  return axios({
    method: 'delete',
    url: '/account/back-customer/' + params.id,
    params: {}
  })
}
// 详情
export const customerDetail = params => {
  return axios({
    method: 'get',
    url: '/account/back-customer/' + params.id,
    params: {}
  })
}

// 管理员
// 列表
export const userAdminList = params => {
  return axios({
    method: 'get',
    url: '/account/back-admin/page',
    params
  })
}
// 新增
export const userAdminAdd = params => {
  return axios({
    method: 'post',
    url: '/account/back-admin',
    data: params
  })
}
// 修改
export const userAdminModify = params => {
  return axios({
    method: 'put',
    url: '/account/back-admin',
    data: params
  })
}
// 删除
export const userAdminDelete = params => {
  return axios({
    method: 'delete',
    url: '/account/back-admin/' + params.id,
    params: {}
  })
}
// 详情
export const userAdminDetail = params => {
  return axios({
    method: 'get',
    url: '/account/back-admin/' + params.id,
    params: {}
  })
}