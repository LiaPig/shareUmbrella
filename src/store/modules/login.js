const login = {
  state: {
    // true为已经登录，false为没登录
    isLogin: false
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    }
  },
  actions: {
    // 改变菜单的收起／展开状态
    // changeIsCollapse (context) {
    //   context.commit('setIsCollapse')
    // }
  },
}

export default login;
