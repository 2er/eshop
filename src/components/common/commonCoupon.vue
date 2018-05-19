<template>
  <div class="coupon-container" @click="$router.push('/user/coupon/'+cid)">
    <div class="coupon-logo">
      <img :src="coupon.logo_url"/>
    </div>
    <div class="coupon-store-tile">
      <div class="coupon-store">
        {{coupon.brand_name}}
      </div>
      <div class="coupon-title">
        {{coupon.title}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'coupon',
  data () {
    return {

    }
  },
  props: ['cid', 'coupon'],
  computed: mapState([
  ])
}
</script>

<style scoped>
  .coupon-container {
    height: 100px;
    margin: 3%;
    border-radius: 5px;
    background-color: white;
  }
  .coupon-container .coupon-logo {
    float: left;
    width: 30%;
    height: 85px;
    line-height: 100px;
    text-align: center;
    padding-top: 15px;
  }
  .coupon-container .coupon-logo img{
    width: 40px;
    height: 40px;
    border-radius:50%
  }
  .coupon-container .coupon-store-tile{
    float: left;
    width: 70%;
    height: 100px;
  }
  .coupon-container .coupon-store {
    height: 20px;
    line-height: 20px;
    padding-top: 20px;
    text-align: left;
    font-size: 10px;
  }
  .coupon-container .coupon-title {
    height: 60px;
    line-height: 60px;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
  }
</style>
