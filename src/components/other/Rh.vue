<template>
  <div class="wrap">
    <div class="header">
      <img src="../../assets/image/rh/card-logo.png" class="header-logo">
    </div>
    <div class="content">
      <div class="form">
        <input type="text" placeholder="请输入公司邮箱" class="email-ipt">
        <button class="login-btn">登陆</button>
      </div>
      <div class="tips">
        <p class="tips-desc">若登录遇到问题，请联系瑞华官方客服</p>
        <p class="tips-tel">400-609-6868</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Rh',
    data() {
      return {
      }
    },
    methods: {
    },
    mounted() {
    },
    destroyed() {}
  }

</script>

<style scoped>
.wrap{
  position: fixed;
  width: 100%;
  height: 100%;
}
.header{
  position: relative;
  width: 100%;
  height: 190px;
  display: flex;
  justify-content: center;
  background-image: url('../../assets/image/rh/dl-bg.png');
  background-position: center;
  background-size: 100% 100%;
}
.header-logo{
  position: absolute;
  bottom: 35px;
  width: 247px;
  height: 34px;
}
.content{
  position: relative;
  height: calc(100% - 190px);
  background: linear-gradient(#33C783 0%, #28B1A6);
}
.content .form{
  text-align: center;
}
.content .form .email-ipt{
  display: block;
  width: 327px;
  height: 50px;
  padding: 10px 15px;
  margin: 0 auto 10px;
  font-size: 16px;
  color: #FFF;
  background-color: #7FDBB4;
  border: 1px #7FDBB4 solid;
  border-radius: 2px;
  outline:none;
}
.content .form .login-btn{
  display: block;
  width: 327px;
  height: 50px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  color: #FFF;
  border: 1px #7FDBB4 solid;
  border-radius: 2px;
  letter-spacing: 5px;
  outline:none;
}
.tips{
  position: absolute;
  bottom: 95px;
  width: 100%;
}
.tips p{
  text-align: center;
  color: #A9DFDB;
  text-align: center;
}
.tips .tips-desc{
  font-size: 12px;
  height: 17px;
  line-height: 17px;
  margin-bottom: 10px;
}
.tips .tips-tel{
  font-size: 18px;
  height: 25px;
  line-height: 25px;
}
</style>
