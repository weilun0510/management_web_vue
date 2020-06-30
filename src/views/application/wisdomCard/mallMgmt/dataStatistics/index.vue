<template>
  <div class="height100 mallMgmt-dataStatistics">
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class="content">
      <vActionBar :actions="actions"></vActionBar>
      <div class="tabs">
        <vCardTabs @onCardTabsChange="onCardTabsChange" :tabPaneList="tabPaneList"></vCardTabs>
      </div>
      <div class="table-wrap">
        <vTable :columns="columns" :data="data"></vTable>
      </div>
    </div>
  </div>
</template>

<script>
import { operationH } from '@/utils/index';
export default {
  components: {},
  data() {
    return {
      searchFormProps: {
        items: [
          {
            field: 'daterange',
            type: 'select',
            placeholder: '选择公司',
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
            field: 'type',
            type: 'year',
            placeholder: '年'
          },
          {
            field: 'type',
            type: 'month',
            placeholder: '月'
          },
          {
            field: 'type',
            type: 'date',
            placeholder: '日'
          },
          {
            field: 'type',
            type: 'input',
            placeholder: '成交额'
          }
        ]
      },
      actions: [
        { text: '导出', type: 'primary', onClick: this.onAdd },
        { text: '批量导出', onClick: this.onAdd }
      ],
      columns: [
        {
          title: '日期',
          key: 'name'
        },
        {
          title: '成交额(元)',
          key: 'cname'
        },
        {
          title: '所占比例',
          key: 'date1',
          render: (h, params) => {
            return h('i-progress', {
              props: {
                percent: 20
              }
            })
          }
        }
      ],
      data: {
        list: [
          {
            id: 1,
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
            status: 1
          },
          {
            id: 2,
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
            status: 1
          }
        ],
        page: {
          showtotal: true, // 是否显示总条数
          total: 100, // 总条数
          pageSize: 10 // 每页条数
        }
      },
      tabPaneList: [
        { label: '销售统计', name: 'cardTab1' },
        { label: '销售排行', name: 'cardTab2' },
        { label: '消费排行', name: 'cardTab3' }
      ]
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    onSubmit(searchFormRef, data) {
      console.log('data: ', data);
    },
    onCardTabsChange() {}
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
