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

  },
}

export default login;
