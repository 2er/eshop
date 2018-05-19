<template>
  <div class="coupon-container" :style="{backgroundColor:coupon.color}">
    <wv-flex class="flex-header">
      <wv-flex-item>
        <wv-header title="" :fixed="false" :background-color="coupon.color">
          <div class="btn-back" slot="left" @click="$router.go(-1)">
            返回
          </div>
        </wv-header>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body">
      <wv-flex-item>
        <div class="placeholder">
          <div class="logo"><img :src="coupon.logo_url"/></div>
          <div class="brand-name">{{coupon.brand_name}}</div>
          <div class="title">{{coupon.title}}</div>
          <div class="sub-title">{{coupon.sub_title}}</div>
          <div class="use-button"><wv-button @click="popupVisible = true" :style="{backgroundColor:coupon.color}" type="primary" :mini="true">立即使用</wv-button></div>
          <div class="enter-area">
            <wv-group title="">
              <wv-cell class="detail-enter" title="优惠券详情" is-link :to="'/coudetail/'+couponId"></wv-cell>
            </wv-group>
          </div>
        </div>
      </wv-flex-item>
    </wv-flex>
    <wv-popup :visible.sync="popupVisible" height="100%" :style="{ backgroundColor: coupon.color}">
      <wv-flex class="popup-header">
        <wv-flex-item>
          <wv-header title="" :fixed="false" :background-color="coupon.color">
            <div class="btn-back" slot="left" @click="popupVisible = false">
              返回
            </div>
          </wv-header>
        </wv-flex-item>
      </wv-flex>
      <wv-flex>
        <wv-flex-item>
          <div class="placeholder">
            <div class="brand-name">{{coupon.brand_name}}</div>
            <div class="title">{{coupon.sub_title}}</div>
            <div class="code-image"><img @click="bigCode=true" :src="coupon.code_url"/></div>
            <div class="code-no">{{coupon.code}}</div>
            <div class="notice">{{coupon.notice}}</div>
          </div>
        </wv-flex-item>
      </wv-flex>
      <transition name="zoom" enter-active-class="zoomIn" leave-active-class="zoomOut">
        <div class="mask" v-if="bigCode" @click="bigCode=false" >
          <img :src="coupon.big_code_url" :style="{ marginTop: coupon.code_margin_top}"/>
        </div>
      </transition>
    </wv-popup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'user_coupon',
  data () {
    return {
      couponId: 0,
      coupon: {},
      popupVisible: false,
      bigCode: false
    }
  },
  created: function () {
    let couponId = this.$route.params.coupon_id
    this.coupon = this.coupons[couponId]
    this.couponId = couponId
  },
  components: {
  },
  computed: mapState({
    coupons: state => state.coupons
  }),
  methods: {
    ...mapActions([
    ])
  }
}
</script>

<style lang="less" scoped>
  .coupon-container {
    height: 100%;
  }
  .coupon-container .wv-header {
    color: #000000;
  }
  .coupon-container .btn-back {
    font-size: 14px;
    color: white;
  }
  .coupon-container .flex-body {
    border-radius:1%;
    background-color: white;
    width: 90%;
    margin: 8% 5%;
  }
  .coupon-container .flex-body .placeholder > div{
    margin-bottom: 10px;
  }
  .coupon-container .flex-body .logo{
    text-align: center;
  }
  .coupon-container .flex-body .logo img{
    width: 60px;
    height: 60px;
    border-radius:50%;
    position: relative;
    top: -30px;
  }
  .coupon-container .flex-body .brand-name {
    text-align: center;
    font-size: 10px;
    font-weight: lighter;
  }
  .coupon-container .flex-body .title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
  .coupon-container .flex-body .sub-title {
    text-align: center;
    font-size: 10px;
  }
  .coupon-container .flex-body .use-button {
    text-align: center;
  }
  .coupon-container .detail-enter {
    font-size: 12px;
  }
  .coupon-container .wv-popup .brand-name {
    text-align: center;
    font-size: 10px;
    font-weight: lighter;
    margin-bottom: 10px;
  }
  .coupon-container .wv-popup .title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .coupon-container .wv-popup .code-image {
    text-align: center;
    margin-bottom: 10px;
  }
  .coupon-container .wv-popup .code-image img{
    width: 60%;
  }
  .coupon-container .wv-popup .code-no {
    text-align: center;
    margin-bottom: 10px;
  }
  .coupon-container .wv-popup .notice {
    text-align: center;
    font-size: 10px;
    font-weight: lighter;
  }
  .coupon-container .wv-popup .mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9999;
    background-color: #FFFFFF;
    text-align: center;
  }
</style>
