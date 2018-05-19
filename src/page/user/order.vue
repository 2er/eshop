<template>
  <div class="Bbg">
    <div class="DD_head">
      <img src="../../assets/imgs/icon_daifahuo@2x.png" class="DD_head_bg">
      <div class="DD_head-half">
        <div class="DD_deng">等待完成</div>
        <div class="DD_ZB">您的物品正在准备中...</div>
      </div>
      <!--<div style="clear: both"></div>-->
      <div style="clear: both"></div>
    </div>
    <div class="DD_name wbg">
      <div class="DD_name_div1"><span>收货人：<span class="black1">王帅帅</span></span><span class="DD_tel black1">13874392667</span></div>
      <div class="DD_name_div2"><span>收件人地址：<span class="black1">江场三路126号5楼</span></span></div>
    </div>
    <div class="DD_line"></div>

    <div>
      <div class="DD_shang wbg">商品信息</div>
      <!--图片列表-->
      <div class="my_order_list">
        <div class="my_order_leftimg">
          <img src="../../assets/imgs/12121.jpg" class="my_o_img">
        </div>
        <div class="my_order_right">
          <div class="my_o_right_one"><span>丹麦蓝罐曲奇丹麦蓝罐曲奇</span>
            <span class="right glay">X<span>1</span></span></div>
          <div class="my_guige">规格：<span>250g</span></div>
          <div class="right black">￥196.00</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <!--图片列表-->
      <div class="my_order_list">
        <div class="my_order_leftimg">
          <img src="../../assets/imgs/12121.jpg" class="my_o_img">
        </div>
        <div class="my_order_right">
          <div class="my_o_right_one"><span>丹麦蓝罐曲奇丹麦蓝罐曲奇</span>
            <span class="right glay">X<span>1</span></span></div>
          <div class="my_guige">规格：<span>250g</span></div>
          <div class="right black">￥196.00</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <!--图片列表-----end------>
    </div>
    <div class="wbg">
      <div class="DD_shang DD_border">订单信息</div>
      <div class="DD_box DD_border">
        <div class="DD_name1">
          <span class="DD_border_left">商品合计</span>
          <span class="DD_border_right">￥400.00</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">运费</span>
          <span class="DD_border_right">￥0.00</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">优惠券</span>
          <span class="DD_border_right">￥0.00</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">优惠活动</span>
          <span class="DD_border_right">-￥8.00</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">应付金额</span>
          <span class="DD_border_right">￥392.00</span>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="DD_box">
        <div class="DD_name1">
          <span class="DD_border_left">订单编号</span>
          <span class="DD_border_right">398568236492492</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">提交时间</span>
          <span class="DD_border_right">2018-05-03 19:35</span>
        </div>
        <div style="clear: both"></div>
        <div class="DD_name1">
          <span class="DD_border_left">支付方式</span>
          <span class="DD_border_right">微信支付/会员卡支付</span>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="DD_line height20"></div>
    <div style="height: 70px;"></div>

    <div class="DD_o_wid">
      <div class="my_o_wid_left">
        <div class="my_o_wid_ying DD_ying">应付金额：<span class="my_o_color">￥<span>392.00</span></span></div>
      </div>
      <div class="my_o_wid_left">
        <div class="DD_chakan">取消订单</div>
        <div class="DD_liji">立即付款</div>
      </div>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user_order'
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/myorder.css";
  @import "../../assets/css/xiangqing.css";
</style>
