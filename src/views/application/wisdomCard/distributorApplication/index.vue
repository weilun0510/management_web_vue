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
            placeholder: '全部状态',
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
            placeholder: '姓名/手机/公司'
          }
        ]
      },
      columns: [
        {
          title: '编号',
          key: 'name'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'cname'
        },
        {
          title: '手机',
          key: 'date2'
        },
        {
          title: '职位',
          key: 'date1'
        },
        {
          title: '公司',
          key: 'type'
        },
        {
          title: '行业',
          key: 'date2'
        },
        {
          title: '未审核/已审核',
          key: 'status',
          render: (h, params) => {
            let status = params.row.status === 1 ? true : false;
            let _this = this;
            return h('i-switch', {
              props: {
                // 开关的值
                value: status
              },
              on: {
                'on-change': value => {
                  params.row.status = value ? 1 : 0;
                  _this.onSwitchChange(params.row.status);
                }
              }
            });
          }
        },
        {
          title: '添加时间',
          key: 'address2'
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
