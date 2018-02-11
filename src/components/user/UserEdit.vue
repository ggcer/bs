<template>
	<app-wrap>
		<app-bar title="资料编辑" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
			<mu-icon-button icon="icon-ok" slot="right" @click="saveUserEdit" />
		</app-bar>
		<app-content slot="appContent">
			<div class="avatar-wrap">
				<img :src="user.userHeadImg ? user.userHeadImg : initUserHeadImg" @click="go('/user/userHeadImg')" class="avatar-img" alt="头像" />
			</div>

			<div class="input-content">
				<mu-list>
					<mu-list-item class="input-item">
						<div class="input-item-label">用户昵称</div>
						<input type="text" v-model="user.userName" class="input-item-input" placeholder="未填写"/>
					</mu-list-item>
					<mu-list-item class="input-item" @click="isSexInputFocus = true">
						<div class="input-item-label">性别</div>
						<input type="text" v-model="sexStr" @click="openSexPicker" readonly class="input-item-input" placeholder="未填写"/>
					</mu-list-item>
					<mu-list-item class="input-item">
						<div class="input-item-label">生日</div>
						<input type="text" v-model="birthdayStr" @click="openBirthdayPicker" readonly class="input-item-input" placeholder="未填写"/>
					</mu-list-item>
					<mu-list-item class="input-item">
						<div class="input-item-label">地址</div>
						<input type="text" readonly v-model="addressStr" @click="openAddressPicker" class="input-item-input" placeholder="未填写"/>
					</mu-list-item>
					<mu-list-item class="input-item">
						<div class="input-item-label">我的大学</div>
						<input type="text" readonly v-model="collegeStr" @click="openCollegePicker" class="input-item-input" placeholder="未填写"/>
					</mu-list-item>
					<mu-list-item class="input-item">
						<div class="input-item-label">签名</div>
						<input type="text" v-model="user.userInfo" class="input-item-input" placeholder="未填写"/>
					</mu-list-item>
				</mu-list>
			</div>
			
			<mu-bottom-sheet :open="isOpenBottomSheet" @close="isOpenBottomSheet = false">
				<mu-list @itemClick="isOpenBottomSheet = false">
					<mu-sub-header>
						请选择设置头像的方式
					</mu-sub-header>
					<mu-list-item title="现在拍一张" @click="setAvatar(1)" />
					<mu-list-item title="从相册中选取" @click="setAvatar(2)" />
				</mu-list>
			</mu-bottom-sheet>
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'userEdit',
		data() {
			return {
				user: {},
				initUserHeadImg: require('../../assets/image/dlrb.jpg'),
				
				sexObj: {
					value: null,
					text: null
				},
				birthdayObj: {
					year: null,
					month: null,
					day: null
				},
				addressObj: {
					province: null,
					city: null,
				},
				collegeObj: {
					belongProvince: null,
					collegeName: null,
				},
				
				
				sexPicker: null,
				birthdayPicker: null,
				addressPicker: null,
				collegePicker: null,
				
				isOpenBottomSheet: false,

			}
		},
		computed: {
			sexStr: function() {
				return this.sexObj.text;
			},
			birthdayStr: function() {
				if(this.birthdayObj.year){
					return this.birthdayObj.year + '-' + this.birthdayObj.month + '-' + this.birthdayObj.day;
				}
				return '';
			},
			addressStr: function() {
				if(this.addressObj.province){
					if(this.addressObj.city){
						return this.addressObj.province + '-' + this.addressObj.city;
					}else{
						return this.addressObj.province;
					}
				}
				return '';
			},
			collegeStr: function() {
				return this.collegeObj.collegeName ? this.collegeObj.collegeName : '';
			}
		},
		componets: {},
		methods: {
			openSexPicker() {
				this.sexPicker.show();
			},
			openBirthdayPicker() {
				this.birthdayPicker.show();
			},
			openAddressPicker() {
				this.addressPicker.show();
			},
			openCollegePicker() {
				this.collegePicker.show();
			},
			saveUserEdit() {
				this.user.userSex = this.sexObj.value;
				this.user.userBirthday = this.birthdayStr;
				this.user.userAddress = this.addressStr;
				this.user.userSchool = this.collegeStr;
				util.cache.set('user', this.user);
				
				this.back();
			},
		},
		mounted() {
			this.user = util.cache.get('user');
			let user = this.user;
			if(user.userSex){
				if(user.userSex == 1){
					this.sexObj = {
						value: 1,
						text: '男',
					}
				}else{
					this.sexObj = {
						value: 2,
						text: '女',
					}
				}
			}
			if(user.userBirthday){
				let ymdArr = user.userBirthday.split('-');
				this.birthdayObj.year = ymdArr[0];
				this.birthdayObj.month = ymdArr[1];
				this.birthdayObj.day = ymdArr[2];
			}
			if(user.userAddress){
				let pcaArr = user.userAddress.split('-');
				this.addressObj.province = pcaArr[0];
				this.addressObj.city =  pcaArr[1];
			}
			if(user.userSchool){
				this.collegeObj.collegeName = user.userSchool;
			}
			
			//sex选择器
			this.sexPicker = util.ui.getSexPicker(this.sexObj);
			//birthday选择器
			this.birthdayPicker = util.ui.getBirthdayPicker(this.birthdayObj);
			//address选择器
			this.addressPicker = util.ui.getAddressPicker(this.addressObj);
			//college选择器
			this.collegePicker = util.ui.getCollegePicker(this.collegeObj);

		}
	}
</script>

<style scoped>
	.avatar-wrap {
		margin-top: 20px;
		text-align: center;
	}
	
	.avatar-img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		box-shadow: 0 0 0 2px white;
	}
	
	.input-item {
		background-color: white;
		width: 100%;
	}
	
	.input-item-label {
		width: 100px;
		float: left;
		height: 30px;
		line-height: 30px;
		letter-spacing: 2px;
	}
	
	.input-item-input {
		width: 30px;
		height: 30px;
		float: left;
		width: calc(100% - 100px);
		border: none;
		outline: none;
		background-color: transparent;
	}
</style>