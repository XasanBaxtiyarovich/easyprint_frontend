import { createStore } from 'vuex'

export default createStore({
  state: {
    mobileMenu: false
  },
  getters: {
    mobileMenu: state => state.mobileMenu
  },
  mutations: {
    showMobileMenu(state) {
      state.mobileMenu = true;
    },
    closeMobileMenu(state) {
      state.mobileMenu = false;
    }
  },
  actions: {},
  modules: {}
})