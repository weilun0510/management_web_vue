// import types from '../types';
import { userList, userAdd, userDelete, customerDetail, userModify, userAdminList, userAdminAdd, userAdminModify, userAdminDelete, userAdminDetail } from '@/api/user';
const state = {
  userList: {
    list: [],
    page: {}
  },
  customerDetailInfo: {},
  userAdminDetailInfo: {},
  userAdminList: {
    list: [],
    page: {}
  }
};
const actions = {
  // 用户列表
  async getUserList(context, payload) {
    const res = await userList(payload)
    context.commit('uploadlist', {
      tableName: 'userList',
      data: res.data
    })
  },
  // 用户删除
  async userDelete(context, payload) {
    const res = await userDelete(payload)
    return res;
  },
  // 用户详情
  async customerDetail(context, payload) {
    const res = await customerDetail(payload)
    context.commit('uploadDetail', res.data)
  },
  // 用户修改
  async userModify(context, payload) {
    const res = await userModify(payload)
    return res;
  },
  // 用户新增
  async userAdd(context, payload) {
    const res = await userAdd(payload)
    return res;
  },
  // 管理员列表
  async getUserAdminList(context, payload) {
    const res = await userAdminList(payload)
    context.commit('uploadlist', {
      tableName: 'userAdminList',
      data: res.data
    })
  },
  // 管理员删除
  async userAdminDelete(context, payload) {
    const res = await userAdminDelete(payload)
    return res;
  },
  // 管理员详情
  async userAdminDetail(context, payload) {
    const res = await userAdminDetail(payload)
    context.commit('uploadUserAdminDetail', res.data)
  },
  // 管理员修改
  async userAdminModify(context, payload) {
    const res = await userAdminModify(payload)
    return res;
  },
  // 管理员新增
  async userAdminAdd(context, payload) {
    const res = await userAdminAdd(payload)
    return res;
  }
}
const mutations = {
  uploadlist(state, { tableName, data }) {
    console.log('state: ', state);
    state[tableName] = {
      list: data.records,
      page: {
        showtotal: true, // 是否显示总条数
        total: data.total, // 总条数
        pageSize: data.size, // 每页条数
        current: data.current
      }
    }
  },
  uploadDetail(state, payload) {
    console.log('payload: ', payload);
    state.customerDetailInfo = payload
  },
  uploadUserAdminDetail(state, payload) {
    state.userAdminDetailInfo = payload
  }
};
const getters = {
  
};
export default {
  state,
  actions,
  mutations,
  getters
};
