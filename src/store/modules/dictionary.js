const state = {
  userStatusDic: [
    {
      value: 0,
      label: '过期'
    },
    {
      value: 1,
      label: '未过期'
    }
  ]
};


const getters = {
  userStatusDic() {
    return state.userStatusDic
  }
};
export default {
  state,
  getters
};
