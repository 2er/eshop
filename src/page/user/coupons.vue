<template>
  <div class="coupons-container">
    <head-top head-title="我的优惠券" goBack="true">
    </head-top>
    <wv-flex class="flex-body-coupons-show">
      <wv-flex-item>
        <common-coupon v-for="(coupon, key, index) in coupons" :key="index" :cid="key" :coupon="coupon"></common-coupon>
      </wv-flex-item>
    </wv-flex>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import commonCoupon from '../../components/common/commonCoupon'
import headTop from '../../components/header/head'
export default {
  name: 'user_coupons',
  data () {
    return {
    }
  },
  created: function () {
    this.getCoupons()
  },
  components: {
    headTop,
    commonCoupon
  },
  computed: mapState({
    coupons: state => state.coupons
  }),
  methods: {
    ...mapActions([
      'getCoupons'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin';
  .coupons-container {
    height: 100%;
    background-color: #F7F7F7;
    .flex-body-coupons-show{
      margin-top: 1.95rem;
    }
  }
</style>
