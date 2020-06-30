import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import login from './modules/login';
import user from './modules/user'
import dictionary from './modules/dictionary';
import permission from './modules/permission';
import log from './modules/log'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    common,
    user,
    dictionary,
    permission,
    log
  },
  strict: process.env.NODE_ENV !== 'production'
});
