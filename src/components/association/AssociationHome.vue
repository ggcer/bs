<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar :title="isShowAppTitle ? associationName : ''" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back"/>
		</app-bar>
    <app-bar :title="isShowAppTitle ? associationName : ''" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
			
      <mu-icon-button icon="icon-bianji" v-if="associationUser.assType == 1" slot="right" @click="goToAssociationDetail" />
			<mu-icon-button icon="icon-erweima" slot="right" @click="goToAssociationQrcode" />
		</app-bar>
		
		<app-content slot="appContent" :loadMoreMethod="nowActiveSearchAHHeaderItemIndex == 0 ? loadMoreActivity : null" :loadMoreDesc="nowActiveSearchAHHeaderItemIndex == 0 ? loadMoreDesc : ''">
			<div class="association-bg-img" id="association-bg-img" :style="{backgroundImage: 'url(' + (association.assBg ? association.assBg : initAssBg) + ')'}"></div>
			<transition name="fadeIn">
				<div class="user-base-msg" v-show="!isShowAppTitle">
					<img :src="association.assLogo ? association.assLogo : initAssLogo" class="user-avatar-img">
					<h4 v-html="associationName"></h4>
					<div class="common-item-tip">
						<img src="../../assets/image/icon/fire.png" class="common-item-tip-icon"> {{association.assHot}}
						<img src="../../assets/image/icon/member.png" class="common-item-tip-icon" style="margin-left: 5px;"> {{association.assNum}}
					</div>
					<p v-html="association.assInfo ? association.assInfo : '这个社团长很懒，还没有设置任何社团说明哦'"></p>
				</div>
			</transition>
			<div class="ah-header">
				<div class="ah-header-item" v-bind:class="{'blue-span': nowActiveSearchAHHeaderItemIndex == index}" :key="index" v-for="(item, index) in ahHeaderItem" @click="switchActiveAHHIAbled ? switchActiveAHHI(index) : ''">
					{{item.desc}}
					<div id="active-item-bottom-line" class="active-item-bottom-line" v-if="index == 0"></div>
				</div>
			</div>
			
      <!-- 活动 -->
			<div class="ah-main">
				<div class="hot-activity-wrap" v-show="nowActiveSearchAHHeaderItemIndex == 0">
					<div class="hot-activity-item" :key="index" v-for="(item, index) in activityList">
						<div class="leftAvatar-rightDesc-item">
							<div class="lri-avatar">
								<img :src="association.assLogo ? association.assLogo : initAssLogo" />
							</div>
							<div class="lri-desc">
								<h4>{{association.assName}}</h4>
								<p>{{item.createTime}}</p>
							</div>
						</div>
						<p class="hot-activity-item-desc">
							{{item.content}}
						</p>
						<div class="hot-activity-item-img-wrap">
							<img :src="imgItem" :key="imgIndex" v-for="(imgItem, imgIndex) in item.picImage" @click="showImgViewer(item.picImage, imgIndex)"/>
						</div>
						<div class="hot-activity-item-btns">
							<div class="hot-activity-item-btn" @click="showCommentPopup(item)">
								<img src="../../assets/image/icon/liuyan.png">
								{{item.pinglunNum}}
							</div>
							<div class="hot-activity-item-btn" @click="giveTheThumbsUp(item)">
								<img :src="item.isLike ? require('../../assets/image/icon/dianzan-active.png') : require('../../assets/image/icon/dianzan.png')">
								{{item.dianZan}}
							</div>
						</div>
					</div>
				</div>

        <!-- 社团印记 -->
        <div class="mark-wrap" v-show="nowActiveSearchAHHeaderItemIndex == 1">
          <mu-timeline>
            <mu-timeline-item>
              <span slot="time" v-html="association.assCreate"></span>
              <span slot="des">那是很有意义的一天，社团成立</span>
            </mu-timeline-item>
            <mu-timeline-item>
              <span slot="time">以后...</span>
              <span slot="des">更多的未来等着我们开创</span>
            </mu-timeline-item>
          </mu-timeline>
        </div>
			</div>
			
			<!--评论popup-->
			<transition name="bottomToTop05">
				<div id="comment-popup" class="comment-popup" v-show="isShowCommentPopup">
					<div id="comment-popup-wrap">
						<div class="hot-activity-item" style="padding-top: 20px; margin-top: 0;">
							<div class="leftAvatar-rightDesc-item">
								<div class="lri-avatar">
									<img :src="association.assLogo ? association.assLogo : initAssLogo" />
								</div>
								<div class="lri-desc">
									<h4>{{association.assName}}</h4>
									<p>{{commentItem.createTime}}</p>
								</div>
							</div>
							<p class="hot-activity-item-desc">
								{{commentItem.content}}
							</p>
							<div class="hot-activity-item-img-wrap">
								<img :src="imgItem" :key="imgIndex" v-for="(imgItem, imgIndex) in commentItem.picImage" @click="showImgViewer(commentItem.picImage, imgIndex)"/>
							</div>
							<div class="hot-activity-item-btns">
								<div class="hot-activity-item-btn" @click="showWriteCommentPopup">
									<img src="../../assets/image/icon/liuyan.png">
									{{commentItem.pinglunNum}}
								</div>
								<div class="hot-activity-item-btn" @click="giveTheThumbsUp(commentItem)">
									<img :src="commentItem.isLike ? require('../../assets/image/icon/dianzan-active.png') : require('../../assets/image/icon/dianzan.png')">
									{{commentItem.dianZan}}
								</div>
							</div>
						</div>
						<!--评论-->
						<div class="comment-content">
							<h4 class="comment-content-header">
								讨论圈
							</h4>
							<div class="comment-content-item" :key="index" v-for="(item, index) in commentItem.commentList">
								<div class="leftAvatar-rightDesc-item">
									<div class="lri-avatar">
										<img :src="item.talkimg ? item.talkimg : initUserHeadImg" />
									</div>
									<div class="lri-desc">
										<h4>{{item.talkname}}</h4>
										<p>{{item.createTime}}</p>
									</div>
								</div>
								<div class="comment-content-text" v-html="item.content"></div>
							</div>
							
							<div class="comment-load-more" v-show="isShowCommentLoadMore" v-html="commentLoadMoreHtml">
								<div class="mu-circle-wrapper  active" style="width: 20px; height: 20px; margin-top: 10px!important">
									<div class="mu-circle-spinner active" style="border-color: #4AA1FF!important">
										<div class="mu-circle-clipper left">
											<div class="mu-circle" style="border-width: 1px;"></div>
										</div>
										<div class="mu-circle-gap-patch">
											<div class="mu-circle"></div>
										</div>
										<div class="mu-circle-clipper right">
											<div class="mu-circle" style="border-width: 1px;"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<img src="../../assets/image/icon/cancel-black.png" class="comment-popup-cancel" @click="hideCommentPopup">
				</div>
			</transition>
			
			<!--评论popup-->
			<transition name="bottomToTop05">
				<div id="write-comment-popup" class="comment-popup write-comment-popup" v-show="isShowWriteCommentPopup">
					<h4 class="comment-popup-title">写下你的评论</h4>
					<textarea class="write-comment-popup-textarea" v-model="writeCommentContent" placeholder="说些什么吧..."></textarea>
					<img src="../../assets/image/icon/cancel-black.png" class="comment-popup-cancel" @click="hideWriteCommentPopup">
					<mu-raised-button label="发 送" class="write-comment-popup-send" :disabled="!writeCommentContent" primary @click="writeComment"/>
				</div>
			</transition>

      <img src="../../assets/image/icon/pay-money.png" v-if="(associationUser.assType == 1 || associationUser.assType == 2) &&  associationUser.assCost == 2" @click="payAssMoney" class="pay-money">
		</app-content>
	</app-wrap>
