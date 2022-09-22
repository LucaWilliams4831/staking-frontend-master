import { App as Application } from 'vue'

import { registerComponent } from '../../utils/plugins/index'
// @ts-ignore
import SpMyToken from './SpMyToken.vue'

export const Plugin = {
  install(vue: Application): void {
    registerComponent(vue, SpMyToken)
  }
}

export default SpMyToken
