<template>
  <div class="table-wrap">
    <vActionBar :actions="actions" />
    <div class="table mt18">
      <div class='tableItem' ref='table' >
        <Table :columns="columns1" :data="data1" :height='tableHeight' ></Table>
      </div>
      <div class='page mt18'>
        <Page :total="100" show-total />
      </div>
    </div>
    <Modal
      v-model="adminPopup"
      title="添加管理员"
      @on-ok="asyncOK">
      <Form :model="form" :label-width="80">
        <FormItem label="Input">
            <Input v-model="form.input" placeholder="请输入管理员用户名"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import icon from '@/assets/images/enter.png'
// import setting from '@/assets/images/setting.png';
import enter from '@/assets/images/enter.png';
import reveice from '@/assets/images/huifu.png';
// import del from '@/assets/images/delete.png';
import { Table } from '@/utils/mixin'
export default {
  components: {},
  mixins: [Table],
  data() {
    return {
      actions: [
        { text: '+添加管理员', type: 'primary', onClick: this.addAdmin }
      ],
      icon,
      form: {
        input: ''
      },
      adminPopup: false, // 添加管理员弹窗
      list: [
        '基本信息',
        '管理员',
        '操作员',
        '操作日志'
      ],
      columns1: [
        {
          title: '权限',
          key: 'name'
        },
        {
          title: '用户名',
          key: 'age'
        },
        {
          title: '账户到期时间',
          key: 'address'
        },
        {
          title: '操作',
          key: 'address',
          render: (h, params) => {
            return h('div', [
              h('span', [
                h('img', {
                  attrs: {
                    src: !this.activeIndex ? enter : reveice
                  },
                  style: {
                    marginTop: '3px',
                    marginRight: '3px'
                  }
                }),
                h('span', {
                  style: {
                    color: '#308EF3',
                    paddingRight: '30px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      console.log({ params })
                      console.log('进入企业')
                      if (params.index % 2 === 0) {
                        this.update()
                      } else {
                        this.delAction()
                      }
                    }
                  }
                }, params.index % 2 === 0 ? '修改' : '删除')
              ])
              // h('span', [
              //   h('img', {
              //     attrs: {
              //       src: !this.activeIndex ? setting : del
              //     },
              //     style: {
              //       marginTop: '3px',
              //       marginRight: '3px'
              //     }
              //   }),
              //   h('span', {
              //     style: {
              //       color: '#308EF3',
              //       cursor: 'pointer'
              //     },
              //     on: {
              //       click: () => {
              //         console.log('进入管理设置')
              //         if (this.activeIndex) {
              //           this.delAction()
              //         } else {
              //           this.setAction()
              //         }
              //       }
              //     }
              //   }, !this.activeIndex ? '管理设置' : '删除')
              // ])
            ]);
          }
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    };
  },
  computed: {},
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
    // this.$nextTick(() => {
    //   this.tableHeight = this.$refs.table.offsetHeight - 20
    // })
  },
  methods: {
    asyncOK() {
      alert('ok')
    },
    addAdmin() {
      this.adminPopup = true
    },
    delAction(index) {
      this.$Modal.confirm({
        title: '提示',
        content: '确认删除该管理员',
        okText: '确认',
        onOk: () => {
          this.$Message.info('Clicked ok');
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel');
        }
      });
      console.log(index)
    },
    update() {
      alert('修改')
    }
  }
};
</script>

<style lang="less" scoped>
@import "../index.less";
.table-wrap{
  height: 100%;
  .table{
    height: calc(100% - 32px - 18px);
    .tableItem{
      height: calc(100% - 33px)
    }
    .page{
      text-align: right;
    }
  }
}
</style>
