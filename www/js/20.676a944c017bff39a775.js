webpackJsonp([20],{QpbD:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"webView",data:function(){return{title:null,urlObj:{title:null,url:null}}},methods:{refresh:function(){setTimeout(function(){util.ui.hideLoading("TOP")},1e3)}},mounted:function(){$("#iframe-wrap").height($(window).height());var t=this.getRouterDataObj();t.url="http://"+t.url,this.urlObj=t}},a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("app-wrap",[e("app-bar",{attrs:{slot:"appBar",title:this.urlObj.title},slot:"appBar"},[e("mu-icon-button",{attrs:{slot:"left",icon:"icon-fanhui"},on:{click:this.back},slot:"left"})],1),this._v(" "),e("app-content",{attrs:{slot:"appContent",refreshMethod:this.refresh},slot:"appContent"},[e("div",{staticClass:"iframe-wrap",attrs:{id:"iframe-wrap"}},[this.urlObj.url?e("iframe",{attrs:{src:this.urlObj.url,width:"100%",height:"100%",frameborder:"0"}}):this._e()])])],1)},staticRenderFns:[]};var n=r("Z0/y")(i,a,!1,function(t){r("zCgr")},"data-v-125fcf63",null);e.default=n.exports},zCgr:function(t,e){}});