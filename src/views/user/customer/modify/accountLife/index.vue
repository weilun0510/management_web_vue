<template>
  <div class="contentWrap">
    <div class="table-list">
      <vTable :columns="columns" :data="data" :hiddenPage="true"></vTable>
    </div>
    <vModal
      :visible="showModal"
      title="修改天数"
      @onOk="onUpdate"
      @onCancel="onCancel"
    >
      <DatePicker type="date" v-model="additional" @on-change="onAdditionalChange" placeholder="请选择日期" style="width: 100%" ></DatePicker>
      <div style="font-size: 14px;font-weight: 500;text-align: right;margin-top: 14px;">
        到期时间: {{ this.$moment(this.customerDetailInfo.expireDate).format('YYYY-MM-DD') }}
      </div>
    </vModal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { operationH } from '@/utils/index';
import { isObject } from 'lodash';
export default {
  props: {},
  components: {},
  data() {
    return {
      permissionsModeGroup: 1,
      permissionsModeGroupData: [
        {
          value: 1,
          label: 1
        },
        {
          value: 2,
          label: 2
        }
      ],
      columns: [
        {
          title: '初始设定天数',
          key: 'validity'
        },
        {
          title: '附加天数',
          key: 'additionalDay'
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
                  this.showModal = true
                }
              }
            ]
            return operationH(h, { row }, operations)
          }
        }
      ],
      additional: null, // 附加日期/天数
      showModal: false
    };
  },
  computed: {
    ...mapState({
      customerDetailInfo: state => state.user.customerDetailInfo
      
    }),
    data: function() {
      // `this` 指向 vm 实例
      return {
        list: [
          {
            validity: this.customerDetailInfo.validity,
            additionalDay: this.customerDetailInfo.additionalDay
          }
        ],
        page: {}
      }
    }
  },
  mounted() {
    this.customerDetail({ id: this.$route.query.customerId })
  },
  methods: {
    ...mapActions([
      'customerDetail',
      'userModify'
    ]),
    onSubmit() {
      console.log('form: ', this.form);
      console.log(this.customPermissions);
      this.showModal = true;
    },
    onAdditionalChange(q) {
      console.log('q: ', q);

    },
    onUpdate() {
      // this.additional
      console.log('this.additional: ', typeof this.additional, this.additional);
      let params = {
        customerId: this.$route.query.customerId
      }
      if (isObject(this.additional)) {
        params.additionalDate = this.$moment(this.additional).format('YYYY-MM-DD')
        params.expireDate = this.$moment(this.customerDetailInfo.expireDate).format('YYYY-MM-DD')
      } else {
        this.$Message.warning('请选择日期')
        return;
        // params.additionalDay = this.additional
      }

      console.log('params: ', params);
      this.userModify(params).then(res => {
        console.log('res: ', res);
        if (res.code === '200') {
          this.$Message.success(res.msg)
          this.customerDetail({ id: this.$route.query.customerId })
        }
      })
      this.onCancel();
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
