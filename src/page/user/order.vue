<template>
  <div class="Bbg">
    <head-top head-title="我的订单" goBack="true">
    </head-top>
    <div class="DD_head">
      <template v-if="detail.status === 'active' && detail.pay_status === '0'">
        <img src="../../assets/imgs/icon_daifahuo@2x.png" class="DD_head_bg">
        <div class="DD_head-half">
          <div class="DD_deng">未支付</div>
          <div class="DD_ZB">该订单正在等着您去支付...</div>
        </div>
      </template>
      <template v-if="detail.status === 'active' && detail.pay_status === '1'">
        <img src="../../assets/imgs/icon_daifahuo@2x.png" class="DD_head_bg">
        <div class="DD_head-half">
          <div class="DD_deng">已支付</div>
          <div class="DD_ZB">您的物品正在等着您去取...</div>
        </div>
      </template>
      <template v-if="detail.status === 'finish'">
        <img src="../../assets/imgs/icon_daifahuo@2x.png" class="DD_head_bg">
        <div class="DD_head-half">
          <div class="DD_deng">已完成</div>
          <div class="DD_ZB">您的订单已完成</div>
        </div>
      </template>
      <template v-if="detail.status === 'dead'">
        <img src="../../assets/imgs/icon_daifahuo@2x.png" class="DD_head_bg">
        <div class="DD_head-half">
          <div class="DD_deng">已取消</div>
          <div class="DD_ZB">您的订单已取消</div>
        </div>
      </template>
      <!--<div style="clear: both"></div>-->
      <div style="clear: both"></div>
    </div>
    <div class="DD_name wbg">
      <div class="DD_name_div1"><span>取货门店：<span class="black1">{{detail.store ? detail.store.store_name : ''}}</span></span><span class="DD_tel black1">{{detail.store ? detail.store.tel : ''}}</span></div>
      <div class="DD_name_div2"><span>门店地址：<span class="black1">{{detail.store ? detail.store.addr : ''}}</span></span></div>
    </div>
    <div class="DD_line"></div>

    <div>
      <div class="DD_shang wbg">商品信息</div>
      <!--图片列表-->
      <div v-for="(goods, goodsIndex) in detail.items" :key="goodsIndex" class="my_order_list">
        <div class="my_order_leftimg">
          <img :src="goods.goods_image" class="my_o_img">
        </div>
        <div class="my_order_right">
          <div class="my_o_right_one"><span>{{goods.name}}</span>
            <span class="right glay">X<span>{{goods.nums}}</span></span></div>
          <div class="my_guige">规格：<span>{{goods.spec_info}}</span></div>
          <div class="right black">￥{{goods.total}}</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <!--图片列表-----end------>
    </div>
    <div class="wbg">
      <div class="DD_shang DD_border">订单信息</div>
      <div class="DD_box DD_border">
        <div class="DD_name1">
          <span class="DD_border_left">商品合计</span>
          <span class="DD_border_right">￥{{detail.goods_amount}}</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">运费</span>
          <span class="DD_border_right">￥{{detail.cost_freight}}</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">优惠券</span>
          <span class="DD_border_right">￥0.00</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">优惠活动</span>
          <span class="DD_border_right">-￥{{detail.discount}}</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">应付金额</span>
          <span class="DD_border_right">￥{{detail.total_amount}}</span>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="DD_box">
        <div class="DD_name1">
          <span class="DD_border_left">订单编号</span>
          <span class="DD_border_right">{{detail.order_id}}</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">提交时间</span>
          <span class="DD_border_right">{{detail.createtime}}</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">支付方式</span>
          <span class="DD_border_right">微信支付/会员卡支付</span>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="DD_line height20"></div>
    <div style="height: 70px;"></div>

    <div class="DD_o_wid">
      <div class="my_o_wid_left">
        <div class="my_o_wid_ying DD_ying">应付金额：<span class="my_o_color">￥<span>{{detail.total_amount}}</span></span></div>
      </div>
      <div class="my_o_wid_left">
        <div v-if="detail.pay_status === '0' && detail.status === 'active'" class="DD_chakan" @click="goCancel(detail.order_id)">取消订单</div>
        <div v-if="detail.pay_status === '0' && detail.status === 'active'" class="DD_liji" @click="goPay(detail.order_id)">立即付款</div>
        <div v-if="detail.pay_status === '1' && detail.status === 'active'" class="DD_liji" @click="goFinish(detail.order_id)">已完成</div>
      </div>
      <div style="clear: both"></div>
    </div>
    <alert-tip v-if="showAlert" @closeTip="closeTipFun" :alertText="alertText"></alert-tip>
    <confirm-tip v-if="showConfirm" @closeTip="closeConfirmFun" @confirmTip="doConfirmFun" :alertText="confirmText"></confirm-tip>
    <confirm-tip v-if="showFinish" @closeTip="closeFinishFun" @confirmTip="doFinishFun" :alertText="finishText"></confirm-tip>
    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headTop from '../../components/header/head'
