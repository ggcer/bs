webpackJsonp([9],{"3itA":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={name:"userInfo",data:function(){return{title:null,user:{},summaryMsg:"",isOpenBottomSheet:!1,initUserHeadImg:s("ngKG"),initUserBgImg:s("jYT0")}},methods:{refresh:function(){var t=this;console.log("我被刷新了"),setTimeout(function(){console.log("刷新结束"),t.title=t.user.userName?t.user.userName:"无名大侠"},2e3)},setUserBg:function(t){util.cordovaNative.takePhoto(t,"userBgImg",{targetWidth:375,targetHeight:250})},goToUserQrcode:function(){this.go("/user/userQrcode")}},computed:{userTypeStr:function(){switch(this.user.userType+""){case"1":return"学生";case"2":return"老师";case"3":return"赞助商";default:return"错误的用户类型"}}},mounted:function(){var t=this;this.user=util.cache.get("user");var e=util.cache.get("userBgImg",!0);e&&util.http.normalReq.post("/USER-CLIENT/user",{userId:this.user.userId,userBgImg:e},function(s){s.result&&(t.user.userBgImg=e,util.cache.set("user",t.user))},function(t){util.ui.toast(data.msg,"WARN")});var s=this.user;this.title=s.userName?s.userName:"无名大侠";var r=null;1==s.userSex?r="男":2==s.userSex&&(r="女");var i=null;if(s.userBirthday){var o=new Date(s.userBirthday),u=o.getFullYear(),a=o.getMonth()+1,n=o.getDate(),c=new Date,l=c.getFullYear(),m=c.getMonth()+1,d=c.getDate();i=l-u,(m<a||m==a&&d<n)&&i--}var g="";s.userProvince&&(g=s.userProvince),s.userProvince&&s.userCity&&(g=s.userProvince+"-"+s.userCity),r&&(this.summaryMsg+=r+" "),(i||0==i)&&(this.summaryMsg+=i+"岁 "),g&&(this.summaryMsg+=g);var v=0,p=0,h=0,f=$("#user-bg-img"),_=f.width(),b=250;$(window).on("touchmove",function(t){var e=$("#app-wrap").scrollTop(),s=t.targetTouches[0];if(p=h,h=s.pageY,0==e&&0!=p&&v<=h){_>250&&$("#app-wrap").addClass("overflowHidden");var r=(h-p)/2;if(f.height()+r<250)return f.height(250),void f.css("backgroundSize",f.width()+"px 250px");f.height(f.height()+r),b+=1.2*r,_+=1.2*r/250*f.width(),f.css("backgroundSize",_+"px "+b+"px")}}),$(window).on("touchstart",function(t){var e=t.targetTouches[0];v=e.pageY,f.removeClass("trans"),p=0,h=v,_=f.width(),b=250}),$(window).on("touchend",function(e){f.height()>300&&-1==t.title.indexOf("mu-circle-wrapper")&&(t.title='<div class="mu-circle-wrapper title-mu-circle-wrapper active" style="width: 20px; height: 20px;"><div class="mu-circle-spinner active" style="border-color: white!important"><div class="mu-circle-clipper left"><div class="mu-circle" style="border-width: 1px;"></div></div><div class="mu-circle-gap-patch"><div class="mu-circle"></div></div><div class="mu-circle-clipper right"><div class="mu-circle" style="border-width: 1px;"></div></div></div></div>',t.refresh()),f.addClass("trans"),$("#app-wrap").removeClass("overflowHidden"),f.css({backgroundSize:"100% 250px",height:"250px"})})},destroyed:function(){$(window).off("touchmove"),$(window).off("touchstart"),$(window).off("touchend")}},i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("app-wrap",[r("app-bar",{attrs:{slot:"appBar",title:t.title},slot:"appBar"},[r("mu-icon-button",{attrs:{slot:"left",icon:"icon-fanhui"},on:{click:t.back},slot:"left"}),t._v(" "),r("mu-icon-button",{attrs:{slot:"right",icon:"icon-bianji"},on:{click:function(e){t.go("/user/userEdit")}},slot:"right"}),t._v(" "),r("mu-icon-button",{attrs:{slot:"right",icon:"icon-erweima"},on:{click:t.goToUserQrcode},slot:"right"})],1),t._v(" "),r("app-content",{attrs:{slot:"appContent"},slot:"appContent"},[r("div",{staticClass:"user-bg-img",style:{backgroundImage:"url("+(t.user.userBgImg?t.user.userBgImg:t.initUserBgImg)+")"},attrs:{id:"user-bg-img"},on:{click:function(e){t.isOpenBottomSheet=!0}}}),t._v(" "),r("div",{staticClass:"user-base-msg"},[r("img",{staticClass:"user-avatar-img",attrs:{src:t.user.userHeadImg?t.user.userHeadImg:t.initUserHeadImg}}),t._v(" "),r("h4",{domProps:{innerHTML:t._s(t.user.userName?t.user.userName:"无名大侠")}}),t._v(" "),r("p",{domProps:{innerHTML:t._s(t.user.userInfo?t.user.userInfo:"这个人很懒，什么都没留下哦")}})]),t._v(" "),r("mu-list",[r("mu-list-item",{attrs:{title:t.userTypeStr}},[r("mu-icon",{attrs:{slot:"left",value:"icon-id"},slot:"left"})],1),t._v(" "),r("mu-list-item",{attrs:{title:t.summaryMsg?t.summaryMsg:"未填写"}},[r("mu-icon",{attrs:{slot:"left",value:"icon-zhanghuziliao"},slot:"left"})],1),t._v(" "),r("mu-list-item",{attrs:{title:t.user.userSchool?t.user.userSchool:"未填写"}},[r("mu-icon",{attrs:{slot:"left",value:"icon-xuexiao"},slot:"left"})],1)],1),t._v(" "),r("mu-grid-list",{staticClass:"my-org"},[r("mu-sub-header",[t._v("我的社团")]),t._v(" "),r("img",{staticClass:"fgx",attrs:{src:s("qdDb")}}),t._v(" "),r("mu-grid-tile",[r("img",{attrs:{src:s("hm2p")}}),t._v(" "),r("span",{attrs:{slot:"title"},slot:"title"},[t._v("羽毛球社")]),t._v(" "),r("span",{attrs:{slot:"subTitle"},slot:"subTitle"},[t._v("from "),r("b",[t._v("渤海大学")])]),t._v(" "),r("mu-icon-button",{attrs:{slot:"action",icon:"person_add"},slot:"action"})],1),t._v(" "),r("mu-grid-tile",[r("img",{attrs:{src:s("vNzr")}}),t._v(" "),r("span",{attrs:{slot:"title"},slot:"title"},[t._v("书法协会")]),t._v(" "),r("span",{attrs:{slot:"subTitle"},slot:"subTitle"},[t._v("from "),r("b",[t._v("渤海大学")])]),t._v(" "),r("mu-icon-button",{attrs:{slot:"action",icon:"person"},slot:"action"})],1)],1),t._v(" "),r("mu-bottom-sheet",{attrs:{open:t.isOpenBottomSheet},on:{close:function(e){t.isOpenBottomSheet=!1}}},[r("mu-list",{on:{itemClick:function(e){t.isOpenBottomSheet=!1}}},[r("mu-sub-header",[t._v("\n\t\t\t\t\t请选择更换封面的方式\n\t\t\t\t")]),t._v(" "),r("mu-list-item",{attrs:{title:"现在拍一张"},on:{click:function(e){t.setUserBg(1)}}}),t._v(" "),r("mu-list-item",{attrs:{title:"从相册中选取"},on:{click:function(e){t.setUserBg(2)}}})],1)],1)],1)],1)},staticRenderFns:[]};var o=s("Z0/y")(r,i,!1,function(t){s("tQcQ")},"data-v-4469d1d0",null);e.default=o.exports},jYT0:function(t,e,s){t.exports=s.p+"img/user-bg.545d2d8.jpg"},qdDb:function(t,e,s){t.exports=s.p+"img/userInfo-fgx.b17852f.png"},tQcQ:function(t,e){}});