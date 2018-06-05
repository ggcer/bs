export default [{
  name: 'payList',
  path: '/pay/payList',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/pay/PayList')), 'payList')
  }
},{
  name: 'payDetail',
  path: '/pay/payDetail',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/pay/PayDetail')), 'payDetail')
  }
},{
  name: 'payResult',
  path: '/pay/payResult',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/pay/PayResult')), 'payResult')
  }
},{
  name: 'payResultDetail',
  path: '/pay/payResultDetail',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/pay/PayResultDetail')), 'payResultDetail')
  }
}]
