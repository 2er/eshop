<template>
  <div class="rating_page">
    <head-top head-title="付款" go-back='true'></head-top>
    <section class="show_time_amount">
      <section>
        <header class="time_last">支付剩余时间</header>
        <p class="time">{{remaining}}</p>
      </section>
    </section>
    <div class="order_info" v-if="payDetail">订单信息</div>
    <section class="order_info_list" v-if="payDetail">
      <section class="order_item">
        <div class="order_icon_contaienr">
          <span>订单号</span>
        </div>
        <span class="order_no">{{payDetail.order_id}}</span>
      </section>
      <section class="order_item">
        <div class="order_icon_contaienr">
          <span>订单金额</span>
        </div>
        <span class="order_amount">￥{{parseFloat(payDetail.total_amount).toFixed(2)}}</span>
      </section>
      <section class="order_item">
        <div class="order_icon_contaienr">
          <span>支付方式</span>
        </div>
        <span class="order_payment">{{payDetail.payment === '-1' ? '到店支付' : '在线支付'}}</span>
      </section>
    </section>
    <p class="determine" @click="confrimPay">确认支付</p>
    <transition name="zoom" enter-active-class="zoomIn" leave-active-class="zoomOut">
        <img class="confirmMark" v-if="confirmStatus" src=""/>
    </transition>
    <alert-tip v-if="showAlert" @closeTip="closeTipFun" :alertText="alertText"></alert-tip>
    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
import headTop from '../../../components/header/head'
import {mapState, mapMutations} from 'vuex'
import {queryOrder, payOrder} from '../../../service/getData'
import alertTip from '../../../components/common/alertTip'
import loading from '../../../components/common/loading'

export default {
  data () {
    return {
      payDetail: false, // 付款信息详情
      showAlert: false,
      alertText: null,
      countNum: 0, // 倒计时
      timeLimit: 900, // 过期时间
      gotoOrders: false, // 去付款
      confirmStatus: false, // 订单确认状态
      showLoading: false
    }
  },
  components: {
    headTop,
    alertTip,
    loading
  },
  created () {
    this.initData()
    // 清除购物车中当前商铺的信息
    if (this.shopid) {
      this.CLEAR_CART(this.shopid)
    }
  },
  mounted () {
    // this.remainingTime()
  },
  beforeDestroy () {
    clearInterval(this.timer)
    clearInterval(this.confirmTimer)
  },
  props: [],
  computed: {
    ...mapState([
      'orderMessage', 'userInfo', 'storeId', 'cartPrice'
    ]),
    // 时间转换
    remaining: function () {
      let minute = parseInt(this.countNum / 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      let second = parseInt(this.countNum % 60)
      if (second < 10) {
        second = '0' + second
      }
      return '00 : ' + minute + ' : ' + second
    }
  },
  methods: {
    ...mapMutations([
      'CLEAR_CART'
    ]),
    // 初始化信息
    async initData () {
      this.showLoading = true
      let queryData = await queryOrder({order_id: this.orderMessage.order_id})
      this.showLoading = false
      if (queryData.return_code === '0000') {
        this.payDetail = queryData.data
        if (queryData.data.pay_status !== '0') {
          this.showAlert = true
          this.alertText = '怎么回事？该订单已支付了哦！'
        }
        let createTime = parseInt(this.payDetail.createtime)
        let nowDate = new Date()
        let nowTime = parseInt(nowDate.getTime().toString().substr(0, 10))
        if (createTime + this.timeLimit <= nowTime) {
          this.showAlert = true
          this.alertText = '哎呀，订单过期了哦！'
        }
        this.countNum = this.timeLimit + createTime - nowTime
        this.remainingTime()
        this.queryConfirmTime()
      } else {
        this.showAlert = true
        this.alertText = this.payDetail.return_msg
      }
    },
    // 查询接单状态
    async queryConfirm () {
      let queryData = await queryOrder({order_id: this.orderMessage.order_id})
      return queryData
    },
    queryConfirmTime () {
      clearInterval(this.confirmTimer)
      let vm = this
      this.confirmTimer = setInterval(() => {
        let queryData = vm.queryConfirm()
        queryData.then(respData => {
          if (respData.return_code === '0000' && respData.data.confirm_status === '1') {
            vm.confirmStatus = true
            clearInterval(vm.confirmTimer)
          }
        })
      }, 2000)
    },
    // 倒计时
    remainingTime () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.countNum--
        if (this.countNum === 0) {
          clearInterval(this.timer)
          this.showAlert = true
          this.alertText = '支付超时'
        }
      }, 1000)
    },
    // 确认付款
    async confrimPay () {
      this.showLoading = true
      let payData = await payOrder({order_id: this.orderMessage.order_id, pay_type: 'wx', source: 'eshop'})
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
  @import '../../../assets/css/mixin';

  .rating_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 204;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .show_time_amount{
    background-color: #fff;
    padding: .7rem;
    text-align: center;
    .time_last{
      @include sc(.6rem, #666);
      margin-top: 1rem;
    }
    .time{
      @include sc(1.5rem, #333);
      margin: .3rem 0 1rem;
    }
    .order_detail{
      @include fj;
      span{
        @include sc(.65rem, #666);
      }
      span:nth-of-type(2){
        color: #ff6000;
        font-weight: bold;
      }
    }
  }
  .order_info{
    background-color: #f1f1f1;
    padding: 0 .7rem;
    @include sc(.7rem, #666);
    line-height: 1.8rem;
  }
  .order_info_list{
    background-color: #fff;
    @include sc(.6rem, #666);
    .order_item{
      padding: .4rem .7rem;
      @include fj;
      align-items: center;
      line-height: 2.6rem;
      border-bottom: 0.025rem solid #f5f5f5;
      .order_icon_contaienr{
        @include fj;
        align-items: center;
      }
      .order_no{
        @include sc(.7rem, #666);
      }
      .order_amount{
        @include sc(.7rem, #ff6000);
      }
    }
  }
  .determine{
    background-color: #4cd964;
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    margin-top: 0.5rem;
    font-weight: bold;
  }
  .confirmMark{
    @include wh(30%,20%);
    position: absolute;
    top: 10%;
    left: 50%;
  }

</style>
