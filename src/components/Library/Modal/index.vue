<style>
  .ivu-modal-header{
    padding: 16px 24px;
    border-bottom: 0;
  }
  .ivu-modal-body{
    padding: 24px;
  }
  .ivu-modal-footer{
    border-top: 0;
    padding: 16px 24px;
  }
  .ivu-modal-footer .ivu-btn-text{
      border-color: #2d8cf0;
      color: #2d8cf0;
  }
</style>
<template>
  <div>
    <!-- :style="{height: height, overflow: 'auto'}" -->
    <Modal
      v-model="isOpen"
      :title="title"
      :class-name="className"
      :loading="loading"
      @on-ok="onOk"
      @on-cancel="onCancel">
      <slot></slot>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: String
    },
    visible: {
      type: Boolean
    },
    title: {
      type: String
    },
    className: {
      type: String
    },
    okText: {
      type: String,
      default: '确认'
    },
    loading: {
      type: Boolean // 点击确定按钮对话框不会自动消失，并显示 loading 状态，需要手动关闭对话框，常用于表单提交
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
    isOpen: {
      get() {
        return this.visible
      },
      set(val) {}
    }
  },
  methods: {
    onOk() {
      this.$emit('onOk')
    },
    onCancel() {
      this.$emit('onCancel')
    }
  }
}
</script>