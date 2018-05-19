<template>
  <div class="coudeail-container">
    <wv-flex class="flex-header">
      <wv-flex-item>
        <wv-header title="优惠券详情" :fixed="false" background-color="#FFFFFF">
          <div class="btn-back" slot="left" @click="$router.go(-1)">
            返回
          </div>
        </wv-header>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body" :gutter="10">
      <wv-flex-item>
        <div class="placeholder title">优惠说明</div>
      </wv-flex-item>
      <wv-flex-item flex="3">
        <div class="placeholder val">{{coupon.description}}</div>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body" :gutter="10">
      <wv-flex-item>
        <div class="placeholder title">有效日期</div>
      </wv-flex-item>
      <wv-flex-item flex="3">
        <div class="placeholder val">{{coupon.validate_time}}</div>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body" :gutter="10">
      <wv-flex-item>
        <div class="placeholder title">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</div>
      </wv-flex-item>
      <wv-flex-item flex="3">
        <div class="placeholder val"><a :href="'tel:'+coupon.service_phone">{{coupon.service_phone}}</a></div>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body" :gutter="10">
      <wv-flex-item>
        <div class="placeholder title">使用须知</div>
      </wv-flex-item>
      <wv-flex-item flex="3">
        <div class="placeholder val">{{coupon.notice}}</div>
      </wv-flex-item>
    </wv-flex>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'user_coudetail',
  data () {
    return {
      coupon: {}
    }
  },
  created: function () {
    let couponId = this.$route.params.coupon_id
    this.coupon = this.coupons[couponId]
  },
  components: {
    // commonFooter
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
  .coudeail-container {
    height: 100%;
  }
  .coudeail-container .wv-header {
    color: #000000;
    margin-bottom: 20px;
  }
  .coudeail-container .btn-back {
    font-size: 14px;
  }
  .coudeail-container .flex-body .placeholder {
    font-size: 12px;
  }
  .coudeail-container .flex-body .title {
    text-align: center;
  }
</style>
