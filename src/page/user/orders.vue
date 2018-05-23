<template>
  <div class="orders_container">
    <head-top head-title="我的订单" goBack="true">
    </head-top>
    <div class="my_head">
      <ul class="my_head_ul">
        <li class="or_li" @click="getOrderList({order_type:'all'})" :class="{or_b:orderType === 'all'}">全部</li>
        <li class="or_li" @click="getOrderList({order_type:'unpay'})" :class="{or_b:orderType === 'unpay'}">待付款<div v-show="countData.unpay > 0" class="or_dai">{{countData.unpay}}</div></li>
        <li class="or_li" @click="getOrderList({order_type:'payed'})" :class="{or_b:orderType === 'payed'}">已付款<div v-show="countData.payed > 0" class="or_dai">{{countData.payed}}</div></li>
        <li class="or_li" @click="getOrderList({order_type:'finish'})" :class="{or_b:orderType === 'finish'}">已完成<div v-show="countData.finish > 0" class="or_dai">{{countData.finish}}</div></li>
        <li class="or_li" @click="getOrderList({order_type:'dead'})" :class="{or_b:orderType === 'dead'}">已取消<div v-show="countData.dead > 0" class="or_dai">{{countData.dead}}</div></li>
      </ul>
      <div style="clear: both"></div>
    </div>
    <div class="ul_container">
      <ul>
        <li v-for="(order) in orderList" :key="order.order_id" class="my_order">
          <div class="my_title">
            <div>
              <span class="my_title_ding">
                订单编号:<span>{{order.order_id}}</span>
              </span>
              <span v-if="order.status === 'active' && order.pay_status === '0'" class="my_title_mum">等待付款</span>
              <span v-if="order.status === 'active' && order.pay_status === '1'" class="my_title_mum">等待取货</span>
              <span v-if="order.status === 'finish'" class="my_title_mum">已完成</span>
              <span v-if="order.status === 'dead'" class="my_title_mum">已取消</span>
            </div>
          </div>
          <div style="clear: both"></div>
          <!--图片列表-->
          <div v-for="(orderItem,itemIndex) in order.items" :key="itemIndex.goods_id" class="my_order_list">
            <div class="my_order_leftimg">
              <img :src="orderItem.goods_image" class="my_o_img">
            </div>
            <div class="my_order_right">
              <div class="my_o_right_one"><span>{{orderItem.name}}</span>
                <span class="right glay">X<span>{{orderItem.nums}}</span></span></div>
              <div class="my_guige">规格：<span>{{orderItem.spec_info}}</span></div>
              <div class="right black">￥{{orderItem.total}}</div>
            </div>
            <div style="clear: both"></div>
          </div>
          <!--图片列表-----end------>
          <div class="my_o_wid">
            <div class="my_o_wid_left">
              <div class="my_o_wid_ying">应付金额：<span class="my_o_color">￥<span>{{order.total_amount}}</span></span></div>
              <div class="my_o_wid_ding">订单时间：<span>{{order.createtime}}</span></div>
            </div>
            <div class="my_o_wid_left">
              <div class="my_chakan" @click="$router.push('/user/order/'+order.order_id)">查看详情</div>
              <div v-if="order.pay_status === '0' && order.status === 'active'" class="my_liji" @click="goPay(order.order_id)">立即付款</div>
            </div>
            <div style="clear: both"></div>
          </div>
        </li>
      </ul>
    </div>

    <div style="height: 70px;"></div>

    <div class="L_menu">
      <ul class="L_ul">
        <li class="L_li" @click="$router.push('/seller/goods')"><img src="../../assets/images/bottom_icon_home.png" class="L_menuimg"><div>购物</div></li>
        <li class="L_li" @click="$router.push('/seller/coupons')"><img src="../../assets/images/bottom_icon_dingdan.png" class="L_menuimg"><div>商家优惠</div></li>
        <li class="L_li" @click="$router.push('/user/orders')"><img src="../../assets/images/bottom_icon_me.png" class="L_menuimg"><div>我的订单</div></li>
      </ul>
    </div>
    <alert-tip v-if="showAlert" @closeTip="closeTipFun" :alertText="alertText"></alert-tip>
    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headTop from '../../components/header/head'
import { myOrders, payOrder } from '../../service/getData'
import { Toast } from 'we-vue'
import alertTip from '../../components/common/alertTip'
import loading from '../../components/common/loading'
export default {
  name: 'user_orders',
  data () {
    return {
      orderType: 'all',
      showAlert: false,
      alertText: null,
      duration: 2000,
      countData: {
        all: 0,
        unpay: 0,
        payed: 0,
        finish: 0,
        dead: 0
      },
      orderList: [], // 订单列表
      showLoading: false
    }
  },
  components: {
    headTop,
    alertTip,
    loading
  },
  computed: {
    ...mapState([
    ])
  },
  created () {
    this.getOrderList({order_type: this.orderType})
  },
  methods: {
    ...mapActions({
    }),
    async getOrderList (params) {
      this.showLoading = true
      let ordersData = await myOrders(params)
      this.showLoading = false
      if (ordersData.return_code === '0000') {
        this.orderType = params.order_type
        this.orderList = ordersData.data.list
        if (this.orderType === 'all') {
          this.countData = ordersData.data.count_data
        } else {
          this.countData[this.orderType] = ordersData.data.count_data[this.orderType]
        }
      }
    },
    async goPay (orderId) {
      this.showLoading = true
      let payData = await payOrder({order_id: orderId, pay_type: 'wx', source: 'eshop'})
      this.showLoading = false
      if (payData.return_code === '0000') {
        window.location.href = payData.data.pay_url
      } else {
        this.showAlert = true
        this.alertText = payData.return_msg
      }
    },
    // 关闭提示框，跳转到订单列表页
    closeTipFun () {
      this.showAlert = false
      // if (this.gotoOrders) {
      //   this.$router.push('/order')
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/merchant.css";
  @import "../../assets/css/myorder.css";
  @import '../../assets/css/mixin';
  .orders_container{
    .my_head{
      margin-top: 1.95rem;
      .my_head_ul{
        li{
          .or_dai{
            @include sc(.5rem,#fff)
          }
        }
      }
    }
    .ul_container{
      ul{
        li{
          border-bottom: 4px solid white;
          .my_order_list{
            border-bottom: 0;
          }
        }
      }
    }
  }
</style>
