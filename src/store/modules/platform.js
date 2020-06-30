import { login } from '@/api/login';
const state = {
  test: 1
};
const actions = {
  handleLogin(context, payload) {
    return login(payload)
  }
}
const mutations = {
  increment(state, payload) {}
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
};
