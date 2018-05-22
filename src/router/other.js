export default [{
  name: 'homeSearch',
  path: '/other/homeSearch',
  meta: {},
  component: (resovle) => {
    require.ensure([], () => resovle(require('@/components/other/HomeSearch')), 'homeSearch')
  }
}, {
  name: 'test',
  path: '/other/test',
  meta: {},
  component: (resovle) => {
    require.ensure([], () => resovle(require('@/components/other/Test')), 'test')
  }
}]
