export default [{
  name: 'myActivity',
  path: '/activity/myActivity',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/activity/myActivity')), 'myActivity')
  }
}]
