export default [{
  name: 'myAssociation',
  path: '/association/myAssociation',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/association/MyAssociation')), 'myAssociation')
  }
},{
  name: 'associationHome',
  path: '/association/associationHome',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/association/AssociationHome')), 'associationHome')
  }
},{
  name: 'associationQrcode',
  path: '/association/associationQrcode',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/association/associationQrcode')), 'associationQrcode')
  }
},{
  name: 'associationDetail',
  path: '/association/associationDetail',
  meta: {
  },
  component: (resovle) => { 
  	require.ensure([], () => resovle(require('@/components/association/associationDetail')), 'associationDetail')
  }
}]
