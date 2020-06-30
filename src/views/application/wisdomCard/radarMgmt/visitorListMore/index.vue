<template>
  <div class="height100 visitorListMore">
    <div class="back" @click="$router.back()">
      <img src="@/assets/images/back.png" alt="">
      <div class="text">返回</div>
    </div>
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class="content">
      <div class="table-wrap">
        <vTable :columns="columns" :data="data"></vTable>
      </div>
    </div>
    <vModalDetail 
      :visible.sync="detailVisible" 
      title="员工信息"
      :items="items">
    </vModalDetail>
  </div>
</template>

<script>
import { operationH } from '@/utils/index';
import img1 from '@/assets/images/logo.png';

export default {
  components: {},
  data() {
    return {
      detailVisible: false,
      items: [
        {
          type: 'img',
          value: img1
        },
        {
          name: '姓名',
          value: '123212321232123212321232123212321232123212321232'
        },
        {
          name: '性别',
          value: '1232'
        },
        {
          name: '手机号',
          value: '1232'
        },
        {
          name: '微信号',
          value: '1232'
        },
        {
          name: '邮箱',
          value: '1232'
        },
        {
          name: '公司名称',
          value: '1232'
        },
        {
          name: '职位',
          value: '1232'
        },
        {
          name: '公司地址',
          value: '1232'
        }
      ],
      searchFormProps: {
        items: [
          {
            field: 'type',
            type: 'select',
            placeholder: '全部人员',
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
          title: '公司名称',
          key: 'name'
        },
        {
          title: '用户',
          key: 'name',
          render: (h, { row }) => {
            return h('span', {
              style: {
                color: '#2db7f5',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.onCheckDetail(row.id)
                }
              }
            }, row.name)
          }
        },
        {
          title: '类型',
          key: 'cname'
        },
        {
          title: '操作内容',
          key: 'date1'
        },
        {
          title: '操作时间',
          key: 'date2'
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
    },
    onCheckDetail() {
      this.detailVisible = true
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>