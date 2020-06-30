<template>
  <div class="application-tooltext">
    <div class="table-list">
      <vTable :columns="columns" :data="data" :hiddenPage="true"></vTable>
    </div>
    <!-- 修改自定义提示 -->
    <Modal
        v-model="modalVisible"
        title="修改到期提示"
        class-name="tip-wrap"
        @on-ok="onUpdate">
        <div class="v-flex">
          <div style="width: 100px; padding: 30px 0;">到期提示</div>
          <Input v-model="tipValue" />
        </div>
      </Modal>
  </div>
</template>

<script>
import { operationH } from '@/utils/index';

export default {
  components: {
  },
  data() {
    return {
      columns: [
        {
          title: '类型',
          key: 'type'
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
          render: (h, { row }) => {
            const operations = [
              {
                name: '修改',
                click: () => {
                  this.modalVisible = true
                  this.tipValue = row.message
                }
              }
            ]
            return operationH(h, { row }, operations)
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
