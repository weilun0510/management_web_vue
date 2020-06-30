<template>
  <div class="application-list">
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class="table-list">
      <vTable :columns="columns" :data="data" :hiddenPage="true"></vTable>
    </div>
  </div>
</template>

<script>
import { operationH } from '@/utils/index';
export default {
  data() {
    return {
      searchFormProps: {
        items: [
          {
            field: 'letter',
            type: 'input',
            placeholder: '按字母筛选（全部）' 
          },
          {
            field: 'type',
            type: 'select',
            placeholder: '应用类型',
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
        ]
      },
      columns: [
        {
          title: '名称/版本',
          key: 'name'
        },
        {
          title: '应用类型',
          key: 'age'
        },
        {
          title: '说明',
          key: 'address'
        },
        {
          title: '操作',
          key: 'address',
          width: 200,
          render: (h, params) => {
            const o = [
              {
                name: '管理设置',
                click: () => {
                  this.setAction()
                }
              }
            ]
            return operationH(h, params, o)
          }
        }
      ],
      data: {
        list: [
          {
            name: 'John Brown',
            age: 188,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          }
        ],
        page: {}
      }
    };
  },
  computed: {},
  mounted() {
    
  },
  methods: {
    onSubmit(searchFormRef, data) {
      console.log('data: ', data);
      console.log('searchFormRef: ', searchFormRef);
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
