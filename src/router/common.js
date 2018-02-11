export default [{
  name: 'imgEdit',
  path: '/common/ImgEdit',
  meta: {
  	
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/common/ImgEdit')), 'imgEdit')
  }
}]
