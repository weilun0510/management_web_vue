<template>
  <div class="height100">
    <vTable
      :columns="columns"
      :data="data"
      >
    </vTable>
  </div>
</template>

<script>
import { operationH } from '@/utils/index';
export default {
  components: {},
  data() {
    return {
      actions: [
        { text: '+添加平台', type: 'primary', onClick: this.onAdd }
      ],
      columns: [
        {
          title: '公司名称',
          key: 'name'
        },
        {
          title: '应用类型',
          key: 'age'
        },
        {
          title: '到期时间',
          key: 'address'
        },
        {
          title: '主管理员',
          key: 'address'
        },
        {
          title: '操作',
          key: 'address',
          render: (h, params) => {
            console.log('params: ', params);
            const o = [
              {
                name: '进入企业',
                click: () => {
                  this.enterFirm()
                }
              },
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
  computed: {
  },
  mounted() {},
  methods: {
    setAction() {
      this.$router.push({ path: '/platform/detail' })
    },
    // 进入企业
    enterFirm(params) {
      alert('进入企业')
      window.location.href = 'https://dl.qscrm.com/#/login'
      console.log(params.row) 
    },
    onAdd() {
      alert('ADD')
    }
  }
};
</script>

