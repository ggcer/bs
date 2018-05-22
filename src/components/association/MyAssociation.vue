<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar title="我的社团" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back"/>
		</app-bar>
		
		<app-content slot="appContent" :refreshMethod="refresh">
			<div class="ma-search">
				<img src="../../assets/image/icon/search.png" class="search-icon">
				<input type="search" id="head-search" v-model="searchKeyword" class="head-search" placeholder="从我的社团中搜索...">
			</div>
			<div class="sort-row">
				<div class="sort-row-col">
		  			<span class="order-span" @click="sort('RECENTLY_VIEWED')">
						<span v-bind:class="{'blue-span':user.MASortField == 'RECENTLY_VIEWED'}">最近浏览</span>
						<div class="triangle-wrap">
							<img src="../../assets/image/icon/triangle-up.png" v-show="user.MASortField != 'RECENTLY_VIEWED' || user.MASortType !== ''">
							<img src="../../assets/image/icon/triangle-up-active.png" v-show="user.MASortField == 'RECENTLY_VIEWED' && user.MASortType === ''">
							<img src="../../assets/image/icon/triangle-down.png" v-show="user.MASortField != 'RECENTLY_VIEWED' || user.MASortType !== '-'">
							<img src="../../assets/image/icon/triangle-down-active.png" v-show="user.MASortField == 'RECENTLY_VIEWED' && user.MASortType === '-'">
						</div>
					</span>
		  		</div>
		  		<div class="sort-row-col">
		  			<span class="order-span" @click="sort('HOT')">
						<span v-bind:class="{'blue-span':user.MASortField == 'HOT'}">活跃度</span>
						<div class="triangle-wrap">
							<img src="../../assets/image/icon/triangle-up.png" v-show="user.MASortField != 'HOT' || user.MASortType !== ''">
							<img src="../../assets/image/icon/triangle-up-active.png" v-show="user.MASortField == 'HOT' && user.MASortType === ''">
							<img src="../../assets/image/icon/triangle-down.png" v-show="user.MASortField != 'HOT' || user.MASortType !== '-'">
							<img src="../../assets/image/icon/triangle-down-active.png" v-show="user.MASortField == 'HOT' && user.MASortType === '-'">
						</div>
					</span>
		  		</div>
		  		<div class="sort-row-col">
		  			<span class="order-span" @click="sort('CREATE_DATE')">
						<span v-bind:class="{'blue-span':user.MASortField == 'CREATE_DATE'}">创建时间</span>
						<div class="triangle-wrap">
							<img src="../../assets/image/icon/triangle-up.png" v-show="user.MASortField != 'CREATE_DATE' || user.MASortType !== ''">
							<img src="../../assets/image/icon/triangle-up-active.png" v-show="user.MASortField == 'CREATE_DATE' && user.MASortType === ''">
							<img src="../../assets/image/icon/triangle-down.png" v-show="user.MASortField != 'CREATE_DATE' || user.MASortType !== '-'">
							<img src="../../assets/image/icon/triangle-down-active.png" v-show="user.MASortField == 'CREATE_DATE' && user.MASortType === '-'">
						</div>
					</span>
		  		</div>
		  		<div class="show-type">
		  			<img src="../../assets/image/icon/grid.png" @click="user.isMAGrid = !user.isMAGrid" v-show="user.isMAGrid">
		  			<img src="../../assets/image/icon/laptop.png" @click="user.isMAGrid = !user.isMAGrid" v-show="!user.isMAGrid">
		  		</div>
			</div>

      <!-- 我的社团列表 -->
			<div class="common-item-wrap">
				<div class="common-item" v-bind:class="{'common-item-laptop': !user.isMAGrid}" :key="index" v-for="(item, index) in myAssListWithSortAndFilterKeyword" @click="goToAssociationHome(item)">
					<img :src="item.assBg" class="common-item-img" v-bind:class="{'common-item-img-laptop': !user.isMAGrid}">
					<div class="common-item-tip" v-bind:class="{'common-item-tip-laptop': !user.isMAGrid}">
						<img src="../../assets/image/icon/fire.png" class="common-item-tip-icon" v-bind:class="{'common-item-tip-icon-laptop': !user.isMAGrid}"> {{item.assHot}}
						<img src="../../assets/image/icon/member.png" class="common-item-tip-icon" v-bind:class="{'common-item-tip-icon-laptop': !user.isMAGrid}" style="margin-left: 5px;"> {{item.assNum}}
					</div>
					<p class="common-item-desc" v-html="item.assInfo"></p>
					<p class="common-item-add-desc" v-html="item.assName"></p>
				</div>
			</div>
		</app-content>
	</app-wrap>
