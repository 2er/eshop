<template>
  <div class="cardeail-container">
    <wv-flex class="flex-header">
      <wv-flex-item>
        <wv-header title="会员卡详情" :fixed="false" background-color="#FFFFFF">
          <div class="btn-back" slot="left" @click="$router.go(-1)">
            返回
          </div>
        </wv-header>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body" :gutter="10">
      <wv-flex-item>
        <div class="placeholder title">特权说明</div>
      </wv-flex-item>
      <wv-flex-item flex="3">
        <div class="placeholder val">{{card.prerogative}}</div>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body" :gutter="10">
      <wv-flex-item>
        <div class="placeholder title">有效日期</div>
      </wv-flex-item>
      <wv-flex-item flex="3">
        <div class="placeholder val">{{card.validate_time}}</div>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body" :gutter="10">
      <wv-flex-item>
        <div class="placeholder title">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</div>
      </wv-flex-item>
      <wv-flex-item flex="3">
        <div class="placeholder val"><a :href="'tel:'+card.service_phone">{{card.service_phone}}</a></div>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body" :gutter="10">
      <wv-flex-item>
        <div class="placeholder title">使用须知</div>
      </wv-flex-item>
      <wv-flex-item flex="3">
        <div class="placeholder val">{{card.description}}</div>
      </wv-flex-item>
    </wv-flex>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'user_cardeail',
  data () {
    return {
    }
  },
  created: function () {
  },
  components: {
    // commonFooter
  },
  computed: mapState({
    card: state => state.cards.card.card
  }),
  methods: {
    ...mapActions([
    ])
  }
}
</script>

<style lang="less" scoped>
  .cardeail-container {
    height: 100%;
  }
  .cardeail-container .wv-header {
    color: #000000;
    margin-bottom: 20px;
  }
  .cardeail-container .btn-back {
    font-size: 14px;
  }
  .cardeail-container .flex-body .placeholder {
    font-size: 12px;
  }
  .cardeail-container .flex-body .title {
    text-align: center;
  }
</style>
