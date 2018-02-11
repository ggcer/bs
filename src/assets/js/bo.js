//数据传输bo
const bo = {
	user: {
		//数据库记录
		userId: null,					//用户ID
		userName: null,					//用户名
		userAge: null,					//用户年龄
		userSex: null,					//用户性别	1:男 2:女
		userPhone: null,				//用户手机
		userBirthday: null,				//用户生日
		userAddress: null,				//用户地址
		userSchool: null,				//用户所在大学
		userEmail: null,				//用户邮箱
		userInfo: null,					//用户个性签名
		userHeadImg: null,				//用户头像
		userBgImg: null,				//用户背景图片
		userCreateTime: null,			//用户创建时间
		userUpdateTime: null,			//用户更新时间
		userEntrancerTime: null,		//用户入学时间
		userType: null,					//用户类型	1:学生2:赞助商
		userRoles: null,				//用户权限	ROLE_*
		
		//登录token
		accessToken: null,				//访问令牌accessToken
		refreshToken: null,				//更新令牌refreshToken
		tokenType: null,				//auth前缀 tokenType
		
		//本地记录
		searchRecord: [],				//搜索历史记录
		isEnableAppNotice: true,		//是否开启引用提醒
		isEnableBackgroundMode: false,	//是否开启后台模式
		MASortField: 'RECENTLY_VIEWED',	//我的社团列表排序字段
		MASortType:	'-',				//我的社团列表排序方式， '-'为降序，''为升序
		isMAGrid: true,					//我的社团列表是否为网格展示		
	}
}
export default bo