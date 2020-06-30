<template>
  <div class="cardTabsWrap">
    <Tabs @on-click="onCardTabsChange" type="card">
      <TabPane 
        v-for="(item, index) in tabPaneList" 
        :label="item.label" 
        :name="item.name"
        :key="`element${index}`">
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  props: {
    tabPaneList: {
      type: Array,
      default: () => [{ label: '', name: '' }]
    }
  },
  methods: {
    onCardTabsChange(name) {
      this.$emit('onCardTabsChange', name)
    }
  }
}
</script>
<style lang="less" scope>
.cardTabsWrap{
  // padding: 20px 0 10px 18px;
  background-color: #fff;
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar{
    margin-bottom: 0;
  }
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
    padding: 5px 55px 4px 15px;
    background: #E4EEF9;
  }
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active{
    background: #fff;
  }
}
</style>