export default [{
  name: 'myAssociation',
  path: '/association/myAssociation',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/association/MyAssociation')), 'myAssociation')
  }
}]
