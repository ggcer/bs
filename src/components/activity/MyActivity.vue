<template>
  <app-wrap>
    <!-- 标题栏 -->
    <app-bar title="我的活动" slot="appBar">
      <mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
    </app-bar>

    <app-content slot="appContent">
    </app-content>
  </app-wrap>
</template>

<script>
  export default {
    name: 'myActivity',
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
</style>
