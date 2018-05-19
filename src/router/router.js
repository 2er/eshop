import App from '../App'

const bind = r => require.ensure([], () => r(require('../page/user/bind')), 'bind')
const userCenter = r => require.ensure([], () => r(require('../page/user/center')), 'user_center') // 会员中心
const userCoupons = r => require.ensure([], () => r(require('../page/user/coupons')), 'user_coupons') // 会员优惠券列表
const userCoupon = r => require.ensure([], () => r(require('../page/user/coupon')), 'user_coupon') // 会员优惠券详情
const userCard = r => require.ensure([], () => r(require('../page/user/card')), 'user_card') // 会员卡
const userCardDetail = r => require.ensure([], () => r(require('../page/user/cardetail')), 'user_cardetail') // 会员卡详情
const userOrders = r => require.ensure([], () => r(require('../page/user/orders')), 'user_orders') // 订单列表
const userOrder = r => require.ensure([], () => r(require('../page/user/order')), 'user_order') // 订单详情

const sellerCoupons = r => require.ensure([], () => r(require('../page/seller/coupons')), 'seller_coupons') // 商家优惠列表
const sellerCoupon = r => require.ensure([], () => r(require('../page/seller/coupon')), 'seller_coupon') // 商家优惠详情
const sellerGoods = r => require.ensure([], () => r(require('../page/seller/goods')), 'seller_goods') // 商家商品列表

const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder') // 确认订单
const stores = r => require.ensure([], () => r(require('../page/confirmOrder/children/stores')), 'stores') // 门店列表
const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark') // 订单备注
const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment') // 支付方式选择

export default [{
  path: '/',
  component: App, // 顶层路由，对应index.html
  children: [ // 二级路由。对应App.vue
    // 地址为空时跳转home页面
    {
      path: '',
      redirect: '/user/center'
    },
    // 手机号绑定页
    {
      path: '/user/bind',
      component: bind
    },
    // 会员中心
    {
      path: '/user/center',
      component: userCenter
    },
    // 会员优惠券列表
    {
      path: '/user/coupons',
      component: userCoupons
    },
    // 会员优惠券详情
    {
      path: '/user/coupon/:coupon_id',
      component: userCoupon
    },
    // 会员卡
    {
      path: '/user/card',
      component: userCard
    },
    // 会员卡详情
    {
      path: '/user/cardetail',
      component: userCardDetail
    },
    // 订单列表
    {
      path: '/user/orders',
      component: userOrders
    },
    // 订单详情
    {
      path: '/user/order',
      component: userOrder
    },
    // 商家优惠列表
    {
      path: '/seller/coupons',
      component: sellerCoupons
    },
    // 商家优惠详情
    {
      path: '/seller/coupon/:coupon_id',
      component: sellerCoupon
    },
    // 商品列表
    {
      path: '/seller/goods',
      component: sellerGoods
    },
    // 确认订单页
    {
      path: '/confirmOrder',
      component: confirmOrder,
      children: [{
        path: 'stores', // 门店列表
        component: stores
      }, {
        path: 'remark', // 订单备注
        component: remark
      }, {
        path: 'payment', // 付款页面
        component: payment
      }]
    }
  ]
}]