</template>

<script>
import store from "../../vuex/store";
export default {
  name: "associationHome",
  data() {
    return {
      isShowAppTitle: false, //是否显示app标题
      user: {}, //当前用户对象
      associationUser: {},  //当前社团用户对象
      association: {}, //当前社团对象
      activityList: [], //社团活动列表
      commentItem: {}, //当前被评论的活动对象

      associationName: null, //社团展示名称
      loadMoreDesc: "下拉加载更多热门活动",

      isShowCommentPopup: false,
      isShowCommentLoadMore: false,
      commentLoadMoreHtml: null,

      isShowWriteCommentPopup: false,
      writeCommentContent: null,

      //社团活动请求体
      activeReqObj: {
        assId: null,
        pageVo: {
          pageNo: 0,
          pageSize: 10
        }
      },

      //评论请求体
      commentReqObj: {
        actId: null,
        pageVo: {
          pageNo: 0,
          pageSize: 10
        }
      },

      resizeActivityPicSign: null,

      //标签页相关
      switchActiveAHHIAbled: true,
      nowActiveSearchAHHeaderItemIndex: 0,
      ahHeaderItem: [
        {
          desc: "热门活动"
        },
        {
          desc: "社团印记"
        }
      ],

      initAssBg: require("../../assets/image/bg/association-bg.jpg"),
      initAssLogo: require("../../assets/image/other/demoTemp/ymqtx.jpg"),
      initUserHeadImg: require("../../assets/image/dlrb.jpg")
    };
  },
  methods: {
    //刷新页面
    refresh() {
      console.log("我被刷新了");
      util.ui.showLoading('CENTER');
      //获取社团详情
      util.http.normalReq.get(
        "/ACTIVITY-CLIENT/association/" + this.association.assId,
        {},
        data => {
          console.log("刷新结束");
          //更新association对象
          this.association.assMoney = data.data.associationDTO.assMoney;
          // util.common.copyFieldValue(this.association, data.data.associationDTO);
          this.associationUser = data.data.associationUser;
          //清除activityLiST
          this.activityList = [];
          this.activeReqObj.pageVo.pageNo = 0;
          //分页加载社团活动
          this.loadMoreActivity(() => {
            //恢复社团名称
            this.associationName = this.association.assName
              ? this.association.assName
              : "无名社团";
          });
        },
        err => {}
      );
    },
    //加载更多社团活动
    loadMoreActivity(succCb) {
      //当前查询页数+1
      this.activeReqObj.pageVo.pageNo++;
      util.ui.showLoading('CENTER');
      util.http.normalReq.post(
        "/ACTIVITY-CLIENT/activity/list",
        this.activeReqObj,
        data => {
          if(succCb){
            succCb();
          }
          //将查询的数据赋值到activityList
          this.activityList = this.activityList.concat(data.data);
          //对时间重新赋值
          this.activityList.forEach((item, index) => {
            item.createTime = util.common.formatDateObjToDateStr(
              new Date(item.createTime)
            );
          });
        }
      );
      // util.ui.hideLoading('BOTTOM');
      // this.loadMoreDesc = '已经是全部的热门活动哦';
    },

    switchActiveAHHI(index) {
      let left = $($(".ah-header-item").get(index)).offset().left;
      console.log(left);
      if (index == 0) {
        left = 0;
      }
      $("#active-item-bottom-line").css("left", left);
      this.nowActiveSearchAHHeaderItemIndex = index;
    },
    //点赞或取消点赞
    giveTheThumbsUp(item) {
      util.http.normalReq.get(
        "/ACTIVITY-CLIENT/dianzan/act/" + item.id,
        {},
        data => {
          if (data.result) {
            if (item.isLike) {
              item.dianZan--;
              item.isLike = false;
            } else {
              item.dianZan++;
              item.isLike = true;
            }
          }
        }
      );
    },
    //展示图片预览层
    showImgViewer(imgSrcList, nowActiveIndex) {
      util.ui.showImgViewer(imgSrcList, nowActiveIndex);
    },
    //弹出评论pop
    showCommentPopup(item) {
      (this.commentLoadMoreHtml = null), (this.isShowCommentLoadMore = false);
      this.commentItem = item;
      this.commentItem.commentList = [];
      //活动id
      this.commentReqObj.actId = item.id;
      //当前评论页数清0
      this.commentReqObj.pageVo.pageNo = 0;
      //加载更多评论
      this.loadMoreComment();
      this.isShowCommentPopup = true;
    },
    //加载更多评论
    loadMoreComment() {
      if (this.commentLoadMoreHtml != "没有更多评论啦") {
        //当前查询页数+1
        this.commentReqObj.pageVo.pageNo++;
        this.commentLoadMoreHtml =
          "" +
          '<div class="mu-circle-wrapper  active" style="width: 20px; height: 20px; margin-top: 10px!important">' +
          '<div class="mu-circle-spinner active" style="border-color: #4AA1FF!important">' +
          '<div class="mu-circle-clipper left"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
          '<div class="mu-circle-gap-patch"><div class="mu-circle"></div></div>' +
          '<div class="mu-circle-clipper right"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
          "</div>" +
          "</div>" +
          "";
        this.isShowCommentLoadMore = true;
        util.http.normalReq.post(
          "/ACTIVITY-CLIENT/message/list",
          this.commentReqObj,
          data => {
            if (data.result) {
              let addCommentList = data.data;
              this.isShowCommentLoadMore = false;
              //对时间重新赋值
              addCommentList.forEach((item, index) => {
                item.createTime = util.common.formatDateObjToDateStr(
                  new Date(item.createTime)
                );
              });
              this.commentItem.commentList = this.commentItem.commentList.concat(
                addCommentList
              );
              if (addCommentList.length < this.commentReqObj.pageVo.pageSize) {
                this.isShowCommentLoadMore = true;
                this.commentLoadMoreHtml = "没有更多评论啦";
              }
            }
          }
        );
      }
    },
    //交团费
    payAssMoney(){
      let reqObj = {
        assId: this.association.assId,
        moneyType: '2'
      }
      util.ui.showLoading('CENTER');
      //查询该用户需缴纳的团费
      util.http.normalReq.post(
        "/assOrder/queryAssCost",
        reqObj,
        data => {
          if(data.result){
            console.log(JSON.stringify(data));
            //获取缴费金额对象
            let moneyObj = data.data;
            util.ui.confirm(`尊敬的 ${this.association.assName} 团员，该社团发起了团费收集，共需缴纳 ${moneyObj.costMoney} 元，是否立即缴费`, () => {
              let reqObj = {
                payUser: this.user.userId,  //用户id
                orderId: moneyObj.orderId,   //orderId
                payAmount: moneyObj.costMoney + '', //缴费金额
                payInfo: '社团日常团费',  //缴费说明
              }
              //调用支付
              util.ui.showLoading('CENTER');
              util.http.normalReq.post('/aliPay/order/sign', reqObj, (data) => {
                if(data.data){
                  util.cordovaNative.callAlipay(data.data, (payResult) => {
                    if (payResult) {
                      //用户取消不进入支付结果页面
                      if (payResult.resultStatus != 6001) {
                        this.goWithQuery('/pay/payResult', payResult);
                      }
                    }
                  });
                }else{
                  util.ui.alert('不存在的data属性');
                }
              }, (err) => {

              }, window.ipStr)
            })
          }else {
            util.ui.toast(data.msg, 'WARN');
          }
        }, err => {

        }, window.ipStr)
    },
    //跳转到社团详情
    goToAssociationDetail(){
      this.goWithQuery("associationDetail", this.association);
    },
    //跳转到社团qrcode
    goToAssociationQrcode(){
      this.goWithQuery("associationQrcode", this.association);
    },
    hideCommentPopup() {
      $("#comment-popup").scrollTop(0);
      this.isShowCommentPopup = false;
    },
    showWriteCommentPopup() {
      this.isShowWriteCommentPopup = true;
    },
    hideWriteCommentPopup() {
      this.writeCommentContent = null;
      this.isShowWriteCommentPopup = false;
    },
    //评论
    writeComment() {
      let reqObj = {
        talkuser: this.user.userId,
        talkto: null,
        pid: this.commentItem.id,
        topicId: "1",
        content: this.writeCommentContent
      };
      util.http.normalReq.post(
        "/ACTIVITY-CLIENT/message/send",
        reqObj,
        data => {
          //评论成功
          if (data.result) {
            //当前活动评论数+1
            this.commentItem.pinglunNum++;
            //刷新该活动评论列表
            this.commentLoadMoreHtml = "见底了，下拉加载更多";
            this.commentItem.commentList = [];
            this.commentReqObj.pageVo.pageNo = 0;
            this.loadMoreComment();
            //隐藏评论popup
            this.hideWriteCommentPopup();
          }
        }
      );
    },
    resizeActivityPic() {
      $(".hot-activity-item-img-wrap img").height(
        $(".hot-activity-item-img-wrap img").width()
      );
    }
  },
  mounted() {
    //重新调整活动图片的高度
    this.resizeActivityPic();
    this.resizeActivityPicSign = setInterval(() => {
      this.resizeActivityPic();
    }, 200);
    //用户数据
    this.user = util.cache.get("user");
    //当前社团数据，从上一页获得
    this.association = this.getRouterDataObj();
    if(this.association.fromSearch){
      this.associationName = this.association.assName;
      this.activityList = this.association.activityList;
    }else{
      // 社团id
      this.activeReqObj.assId = this.association.assId;
      this.associationName =
        "" +
        '<div class="mu-circle-wrapper title-mu-circle-wrapper active" style="width: 20px; height: 20px; margin-top: 0">' +
        '<div class="mu-circle-spinner active" style="border-color: white!important">' +
        '<div class="mu-circle-clipper left"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
        '<div class="mu-circle-gap-patch"><div class="mu-circle"></div></div>' +
        '<div class="mu-circle-clipper right"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
        "</div>" +
        "</div>" +
        "";
      // 调用刷新事件进行请求
      this.refresh();
    }

    //下拉刷新事件注册
    let startY = 0;
    let beforeY = 0;
    let afterY = 0;

    $("#app-wrap").scroll(() => {
      let scrollTop = $("#app-wrap").scrollTop();
      if (scrollTop > $("#app-bar").height()) {
        this.isShowAppTitle = true;
      } else {
        this.isShowAppTitle = false;
        $("#comment-popup-wrap").scrollTop(
          $("#comment-popup-wrap").height() - $(window).height() - 100
        );
      }
    });

    let assBg = $("#association-bg-img");
    let bgImgWidth = assBg.width();
    let bgImgHeight = 190;
    $(window).on("touchmove", event => {
      let scrollTop = $("#app-wrap").scrollTop();
      let touch = event.targetTouches[0];
      beforeY = afterY;
      afterY = touch.pageY;
      if (
        scrollTop == 0 &&
        beforeY != 0 &&
        startY <= afterY &&
        !this.isShowCommentPopup &&
        !store.getters.imgViewer.isShowImgViewer
      ) {
        if (bgImgWidth > 190) {
          $("#app-wrap").addClass("overflowHidden");
        }
        let overScrollHeight = (afterY - beforeY) / 2;
        if (assBg.height() + overScrollHeight < 190) {
          assBg.height(190);
          assBg.css("backgroundSize", assBg.width() + "px 190px");
          return;
        }
        //					console.log(overScrollHeight);
        assBg.height(assBg.height() + overScrollHeight);
        bgImgHeight += overScrollHeight * 1.2;
        bgImgWidth += overScrollHeight * 1.2 / 190 * assBg.width();
        assBg.css("backgroundSize", bgImgWidth + "px " + bgImgHeight + "px");
      }
    });
    $(window).on("touchstart", event => {
      let touch = event.targetTouches[0];
      startY = touch.pageY;
      assBg.removeClass("trans");
      beforeY = 0;
      afterY = startY;
      bgImgWidth = assBg.width();
      bgImgHeight = 190;
    });
    $(window).on("touchend", event => {
      //设置最小触发高度并且防止重复刷新
      if (
        assBg.height() > 240 &&
        this.associationName.indexOf("mu-circle-wrapper") == -1
      ) {
        this.associationName =
          "" +
          '<div class="mu-circle-wrapper title-mu-circle-wrapper active" style="width: 20px; height: 20px; margin-top: 0">' +
          '<div class="mu-circle-spinner active" style="border-color: white!important">' +
          '<div class="mu-circle-clipper left"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
          '<div class="mu-circle-gap-patch"><div class="mu-circle"></div></div>' +
          '<div class="mu-circle-clipper right"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
          "</div>" +
          "</div>" +
          "";
        //调用刷新函数
        this.refresh();
      }
      assBg.addClass("trans");
      $("#app-wrap").removeClass("overflowHidden");
      assBg.css({
        backgroundSize: "100% 190px",
        height: "190px"
      });
    });

    let commentPopup = $("#comment-popup");
    //评论区滑动到最底部loadmore
    commentPopup.scroll(() => {
      let isBottom =
        Math.abs(
          commentPopup.scrollTop() +
            $(window).height() -
            $("#comment-popup-wrap").height()
        ) < 1
          ? true
          : false;
      if (isBottom) {
        if (!this.isShowCommentLoadMore) {
          this.loadMoreComment();
        }
      }
    });
  },
  destroyed() {
    clearInterval(this.resizeActivityPicSign);
    $(window).off("touchmove");
    $(window).off("touchstart");
    $(window).off("touchend");
  }
};
</script>

