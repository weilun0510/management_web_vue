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
            placeholder: '操作类型',
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
            placeholder: '操作员用户名'
          }
        ]
      },
      columns: [
        {
          title: 'ID',
          key: 'name'
        },
        {
          title: '操作员',
          key: 'name'
        },
        {
          title: '类型',
          key: 'cname'
        },
        {
          title: '操作内容',
          key: 'date2'
        },
        {
          title: '操作IP',
          key: 'date1'
        },
        {
          title: '操作时间',
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
