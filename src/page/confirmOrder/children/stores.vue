<template>
  <div class="rating_page">
    <head-top head-title="选择门店" go-back='true'></head-top>
    <section id="scroll_section" class="scroll_container">
      <section class="list_cotainer">
        <ul class="deliverable_address">
          <li v-for="(item,index) in storeList" :key="index" @click.prevent.stop="chooseStore(item, index)">
            <svg class="choosed_address" :class="{default_address: defaultIndex == index}">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
            </svg>
            <div>
              <header>
                <span>{{item.store_name}}</span>
                <span>{{item.tel}}</span>
              </header>
              <div class="address_detail ellipsis">
                <p>{{item.addr}}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </section>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import headTop from '../../../components/header/head'
import {mapState, mapMutations} from 'vuex'
import {stores} from '../../../service/getData'
import alertTip from '../../../components/common/alertTip'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      storeList: [], // 地址列表
      id: null, // ID
      sig: null,
      showAlert: false,
      alertText: null
    }
  },
  created () {
    this.initData()
  },
  components: {
    headTop,
    alertTip
  },
  props: [],
  computed: {
    ...mapState([
      'userInfo', 'storeIndex'
    ]),
    // 选择地址
    defaultIndex: function () {
      if (this.storeIndex) {
        return this.storeIndex
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapMutations([
      'CHOOSE_STORE'
    ]),
    // 初始化信息
    async initData () {
      let storesData = await stores()
      if (storesData.return_code === '0000') {
        this.storeList = storesData.data.list
      }
      this.showLoading = false
    },
    iconColor (name) {
      switch (name) {
        case '公司': return '#4cd964'
        case '学校': return '#3190e8'
      }
    },
    // 选择地址
    chooseStore (store, index) {
      this.CHOOSE_STORE({store, index})
      this.$router.go(-1)
    }
  },
  watch: {
    userInfo: function (value) {
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
    background-color: #fff;
    z-index: 202;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .scroll_container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    overflow-y: auto;
  }
  .list_cotainer{
    padding-bottom: 5rem;
  }
  .add_icon_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 204;
    span{
      @include sc(.7rem, $blue);
      margin-left: .3rem;
    }
  }
  .deliverable_address{
    background-color: #fff;
    li{
      display: flex;
      align-items: center;
      border-bottom: 0.025rem solid #f5f5f5;
      padding: .7rem;
      line-height: 1rem;
      .choosed_address{
        @include wh(.8rem, .8rem);
        fill: #4cd964;
        margin-right: .4rem;
        opacity: 0;
      }
      .default_address{
        opacity: 1;
      }
      header{
        @include sc(.7rem, #333);
        span:nth-of-type(1){
          font-size: .8rem;
          font-weight: bold;
        }
      }
      .address_detail{
        width: 100%;
        display: flex;
        align-items: center;
        span{
          @include sc(.5rem, #fff);
          border-radius: .15rem;
          background-color: #ff5722;
          height: .6rem;
          line-height: .6rem;
          padding: 0 .2rem;
          margin-right: .3rem;
        }
        p{
          @include sc(.6rem, #777);
        }
      }
    }
  }
  #out_delivery{
    .out_header{
      @include sc(.6rem, #666);
      line-height: 1.5rem;
      padding-left: .5rem;
      background-color: #f5f5f5;
    }
    *{
      color: #ccc;
    }
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
