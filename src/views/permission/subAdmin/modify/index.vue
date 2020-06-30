<template>
  <div class="addPermissionWrap p18">
    <div class='permissionContent flex_dom'>
      <Form :model="form" :rules="rules" ref="form" label-position="right" :label-width="140" style="width: 50%">
        <Row class='mt30'>
          <Col span="22">
            <FormItem label="子管理员权限组名" prop="permissionsName">
              <Input v-model="form.permissionsName" placeholder="请输入子管理员权限组名" />
            </FormItem>
          </Col>
        </Row>
        <Row class='mt30 adminAdd'>
          <Col span="21">
            <FormItem label="创建账号数">
              <vTable :columns="columns" :data="data" :autoHeight="true" :hiddenPage="true" style="padding: 0 0 16px 0;"></vTable>
              <p class=tips>限制客户（公司）和子管理员创建数量，为0则不允许添加。</p>
            </FormItem>
          </Col>
        </Row>
        <Row class='mt30'>
          <Col span="21">
            <FormItem label="有效期" prop="validity">
              <Input v-model="form.validity" placeholder="请输入" />
              <p class=tips>设置权限组的有效期限。0为不限制期限。到期后，该用户将不可登陆；</p>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div style="width: 50%; border-left: 1px solid #dcdee2;padding-left: 20px;">
        <div style="margin-top: 10px">可用权限</div>
        <Row type="flex">
          <Col span="21">
            <Tree ref="tree" :data="adminPermissionMenuTree" multiple show-checkbox @on-check-change="onCheckChange"></Tree>
          </Col>
        </Row>
      </div>
       <div class="btn flex_dom flex_item_mid">
        <vButton @click="onSubmit" text="提交" type="primary" :isForm="true" class="mr20"></vButton>
        <vButton @click="onCancel" text="取消" :isForm="true"></vButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { cloneDeep } from 'lodash';
export default {
  components: {
  },
  data() {
    return {
      form: {
        permissionsName: '',
        canCustomerNumber: '', // 客户数
        canAdminNumber: '', // 子管理员
        validity: '', // 有效期
        menuIds: []
      },
      rules: {
        permissionsName: [
          { required: true, message: '子管理员权限组名不能为空' }
        ],
        // canCustomerNumber: [
        //   { required: true, message: '客户数不能为空' }
        // ],
        // canAdminNumber: [
        //   { required: true, message: '子管理员数不能为空' }
        // ],
        validity: [
          { required: true, message: '有效期不能为空' }
        ]
      },
      value: '',
      columns: [
        {
          title: '客户数',
          key: 'canCustomerNumber',
          render: (h, { row }) => {
            console.log('row: ', row);
            return h('Input', {
              props: {
                placeholder: '请输入',
                value: this.adminPermissionDedail.canCustomerNumber
              },
              style: {
                border: 'none',
                color: '#515a6e',
                width: '100%'
              },
              on: {
                input: (val) => {
                  this.form.canCustomerNumber = val
                }
              }
            })
          }
        },
        {
          title: '子管理员数',
          key: 'canAdminNumber',
          render: (h, { row }) => {
            console.log('row: ', row);
            return h('Input', {
              props: {
                placeholder: '请输入',
                value: this.adminPermissionDedail.canAdminNumber
              },
              style: {
                border: 'none',
                color: '#515a6e',
                width: '100%'
              },
              on: {
                input: (val) => {
                  this.form.canAdminNumber = val
                }
              }
            })
          }
        }
      ],
      data: {
        list: [
          {
           
          }
        ]
      },
      selectedIds: []
    };
  },
  computed: {
    ...mapState({
      adminPermissionMenuTree: state => state.permission.adminPermissionMenuTree,
      adminPermissionDedail: state => state.permission.adminPermissionDedail
    })
    
  },
  watch: {
    adminPermissionDedail: function(val) {
      console.log('val: ', val);
      this.form = val ? cloneDeep(val) : {}
    }
  },
  mounted() {
    this.getAdminPermissionDetail({ id: this.$route.query.adminPermissionsId }).then(res => {
      this.getAdminPermissionMenuTree({ flag: 'permissionAdminModify' })
    })
    
  },
  methods: {
    ...mapActions([
      'getAdminPermissionDetail',
      'getAdminPermissionMenuTree',
      'adminPermissionModify'
    ]),
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return;
        const permissionsMenuList = this.selectedIds.map(id => ({ menuId: id, permissionsId: this.adminPermissionDedail.adminPermissionsId }))
        this.form.permissionsMenuList = permissionsMenuList

        this.adminPermissionModify(this.form).then(res => {
          if (res.code === '200') {
            this.$Message.success(res.msg);
            this.onCancel()
          }
        })
      })
    },
    onCancel() {
      this.$router.back()
    },
    onCheckChange() {
      const ids = this.$refs.tree.getCheckedAndIndeterminateNodes()
      console.log('ids: ', ids);
      this.selectedIds = ids.map(item => item.menuId);
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less">
.adminAdd{
  .ivu-input{
    border: none;
  }
  .ivu-input:focus{
    box-shadow: none;
  }
}
</style>
