<template>
  <div class="height100">
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class="content">
      <vActionBar :actions="actions"></vActionBar>
      <div class="table-wrap">
        <vTable :columns="columns" :data="userList" @page-change="onPageChange"></vTable>
      </div>
    </div>
    <vModalDetail 
      :visible.sync="detailVisible" 
      title="提现详情"
      :fill="false"
      :items="items">
    </vModalDetail>
    <vModal
      :visible="applyForVisible"
      title="同意申请"
      @onOk="onConfimApplyFor"
      @onCancel="onCancelApplyFor">
      <div class="applyForItem flex_dom flex_item_mid">
        <div class="field">打款金额(元)</div>
        <Input v-model="plyForForm.money" type="number" placeholder="最高为900.00元"></Input>
      </div>
      <div class="applyForItem flex_dom flex_item_mid mt20">
        <div class="field">备注说明</div>
        <Input v-model="plyForForm.remark"></Input>
      </div>
    </vModal>
    <vModal
      :visible="refuseVisible"
      title="拒绝申请"
      :loading="loading"
      @onOk="onConfimRefuse"
      @onCancel="onCancelRefuse">
      <Form ref="refuseRef" :model="refuseForm" :rules="refuseRules" :label-width="80">
        <FormItem label="拒绝原因" prop="reason">
            <Input v-model="refuseForm.reason" on></Input>
        </FormItem>
      </Form>
    </vModal>
  </div>
</template>

<script>
import { operationH } from '@/utils/index';
import { mapActions, mapState } from 'vuex';
export default {
  components: {},
  data() {
    return {
      searchFormProps: {
        items: [
          {
            field: 'daterange',
            type: 'daterange',
            placeholder: '选择日期'
          },
          {
            field: 'type',
            type: 'select',
            placeholder: '状态',
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
            placeholder: '输入关键词'
          }
        ]
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '提现单号',
          key: 'userName'
        },
        {
          title: '微信',
          key: 'companyName'
        },
        {
          title: '姓名',
          key: 'created'
        },
        {
          title: '手机号',
          key: 'expireDate'
        },
        {
          title: '公司名称',
          key: 'expireDate'
        },
        {
          title: '金额',
          key: 'expireDate'
        },
        {
          title: '状态',
          key: 'expireDate'
        },
        {
          title: '操作',
          key: 'address',
          render: (h, params) => {
            const o = [
              {
                name: params.row.customerId === 6 ? '审核' : '详情',
                click: () => {
                  this.onCheckDetail()
                  // if (params.row.customerId === 6) {
                  //   this.onAudit()
                  // } else {
                  //   this.onCheckDetail()
                  // }
                }
              }
            ]
            return operationH(h, params, o)
          }
        }
      ],
      items: [
        {
          name: '提现单号',
          value: '123212321232123212321232123212321232123212321232'
        },
        {
          name: '申请状态',
          value: '申请成功',
          color: '#308EF3'
        },
        {
          name: '微信名',
          value: '1232'
        },
        {
          name: '会员名称',
          value: '1232'
        },
        {
          name: '手机号',
          value: '1232'
        },
        {
          name: '公司名称',
          value: '123212321232123212321232123212321232123212321232'
        },
        {
          name: '申请金额(元)',
          value: '1232'
        },
        {
          name: '抽成后金额(元)',
          value: '1232'
        },
        {
          name: '抽成比例',
          value: '1232'
        },
        {
          name: '付款方式',
          value: '1232'
        },
        {
          name: '申请时间',
          value: '1232'
        },
        {
          name: '审核时间',
          value: '1232'
        },
        {
          name: '申请',
          type: 'button',
          buttonProps: {
            text: '通过申请',
            type: 'primary',
            iForm: true,
            onClick: () => {
              this.applyForVisible = true
              this.detailVisible = false
            }
          }
        },
        {
          name: '拒绝',
          type: 'button',
          buttonProps: {
            text: '拒绝申请',
            iForm: true,
            onClick: () => {
              this.refuseVisible = true
              this.detailVisible = false
            }
          }
        }
      ],
      detailVisible: false,
      customerId: '',
      actions: [
        { text: '导出', type: 'primary', onClick: () => alert(1) },
        { text: '批量导出', onClick: () => alert(2) }
      ],
      applyForVisible: false, // 同意申请
      plyForForm: {
        money: '',
        remark: ''
      },
      refuseVisible: false, // 拒绝申请
      refuseForm: {
        reason: ''
      },
      refuseRules: {
        reason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' }
        ]
      },
      loading: true
    };
  },
  computed: mapState({
    userList: state => state.user.userList
  }),
  mounted() {
    // this.getUserList();
  },
  methods: {
    ...mapActions([
      'getUserList',
      'userDelete'
    ]),
    onSubmit(searchFormRef, params) {
      this.getUserList(params)
      console.log('params: ', params);
      console.log('searchFormRef: ', searchFormRef);
    },
    onAdd() {
      this.$router.push({
        path: '/user/customer/add'
      })
    },
    onPageChange(curPageNum) {
      console.log('curPageNum: ', curPageNum);
      this.getUserList({ pageNum: curPageNum })
    },
    onCheckDetail() {
      this.detailVisible = true
    },
    // 同意申请
    onConfimApplyFor() {
      this.onCancelApplyFor()
    },
    // 取消同意申请
    onCancelApplyFor() {
      this.applyForVisible = false
    },
    // 确认拒绝
    onConfimRefuse() {
      this.$refs['refuseRef'].validate((valid) => {
        if (!valid) {
          return this.onLoadingChange()
        }
        this.onCancelRefuse()
      })
      
    },
    onLoadingChange() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    // 取消拒绝
    onCancelRefuse() {
      this.$refs['refuseRef'].resetFields()
      this.refuseVisible = false
    }
  }
  
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
