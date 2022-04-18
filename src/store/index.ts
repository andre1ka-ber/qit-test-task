import Vue from "vue";
import Vuex from "vuex";
import InvoicesModule from "@/store/modules/invoices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    invoices: InvoicesModule,
  },
});
