<style>
  .confimModal .ivu-modal-header{
    padding: 16px 24px;
    border-bottom: 0;
  }
  .confimModal .ivu-modal-content{
    min-height: 152px;
  }
  .confimModal .ivu-modal-body{
    padding: 30px 24px 24px;
  }
  .confimModal .ivu-modal-footer{
    border-top: 0;
    padding: 16px 24px;
    text-align: center;
  }
  .confimModal .ivu-btn-text{
    border-color: #2d8cf0;
    color: #2d8cf0;
    margin-right: 30px;
  }
  .confimModal{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .confimModal .ivu-modal{
    top: 0;
  }
</style>
<template>
  <Modal
    v-model="isOpen"
    class-name="confimModal"
    :closable="false"
    width="320"
    @on-ok="onOk"
    @on-cancel="onCancel"
    >
    <div class="v-flex text">
      {{text}}
    </div>
  </Modal>
</template>
<script>
export default {
  props: {
    visible: {
      // 是否显示
      type: Boolean
    },
    text: {
      // 提示内容
      type: String
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
    onOk(w) {
      this.$emit('onOk')
    },
    onCancel() {
      this.$emit('onCancel')
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/less/main.less';
.text{
  .sc(16px, #3C404B);
  font-weight: 500;
}
</style>