webpackJsonp([17],{XRai:function(t,e){},qkTL:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"payDetail",data:function(){return{user:{},payDetail:{}}},methods:{goBack:function(){this.back()}},mounted:function(){this.user=util.cache.get("user"),this.payDetail=this.getRouterDataObj()},destroyed:function(){}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("app-wrap",[a("app-bar",{attrs:{slot:"appBar",title:"账单详情"},slot:"appBar"},[a("mu-icon-button",{attrs:{slot:"left",icon:"icon-fanhui"},on:{click:t.goBack},slot:"left"})],1),t._v(" "),a("app-content",{attrs:{slot:"appContent"},slot:"appContent"},[a("mu-list",{staticClass:"pay-list"},[a("mu-list-item",{staticClass:"input-item"},[a("div",{staticClass:"input-item-label"},[t._v("支付单号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.payDetail.orderId,expression:"payDetail.orderId"}],staticClass:"input-item-input",attrs:{type:"text",disabled:!0},domProps:{value:t.payDetail.orderId},on:{input:function(e){e.target.composing||t.$set(t.payDetail,"orderId",e.target.value)}}})]),t._v(" "),a("mu-list-item",{staticClass:"input-item"},[a("div",{staticClass:"input-item-label"},[t._v("支付流水号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.payDetail.payId,expression:"payDetail.payId"}],staticClass:"input-item-input",attrs:{type:"text",disabled:!0},domProps:{value:t.payDetail.payId},on:{input:function(e){e.target.composing||t.$set(t.payDetail,"payId",e.target.value)}}})]),t._v(" "),a("mu-list-item",{staticClass:"input-item"},[a("div",{staticClass:"input-item-label"},[t._v("支付人")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.userName,expression:"user.userName"}],staticClass:"input-item-input",attrs:{type:"text",disabled:!0},domProps:{value:t.user.userName},on:{input:function(e){e.target.composing||t.$set(t.user,"userName",e.target.value)}}})]),t._v(" "),a("mu-list-item",{staticClass:"input-item"},[a("div",{staticClass:"input-item-label"},[t._v("支付给")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.payDetail.assName,expression:"payDetail.assName"}],staticClass:"input-item-input",attrs:{type:"text",disabled:!0},domProps:{value:t.payDetail.assName},on:{input:function(e){e.target.composing||t.$set(t.payDetail,"assName",e.target.value)}}})]),t._v(" "),a("mu-list-item",{staticClass:"input-item"},[a("div",{staticClass:"input-item-label"},[t._v("支付类型")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.payDetail.type,expression:"payDetail.type"}],staticClass:"input-item-input",attrs:{type:"text",disabled:!0},domProps:{value:t.payDetail.type},on:{input:function(e){e.target.composing||t.$set(t.payDetail,"type",e.target.value)}}})]),t._v(" "),a("mu-list-item",{staticClass:"input-item"},[a("div",{staticClass:"input-item-label"},[t._v("支付说明")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.payDetail.payInfo,expression:"payDetail.payInfo"}],staticClass:"input-item-input",attrs:{type:"text",disabled:!0},domProps:{value:t.payDetail.payInfo},on:{input:function(e){e.target.composing||t.$set(t.payDetail,"payInfo",e.target.value)}}})]),t._v(" "),a("mu-list-item",{staticClass:"input-item"},[a("div",{staticClass:"input-item-label"},[t._v("支付时间")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.payDetail.createTime,expression:"payDetail.createTime"}],staticClass:"input-item-input",attrs:{type:"text",disabled:!0},domProps:{value:t.payDetail.createTime},on:{input:function(e){e.target.composing||t.$set(t.payDetail,"createTime",e.target.value)}}})]),t._v(" "),a("mu-list-item",{staticClass:"input-item"},[a("div",{staticClass:"input-item-label"},[t._v("支付状态")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.payDetail.payStates,expression:"payDetail.payStates"}],staticClass:"input-item-input",attrs:{type:"text",disabled:!0},domProps:{value:t.payDetail.payStates},on:{input:function(e){e.target.composing||t.$set(t.payDetail,"payStates",e.target.value)}}})])],1)],1)],1)},staticRenderFns:[]};var l=a("Z0/y")(i,s,!1,function(t){a("XRai")},"data-v-5826e8c0",null);e.default=l.exports}});