<template>
  <Drawer
    :title="title"
    :value.sync="visible"
    :width="width"
    :maskClosable="true"
    :before-close="onBeforeClose"
    :styles="styles"
  >
    <slot></slot>
    <div v-if="!hiddenFooter" class="demo-drawer-footer flex_dom flex_item_mid">
        <vButton @click="onSubmit" text="提交" type="primary" :isForm="true" class="mr20"></vButton>
        <vButton @click="onCancel" text="取消" :isForm="true"></vButton>
    </div>
  </Drawer>   
</template>

<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean
    },
    title: {
      type: String,
      required: true
    },
    maskClosable: {
      //  详情抽屉可自动关闭， 背景灰色， 
      type: Boolean,
      default: true
    },
    hiddenFooter: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      required: false,
      default: 760
    }
  },
  data() {
    return {
      styles: {
        height: this.hiddenFooter ? 'calc(100%)' : 'calc(100% - 55px)',
        overflow: 'scroll',
        background: this.hiddenFooter ? '#F5F7F9' : '#fff',
        position: 'static',
        padding: '0 0 53px 0'
      }
    }
  },
  methods: {
    onBeforeClose() {
      if (this.maskClosable) {
        this.$emit('onCancel')
        return;
      }
      return new Promise((resolve, reject) => {
        this.$Modal.confirm({
          title: '提示',
          content: '是否取消修改',
          // 关闭内容
          onOk: () => {
            this.$emit('onCancel')
          },
          // 拒接关闭
          onCancel: () => {
            console.log('cancel update');
          }
        })
      })
    },
    //  自定义提交事件
    onSubmit() {
      // this.$Modal.confirm({
      //   title: '提示',
      //   content: '是否取消修改',
      //   // 关闭内容
      //   onOk: () => {
      //     this.$emit('onCancel')
      //   },
      //   // 拒接关闭
      //   onCancel: () => {
      //     console.log('cancel update');
      //   }
      // })
      this.$emit('onSubmit')
    },
    // 自定义取消按钮
    onCancel() {
      // this.$emit('onCancel')
      this.$Modal.confirm({
        title: '提示',
        content: '是否取消修改',
        // 关闭内容
        onOk: () => {
          this.$emit('onCancel')
        },
        // 拒接关闭
        onCancel: () => {
          console.log('cancel update');
        }
      })
    }
  },
  created() {
    console.log(this.title)
  }
}
</script>

<style lang="less">
.demo-drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    background: #fff;
    justify-content: flex-end;
}
</style>