<template>
  <div class="height100">
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class="content">
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
            field: 'type',
            type: 'select',
            placeholder: '用户类型',
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
            placeholder: '用户状态',
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
            placeholder: '公司名称/用户名/手机号' 
          }
        ]
      },
      columns: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '公司名称',
          key: 'cname'
        },
        {
          title: '注册时间',
          key: 'date1'
        },
        {
          title: '到期时间',
          key: 'date2'
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '操作',
          key: 'address',
          render: (h, params) => {
            const o = [
              {
                name: '恢复',
                click: function() {
                  console.log(1)
                }
              },
              {
                name: '删除',
                click: function() {
                  console.log(2)
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
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          }
        ],
        page: {
          showtotal: true, // 是否显示总条数
          total: 100, // 总条数
          pageSize: 10 // 每页条数
        }
      }
    };
  },
  computed: {},
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
  },
  methods: {
    onSubmit(searchFormRef, data) {
      console.log('data: ', data);
      // console.log('searchFormRef: ', searchFormRef);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
