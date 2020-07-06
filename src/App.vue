<template>
  <div id="app" class="stylus-home-style">
    <transition name="fadeInDown" enter-active-class="fadeInDown" leave-active-class="fadeOut">
      <router-view />
    </transition>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'App',
  created() {
    // 测试Mock
    request({
      url: '/api/renewal/task/list',
      method: 'post'
    }).then(res => {
      console.log('mockjs_test', res)
    })
    // 测试moment
    console.log(this.$moment(new Date()).format('YYYY-DD-MM hh:mm:ss'))
  }
}
</script>
<style lang="stylus">
.stylus-home-style
  // 测试stylus
  // font-size 25px
</style>
