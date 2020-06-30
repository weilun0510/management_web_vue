import { login, logout } from '@/api/login';
import md5 from 'js-md5'

const state = {};
const actions = {
  async handleLogin(context, { userName, password }) {
    const params = {
      userName,
      password: md5(password)
    }
    const res = await login(params)
    if (res.code === '200') {
      localStorage.setItem('token', res.data.sessionId)
      localStorage.setItem('userInfo', JSON.stringify(res.data))
    }
    return res;
  },
  async logout(context, payload) {
    const res = await logout(payload)
    return res;
  }
}
const mutations = {};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
};
