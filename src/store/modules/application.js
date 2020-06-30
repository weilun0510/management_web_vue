// import types from '../types';
import { 
  applicationList, 
  applicationAdd, 
  applicationModify, 
  applicationDelete, 
  applicationDetail 
} from '@/api/application';
const state = {
  applicationList: {
    list: [],
    page: {}
  },
  applicationDetail: {}
};
const actions = {
  // 应用管理列表
  async getApplicationList(context, payload) {
    const res = await applicationList(payload)
    context.commit('uploadlist', {
      tableName: 'applicationList',
      data: res.data
    })
  },
  async applicationDelete(context, payload) {
    const res = await applicationDelete(payload)
    return res;
  },
  async applicationAdd(context, payload) {
    const res = await applicationAdd(payload)
    return res;
  },
  async getApplicationModify(context, payload) {
    const res = await applicationModify(payload)
    return res;
  },
  async getApplicationDetail(context, payload) {
    const res = await applicationDetail(payload)
    console.log('res: ', res);
    context.commit('applicationDetailM', res.data)
    return res;
  }
  
}
const mutations = {
  uploadlist(state, { tableName, data }) {
    state[tableName] = {
      list: data.records,
      page: {
        showtotal: true, // 是否显示总条数
        total: data.total, // 总条数
        pageSize: data.size, // 每页条数
        current: data.current
      }
    }
    console.log('state.permissionList: ', state.permissionList);
  },
  applicationDetailM(state, payload) {
    state.applicationDetail = payload
  }
  
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
};
