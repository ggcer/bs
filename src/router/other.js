export default [{
  name: 'homeSearch',
  path: '/other/homeSearch',
  meta: {},
  component: (resovle) => {
    require.ensure([], () => resovle(require('@/components/other/HomeSearch')), 'homeSearch')
  }
}, {
  name: 'webView',
  path: '/other/webView',
  meta: {},
  component: (resovle) => {
    require.ensure([], () => resovle(require('@/components/other/WebView')), 'webView')
  }
}, {
  name: 'test',
  path: '/other/test',
  meta: {},
  component: (resovle) => {
    require.ensure([], () => resovle(require('@/components/other/Test')), 'test')
  }
}, {
  name: 'rh',
  path: '/other/rh',
  meta: {},
  component: (resovle) => {
    require.ensure([], () => resovle(require('@/components/other/Rh')), 'rh')
  }
}]
