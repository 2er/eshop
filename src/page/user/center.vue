<template>
  <div class="un_box">
    <div class="un_h">
      <div class="un_header">
        <img src="../../assets/imgs/bg_vip@2x.png" class="un_header_img">
        <img src="../../assets/imgs/icon_touxiang.png" class="un_header_manimg">
        <div class="un_header_jia">加入会员</div>
      </div>
      <div class="un_body">
        <ul class="un_li3">
          <li>
            <div class="un_num">{{userInfo.point}}</div>
            <div class="un_jf">我的积分</div>
          </li>
          <li class="li2" @click="$router.push('/user/coupons')">
            <div class="un_num">{{userInfo.coupon_count}}</div>
            <div class="un_jf">优惠券</div>
          </li>
          <li>
            <div class="un_num">{{userInfo.advance}}</div>
            <div class="un_jf">余额(元)</div>
          </li>
        </ul>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="un_menu">
      <ul class="un_li1">
        <li>
          <div class="un_li_border">
            <img src="../../assets/imgs/member_icon_gouwuche11.png" class="un_menu_img">
            <span class="un_zi">购物车</span><span class="un_right"> > </span>
          </div>
        </li>
        <li>
          <div class="un_li_border">
            <img src="../../assets/imgs/member_icon_shoucang.png" class="un_menu_img">
            <span class="un_zi">我的收藏</span><span class="un_right"> > </span>
          </div>
        </li>
        <li>
          <div class="un_li_border">
            <img src="../../assets/imgs/member_icon_add.png" class="un_menu_img">
            <span class="un_zi">会员信息</span><span class="un_right"> > </span>
          </div>
        </li>
        <li>
          <div class="un_li_border">
            <img src="../../assets/imgs/member_icon_xinxi.png" class="un_menu_img">
            <span class="un_zi">地址管理</span><span class="un_right"> > </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="L_menu">
      <ul class="L_ul">
        <li class="L_li" @click="$router.push('/seller/goods')"><img src="../../assets/images/bottom_icon_home.png" class="L_menuimg"><div>购物</div></li>
        <li class="L_li" @click="$router.push('/seller/coupons')"><img src="../../assets/images/bottom_icon_dingdan.png" class="L_menuimg"><div>商家优惠</div></li>
        <li class="L_li"><img src="../../assets/images/bottom_icon_me.png" class="L_menuimg"><div>我的</div></li>
      </ul>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { wxOauth } from '../../config/env'
export default {
  name: 'user_center',
  data () {
    return {
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {
  },
  components: {
  },
  computed: {
    ...mapState([
      'isLogin',
      'userInfo'
    ])
  },
  watch: {
    'isLogin': {
      handler: 'autoLogin'
    }
  },
  methods: {
    ...mapActions({
      getUserInfo: 'getUserInfo'
    }),
    autoLogin () {
      let ua = navigator.userAgent.toLowerCase()
      this.isWeiXin = !!(/micromessenger/.test(ua))
      if (this.isWeiXin === false) {
        this.showAlert = true
        this.alertText = '请在微信中打开！'
        return false
      }
      if (this.isLogin === false) {
        window.location.href = wxOauth
        return false
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin';
  @import "../../assets/css/unregistered.css";
  @import "../../assets/css/merchant.css";
  .home_container{
    text-align: center;
    img{
      margin-top: 50%;
    }
  }
</style>
