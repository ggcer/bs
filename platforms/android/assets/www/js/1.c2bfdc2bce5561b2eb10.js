webpackJsonp([1],{"2LoE":function(t,i,e){t.exports={default:e("cz9/"),__esModule:!0}},"5sQS":function(t,i,e){var n=e("BLKo");t.exports=Array.isArray||function(t){return"Array"==n(t)}},"6/+b":function(t,i,e){var n=e("KFas"),s=e("UusJ"),o=e("Ul0Y"),r=e("eQoU"),h=e("qRYU").f;t.exports=function(t){var i=s.Symbol||(s.Symbol=o?{}:n.Symbol||{});"_"==t.charAt(0)||t in i||h(i,t,{value:r.f(t)})}},"809B":function(t,i,e){var n=e("nwJ7"),s=e("gE2q").concat("length","prototype");i.f=Object.getOwnPropertyNames||function(t){return n(t,s)}},F7n3:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("hRKE"),s=e.n(n),o=e("liLe"),r=e.n(o);function h(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function a(t,i){var e=function(t,i){var e=h(t)*h(i);if(0===e)return 0;var n=function(t,i){return t.x*i.x+t.y*i.y}(t,i)/e;return n>1&&(n=1),Math.acos(n)}(t,i);return function(t,i){return t.x*i.y-i.x*t.y}(t,i)>0&&(e*=-1),180*e/Math.PI}var l=function(t){this.handlers=[],this.el=t};function c(t,i){var e=new l(t);return e.add(i),e}l.prototype.add=function(t){this.handlers.push(t)},l.prototype.del=function(t){t||(this.handlers=[]);for(var i=this.handlers.length;i>=0;i--)this.handlers[i]===t&&this.handlers.splice(i,1)},l.prototype.dispatch=function(){for(var t=0,i=this.handlers.length;t<i;t++){var e=this.handlers[t];"function"==typeof e&&e.apply(this.el,arguments)}},(g=function(t,i){this.element="string"==typeof t?document.querySelector(t):t,this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this),this.cancel=this.cancel.bind(this),this.element.addEventListener("touchstart",this.start,!1),this.element.addEventListener("touchmove",this.move,!1),this.element.addEventListener("touchend",this.end,!1),this.element.addEventListener("touchcancel",this.cancel,!1),this.preV={x:null,y:null},this.pinchStartLen=null,this.zoom=1,this.isDoubleTap=!1;var e=function(){};this.rotate=c(this.element,i.rotate||e),this.touchStart=c(this.element,i.touchStart||e),this.multipointStart=c(this.element,i.multipointStart||e),this.multipointEnd=c(this.element,i.multipointEnd||e),this.pinch=c(this.element,i.pinch||e),this.swipe=c(this.element,i.swipe||e),this.tap=c(this.element,i.tap||e),this.doubleTap=c(this.element,i.doubleTap||e),this.longTap=c(this.element,i.longTap||e),this.singleTap=c(this.element,i.singleTap||e),this.pressMove=c(this.element,i.pressMove||e),this.twoFingerPressMove=c(this.element,i.twoFingerPressMove||e),this.touchMove=c(this.element,i.touchMove||e),this.touchEnd=c(this.element,i.touchEnd||e),this.touchCancel=c(this.element,i.touchCancel||e),this._cancelAllHandler=this.cancelAll.bind(this),window.removeEventListener("scroll",this._cancelAllHandler),window.addEventListener("scroll",this._cancelAllHandler),this.delta=null,this.last=null,this.now=null,this.tapTimeout=null,this.singleTapTimeout=null,this.longTapTimeout=null,this.swipeTimeout=null,this.x1=this.x2=this.y1=this.y2=null,this.preTapPosition={x:null,y:null}}).prototype={start:function(t){if(t.touches){this.now=Date.now(),this.x1=t.touches[0].pageX,this.y1=t.touches[0].pageY,this.delta=this.now-(this.last||this.now),this.touchStart.dispatch(t,this.element),null!==this.preTapPosition.x&&(this.isDoubleTap=this.delta>0&&this.delta<=250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30),this.preTapPosition.x=this.x1,this.preTapPosition.y=this.y1,this.last=this.now;var i=this.preV;if(t.touches.length>1){this._cancelLongTap(),this._cancelSingleTap();var e={x:t.touches[1].pageX-this.x1,y:t.touches[1].pageY-this.y1};i.x=e.x,i.y=e.y,this.pinchStartLen=h(i),this.multipointStart.dispatch(t,this.element)}this._preventTap=!1,this.longTapTimeout=setTimeout(function(){this.longTap.dispatch(t,this.element),this._preventTap=!0}.bind(this),750)}},move:function(t){if(t.touches){var i=this.preV,e=t.touches.length,n=t.touches[0].pageX,s=t.touches[0].pageY;if(this.isDoubleTap=!1,e>1){var o=t.touches[1].pageX,r=t.touches[1].pageY,l={x:t.touches[1].pageX-n,y:t.touches[1].pageY-s};null!==i.x&&(this.pinchStartLen>0&&(t.zoom=h(l)/this.pinchStartLen,this.pinch.dispatch(t,this.element)),t.angle=a(l,i),this.rotate.dispatch(t,this.element)),i.x=l.x,i.y=l.y,null!==this.x2&&null!==this.sx2?(t.deltaX=(n-this.x2+o-this.sx2)/2,t.deltaY=(s-this.y2+r-this.sy2)/2):(t.deltaX=0,t.deltaY=0),this.twoFingerPressMove.dispatch(t,this.element),this.sx2=o,this.sy2=r}else null!==this.x2?(t.deltaX=n-this.x2,t.deltaY=s-this.y2):(t.deltaX=0,t.deltaY=0),this.pressMove.dispatch(t,this.element);this.touchMove.dispatch(t,this.element),this._cancelLongTap(),this.x2=n,this.y2=s,e>1&&t.preventDefault()}},end:function(t){if(t.changedTouches){this._cancelLongTap();var i=this;t.touches.length<2&&(this.multipointEnd.dispatch(t,this.element),this.sx2=this.sy2=null),this.x2&&Math.abs(this.x1-this.x2)>30||this.y2&&Math.abs(this.y1-this.y2)>30?(t.direction=this._swipeDirection(this.x1,this.x2,this.y1,this.y2),this.swipeTimeout=setTimeout(function(){i.swipe.dispatch(t,i.element)},0)):(this.tapTimeout=setTimeout(function(){i._preventTap||i.tap.dispatch(t,i.element),i.isDoubleTap&&(i.doubleTap.dispatch(t,i.element),clearTimeout(i.singleTapTimeout),i.isDoubleTap=!1)},0),i.isDoubleTap||(i.singleTapTimeout=setTimeout(function(){i.singleTap.dispatch(t,i.element)},250))),this.touchEnd.dispatch(t,this.element),this.preV.x=0,this.preV.y=0,this.zoom=1,this.pinchStartLen=null,this.x1=this.x2=this.y1=this.y2=null}},cancelAll:function(){this._preventTap=!0,clearTimeout(this.singleTapTimeout),clearTimeout(this.tapTimeout),clearTimeout(this.longTapTimeout),clearTimeout(this.swipeTimeout)},cancel:function(t){this.cancelAll(),this.touchCancel.dispatch(t,this.element)},_cancelLongTap:function(){clearTimeout(this.longTapTimeout)},_cancelSingleTap:function(){clearTimeout(this.singleTapTimeout)},_swipeDirection:function(t,i,e,n){return Math.abs(t-i)>=Math.abs(e-n)?t-i>0?"Left":"Right":e-n>0?"Up":"Down"},on:function(t,i){this[t]&&this[t].add(i)},off:function(t,i){this[t]&&this[t].del(i)},destroy:function(){return this.singleTapTimeout&&clearTimeout(this.singleTapTimeout),this.tapTimeout&&clearTimeout(this.tapTimeout),this.longTapTimeout&&clearTimeout(this.longTapTimeout),this.swipeTimeout&&clearTimeout(this.swipeTimeout),this.element.removeEventListener("touchstart",this.start),this.element.removeEventListener("touchmove",this.move),this.element.removeEventListener("touchend",this.end),this.element.removeEventListener("touchcancel",this.cancel),this.rotate.del(),this.touchStart.del(),this.multipointStart.del(),this.multipointEnd.del(),this.pinch.del(),this.swipe.del(),this.tap.del(),this.doubleTap.del(),this.longTap.del(),this.singleTap.del(),this.pressMove.del(),this.twoFingerPressMove.del(),this.touchMove.del(),this.touchEnd.del(),this.touchCancel.del(),this.preV=this.pinchStartLen=this.zoom=this.isDoubleTap=this.delta=this.last=this.now=this.tapTimeout=this.singleTapTimeout=this.longTapTimeout=this.swipeTimeout=this.x1=this.x2=this.y1=this.y2=this.preTapPosition=this.rotate=this.touchStart=this.multipointStart=this.multipointEnd=this.pinch=this.swipe=this.tap=this.doubleTap=this.longTap=this.singleTap=this.pressMove=this.touchMove=this.touchEnd=this.touchCancel=this.twoFingerPressMove=null,null}},window.AlloyFinger=g;var u=.017453292519943295,p=function(t,i,e,n,s,o,r,h,a,l,c,u,p,d,m,f){this.elements=window.Float32Array?new Float32Array(16):[];var g=this.elements;g[0]=void 0!==t?t:1,g[4]=i||0,g[8]=e||0,g[12]=n||0,g[1]=s||0,g[5]=void 0!==o?o:1,g[9]=r||0,g[13]=h||0,g[2]=a||0,g[6]=l||0,g[10]=void 0!==c?c:1,g[14]=u||0,g[3]=p||0,g[7]=d||0,g[11]=m||0,g[15]=void 0!==f?f:1};p.prototype={set:function(t,i,e,n,s,o,r,h,a,l,c,u,p,d,m,f){var g=this.elements;return g[0]=t,g[4]=i,g[8]=e,g[12]=n,g[1]=s,g[5]=o,g[9]=r,g[13]=h,g[2]=a,g[6]=l,g[10]=c,g[14]=u,g[3]=p,g[7]=d,g[11]=m,g[15]=f,this},identity:function(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this},multiplyMatrices:function(t,i){var e=t.elements,n=this.elements,s=e[0],o=e[4],r=e[8],h=e[12],a=e[1],l=e[5],c=e[9],u=e[13],p=e[2],d=e[6],m=e[10],f=e[14],g=e[3],y=e[7],v=e[11],w=e[15],T=i[0],b=i[1],x=i[2],_=i[3],M=i[4],S=i[5],X=i[6],Y=i[7],E=i[8],C=i[9],O=i[10],k=i[11],L=i[12],P=i[13],A=i[14],F=i[15];return n[0]=s*T+o*M+r*E+h*L,n[4]=s*b+o*S+r*C+h*P,n[8]=s*x+o*X+r*O+h*A,n[12]=s*_+o*Y+r*k+h*F,n[1]=a*T+l*M+c*E+u*L,n[5]=a*b+l*S+c*C+u*P,n[9]=a*x+l*X+c*O+u*A,n[13]=a*_+l*Y+c*k+u*F,n[2]=p*T+d*M+m*E+f*L,n[6]=p*b+d*S+m*C+f*P,n[10]=p*x+d*X+m*O+f*A,n[14]=p*_+d*Y+m*k+f*F,n[3]=g*T+y*M+v*E+w*L,n[7]=g*b+y*S+v*C+w*P,n[11]=g*x+y*X+v*O+w*A,n[15]=g*_+y*Y+v*k+w*F,this},_rounded:function(t,i){return i=Math.pow(10,i||15),Math.round(t*i)/i},_arrayWrap:function(t){return window.Float32Array?new Float32Array(t):t},appendTransform:function(t,i,e,n,s,o,r,h,a,l,c,p,d,m){var f=r*u,g=this._rounded(Math.cos(f)),y=this._rounded(Math.sin(f)),v=h*u,w=this._rounded(Math.cos(v)),T=this._rounded(Math.sin(v)),b=a*u,x=this._rounded(Math.cos(-1*b)),_=this._rounded(Math.sin(-1*b));return this.multiplyMatrices(this,this._arrayWrap([1,0,0,t,0,g,y,i,0,-y,g,e,0,0,0,1])),this.multiplyMatrices(this,this._arrayWrap([w,0,T,0,0,1,0,0,-T,0,w,0,0,0,0,1])),this.multiplyMatrices(this,this._arrayWrap([x*n,_*s,0,0,-_*n,x*s,0,0,0,0,1*o,0,0,0,0,1])),(l||c)&&this.multiplyMatrices(this,this._arrayWrap([this._rounded(Math.cos(l*u)),this._rounded(Math.sin(l*u)),0,0,-1*this._rounded(Math.sin(c*u)),this._rounded(Math.cos(c*u)),0,0,0,0,1,0,0,0,0,1])),(p||d||m)&&(this.elements[12]-=p*this.elements[0]+d*this.elements[4]+m*this.elements[8],this.elements[13]-=p*this.elements[1]+d*this.elements[5]+m*this.elements[9],this.elements[14]-=p*this.elements[2]+d*this.elements[6]+m*this.elements[10]),this}};var d=function(t,i,e,n,s,o){return this.a=null==t?1:t,this.b=i||0,this.c=e||0,this.d=null==n?1:n,this.tx=s||0,this.ty=o||0,this};function m(t,i,e){r()(t,i,{get:function(){return this["_"+i]},set:function(t){this["_"+i]=t,e()}})}function f(t,i){if(!t.___mixCSS3Transform){var e,n=["translateX","translateY","translateZ","scaleX","scaleY","scaleZ","rotateX","rotateY","rotateZ","skewX","skewY","originX","originY","originZ"],o=(e=t,"object"===("undefined"==typeof HTMLElement?"undefined":s()(HTMLElement))?e instanceof HTMLElement:e&&"object"===(void 0===e?"undefined":s()(e))&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName);i||n.push("perspective"),t.___mixCSS3Transform=!0,function(t,i,e){for(var n=0,s=i.length;n<s;n++)m(t,i[n],e)}(t,n,function(){var e=t.matrix3d.identity().appendTransform(t.translateX,t.translateY,t.translateZ,t.scaleX,t.scaleY,t.scaleZ,t.rotateX,t.rotateY,t.rotateZ,t.skewX,t.skewY,t.originX,t.originY,t.originZ),n=(i?"":"perspective("+t.perspective+"px) ")+"matrix3d("+Array.prototype.slice.call(e.elements).join(",")+")";o?t.style.transform=t.style.msTransform=t.style.OTransform=t.style.MozTransform=t.style.webkitTransform=n:t.transform=n}),t.matrix3d=new p,i||(t.perspective=500),t.scaleX=t.scaleY=t.scaleZ=1,t.translateX=t.translateY=t.translateZ=t.rotateX=t.rotateY=t.rotateZ=t.skewX=t.skewY=t.originX=t.originY=t.originZ=0}}d.prototype={identity:function(){return this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this},appendTransform:function(t,i,e,n,s,o,r,h,a){if(s%360)var l=s*u,c=Math.cos(l),p=Math.sin(l);else c=1,p=0;return o||r?(o*=u,r*=u,this.append(Math.cos(r),Math.sin(r),-Math.sin(o),Math.cos(o),t,i),this.append(c*e,p*e,-p*n,c*n,0,0)):this.append(c*e,p*e,-p*n,c*n,t,i),(h||a)&&(this.tx-=h*this.a+a*this.c,this.ty-=h*this.b+a*this.d),this},append:function(t,i,e,n,s,o){var r=this.a,h=this.b,a=this.c,l=this.d;return this.a=t*r+i*a,this.b=t*h+i*l,this.c=e*r+n*a,this.d=e*h+n*l,this.tx=s*r+o*a+this.tx,this.ty=s*h+o*l+this.ty,this},initialize:function(t,i,e,n,s,o){return this.a=t,this.b=i,this.c=e,this.d=n,this.tx=s,this.ty=o,this},setValues:function(t,i,e,n,s,o){return this.a=null==t?1:t,this.b=i||0,this.c=e||0,this.d=null==n?1:n,this.tx=s||0,this.ty=o||0,this},copy:function(t){return this.setValues(t.a,t.b,t.c,t.d,t.tx,t.ty)}},f.getMatrix3D=function(t){var i={translateX:0,translateY:0,translateZ:0,rotateX:0,rotateY:0,rotateZ:0,skewX:0,skewY:0,originX:0,originY:0,originZ:0,scaleX:1,scaleY:1,scaleZ:1};for(var e in t)t.hasOwnProperty(e)&&(i[e]=t[e]);return(new p).identity().appendTransform(i.translateX,i.translateY,i.translateZ,i.scaleX,i.scaleY,i.scaleZ,i.rotateX,i.rotateY,i.rotateZ,i.skewX,i.skewY,i.originX,i.originY,i.originZ).elements},f.getMatrix2D=function(t){var i={translateX:0,translateY:0,rotation:0,skewX:0,skewY:0,originX:0,originY:0,scaleX:1,scaleY:1};for(var e in t)t.hasOwnProperty(e)&&(i[e]=t[e]);return(new d).identity().appendTransform(i.translateX,i.translateY,i.scaleX,i.scaleY,i.rotation,i.skewX,i.skewY,i.originX,i.originY)},window.Transform=f;var g=window.AlloyFinger,f=window.Transform,y=function(t){if(this.renderTo=document.getElementById("edit-img-wrap"),this.canvas=document.createElement("canvas"),this.output=t.output,this.width=t.width,this.height=t.height,this.canvas.width=t.width*this.output,this.canvas.height=t.height*this.output,this.circle=t.circle,t.width!==t.height&&t.circle)throw"can't set circle to true when width is not equal to height";this.ctx=this.canvas.getContext("2d"),this.croppingBox=document.createElement("div"),this.croppingBox.style.visibility="hidden",this.cover=document.createElement("canvas"),this.type=t.type||"png",this.cover.width=document.documentElement.clientWidth,this.cover.height=document.documentElement.clientHeight-70,this.cover_ctx=this.cover.getContext("2d"),this.img=document.createElement("img"),"http"===t.image_src.substring(0,4).toLowerCase()&&(this.img.crossOrigin="anonymous"),this.cancel=t.cancel,this.ok=t.ok,this.croppingBox.appendChild(this.img),this.croppingBox.appendChild(this.cover),this.renderTo.appendChild(this.croppingBox),this.img.onload=this.init.bind(this),this.img.src=t.image_src};y.prototype={init:function(){this.img_width=this.img.width,this.img_height=this.img.height,f(this.img,!0);var t=window.innerWidth/this.img_width,i=window.innerHeight/this.img_height,e=t>i?i:t;this.initScale=e,this.img.scaleX=this.img.scaleY=e;var n=this;new g(this.croppingBox,{multipointStart:function(t){var i=(t.touches[0].clientX+t.touches[1].clientX)/2,e=(t.touches[0].clientY+t.touches[1].clientY)/2,s=n.img.getBoundingClientRect(),o=i-(s.left+s.width/2),r=e-(s.top+s.height/2),h=n.img.originX,a=n.img.originY;n.img.originX=o/n.img.scaleX,n.img.originY=r/n.img.scaleY,n.img.translateX+=o-h*n.img.scaleX,n.img.translateY+=r-a*n.img.scaleX,n.initScale=n.img.scaleX},pinch:function(t){n.img.scaleX=n.img.scaleY=n.initScale*t.zoom},pressMove:function(t){n.img.translateX+=t.deltaX,n.img.translateY+=t.deltaY,t.preventDefault()}}),this.renderCover(),this.setStyle()},renderCover:function(){var t=this.cover_ctx,i=this.cover.width,e=this.cover.height,n=this.width,s=this.height;t.save(),t.fillStyle="black",t.globalAlpha=.7,t.fillRect(0,0,this.cover.width,this.cover.height),t.restore(),t.save(),t.globalCompositeOperation="destination-out",t.beginPath(),this.circle?t.arc(i/2,e/2,n/2-4,0,2*Math.PI,!1):t.rect(i/2-n/2,e/2-s/2,n,s),t.fill(),t.restore(),t.save(),t.beginPath(),t.strokeStyle="white",this.circle?t.arc(i/2,e/2,n/2-4,0,2*Math.PI,!1):t.rect(i/2-n/2,e/2-s/2,n,s),t.stroke()},setStyle:function(){this._css(this.cover,{position:"absolute",zIndex:"100",left:"0px",top:"0px"}),this._css(this.croppingBox,{color:"white",textAlign:"center",fontSize:"18px",textDecoration:"none",visibility:"visible"}),this._css(this.img,{position:"fixed",zIndex:"1",top:window.innerHeight/2+"px",marginLeft:this.img_width/-2+"px",marginTop:this.img_height/-2+"px"})},crop:function(){this.calculateRect(),this.ctx.drawImage(this.img,this.crop_rect[0],this.crop_rect[1],this.crop_rect[2],this.crop_rect[3],0,0,this.canvas.width,this.canvas.height)},calculateRect:function(){var t=this.img.getBoundingClientRect(),i=window.innerWidth/2-this.width/2,e=window.innerHeight/2-this.height/2+35,n=[i,e,this.width+i,this.height+e],s=[t.left,t.top,t.width+t.left,t.height+t.top],o=this.getOverlap.apply(this,n.concat(s)),r=(o[0]-s[0])/this.img.scaleX,h=(o[1]-s[1])/this.img.scaleY,a=o[2]/this.img.scaleX,l=o[3]/this.img.scaleY;r<0&&(r=0),h<0&&(h=0),r+a>this.img_width&&(a=this.img_width-r),h+l>this.img_height&&(l=this.img_height-h),this.crop_rect=[r,h,a,l]},getOverlap:function(t,i,e,n,s,o,r,h){if(e<s||n<o||t>r||i>h)return[0,0,0,0];var a=Math.max(t,s),l=Math.max(i,o);return[a,l,Math.min(e,r)-a,Math.min(n,h)-l]},_css:function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t.style[e]=i[e])}};var v=y,w={name:"userEdit",data:function(){return{photoType:null,imgSrc:null,cropWidth:null,cropHeight:null,alloyCrop:null,originalImgSrc:null,isShowResult:!1,resultImgUrl:null}},methods:{initAlloyCrop:function(){this.alloyCrop=new v({image_src:this.originalImgSrc,width:this.cropWidth,height:this.cropHeight,output:1})},saveImgEdit:function(){this.alloyCrop.crop(),this.resultImgUrl=this.alloyCrop.canvas.toDataURL("image/"+this.type),this.isShowResult=!0,this.closeCropModel()},finishCrop:function(){"userHeadImg"==this.photoType?util.cache.set("userHeadImg",this.resultImgUrl):"userBgImg"==this.photoType&&util.cache.set("userBgImg",this.resultImgUrl),this.back()},reCrop:function(){var t=this;this.isShowResult=!1,setTimeout(function(){t.resultImgUrl=null,t.closeCropModel(),t.initAlloyCrop()},800)},closeCropModel:function(){this.alloyCrop._css(this.alloyCrop.croppingBox,{display:"none"})},confirmBack:function(){var t=this;util.ui.confirm("确定退出图片编辑吗",function(){t.back()})}},mounted:function(){var t=this,i=this.getRouterDataObj();this.photoType=i.photoType,this.originalImgSrc=i.originalImgSrc,this.cropWidth=i.cropWidth,this.cropHeight=i.cropHeight,console.log(this.cropWidth),console.log(this.cropHeight),setTimeout(function(){t.initAlloyCrop()},600)},destroyed:function(){this.closeCropModel()}},T={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("app-wrap",[e("app-bar",{attrs:{slot:"appBar",title:"图片编辑"},slot:"appBar"},[e("mu-icon-button",{attrs:{slot:"left",icon:"icon-fanhui"},on:{click:t.confirmBack},slot:"left"}),t._v(" "),e("mu-icon-button",{directives:[{name:"show",rawName:"v-show",value:!t.isShowResult,expression:"!isShowResult"}],attrs:{slot:"right",icon:"icon-ok"},on:{click:t.saveImgEdit},slot:"right"})],1),t._v(" "),e("app-content",{attrs:{slot:"appContent"},slot:"appContent"},[e("div",{staticClass:"edit-img-wrap",attrs:{id:"edit-img-wrap"}},[e("transition",{attrs:{name:"bottomToTop"}},[e("mu-card",{directives:[{name:"show",rawName:"v-show",value:t.isShowResult,expression:"isShowResult"}],staticClass:"result-card"},[e("mu-card-media",[e("img",{attrs:{src:t.resultImgUrl}})]),t._v(" "),e("mu-card-actions",{staticStyle:{"text-align":"center"}},[e("mu-flat-button",{staticStyle:{"margin-right":"50px"},attrs:{icon:"icon-ok",color:"#FFF",backgroundColor:"#4AA1FF"},on:{click:t.finishCrop}}),t._v(" "),e("mu-flat-button",{attrs:{icon:"icon-shuaxin",color:"#4AA1FF"},on:{click:t.reCrop}})],1)],1)],1)],1)])],1)},staticRenderFns:[]};var b=e("X4nt")(w,T,!1,function(t){e("MZJs")},"data-v-63fc4f6b",null);i.default=b.exports},"KQ1+":function(t,i,e){e("6/+b")("asyncIterator")},MZJs:function(t,i){},O9zq:function(t,i,e){"use strict";var n=e("KFas"),s=e("7Tch"),o=e("M7ni"),r=e("MITN"),h=e("/Mll"),a=e("X/59").KEY,l=e("xVzf"),c=e("CTvS"),u=e("Macf"),p=e("GZtZ"),d=e("QjZ5"),m=e("eQoU"),f=e("6/+b"),g=e("QmGQ"),y=e("5sQS"),v=e("Dc6E"),w=e("uRtX"),T=e("DGQG"),b=e("xXu8"),x=e("+BLA"),_=e("OTtE"),M=e("aCDz"),S=e("YzBJ"),X=e("qRYU"),Y=e("OtAM"),E=S.f,C=X.f,O=M.f,k=n.Symbol,L=n.JSON,P=L&&L.stringify,A=d("_hidden"),F=d("toPrimitive"),D={}.propertyIsEnumerable,I=c("symbol-registry"),Z=c("symbols"),B=c("op-symbols"),R=Object.prototype,U="function"==typeof k,z=n.QObject,j=!z||!z.prototype||!z.prototype.findChild,Q=o&&l(function(){return 7!=_(C({},"a",{get:function(){return C(this,"a",{value:7}).a}})).a})?function(t,i,e){var n=E(R,i);n&&delete R[i],C(t,i,e),n&&t!==R&&C(R,i,n)}:C,H=function(t){var i=Z[t]=_(k.prototype);return i._k=t,i},W=U&&"symbol"==typeof k.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof k},N=function(t,i,e){return t===R&&N(B,i,e),v(t),i=b(i,!0),v(e),s(Z,i)?(e.enumerable?(s(t,A)&&t[A][i]&&(t[A][i]=!1),e=_(e,{enumerable:x(0,!1)})):(s(t,A)||C(t,A,x(1,{})),t[A][i]=!0),Q(t,i,e)):C(t,i,e)},J=function(t,i){v(t);for(var e,n=g(i=T(i)),s=0,o=n.length;o>s;)N(t,e=n[s++],i[e]);return t},K=function(t){var i=D.call(this,t=b(t,!0));return!(this===R&&s(Z,t)&&!s(B,t))&&(!(i||!s(this,t)||!s(Z,t)||s(this,A)&&this[A][t])||i)},V=function(t,i){if(t=T(t),i=b(i,!0),t!==R||!s(Z,i)||s(B,i)){var e=E(t,i);return!e||!s(Z,i)||s(t,A)&&t[A][i]||(e.enumerable=!0),e}},G=function(t){for(var i,e=O(T(t)),n=[],o=0;e.length>o;)s(Z,i=e[o++])||i==A||i==a||n.push(i);return n},q=function(t){for(var i,e=t===R,n=O(e?B:T(t)),o=[],r=0;n.length>r;)!s(Z,i=n[r++])||e&&!s(R,i)||o.push(Z[i]);return o};U||(h((k=function(){if(this instanceof k)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),i=function(e){this===R&&i.call(B,e),s(this,A)&&s(this[A],t)&&(this[A][t]=!1),Q(this,t,x(1,e))};return o&&j&&Q(R,t,{configurable:!0,set:i}),H(t)}).prototype,"toString",function(){return this._k}),S.f=V,X.f=N,e("809B").f=M.f=G,e("K0/C").f=K,e("/a/u").f=q,o&&!e("Ul0Y")&&h(R,"propertyIsEnumerable",K,!0),m.f=function(t){return H(d(t))}),r(r.G+r.W+r.F*!U,{Symbol:k});for(var $="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;$.length>tt;)d($[tt++]);for(var it=Y(d.store),et=0;it.length>et;)f(it[et++]);r(r.S+r.F*!U,"Symbol",{for:function(t){return s(I,t+="")?I[t]:I[t]=k(t)},keyFor:function(t){if(!W(t))throw TypeError(t+" is not a symbol!");for(var i in I)if(I[i]===t)return i},useSetter:function(){j=!0},useSimple:function(){j=!1}}),r(r.S+r.F*!U,"Object",{create:function(t,i){return void 0===i?_(t):J(_(t),i)},defineProperty:N,defineProperties:J,getOwnPropertyDescriptor:V,getOwnPropertyNames:G,getOwnPropertySymbols:q}),L&&r(r.S+r.F*(!U||l(function(){var t=k();return"[null]"!=P([t])||"{}"!=P({a:t})||"{}"!=P(Object(t))})),"JSON",{stringify:function(t){for(var i,e,n=[t],s=1;arguments.length>s;)n.push(arguments[s++]);if(e=i=n[1],(w(i)||void 0!==t)&&!W(t))return y(i)||(i=function(t,i){if("function"==typeof e&&(i=e.call(this,t,i)),!W(i))return i}),n[1]=i,P.apply(L,n)}}),k.prototype[F]||e("OCs/")(k.prototype,F,k.prototype.valueOf),u(k,"Symbol"),u(Math,"Math",!0),u(n.JSON,"JSON",!0)},QmGQ:function(t,i,e){var n=e("OtAM"),s=e("/a/u"),o=e("K0/C");t.exports=function(t){var i=n(t),e=s.f;if(e)for(var r,h=e(t),a=o.f,l=0;h.length>l;)a.call(t,r=h[l++])&&i.push(r);return i}},"X/59":function(t,i,e){var n=e("GZtZ")("meta"),s=e("uRtX"),o=e("7Tch"),r=e("qRYU").f,h=0,a=Object.isExtensible||function(){return!0},l=!e("xVzf")(function(){return a(Object.preventExtensions({}))}),c=function(t){r(t,n,{value:{i:"O"+ ++h,w:{}}})},u=t.exports={KEY:n,NEED:!1,fastKey:function(t,i){if(!s(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,n)){if(!a(t))return"F";if(!i)return"E";c(t)}return t[n].i},getWeak:function(t,i){if(!o(t,n)){if(!a(t))return!0;if(!i)return!1;c(t)}return t[n].w},onFreeze:function(t){return l&&u.NEED&&a(t)&&!o(t,n)&&c(t),t}}},Yyxk:function(t,i,e){t.exports={default:e("bcUa"),__esModule:!0}},YzBJ:function(t,i,e){var n=e("K0/C"),s=e("+BLA"),o=e("DGQG"),r=e("xXu8"),h=e("7Tch"),a=e("DnLf"),l=Object.getOwnPropertyDescriptor;i.f=e("M7ni")?l:function(t,i){if(t=o(t),i=r(i,!0),a)try{return l(t,i)}catch(t){}if(h(t,i))return s(!n.f.call(t,i),t[i])}},aCDz:function(t,i,e){var n=e("DGQG"),s=e("809B").f,o={}.toString,r="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return r&&"[object Window]"==o.call(t)?function(t){try{return s(t)}catch(t){return r.slice()}}(t):s(n(t))}},adMp:function(t,i,e){e("pBXl");var n=e("UusJ").Object;t.exports=function(t,i,e){return n.defineProperty(t,i,e)}},bcUa:function(t,i,e){e("O9zq"),e("UWEk"),e("KQ1+"),e("vuzV"),t.exports=e("UusJ").Symbol},"cz9/":function(t,i,e){e("wCtA"),e("dmd9"),t.exports=e("eQoU").f("iterator")},eQoU:function(t,i,e){i.f=e("QjZ5")},hRKE:function(t,i,e){"use strict";i.__esModule=!0;var n=r(e("2LoE")),s=r(e("Yyxk")),o="function"==typeof s.default&&"symbol"==typeof n.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};function r(t){return t&&t.__esModule?t:{default:t}}i.default="function"==typeof s.default&&"symbol"===o(n.default)?function(t){return void 0===t?"undefined":o(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":void 0===t?"undefined":o(t)}},liLe:function(t,i,e){t.exports={default:e("adMp"),__esModule:!0}},pBXl:function(t,i,e){var n=e("MITN");n(n.S+n.F*!e("M7ni"),"Object",{defineProperty:e("qRYU").f})},vuzV:function(t,i,e){e("6/+b")("observable")}});