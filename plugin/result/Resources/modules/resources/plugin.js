/* eslint-disable */

import {registry} from '#/main/app/plugins/registry'

registry.add('result', {
  resources: {
    'claroline_result': () => { return import(/* webpackChunkName: "plugin-result-resource-result" */ '#/plugin/result/resources/results') }
  }
})
