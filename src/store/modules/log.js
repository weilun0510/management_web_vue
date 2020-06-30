import { log } from '@/api/log';
const state = {
  logList: []
};
const actions = {
  // 日志列表
  async getLog(context, payload) {
    const res = await log(payload)
    context.commit('uploadlist', {
      tableName: 'logList',
      data: res.data
    })
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
  }
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
};
