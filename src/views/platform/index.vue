<template>
  <div class="height100">
    <vTab :data='tabList' @handleClick="this.clickItem"></vTab>
    <div style="height: calc(100% - 53px);">
      <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
      <div class="content">
        <list v-if="activeIndex === 0" />
        <recycleBin v-else />
      </div>
    </div>
  </div>
</template>

<script>
import list from './list';
import recycleBin from './recycleBin';
export default {
  components: {
    list,
    recycleBin
  },
  data() {
    return {
      searchFormProps: {
        items: [
          {
            field: 'type',
            type: 'select',
            placeholder: '应用类型',
            label: 'label',
            value: 'value',
            options: [
              {
                value: 1,
                label: 22
              },
              {
                value: 2,
                label: 3
              }
            ]
          },
          {
            field: 'timesort',
            type: 'select',
            placeholder: '创建时间正序',
            options: [
              {
                value: 1,
                label: 22
              },
              {
                value: 2,
                label: 3
              }
            ]
          },
          {
            field: 'keyword',
            type: 'input',
            placeholder: '搜索' 
          }
        ],
        actions: [
          { type: 'primary', text: '查询' },
          { text: '重置' }
        ]
        // onGetFormRef: this.onGetFormRef

      },
      tabList: ['平台列表', '回收站'],
      activeIndex: 0
    };
  },
  computed: {},
  mounted() {},
  methods: {
    clickItem(index) {
      this.activeIndex = index;
    },
    onSubmit(searchFormRef, data) {
      console.log('data: ', data);
      console.log('searchFormRef: ', searchFormRef);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
