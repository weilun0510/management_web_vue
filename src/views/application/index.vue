<template>
  <div class="height100">
    <vTab :data='tabList' @handleClick="this.onTabsChange"></vTab>
    <list v-if="activeIndex === 0"></list>
    <tooltext v-else></tooltext>
  </div>
</template>

<script>
import list from './list/index'
import tooltext from './tooltext/index'

export default {
  components: {
    list,
    tooltext
  },
  data() {
    return {
      tabList: ['应用列表', '自定义提示'],
      activeIndex: 0
    };
  },
  methods: {
    onTabsChange(index) {
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
