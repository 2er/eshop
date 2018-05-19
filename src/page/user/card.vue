<template>
  <div class="card-container">
    <wv-flex class="flex-header">
      <wv-flex-item>
        <wv-header title="" :fixed="false" background-color="#FFFFFF">
          <div class="btn-back" slot="left" @click="$router.go(-1)">
            返回
          </div>
        </wv-header>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body-card-show">
      <wv-flex-item>
        <common-card :card="card"></common-card>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-account" :gutter="0">
      <wv-flex-item>
        <div class="placeholder" v-if="card.card.custom_field1">
          <div class="title">{{card.card.custom_field1.name_type1}}</div>
          <div class="val"><a :href="card.card.custom_field1.url1" style="color: #2E8B57;">查看</a></div>
        </div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder" v-if="card.card.custom_field2">
          <div class="title">{{card.card.custom_field2.name_type2}}</div>
          <div class="val"><a :href="card.card.custom_field2.url2" style="color: #2E8B57;">查看</a></div>
        </div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder" v-if="card.card.custom_field3">
          <div class="title">{{card.card.custom_field3.name_type3}}</div>
          <div class="val"><a :href="card.card.custom_field3.url3" style="color: #2E8B57;">查看</a></div>
        </div>
      </wv-flex-item>
    </wv-flex>
    <wv-flex class="flex-body-card-other">
      <wv-flex-item>
        <wv-group title="">
          <wv-cell class="other-item" v-if="card.card.custom_url" :title="card.card.custom_url_name" :value="card.card.custom_url_sub_title" :is-link=true :url="card.card.custom_url"></wv-cell>
          <wv-cell class="other-item" v-if="card.card.promotion_url" :title="card.card.promotion_url_name" :value="card.card.promotion_url_sub_title" :is-link=true :url="card.card.promotion_url"></wv-cell>
          <wv-cell class="other-item" title="会员卡详情" is-link to="/cardetail"></wv-cell>
        </wv-group>
      </wv-flex-item>
    </wv-flex>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import commonCard from '../../components/common/commonCard'
export default {
  name: 'user_card',
  data () {
    return {
    }
  },
  created: function () {
  },
  components: {
    commonCard
    // commonFooter
  },
  computed: mapState({
    card: state => state.cards.card
  }),
  methods: {
    ...mapActions([
    ])
  }
}
</script>

<style lang="less" scoped>
  .card-container {
    height: 100%;
  }
  .card-container .wv-header {
    color: #000000;
  }
  .card-container .btn-back {
    font-size: 14px;
  }
  .card-container .flex-account {
    margin-top: 20px;
    font-size: 12px;
  }
  .card-container .flex-account .placeholder {
    text-align: center;
  }
  .card-container .flex-account .placeholder .val{
    font-size: 16px;
    color: #2E8B57;
  }
  .card-container .flex-body-card-other .other-item {
    font-size: 12px;
  }
</style>
