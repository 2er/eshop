<template>
  <div class="seller-coupons-container">
    <head-top head-title="优惠" goBack="true">
    </head-top>
    <ul class="coupon_list_ul">
      <li class="coupon_list_li" v-for="item in coupons" :key="item.cid" @click="$router.push('/seller/coupon/'+item.cid)">
        <section class="coupon_logo">
          <img :src="item.logo_url" class="restaurant_image">
          <ul class="attributes_ul">
            <li class="attribute_item">
              <p v-if="item.card_type === 'GIFT'">礼</p>
              <p v-else-if="item.card_type === 'CASH'">代</p>
              <p v-else-if="item.card_type === 'DISCOUNT'">折</p>
              <p v-else>惠</p>
            </li>
          </ul>
        </section>
        <section class="coupon_item_right">
          <section>
            <header class="coupon_item_right_header">
              <section class="coupon_header">
                <h4 >
                  <span>{{item.title}} </span>
                </h4>
              </section>
            </header>
            <section class="coupon_basket">
              <p v-if="item.get_limit" class="coupon_name"><span class="notice">每人限领{{item.get_limit}}张</span></p>
              <p v-else class="coupon_name"><span class="notice">不限领取数量</span></p>
              <p class="coupon_get">
                <a tag="span" class="do_get" v-if="item.left_num && parseInt(item.left_num) >= 1" @click.stop="drawCoupon(item)">免费领取</a>
                <a tag="span" class="got" v-else @click.stop="">已领取</a>
              </p>
            </section>
            <section class="coupon_extend">
              <p class="coupon_info">{{item.sub_title}}</p>
              <p class="sale_count" :class="{left_count_warning:item.quantity < 10}">剩余{{item.quantity}}张</p>
            </section>
          </section>
        </section>
      </li>
    </ul>
    <alert-tip v-if="showAlert" @closeTip="closeTipFun" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headTop from '../../components/header/head'
import { sellerCoupons, drawCoupon } from '../../service/getData'
import { Toast } from 'we-vue'
import alertTip from '../../components/common/alertTip'
export default {
  name: 'seller_coupons',
  data () {
    return {
      sessionId: null,
      coupons: [], // 商家优惠券
      showAlert: false,
      alertText: null,
      duration: 2000
    }
  },
  created: function () {
    this.getCoupons()
  },
  components: {
    headTop,
    alertTip
  },
  computed: mapState({
  }),
  methods: {
    ...mapActions([
      'setSessionId'
    ]),
    async getCoupons () {
      let couponsData = await sellerCoupons()
      if (couponsData.return_code === '0000') {
        this.coupons = couponsData.data.list
      }
    },
    async drawCoupon (item) {
      let drawData = await drawCoupon({cid: item.cid})
      if (drawData.return_code === '0000') {
        item.left_num = parseInt(drawData.data.left_num) !== NaN ? parseInt(drawData.data.left_num) : 0
        item.quantity = item.quantity - 1
        Toast({
          duration: this.duration,
          message: '领取成功',
          type: 'text'
        })
        return true
      } else {
        this.showAlert = true
        this.alertText = drawData.return_msg
        return false
      }
    },
    closeTipFun () {
      this.showAlert = false
      this.alertText = null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin';
  .seller-coupons-container {
    background-color: #f1f1f1;
    margin-bottom: 1.95rem;
    p, span, h4{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .coupon_list_ul{
    margin-top: 2.5rem;
    .coupon_list_li{
      position: relative;
      overflow: hidden;
      background-color: #fff;
      display: flex;
      margin-bottom: 0.5rem;
      padding: .1rem;
      .coupon_logo{
        .restaurant_image{
          @include wh(5rem, 4rem);
          margin: 0.4rem;
        }
        .attributes_ul{
          .attribute_item{
            position: absolute;
            @include wh(2rem, 2rem);
            line-height: .35rem;
            padding: .1rem;
            border-radius: 0.3rem;
            top: 0;
            left: 0;
            background-color: #EEAD0E;
            display: flex;
            align-items: flex-end;
            transform: rotate(-45deg) translate(-.1rem, -1.5rem);
            p{
              @include wh(.5rem, .5rem);
              @include sc(50%, #4D4D4D);
              text-align: center;
              flex: 1;
              white-space: nowrap;
            }
          }
        }
      }
      .coupon_item_right{
        flex: 5;
        margin: 0.4rem;
        .coupon_item_right_header{
          padding-bottom: .3rem;
          @include fj;
          .coupon_header{
            width: 85%;
            h4{
              display: flex;
              align-items: center;
              justify-content: flex-start;
              @include sc(100%, #333);
              line-height: 1rem;
              .arrow_right{
                @include wh(.4rem, .4rem);
                fill: #ccc;
                margin-right: .2rem;
              }
            }
          }
        }
        .coupon_basket{
          @include fj;
          line-height: 2rem;
          .coupon_name{
            @include sc(100%, #666);
            width: 55%;
            .notice{
              background-color: #CD853F;
              padding: .2rem .3rem;
              border-radius: .3rem;
              @include sc(50%, #fff);
            }
          }
          .coupon_get{
            @include sc(55%, #fff);
            font-weight: bold;
            margin-right: .2rem;
            a{
              padding: .3rem .5rem;
              border-radius: 0.9rem;
            }
            .do_get{
              background-color: #43CD80;
              color: #fefffd;
            }
            .got{
              background-color: #C4C4C4;
            }
          }
        }
        .coupon_extend{
          @include fj;
          .coupon_info{
            @include sc(50%, #666);
            width: 65%;
          }
          .sale_count{
            @include sc(50%, #666);
            margin-right: 5%;
            text-align: center;
          }
          .left_count_warning{
            color: #f60;
          }
        }
      }
    }
  }
</style>
