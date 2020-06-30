<template>
    <div class="select-wrap v-flex flex_dom">
      <Select :placeholder="placeholder">
        <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String
    },
    options: {
      type: Array,
      default: () => ({
        value: String,
        label: String
      })
    }
  },
  methods: {
    
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/less/main.less';
  .select-wrap {
    .ivu-select {
      width: 100%;
    }
  }
</style>