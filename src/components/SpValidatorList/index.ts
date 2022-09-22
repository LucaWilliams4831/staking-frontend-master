import { App as Application } from 'vue'

import { registerComponent } from '../../utils/plugins/index'
// @ts-ignore
import SpValidatorList from './SpValidatorList.vue'

export const Plugin = {
  install(vue: Application): void {
    registerComponent(vue, SpValidatorList)
  }
}

export default SpValidatorList
