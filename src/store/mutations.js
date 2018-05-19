import {
  GET_USERINFO,
  SET_ISLOGIN,
  GET_CARDS,
  SET_SESSION_ID,
  SET_MEMBER_ID,
  GET_COUPONS,
  INIT_BUYCART,
  ADD_CART,
  REDUCE_CART,
  CLEAR_CART,
  CHOOSE_STORE,
  CONFIRM_REMARK,
  ORDER_SUCCESS
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

export default {
  [GET_USERINFO] (state, info) {
    state.userInfo = info
  },
  [SET_ISLOGIN] (state, info) {
    state.isLogin = info
  },
  // 获取用户信息存入vuex
  [GET_CARDS] (state, info) {
    state.cards = info
  },
  [SET_SESSION_ID] (state, info) {
    state.sessionId = info
  },
  [SET_MEMBER_ID] (state, info) {
    state.memberId = info
  },
  [GET_COUPONS] (state, info) {
    state.coupons = info
  },
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART] (state) {
    let initCart = getStore('eshopCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  // 加入购物车
  [ADD_CART] (state, {
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
    sku_id,
    stock
  }) {
    let cart = state.cartList
    let shop = cart = (cart || {})
    let category = shop[category_id] = (shop[category_id] || {})
    let item = category[item_id] = (category[item_id] || {})
    if (item[food_id]) {
      item[food_id]['num']++
    } else {
      item[food_id] = {
        'num': 1,
        'id': food_id,
        'name': name,
        'price': price,
        'specs': specs,
        'sku_id': sku_id,
        'stock': stock
      }
    }
    state.cartList = {...cart}
    // 存入localStorage
    setStore('eshopCart', state.cartList)
  },
  // 移出购物车
  [REDUCE_CART] (state, {
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs
  }) {
    let cart = state.cartList
    let shop = (cart || {})
    let category = (shop[category_id] || {})
    let item = (category[item_id] || {})
    if (item && item[food_id]) {
      if (item[food_id]['num'] > 0) {
        item[food_id]['num']--
        state.cartList = {...cart}
        // 存入localStorage
        setStore('eshopCart', state.cartList)
      } else {
        // 商品数量为0，则清空当前商品的信息
        item[food_id] = null
      }
    }
  },
  // 清空当前商品的购物车信息
  [CLEAR_CART] (state) {
    state.cartList = null
    state.cartList = {...state.cartList}
    setStore('eshopCart', state.cartList)
  },
  // 选择的地址
  [CHOOSE_STORE] (state, {
    store,
    index
  }) {
    state.choosedStore = store
    state.storeIndex = index
  },
  // 记录订单页面用户选择的备注, 传递给订单确认页面
  [CONFIRM_REMARK] (state, {
    remarkText,
    inputText
  }) {
    state.remarkText = remarkText
    state.inputText = inputText
  },
  // 下单成功，保存订单返回信息
  [ORDER_SUCCESS] (state, order) {
    state.cartPrice = null
    state.orderMessage = order
  }
}
