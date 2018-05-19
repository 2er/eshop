<template>
  <div class="rating_page">
    <head-top :head-title="coupon.title" goBack="true"></head-top>
    <section class="header_img">
      <img :src="coupon.logo_url" class="food_img">
    </section>
    <section class="detail_container">
      <section class="titles">
        <section class="sub_title">
          <p class="sub_title_content">{{coupon.sub_title}}</p>
          <p class="sub_title_left" :class="{sub_title_left_warning:coupon.quantity < 10}">剩余{{coupon.quantity}}张</p>
        </section>
        <section class="detail_title">
          <p class="coupon_title">{{coupon.title}}</p>
          <p class="coupon_sale_count">已领{{coupon.get_count}}张</p>
        </section>
        <div class="cover"></div>
      </section>
      <section class="detail_store">
        <p class="store_title">适用门店</p>
        <ul class="store_list">
          <li class="store_item" v-for="store in coupon.stores" :key="store.store_id">
            <p class="store_name">{{store.store_name}}</p>
            <section class="store_addr">
              <p class="location_icon">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
                </svg>
              </p>
              <p class="addr">
                <span>{{store.addr}}</span>
              </p>
              <p class="phone_icon">
                <a :href="'tel:'+store.tel">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#phone"></use>
                  </svg>
                </a>
              </p>
            </section>
          </li>
        </ul>
      </section>
      <section class="detail_rule">
        <p class="rule_title">优惠内容</p>
        <p class="rule_content">{{coupon.rule_content||'暂无内容'}}</p>
      </section>
      <section class="detail_notice">
        <p class="notice_title">购买须知</p>
        <p class="notice_date_title">有效期</p>
        <p class="notice_date_content">{{coupon.validate_time}}</p>
        <p class="notice_notice_title">使用提示</p>
        <p class="notice_notice_content">{{coupon.notice||'暂无内容'}}</p>
        <p class="notice_intro_title">详细描述</p>
        <p class="notice_intro_content">{{coupon.description}}</p>
      </section>
      <p class="for_fixed"></p>
    </section>
    <section class="buy_cart_container">
      <div v-if="!coupon.quantity" class="btn_gray">库存不足</div>
      <div v-else-if="!coupon.left_num || parseInt(coupon.left_num) === 0" class="btn_gray">已领取</div>
      <div v-else class="btn_green" @click="drawCoupon">免费领取</div>
    </section>
    <alert-tip v-if="showAlert" @closeTip="closeTipFun" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headTop from '../../components/header/head'
import { sellerCoupon, drawCoupon } from '../../service/getData'
import { Toast } from 'we-vue'
import alertTip from '../../components/common/alertTip'
export default {
  name: 'seller_coupon',
  data () {
    return {
      couponId: null, // 优惠ID
      coupon: {}, // 优惠信息
      showAlert: false,
      alertText: null,
      duration: 2000
    }
  },
  created () {
    this.couponId = this.$route.params.coupon_id
    this.getCoupon()
  },
  mixins: [],
  computed: {
    ...mapState([
      'sessionId'
    ])
  },
  components: {
    headTop,
    alertTip
  },
  props: [],
  methods: {
    async getCoupon () {
      let couponData = await sellerCoupon({coupon_id: this.couponId})
      if (couponData.return_code === '0000') {
        this.coupon = couponData.data.coupon
      }
    },
    async drawCoupon () {
      let drawData = await drawCoupon({cid: this.couponId})
      if (drawData.return_code === '0000') {
        this.coupon.left_num = parseInt(drawData.data.left_num) !== NaN ? parseInt(drawData.data.left_num) : 0
        this.coupon.quantity = this.coupon.quantity - 1
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

  .rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 12;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
    display: flex;
    flex-direction: column;
    height: 100%;
    .cover{
      position: absolute;
      @include wh(100%, 100%);
      top: 0;
      left: 0;
    }
    @include sc(65%,#666);
  }
  .header_img{
    .food_img{
      width: 100%;
      display: block;
    }
  }
  .detail_container{
    align-items: center;
    background-color: #F7F7F7;
    .titles{
      position: relative;
      .sub_title{
        @include fj;
        padding: .5rem;
        background-color: white;
        .sub_title_content{
          width: 80%;
        }
        .sub_title_left{
          width: 20%;
        }
        .sub_title_left_warning{
          color: red;
        }
      }
      .detail_title{
        @include fj;
        padding: .5rem;
        background-color: white;
        .coupon_title{
          width: 80%;
          @include sc(150%,#f60);
          font-weight: bold;
        }
        .coupon_sale_count{
          width: 20%;
        }
      }
    }
    .detail_store{
      margin-top: .5rem;
      background-color: white;
      .store_title{
        padding: .5rem .5rem 0;
        @include sc(100%,#000000);
        font-weight: bold;
      }
      .store_list{
        padding: .5rem;
        @include sc(100%,#000000);
        .store_item{
          border-bottom: 0.1px solid #C4C4C4;
          .store_name{
            font-weight: bold;
            color: #666;
            padding: .5rem .5rem 0;
          }
          .store_addr{
            @include fj('flex-start');
            @include wh(100%,2rem);
            line-height: 2rem;
            padding: 0 .5rem;
            .location_icon{
              width: 5%;
              svg{
                @include wh(.6rem,.6rem)
              }
            }
            .addr{
              width: 75%;
            }
            .phone_icon{
              padding: 0 1rem;
              border-left: 0.1px solid #C4C4C4;
              svg{
                @include wh(.8rem,.8rem)
              }
            }
          }
        }
        .store_item:last-child{
          border-bottom: 0;
        }
      }
    }
    .detail_rule{
      margin-top: .5rem;
      background-color: white;
      .rule_title{
        padding: .5rem .5rem 0;
        @include sc(100%,#000000);
        font-weight: bold;
      }
      .rule_content{
        padding: .5rem;
      }
    }
    .detail_notice{
      margin-top: .5rem;
      background-color: white;
      .notice_title{
        padding: .5rem .5rem 0;
        @include sc(100%,#000000);
        font-weight: bold;
      }
      .notice_date_title{
        padding: .5rem .5rem 0;
        font-weight: bold;
      }
      .notice_date_content{
        padding: .5rem .8rem 0;
      }
      .notice_notice_title{
        padding: .5rem .5rem 0;
        font-weight: bold;
      }
      .notice_notice_content{
        padding: .5rem .8rem 0;
      }
      .notice_intro_title{
        padding: .5rem .5rem 0;
        font-weight: bold;
      }
      .notice_intro_content{
        padding: .5rem .8rem 0;
      }
    }
    .for_fixed{
      @include wh(100%, 4rem);
    }
  }
  .buy_cart_container{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 13;
    @include wh(100%, 3.5rem);
    line-height: 3.5rem;
    text-align: center;
    @include sc(150%, #fff);
    .btn_gray{
      background-color: #C4C4C4;
    }
    .btn_green{
      background-color: #43CD80;
      color: #fefffd;
    }
  }

</style>
