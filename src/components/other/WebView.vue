<template>
  <app-wrap>
    <app-bar :title="urlObj.title" slot="appBar">
      <mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
    </app-bar>
    <app-content slot="appContent" :refreshMethod="refresh">
      <div id="iframe-wrap" class="iframe-wrap">
        <iframe v-if="urlObj.url" :src="urlObj.url" width="100%" height="100%" frameborder="0"></iframe>
      </div>
    </app-content>
  </app-wrap>
</template>

<script>
  export default {
    name: 'webView',
    data() {
      return {
        title: null,
        urlObj: {
          title: null,
          url: null
        }
      }
    },
    methods: {
      refresh(){
        setTimeout(() => {
          util.ui.hideLoading('TOP');
        }, 1000)
      }
    },
    mounted() {
      $('#iframe-wrap').height($(window).height());
      let routerDataObj = this.getRouterDataObj();
      routerDataObj.url = 'http://' + routerDataObj.url;
      this.urlObj = routerDataObj;
    }
  }

</script>

<style scoped>
.iframe-wrap{
  width: 100%;
}
</style>
