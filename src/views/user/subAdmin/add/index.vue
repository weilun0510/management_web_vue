<template>
  <div class="height100 flex_dom">
    <div class="content flex_auto flex_dom">
      <div class="flex_auto flex_dom" style="overflow: auto">
        <Form :model="form" :rules="rules" ref="form" label-position="right" :label-width="120" style="width: 50%">
          <Row type="flex">
            <Col span="21">
              <FormItem label="用户名" prop="userName">
                <Input v-model="form.userName" placeholder="请输入" />
              </FormItem>
            </Col>
            <Col span="2" style="margin: 6px 0 0 10px;">
              <span style="font-size: 14px; color: #308EF3;">
                新建账户
              </span>
            </Col>
          </Row>
          <Row class='mt30'>
            <Col span="21">
              <FormItem label="密码" prop="password">
                <Input v-model="form.password" placeholder="请输入" />
              </FormItem>
            </Col>
          </Row>
          <Row class='mt30'>
            <Col span="21">
              <FormItem label="确认密码" prop="confirmPwd">
                <Input v-model="form.confirmPwd" placeholder="请输入" />
              </FormItem>
            </Col>
          </Row>
          <Row class='mt30'>
            <Col span="21">
              <FormItem label="备注" >
                <Input v-model="form.remark" type="textarea" placeholder="请输入" :autosize="{minRows: 3,maxRows: 5}" />
              </FormItem>
            </Col>
          </Row>
          <Row class='mt30'>
            <Col span="21">
              <FormItem label="权限方式" prop="adminPermissions.type">
                <RadioGroup v-model="form.adminPermissions.type" @on-change="onRadioChange">
                  <Radio label="1" style="marginRight: 40px">账户权限组</Radio>
                  <Radio label="2">自定义权限</Radio>
              </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row class='mt30' v-show="form.adminPermissions.type === '1'">
            <Col span="21">
              <FormItem label="权限组" prop="permissionsId">
                <Select v-model="form.permissionsId" @on-change="onPermissionsModeGroupChange" placeholder="请选择">
                  <Option v-for="item in adminPermissionNoPageList" :value="item.adminPermissionsId" :key="item.adminPermissionsId">{{ item.permissionsName }}</Option>
                </Select>
              </FormItem>
              <div style="marginLeft: 130px;marginTop: 20px;">分配用户所属用户权限组后，该用户会自动拥有此客户权限组内的操作权限
                设置权限组后，系统会根据对应权限组的服务期限对用户的服务开始时间和结束时间进行初始化</div>
            </Col>
          </Row>
          <Row class='mt30 permissionsTable' v-if="(form.adminPermissions.type === '1' && form.permissionsId) || form.adminPermissions.type === '2'">
            <Col span="21">
            <FormItem label="可创账号数">
              <vTable :columns="columns" :data="data" :autoHeight="true" style="padding: 0" :hiddenPage="true"></vTable>
            </FormItem>
            </Col>
          </Row>
          <Row class='mt30'>
            <Col span="21">
              <FormItem label="有效期" prop="validity">
                <Input v-model="form.validity" placeholder="请输入" />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div style="width: 50%; border-left: 1px solid #dcdee2;padding-left: 20px;">
          <div style="margin-top: 10px">可用权限</div>
          <Row type="flex">
            <Col span="21">
              <!-- <FormItem label="可用权限" >
                <Input v-model="form.userName" placeholder="请输入" />
              </FormItem> -->
              <Tree ref="tree" :data="adminPermissionMenuTree" multiple show-checkbox @on-check-change="onCheckChange"></Tree>
            </Col>
          </Row>
        </div>
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
export default {
  components: {},
  data() {
    const valiConfirmPwd = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    }
    return {
      form: {
        userName: '',
        password: '',
        confirmPwd: '',
        remark: '',
        adminPermissions: {
          type: '1' // 	类型 1权限组 2自定义权限	
        },
        permissionsId: null,
        menuIds: [],
        validity: ''
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { type: 'string', min: 6, message: '密码至少为6位字符', trigger: 'blur' }
        ], 
        confirmPwd: [
          { required: true, message: '请确认密码' },
          { validator: valiConfirmPwd, message: '两次输入的密码不一致', trigger: 'blur' }
        ],
        adminPermissions: [
          { required: true, message: '权限方式不能为空' }
        ],
        permissionsId: [
          { required: true, message: '权限组不能为空' }
        ],
        validity: [
          { required: true, message: '有效期不能为空' }
        ]
      },
      permissionsModeGroupData: [
        {
          value: 1,
          label: '权限组'
        },
        {
          value: 2,
          label: '自定义权限'
        }
      ],
      customPermissions: [
        // 自定义权限
        {
          name: 'name1',
          count: '', // 可创建账户数/个
          day: '' // 有效期/天
        },
        {
          name: 'name2',
          count: '', // 可创建账户数/个
          day: '' // 有效期/天
        },
        {
          name: 'name3',
          count: '', // 可创建账户数/个
          day: '' // 有效期/天
        }
      ],
      columns: [
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '客户数',
          key: 'canCustomerNumber',
          render: (h, { row }) => {
            console.log('row: ', row);
            return this.form.adminPermissions.type === '1' ? h('span', row.canCustomerNumber) : h('Input', {
              props: {
                placeholder: '请输入',
                value: ''
              },
              style: {
                border: 'hidden',
                color: '#515a6e',
                width: '100%'
              },
              on: {
                input: (val) => {
                  this.form.adminPermissions.canCustomerNumber = val
                }
              }
            })
          }
        },
        {
          title: '子管理员数',
          key: 'canAdminNumber',
          render: (h, { row }) => {
            return this.form.adminPermissions.type === '1' ? h('span', row.canAdminNumber) : h('Input', {
              props: {
                placeholder: '请输入',
                value: ''
              },
              style: {
                border: 'hidden',
                color: '#515a6e',
                width: '100%'
              },
              on: {
                input: (val) => {
                  this.form.adminPermissions.canAdminNumber = val
                }
              }
            })
          }
        }
      ]
      // isNewUser: false,
      // selectedIds: []

    };
  },
  computed: {
    // text: function() {
    //   return !this.isNewUser ? '新建用户' : '已有用户'
    // },
    ...mapState({
      adminPermissionNoPageList: state => state.permission.adminPermissionNoPageList,
      adminPermissionDedail: state => state.permission.adminPermissionDedail,
      adminPermissionMenuTree: state => state.permission.adminPermissionMenuTree
      
    }),
    data: function() {
      // `this` 指向 vm 实例
      console.log('this.adminPermissionDedail: ', this.adminPermissionDedail);

      return {
        list: [{
          userName: '轻说',
          canCustomerNumber: this.adminPermissionDedail.canCustomerNumber,
          canAdminNumber: this.adminPermissionDedail.canAdminNumber
        }],
        page: {}
      }
    },
    selectedIds: {
      get() {
        // return this.visible
        let selectedIds = []
        if (this.$refs.tree) {
          const ids = this.$refs.tree.getCheckedAndIndeterminateNodes()
          selectedIds = ids.map(item => item.menuId);
        }
        console.log('selectedIds222: ', selectedIds);
        return selectedIds
      },
      set(val) {}
    }
  },
  mounted() {
    this.getAdminPermissionNoPageList()
    this.getAdminPermissionMenuTree()
    console.log('adminPermissionMenuTree: ', this.adminPermissionMenuTree);
  },
  methods: {
    ...mapActions([
      'getAdminPermissionNoPageList',
      'getAdminPermissionDetail',
      'getAdminPermissionMenuTree',
      'userAdminAdd'
    ]),
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        console.log('valid: ', valid);
        if (!valid) return;
        delete this.form.confirmPwd

        if (this.form.adminPermissions.type === '1') {
          this.form.adminPermissions.canCustomerNumber = this.adminPermissionDedail.canAdminNumber
          this.form.adminPermissions.canAdminNumber = this.adminPermissionDedail.canCustomerNumber
        } else {
          delete this.form.permissionsId
        }
        this.form.menuIds = this.selectedIds;
        this.userAdminAdd(this.form).then(res => {
          if (res.code === '200') {
            this.$Message.success(res.msg)
            this.onCancel();
          }
        })
      })
      console.log('form: ', this.form);
    },
    onCancel() {
      console.log('this.$router: ', this.$router);
      this.$router.back()
      
    },
    onAdd() {
      
    },
    onRadioChange(cur) {
      console.log('cur: ', cur);
      this.form.adminPermissions.type = cur
      console.log('cur: ', typeof cur, cur);
      if (this.form.adminPermissions.type === '2') {
        this.form.adminPermissions.canCustomerNumber = ''
        this.form.adminPermissions.canAdminNumber = ''
        this.rules.permissionsId = [] // 去掉permissionsId验证
      }
    },
    onPermissionsModeGroupChange(value) {
      console.log('value: ', value);
      this.getAdminPermissionDetail({ id: value })
    },
    // addUser() {
    //   this.isNewUser = !this.isNewUser;
    //   if (this.isNewUser) {
    //     this.rules.password.required = true
    //     this.rules.password.confirmPwd = true
    //   }
    // },
    onCheckChange() {
      // console.log('q,w: ', q, w);
      console.log('this.$refs: ', this.$refs);
      const ids = this.$refs.tree.getCheckedAndIndeterminateNodes()
      
      console.log('ids: ', ids);
      this.selectedIds = ids.map(item => item.menuId);

      console.log('this.selectedIds: ', this.selectedIds);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang="less">
.permissionsTable{
  .ivu-input{
    border: none;
  }
  .ivu-input:focus{
    box-shadow: none;
  }
}
</style>
