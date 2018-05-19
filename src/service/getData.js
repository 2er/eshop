import fetch from '../config/fetch'

/**
 * 检查是否登录
 */
export const checkLogin = () => fetch('', {method: 'member.checklogin'}, 'POST')

/**
 * 用户信息
 */
export const userInfo = () => fetch('', {method: 'member.userinfo'}, 'POST')

/**
 * 获取短信验证码
 */
export const mobileCode = (params) => fetch('', {method: 'member.mobilecode', params: params}, 'POST')

/**
 * 检测帐号是否存在
 */

export const checkExist = (params) => fetch('', {method: 'member.checkexist', params: params}, 'POST')

/**
 * 绑定手机号
 */

export const bindWx = (params) => fetch('', {method: 'member.bindwx', params: params}, 'POST')

/**
 * 获取商品
 */

export const goods = () => fetch('', {method: 'seller.goods'}, 'POST')

/**
 * 获取商家门店
 */

export const stores = () => fetch('', {method: 'seller.stores'}, 'POST')

/**
 * 获取商家备注
 */

export const markList = (params) => fetch('', {method: 'seller.marks', params: params}, 'POST')

/**
 * 下订单
 */

export const createOrder = (params) => fetch('', {method: 'member.order', params: params}, 'POST')

/**
 * 订单查询
 */

export const queryOrder = (params) => fetch('', {method: 'member.queryorder', params: params}, 'POST')

export const getCards = (params) => fetch('', {method: 'card.cardinfo', params: params}, 'POST')

export const getCoupons = () => fetch('', {method: 'member.coupons'}, 'POST')

export const sellerCoupons = () => fetch('', {method: 'seller.coupons'}, 'POST')

export const sellerCoupon = (params) => fetch('', {method: 'seller.coupon', params: params}, 'POST')

export const drawCoupon = (params) => fetch('', {method: 'seller.drawcoupon', params: params}, 'POST')
