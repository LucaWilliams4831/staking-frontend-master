<template>
  <div class="container">
    <div class="row row-sm-revers">
      <div>
        <SpStaking/>
      </div>
    </div>
  </div>
</template>
<script>
import {SpStaking } from '../components'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Staking',

  components: {SpStaking},

  setup() {
    // store
    let $s = useStore()

    // computed
    let address = computed(() => $s.getters['common/wallet/address'])

    return {
      address
    }
  }
}
</script>

<style scoped>

.col {
  flex-grow: 1;
  padding: 20px;
}
</style>
