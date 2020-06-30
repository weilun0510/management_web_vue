<template>
  <div>
    <Button v-if="isForm" :type="type" @click="onClick()" class="form">{{text}}</Button>
    <Button v-else :type="type" @click="onClick()">{{text}}</Button>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'default'
    },
    click: {
      type: Function
    },
    isForm: {
      // 是否是表单按钮
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="less" scope>
.form{
  width: 104px;
}
.ivu-btn-default{
  // border-color: #2d8cf0;
  // color: #2d8cf0;
}
</style>