<style>
  /* .tip-wrap .ivu-modal-header{
    border-bottom: 0;
  }
  .tip-wrap .ivu-modal-header .tip{
    width: 100px;
  }
  .tip-wrap .ivu-modal-footer{
    border-top: 0;
  } */
</style>
<template>
  <div class="application-tooltext">
    <div class="table-list">
      <vTable :columns="columns" :data="data" :hiddenPage="true"></vTable>
    </div>
    <!-- 修改自定义提示 -->
    <vModal
        :visible="modalVisible"
        title="修改到期提示"
        @onOk="onUpdate"
        @onCancel="onCancel">
        <div class="v-flex">
          <div style="width: 100px; padding: 30px 0;">到期提示</div>
          <Input v-model="tipValue" />
        </div>
      </vModal>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.png';
import { operationH } from '@/utils/index';

export default {
  components: {
  },
  data() {
    return {
      columns: [
        {
          title: '应用类型',
          key: 'apptype',
          render: (h, { row }) => {
            return h('div', {
              style: {
                display: 'flex',
                alignItems: 'center'
              }
            }, [
              h('img', {
                attrs: {
                  src: logo
                },
                style: {
                  width: '24px',
                  height: '24px'
                }
              }),
              h('span', {
                attrs: {
                  src: logo
                }
              }, row.apptype)
            ])
          }
        },
        {
          title: '到期提示',
          key: 'message'
        },
        {
          title: '状态',
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
          title: '操作',
          key: 'operation',
          width: 200,
          render: (h, params) => {
            const o = [
              {
                name: '编辑',
                click: () => {
                  this.modalVisible = true
                  this.tipValue = params.row.message
                }
              }
            ]
            return operationH(h, params, o);
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
      },
      modalVisible: false,
      tipValue: ''
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    onUpdate() {
      console.log('this.tipValue', this.tipValue)
      this.onCancel()
    },
    onCancel() {
      this.modalVisible = false;
    },
    onSwitchChange(status) {
      console.log('status: ', status);
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
