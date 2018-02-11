export default [{
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