<style scoped>
.app-bar {
  background: transparent !important;
}

.app-content {
  margin-top: -70px;
}

.association-bg-img {
  width: 100%;
  height: 190px;
  background-size: 100% 190px;
  background-position: center center;
  min-height: 190px;
}

.user-base-msg {
  text-align: center;
  margin-top: -165px;
  height: 165px;
}

.user-avatar-img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
}

.user-base-msg h4 {
  height: 30px;
  line-height: 30px;
  font-size: 17px;
  letter-spacing: 1px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 5px;
  font-weight: normal;
  color: white;
}

.user-base-msg p {
  margin-top: 5px;
  margin-top: 5px;
  font-size: 13px;
  letter-spacing: 1px;
  padding: 0 30px;
  max-height: 54px;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: white;
}

.common-item-tip {
  height: 20px;
  line-height: 20px;
  color: white;
  font-size: 12px;
  text-align: center;
  padding-right: 8px;
  background-color: rgba(0, 0, 0, 0.15);
}
.common-item-tip-icon {
  width: 13px;
  height: 13px;
  vertical-align: middle;
}

.ah-header {
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: white;
  box-shadow: 0 0.1em 0.4em rgba(0, 0, 0, 0.1) !important;
}
.ah-header .ah-header-item {
  position: relative;
  flex: 1;
  text-align: center;
  height: 39px;
  line-height: 39px;
  color: #7d7d7d;
  font-size: 14px;
  letter-spacing: 1px;
}
.active-item-bottom-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #5eacff;
  transition: all 0.5s;
}
.hot-activity-wrap {
}
.hot-activity-item {
  box-shadow: 0 0 0.4em rgba(0, 0, 0, 0.1) !important;
  background-color: white;
  padding: 15px;
  margin-top: 15px;
}
.leftAvatar-rightDesc-item {
}
.leftAvatar-rightDesc-item {
  overflow: hidden;
}
.leftAvatar-rightDesc-item .lri-avatar {
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.leftAvatar-rightDesc-item .lri-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
}
.leftAvatar-rightDesc-item .lri-desc {
  float: left;
}
.lri-desc h4 {
  height: 20px;
  line-height: 20px;
  color: #4b4b4b;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: normal;
}
.lri-desc p {
  height: 20px;
  line-height: 20px;
  color: #939393;
  font-size: 13px;
}
.hot-activity-item .hot-activity-item-desc {
  margin-top: 15px;
  font-size: 14px;
  color: #4b4b4b;
  line-height: 20px;
  letter-spacing: 1px;
}
.hot-activity-item .hot-activity-item-img-wrap {
  overflow: hidden;
}
.hot-activity-item-img-wrap img {
  float: left;
  width: calc(33.3% - 5px);
  margin-right: 5px;
  margin-top: 5px;
  object-fit: cover;
}
.hot-activity-item-btns {
  margin-top: 15px;
  display: flex;
  height: 25px;
  line-height: 25px;
  font-size: 13px;
  color: #939393;
}
.hot-activity-item-btns .hot-activity-item-btn {
  flex: 1;
  text-align: center;
}
.hot-activity-item-btn img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}

