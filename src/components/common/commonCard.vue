<template>
  <div class="card-container" @click="clickCard" :style="{backgroundImage: 'url(' + card.card.cover_pic + ')'}">
    <div class="card-logo-store">
      <div class="card-logo">
        <img :src="card.card.logo_url"/>
      </div>
      <div class="card-store">
        {{card.card.brand_name}}
      </div>
    </div>
    <div class="card-title">
        {{card.card.title}}
    </div>
    <div class="card-no">
        NO. {{card.card.provide_info.code}}
    </div>
    <wv-popup :visible.sync="popupVisible" height="100%" >
      <wv-flex class="popup-header">
        <wv-flex-item>
          <wv-header title="会员卡号" :fixed="false" background-color="#FFFFFF">
            <div class="btn-back" slot="left" @click="popupVisible = false">
              返回
            </div>
          </wv-header>
        </wv-flex-item>
      </wv-flex>
      <wv-flex>
        <wv-flex-item>
          <div class="placeholder">
            <div class="logo"><img :src="card.card.logo_url"/></div>
            <div class="code-image"><img @click="bigCode=true" :src="card.card.code_url"/></div>
            <div class="code-no">{{card.card.provide_info.code}}</div>
            <div class="notice">{{card.card.notice}}</div>
          </div>
        </wv-flex-item>
      </wv-flex>
      <transition name="zoom" enter-active-class="zoomIn" leave-active-class="zoomOut">
        <div class="mask" v-if="bigCode" @click="bigCode=false" >
          <img :src="card.card.big_code_url" :style="{ marginTop: card.card.code_margin_top}"/>
        </div>
      </transition>
    </wv-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'card',
  data () {
    return {
      popupVisible: false,
      bigCode: false
    }
  },
  props: ['card'],
  computed: mapState([
  ]),
  methods: {
    clickCard: function () {
      if (this.$route.fullPath === '/user/card') {
        this.popupVisible = true
      } else {
        this.$router.push('/user/card')
      }
    }
  }
}
</script>

<style scoped>
  .card-container {
    height: 200px;
    margin: 3%;
    border-radius: 5px;
  }
  .card-container .card-logo-store{
    height: 40%;
  }
  .card-container .card-logo {
    float: left;
    width: 30%;
    height: 100%;
    line-height: 100%;
    text-align: center;
    padding-top: 10px;
  }
  .card-container .card-logo img{
    width: 50px;
    height: 50px;
    border-radius:50%
  }
  .card-container .card-store {
    float: left;
    width: 70%;
    height: 100%;
    line-height: 600%;
    text-align: left;
    font-size: 12px;
    color: white;
  }
  .card-container .card-title {
    height: 40%;
    line-height: 475%;
    text-align: left;
    font-size: 16px;
    color: white;
  }
  .card-container .card-no {
    height: 20%;
    font-size: 14px;
    color: white;
    padding-left: 10%;
  }
  .card-container .wv-popup .wv-header {
    color: #000000;
    margin-bottom: 50px;
  }
  .card-container .wv-popup .btn-back {
    font-size: 14px;
  }
  .card-container .wv-popup .title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .card-container .wv-popup .logo img{
    width: 50px;
    height: 50px;
    border-radius:50%
  }
  .card-container .wv-popup .logo {
    text-align: center;
    margin-bottom: 10px;
  }
  .card-container .wv-popup .code-image {
    text-align: center;
    margin-bottom: 10px;
  }
  .card-container .wv-popup .code-image img {
    width: 60%;
  }
  .card-container .wv-popup .code-no {
    text-align: center;
    margin-bottom: 10px;
  }
  .card-container .wv-popup .notice {
    text-align: center;
    font-size: 10px;
    font-weight: lighter;
  }
  .card-container .wv-popup .mask {
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
