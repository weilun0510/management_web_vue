<template>
  <div id="app">
    <router-view class="router"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      isLoading: state => state.common.isLoading,
      transitionName: state => state.common.direction
    })
  },
  mounted() {
    console.log(this.transitionName);
  },
  components: {}
};
</script>

<style lang="less">
@import "~@/assets/less/main.less";
</style>