.comment-popup {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  overflow-y: scroll;
}
.comment-popup .comment-popup-title {
  font-weight: normal;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  letter-spacing: 2px;
  text-align: center;
  margin-top: 20px;
}
.comment-content {
  margin-top: 10px;
  background-color: white;
  padding: 15px;
  box-shadow: 0 0 0.4em rgba(0, 0, 0, 0.1) !important;
}
.comment-content .comment-content-header {
  height: 20px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.54);
  text-align: left;
  border-left: 2px solid #7dbbff;
  padding: 0 10px;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 2px;
  margin-bottom: 15px;
}
.comment-content-text {
  margin-left: 55px;
  margin-top: 5px;
  font-size: 14px;
}
.comment-content-item {
  margin-top: 15px;
}
.comment-load-more {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 13px;
  letter-spacing: 1px;
  color: #939393;
}
.comment-popup-cancel {
  position: fixed;
  right: 10px;
  top: 20px;
  width: 20px;
  height: 20px;
}
.write-comment-popup .write-comment-popup-send {
  position: absolute;
  bottom: 20px;
  left: calc(50% - 50px);
  right: 10px;
  width: 100px !important;
  height: 30px;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  padding: 0 10px;
}
.write-comment-popup-textarea {
  border: none;
  resize: none;
  outline: none;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  background-color: #f4f4f4;
}
.mark-wrap{
  padding: 20px;
}
.pay-money{
  position: fixed;
  bottom: 30px;
  left: calc(50% - 15px);
  width: 30px;
  height: 30px;
  animation: arrowDownAndUp 1.5s infinite linear;
}
@keyframes arrowDownAndUp{
  0%{
    transform:rotate(0deg);
  }
  25%{
    transform:rotate(-15deg);
  }
  50%{
    transform:rotate(0deg);
  }
  75%{
    transform:rotate(15deg);
  }
  100%{
    transform:rotate(0deg);
  }
}
</style>