webpackJsonp([11],{"7GOq":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"userSet",data:function(){return{user:{},cacheSize:null}},methods:{switchByIndex:function(e){0==e&&(this.user.isEnableAppNotice?(this.user.isEnableAppNotice=!1,util.cordovaNative.disableAppNotice()):(this.user.isEnableAppNotice=!0,util.cordovaNative.enableAppNotice(),util.cordovaNative.jPushByLocal("小提示","您已开启应用提醒"))),1==e&&(this.user.isEnableBackgroundMode=!this.user.isEnableBackgroundMode,this.user.isEnableBackgroundMode?util.cordovaNative.enableBackgroundMode():util.cordovaNative.disableBackgroundMode())}},mounted:function(){var e=0;for(var t in window.localStorage)window.localStorage.hasOwnProperty(t)&&(e+=window.localStorage.getItem(t).length);this.cacheSize=(e/1024).toFixed(2)+"KB",this.user=util.cache.get("user")},destroyed:function(){util.cache.set("user",this.user)}},s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("app-wrap",[i("app-bar",{attrs:{slot:"appBar",title:"设置"},slot:"appBar"},[i("mu-icon-button",{attrs:{slot:"left",icon:"icon-fanhui"},on:{click:e.back},slot:"left"})],1),e._v(" "),i("app-content",{attrs:{slot:"appContent"},slot:"appContent"},[i("mu-list",[i("mu-sub-header",[e._v("基本设置")]),e._v(" "),i("mu-list-item",{attrs:{title:"开启应用提醒",id:"enableAppNotice-switch"}},[i("mu-switch",{attrs:{slot:"right"},on:{change:function(t){e.switchByIndex(0)}},slot:"right",model:{value:e.user.isEnableAppNotice,callback:function(t){e.$set(e.user,"isEnableAppNotice",t)},expression:"user.isEnableAppNotice"}})],1),e._v(" "),i("mu-list-item",{attrs:{title:"退出后进入后台",id:"enableBackgroundMode-switch"}},[i("mu-switch",{attrs:{slot:"right"},on:{change:function(t){e.switchByIndex(1)}},slot:"right",model:{value:e.user.isEnableBackgroundMode,callback:function(t){e.$set(e.user,"isEnableBackgroundMode",t)},expression:"user.isEnableBackgroundMode"}})],1)],1),e._v(" "),i("mu-list",[i("mu-sub-header",[e._v("缓存信息")]),e._v(" "),i("mu-list-item",{attrs:{disableRipple:"",title:"应用缓存数据"}},[i("div",{attrs:{slot:"right"},slot:"right"},[e._v(e._s(e.cacheSize))])])],1)],1)],1)},staticRenderFns:[]};var o=i("Z0/y")(a,s,!1,function(e){i("wpKJ")},"data-v-ea31a20a",null);t.default=o.exports},wpKJ:function(e,t){}});