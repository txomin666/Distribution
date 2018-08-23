/* eslint-disable */

import {registry} from '#/main/app/plugins/registry'

registry.add('bbb', {
  resources: {
    'claroline_big_blue_button': () => { return import(/* webpackChunkName: "plugin-bbb-resource" */ '#/plugin/big-blue-button/resources/bbb') }
  }
})
