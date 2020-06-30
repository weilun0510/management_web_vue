<template>
    <div class="input-wrap">
        <Input :placeholder="placeholder" :value='value' @input='change' suffix="ios-search" />
    </div>
</template>
<script>
export default {
  props: ['placeholder', 'value', 'name'],
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    change(val) {
      console.log(val)
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/less/main.less';
  .input-wrap {
    .ivu-input-wrapper {
      width: 100%;
    }
  }
</style>