</template>

<script>
export default {
  name: "myAssociation",
  data() {
    return {
      reqObj: {
      }, //请求对象
      user: {}, //当前用户对象
      searchKeyword: "",  //当前搜索关键词
      myAssList: [] //我的社团列表
    };
  },
  methods: {
    //下拉刷新
    refresh() {
      this.getMyAssList((data) => {
        this.myAssList = data.data;
        // 对myAssList塞入lastViewDate
        this.myAssList.forEach((item, index) => {
          this.user.assViewRecord.forEach((itemInner, indexInner) => {
            if(item.assId == itemInner.assId){
              item.lastViewDate = itemInner.lastViewDate;
            }
          })
        })
        util.ui.hideLoading("TOP");
      })
    },
    //排序
    sort(sortField) {
      if (this.user.MASortField == sortField) {
        this.user.MASortType = this.user.MASortType == "" ? "-" : "";
        return;
      }
      this.user.MASortField = sortField;
      this.user.MASortType = "-";
    },
    //进入社团详情
    goToAssociationHome(assData) {
      // 获取用户的社团浏览历史
      let assViewRecord = this.user.assViewRecord;
      let isFind = false;
      assViewRecord.forEach((item, index) => {
        // 找到相同的社团id，更新最近浏览时间
        if(item.assId == assData.assId){
          item.lastViewDate = util.common.formatDateObjToDateStr(new Date());
          isFind = true;
        }
      })
      //若之前没有浏览过则塞入浏览记录
      if(!isFind){
        assViewRecord.push({
          assId: assData.assId,
          lastViewDate: util.common.formatDateObjToDateStr(new Date())
        })
      }
      util.cache.set('user', this.user);
      this.goWithParams("associationHome", assData);
    },
    //获取社团列表
    getMyAssList(cb) {
      util.http.normalReq.post(
        "/ACTIVITY-CLIENT/association/myassList",
        this.reqObj,
        data => {
          if(data.result){
            cb(data);
          }
        },
        err => {}
      );
    }
  },
  computed: {
    myAssListWithSortAndFilterKeyword: function() {
      let temp = [];
      let myAssListWithFilterKeyword = [];
      //先根据关键字过滤数据
      this.myAssList.forEach((item, index) => {
        if (this.searchKeyword) {
          if (
            item.assInfo.indexOf(this.searchKeyword) != -1 ||
            item.assName.indexOf(this.searchKeyword) != -1
          ) {
            //浅拷贝对象(展示的list与实际list不同，展示的list中有可能带keyword高亮的部分)
            let pushItem = util.common.shallowCopyObj(item);
            //查找keyword匹配项
            let assInfoRegStr = this.searchKeyword;
            let assInfoReg = new RegExp(assInfoRegStr, "gim");
            pushItem.assInfo = pushItem.assInfo.replace(
              assInfoReg,
              '<span class="red-span">' + this.searchKeyword + "</span>"
            );

            let assNameRegStr = this.searchKeyword;
            let assNameReg = new RegExp(assNameRegStr, "gim");
            pushItem.assName = pushItem.assName.replace(
              assNameReg,
              '<span class="red-span">' + this.searchKeyword + "</span>"
            );
            myAssListWithFilterKeyword.push(pushItem);
          }
        } else {
          myAssListWithFilterKeyword.push(item);
        }
      });
      return temp
        .concat(myAssListWithFilterKeyword)
        .sort((val1, val2) => {
          let val1CompareValue;
          let val2CompareValue;
          if (this.user.MASortField == "RECENTLY_VIEWED") {
            val1CompareValue = val1.lastViewDate;
            val2CompareValue = val2.lastViewDate;
          } else if (this.user.MASortField == "HOT") {
            val1CompareValue = val1.assHot;
            val2CompareValue = val2.assHot;
          } else if (this.user.MASortField == "CREATE_DATE") {
            val1CompareValue = val1.assCreate;
            val2CompareValue = val2.assCreate;
          }
          if (val1CompareValue > val2CompareValue) {
            return this.user.MASortType == "-" ? -1 : 1;
          } else if (val1CompareValue < val2CompareValue) {
            return this.user.MASortType == "-" ? 1 : -1;
          } else {
            return 0;
          }
        });
    }
  },
  mounted() {
    this.user = util.cache.get("user");
    this.refresh();
  },
  destroyed() {
    util.cache.set("user", this.user);
  }
};
</script>

