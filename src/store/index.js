import { createStore } from 'vuex'

export default createStore({
  state: {
    mobile_menu: false
  },
  getters: {
    MobileMenu: function(state) {
      return state.mobile_menu;
    }
  },
  mutations: {
    showSideBar (state) {
      state.mobile_menu = true; 
    },
    closeSideBar (state) {
      state.mobile_menu = false; 
    }
  },
  actions: {
  },
  modules: {
  }
})
