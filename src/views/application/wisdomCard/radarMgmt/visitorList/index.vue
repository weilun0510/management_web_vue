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
            placeholder: '不按时间',
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
            field: 'daterange',
            type: 'daterange',
            placeholder: '选择日期'
          },
          {
            field: 'type',
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
            field: 'keyword',
            type: 'input',
            placeholder: '微信名/手机号/用户名/推荐人'
          }
        ]
      },
      columns: [
        {
          title: '排序',
          key: 'name'
        },
        {
          title: '微信',
          key: 'name',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: ''
                },
                style: {
                  width: '56px',
                  height: '56px',
                  margin: '10px 0'
                }
              }),
              h('span', {
                style: {
                  display: 'inline-block',
                  margin: '27px 0 0 10px'
                }
              }, 'a哈哈哈哈哈')
            ],)
          }
        },
        {
          title: '授权电话',
          key: 'cname'
        },
        {
          title: '用户名',
          key: 'date1'
        },
        {
          title: '推荐人',
          key: 'date2'
        },
        {
          title: '被浏览次数',
          key: 'type'
        },
        {
          title: '最后访问时间',
          key: 'date2'
        },
        {
          title: '操作',
          key: 'address',
          render: (h, params) => {
            const o = [
              {
                name: '更多',
                click: () => {
                  this.$router.push('/application/wisdomCard/radarMgmt/visitorListMore')
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
            date: '2016-10-03',
            status: 1
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
