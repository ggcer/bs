export default [{
  name: 'loginAndRegister',
  path: '/user/loginAndRegister',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/user/LoginAndRegister')), 'loginAndRegister')
  }
},{
  name: 'userInfo',
  path: '/user/userInfo',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/user/UserInfo')), 'userInfo')
  }
},{
  name: 'userQrcode',
  path: '/user/userQrcode',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/user/UserQrcode')), 'userQrcode')
  }
},{
  name: 'userEdit',
  path: '/user/userEdit',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/user/UserEdit')), 'userEdit')
  }
},{
  name: 'userSet',
  path: '/user/userSet',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/user/UserSet')), 'userSet')
  }
},{
  name: 'userHeadImg',
  path: '/user/userHeadImg',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/user/UserHeadImg')), 'userHeadImg')
  }
}]
