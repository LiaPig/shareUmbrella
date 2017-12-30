const nav = {
  state: {
    // true为收起，false为展开
    isCollapse: false
  },
  mutations: {
    setIsCollapse(state, isCollapse) {
      state.isCollapse = isCollapse;
    }
  },
  actions: {
    // 改变菜单的收起／展开状态
    // changeIsCollapse (context) {
    //   context.commit('setIsCollapse')
    // }
  },
}

export default nav;
