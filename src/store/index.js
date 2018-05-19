import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  userInfo: [], // 用户信息
  isLogin: null, // 用户是否登录
  cards: [], // 会员卡列表
  sessionId: '',
  memberId: '',
  coupons: [],
  cartList: [], // 购物车
  choosedStore: {},
  storeIndex: null,
  remarkText: null, // 可选备注内容
  inputText: '' // 输入备注内
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