<style scoped>
.ma-search {
  width: 100%;
  padding: 5px 0;
  overflow: hidden;
  background-color: white;
}
.search-icon {
  margin-left: 15px;
  margin-top: 4px;
  width: 20px;
  height: 20px;
  float: left;
}
.head-search {
  padding: 5px 15px;
  height: 28px;
  outline: none;
  border: none;
  font-size: 14px;
  color: #4b4b4b;
  float: left;
  background-color: white;
}
.sort-row {
  width: 100%;
  display: flex;
  margin-top: 5px;
}
.sort-row .sort-row-col {
  height: 30px;
  flex: 2;
}
.show-type {
  height: 30px;
  line-height: 30px;
  flex: 1;
}
.show-type img {
  display: block;
  width: 18px;
  height: 18px;
  margin: 6px 15px;
  float: right;
}
.order-span {
  display: inline-block;
  height: 30px;
  width: 85px;
  margin-left: 15px;
}
.order-span span {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  float: left;
  font-size: 14px;
  letter-spacing: 1px;
  color: #707070;
  text-align: left;
}
.order-span .triangle-wrap {
  width: 10px;
  height: 20px;
  margin-left: 5px;
  margin-top: 5px;
  float: left;
}
.order-span .triangle-wrap img {
  width: 10px;
  height: 10px;
  display: block;
}
.order-span .ion-arrow-up-b {
  margin-top: 5px;
}
.common-item-wrap {
  overflow: hidden;
}
.common-item-wrap h4 {
  height: 20px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.54);
  text-align: left;
  margin-left: 10px;
  border-left: 2px solid #7dbbff;
  padding: 0 10px;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: 2px;
}
.common-item-btn {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  float: right;
  margin-left: 10px;
}
.common-item {
  position: relative;
  width: calc(50% - 15px);
  margin-left: 10px;
  float: left;
  border-radius: 6px;
  background-color: white;
  box-shadow: 1px 1px 0.5px 0.5px #dddddd;
  margin-top: 10px;
}
.common-item-laptop {
  width: calc(100% - 20px);
  transition: all 0.3s;
}
.common-item-img {
  width: calc(100% + 0.5px);
  height: 100px;
  border-radius: 6px 6px 0 0;
}
.common-item-img-laptop {
  height: 200px;
  transition: all 0.3s;
}
.common-item-tip {
  position: absolute;
  left: 0;
  top: 80px;
  width: calc(100% + 0.5px);
  height: 20px;
  line-height: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 12px;
  text-align: right;
  padding-right: 8px;
}
.common-item-tip-laptop {
  top: 170px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  transition: all 0.3s;
}
.common-item-tip-icon {
  width: 13px;
  height: 13px;
  vertical-align: middle;
}
.common-item-tip-icon-laptop {
  width: 16px;
  height: 16px;
}
.common-item-desc {
  padding: 0 10px;
  letter-spacing: 1px;
  font-size: 14px;
  line-height: 20px;
  height: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #4b4b4b;
}
.common-item-add-desc {
  padding: 0 10px;
  letter-spacing: 1px;
  font-size: 13px;
  line-height: 30px;
  color: #757575;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>