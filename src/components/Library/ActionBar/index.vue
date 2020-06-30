<template>
    <div class="actionBar">
      <vButton v-for="(item, index) in actions" :key="index" :type="item.type" @click="item.onClick" :text="item.text" style="margin-right: 10px" />
    </div>
</template>
<script>
export default {
  props: {
    actions: {
      type: Array,
      default: () => ([
        {
          text: '',
          type: '',
          onClick: () => console.log(1)
        }
      ])
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
@import '~@/assets/less/main.less';
  .actionBar{
    height: 69px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid @line-color;
    background-color: #fff;
    padding: 0 18px;
  }
</style>