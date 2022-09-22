<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <SpMyToken />
      </div>
      <div class="col-md-12">
        <SpValidatorList />
      </div>
    </div>
  </div>
</template>

<script>
import { SpMyToken, SpValidatorList } from '../starportvue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Portfolio',

  components: { SpMyToken, SpValidatorList },

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
.row {
  display: flex;
  flex-wrap: wrap;
}

.col {
  flex-grow: 1;
  padding: 20px;
}
</style>
