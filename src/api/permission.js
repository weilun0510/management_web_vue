import axios from 'axios';

// 客户权限组
// 列表
export const permissionList = params => {
  return axios({
    method: 'get',
    url: '/permissions/back-customer-permissions/page',
    params
  })
}
// 列表-不分页
export const permissionNoPageList = params => {
  return axios({
    method: 'get',
    url: '/permissions/back-customer-permissions/list',
    params
  })
}
// 新增
export const permissionAdd = params => {
  return axios({
    method: 'post',
    url: '/permissions/back-customer-permissions',
    data: params
  })
}
// 修改
export const permissionModify = params => {
  return axios({
    method: 'put',
    url: '/permissions/back-customer-permissions',
    data: params
  })
}
// 删除
export const permissionDelete = params => {
  console.log('params: ', params);
  return axios({
    method: 'delete',
    url: '/permissions/back-customer-permissions/' + params.id,
    params: {}
  })
}
// 详情
export const permissionDetail = params => {
  return axios({
    method: 'get',
    url: '/permissions/back-customer-permissions/' + params.id,
    params: {}
  })
}

// 子管理员权限组
// 列表
export const adminPermissionList = params => {
  return axios({
    method: 'get',
    url: '/permissions/back-admin-permissions/page',
    params
  })
}
// 列表-不分页
export const adminPermissionNoPageList = params => {
  return axios({
    method: 'get',
    url: '/permissions/back-admin-permissions/list',
    params
  })
}
// 新增
export const adminPermissionAdd = params => {
  return axios({
    method: 'post',
    url: '/permissions/back-admin-permissions',
    data: params
  })
}
// 修改
export const adminPermissionModify = params => {
  return axios({
    method: 'put',
    url: '/permissions/back-admin-permissions',
    data: params
  })
}
// 删除
export const adminPermissionDelete = params => {
  console.log('params: ', params);
  return axios({
    method: 'delete',
    url: '/permissions/back-admin-permissions/' + params.id,
    params: {}
  })
}
// 详情
export const adminPermissionDedail = params => {
  return axios({
    method: 'get',
    url: '/permissions/back-admin-permissions/' + params.id,
    params: {}
  })
}

// 权限组-管理员菜单-不分页（菜单权限树）
export const adminPermissionMenuTree = () => {
  return axios({
    method: 'get',
    url: '/permissions/back-menu/lists'
  })
}

// 侧边栏菜单权限
export const menuPermission = () => {
  return axios({
    method: 'post',
    url: '/account/back-admin/getUserRole'
  })
}