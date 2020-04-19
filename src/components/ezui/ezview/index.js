import LoadingComponents from './EzView'

const loading = {
  install: function (Vue) {
    Vue.component('EzView', LoadingComponents)
  }
}

export default loading
