import LoadingComponents from './EzSuccess'

const loading = {
  install: function (Vue) {
    Vue.component('EzView', LoadingComponents)
  }
}

export default loading
