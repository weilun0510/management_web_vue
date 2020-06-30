<template>
  <div class="contentWrap">
    <div class="content height100" style="overflow: auto">
      <div class="height100">
        <vTable :data="data" :columns="columns" :autoHeight="true" :hiddenPage="true"></vTable>
      </div>
    </div>
    <vModal
      :visible="showModal"
      title="修改天数"
      @onOk="onUpdate"
      @onCancel="onCancel"
    >
      <!-- <Select v-model="permissionsModeGroup" placeholder="请输入数字或者选择日期">
        <Option v-for="item in permissionsModeGroupData" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> -->
      <DatePicker v-model="permissionsModeGroup" type="date" placeholder="请输入数字或者选择日期" style="width: 100%"></DatePicker>
      <div style="color: #3189F5;font-size: 14px;font-weight: 500;text-align: right;margin-top: 14px;">
        到期时间: 2019-09-09
      </div>
    </vModal>
  </div>  
</template>

<script>
import { operationH } from '@/utils/index';
export default {
  components: {},
  data() {
    return {
      data: {
        list: [
          {
            cname: 'name1',
            date1: 'New York No. 1 Lake Park'
          },
          {
            cname: 'name1',
            date1: 'New York No. 1 Lake Park'
          },
          {
            cname: 'name1',
            date1: 'New York No. 1 Lake Park'
          }
        ],
        page: {}
      },
      columns: [
        {
          title: '账户使用期限（有效天数）',
          key: 'cname'
        },
        {
          title: '附加天数',
          key: 'date1'
        },
        {
          title: '操作',
          key: 'address',
          render: (h, params) => {
            const o = [
              {
                name: '修改',
                click: () => {
                  this.showModal = true;
                }
              }
            ]
            return operationH(h, params, o)
          }
        }
      ],
      showModal: false
    };
  },
  computed: {},
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
  },
  methods: {
    onUpdate() {
      this.onCancel();
      console.log('确认');
    },
    onCancel() {
      this.showModal = false;
      console.log('取消');
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