import { orderDetail, payOrder, cancelOrder, finishOrder } from '../../service/getData'
import { Toast } from 'we-vue'
import alertTip from '../../components/common/alertTip'
import confirmTip from '../../components/common/confirmTip'
import loading from '../../components/common/loading'
export default {
  name: 'user_order',
  data () {
    return {
      orderId: this.$route.params.order_id,
      detail: {},
      showAlert: false,
      alertText: null,
      cancelOrderId: null,
      showConfirm: false,
      confirmText: null,
      finishOrderId: null,
      showFinish: false,
      finishText: null,
      duration: 2000,
      showLoading: false
    }
  },
  components: {
    headTop,
    alertTip,
    confirmTip,
    loading
  },
  computed: {
    ...mapState([
    ])
  },
  created () {
    this.getOrderDetail({order_id: this.orderId})
  },
  methods: {
    ...mapActions({
    }),
    async getOrderDetail (params) {
      let orderData = await orderDetail(params)
      if (orderData.return_code === '0000') {
        this.detail = orderData.data
      }
    },
    async goCancel (orderId) {
      this.cancelOrderId = orderId
      this.showConfirm = true
      this.confirmText = '确认取消？'
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
    async goFinish (orderId) {
      this.finishOrderId = orderId
      this.showFinish = true
      this.finishText = '确认完成？'
    },
    // 关闭提示框，跳转到订单列表页
    closeTipFun () {
      this.showAlert = false
      // if (this.gotoOrders) {
      //   this.$router.push('/order')
      // }
    },
    // 关闭提示框，跳转到订单列表页
    closeConfirmFun () {
      this.showConfirm = false
      // if (this.gotoOrders) {
      //   this.$router.push('/order')
      // }
    },
    async doConfirmFun () {
      this.showLoading = true
      this.showConfirm = false
      this.confirmText = null
      let cancelData = await cancelOrder({order_id: this.cancelOrderId})
      this.showLoading = false
      if (cancelData.return_code === '0000') {
        this.detail.status = 'dead'
        Toast({
          duration: this.duration,
          message: '已取消',
          type: 'text'
        })
      } else {
        this.showAlert = true
        this.alertText = cancelData.return_msg
      }
      this.cancelOrderId = null
    },
    // 关闭提示框，跳转到订单列表页
    closeFinishFun () {
      this.showFinish = false
      // if (this.gotoOrders) {
      //   this.$router.push('/order')
      // }
    },
    async doFinishFun () {
      this.showLoading = true
      this.showFinish = false
      this.finishText = null
      let finishData = await finishOrder({order_id: this.finishOrderId})
      this.showLoading = false
      if (finishData.return_code === '0000') {
        this.detail.status = 'finish'
        Toast({
          duration: this.duration,
          message: '已完成',
          type: 'text'
        })
      } else {
        this.showAlert = true
        this.alertText = finishData.return_msg
      }
      this.finishOrderId = null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/myorder.css";
  @import "../../assets/css/xiangqing.css";
  .Bbg{
    .DD_head{
      position: relative;
      margin-top: 2.25rem;
    }
  }
</style>
