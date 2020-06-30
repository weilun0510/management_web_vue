<template>
  <div class="height100 flex_dom">
    <div class="content flex_auto flex_dom">
      <div class="flex_auto" style="overflow: auto">
        <Form :model="form" ref="form" :rules="rules" label-position="right" :label-width="130">
          <Row class='mt30'>
            <Col span="14">
              <FormItem label="公司名称" prop="companyName">
                <Input v-model="form.companyName" placeholder="请输入" />
              </FormItem>
            </Col>
          </Row>
          <Row class='mt30'>
            <Col span="14">
              <FormItem label="用户名" prop="userName">
                <Input v-model="form.userName" placeholder="请输入" />
              </FormItem>
            </Col>
          </Row>
          <Row class='mt30'>
            <Col span="14">
              <FormItem label="密码" prop="password">
                <Input v-model="form.password" placeholder="请输入" />
              </FormItem>
            </Col>
          </Row>
          <Row class='mt30'>
            <Col span="14">
              <FormItem label="确认密码" prop="confirmPwd">
                <Input v-model="form.confirmPwd" placeholder="请输入" />
              </FormItem>
            </Col>
          </Row>
  
          <Row class='mt30'>
            <Col span="14">
              <FormItem label="备注">
                <Input v-model="form.remark" type="textarea" placeholder="请输入" :autosize="{minRows: 3,maxRows: 5}" />
              </FormItem>
            </Col>
          </Row>
          <Row class='mt30'>
            <Col span="14">
              <FormItem label="权限方式" prop="customerPermissions.type">
                <RadioGroup v-model="form.customerPermissions.type" @on-change="onRadioChange">
                  <Radio label="1" style="marginRight: 40px">账户权限组</Radio>
                  <Radio label="2">自定义权限</Radio>
              </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row class='mt30' v-show="form.customerPermissions.type === '1'">
            <Col span="14">
              <FormItem label="权限组" prop="permissionsId">
                <Select v-model="form.permissionsId" @on-change="onPermissionsChange" placeholder="请选择">
                  <Option v-for="item in permissionNoPageList" :value="item.customerPermissionsId" :key="item.customerPermissionsId">{{ item.permissionsName }}</Option>
                </Select>
              </FormItem>
              <div style="marginLeft: 130px;marginTop: 20px;">分配用户所属用户权限组后，该用户会自动拥有此客户权限组内的操作权限
                设置权限组后，系统会根据对应权限组的服务期限对用户的服务开始时间和结束时间进行初始化</div>
            </Col>
          </Row>
          <Row class='mt30 permissionsTable' v-if="(form.customerPermissions.type === '1' && form.permissionsId) || form.customerPermissions.type === '2'">
            <Col span="14">
            <FormItem label="可用权限">
              <vTable :columns="columns" :data="data" :autoHeight="true" style="padding: 0" :hiddenPage="true"></vTable>
            </FormItem>
            </Col>
          </Row>
          <Row class='mt30'>
            <Col span="14">
              <FormItem label="有效期" prop="validity">
                <Input v-model="form.validity" placeholder="请输入" />
              </FormItem>
            </Col>
          </Row>
        </Form>
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
        companyName: '',
        userName: '',
        password: '',
        confirmPwd: '',
        remark: '',
        validity: '',
        customerPermissions: {
          type: '1', // 	类型 1权限组 2自定义权限	
          validity: ''
        },
        permissionsId: null
      },
      rules: {
        companyName: [
          { required: true, message: '公司名不能为空' }
        ],
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
        customerPermissions: [
          { required: true, message: '权限方式不能为空' }
        ],
        permissionsId: [
          { required: true, message: '权限组不能为空' }
        ],
        validity: [
          { required: true, message: '有效期不能为空' }
        ]
      },
      columns: [
        {
          title: '应用名',
          key: 'appName'
        },
        {
          title: '可创建账户数/个',
          key: 'canUserNumber',
          render: (h, { row }) => {
            console.log('row: ', row);
            return this.form.customerPermissions.type === '1' ? h('span', row.canUserNumber) : h('Input', {
              props: {
                placeholder: '请输入',
                value: ''
              },
              style: {
                border: 'none',
                color: '#515a6e',
                width: '100%'
              },
              on: {
                input: (val) => {
                  this.form.customerPermissions.canUserNumber = val
                }
              }
            })
          }
        },
        {
          title: '有效期/天',
          key: 'validity',
          render: (h, { row }) => {
            return this.form.customerPermissions.type === '1' ? h('span', row.validity) : h('Input', {
              props: {
                placeholder: '请输入',
                value: ''
              },
              style: {
                border: 'none',
                color: '#515a6e',
                width: '100%'
              },
              on: {
                input: (val) => {
                  this.form.customerPermissions.validity = val
                }
              }
            })
          }
        }
      ]
    };
  },
  computed: {
    ...mapState({
      permissionNoPageList: state => state.permission.permissionNoPageList,
      permissionDetail: state => state.permission.permissionDetail
    }),
    data: function() {
      // `this` 指向 vm 实例
      console.log('this.permissionDetail: ', this.permissionDetail);
      return {
        list: [{
          appName: '轻说',
          canUserNumber: this.permissionDetail.canUserNumber,
          validity: this.permissionDetail.validity
        }],
        page: {}
      }
    }
  },
  watch: {
    // form: function(val) {
    //   val === 0 ? this.getPermissionList() : this.adminPermissionList()
    // }
  },
  mounted() {
    this.getPermissionNoPageList()
    // console.log(this.$refs.table.offsetHeight - 73)
  },
  methods: {
    ...mapActions([
      'getPermissionNoPageList',
      'getPermissionDetail',
      'userAdd'
    ]),
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        console.log('valid: ', valid);
        if (!valid) return;
        // this.showConfirm = true;
        console.log('this.form: ', this.form);
        if (this.form.confirmPwd) {
          delete this.form.confirmPwd
        }
        if (this.form.customerPermissions.type === '1') {
          this.form.customerPermissions.canUserNumber = this.permissionDetail.canUserNumber
          this.form.customerPermissions.validity = this.permissionDetail.validity
        }
        console.log('add');
        this.userAdd(this.form).then(res => {
          if (res.code === '200') {
            this.$Message.success(res.msg)
            this.onCancel()
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
      this.form.customerPermissions.type = cur
      console.log('cur: ', typeof cur, cur);
      if (this.form.customerPermissions.type === '2') {
        this.form.customerPermissions.canUserNumber = ''
        this.form.customerPermissions.validity = ''
        this.rules.permissionsId = [] // 去掉permissionsId验证
      }
      
    },
    onPermissionsChange(value) {
      console.log('value: ', value);
      this.getPermissionDetail({ id: value })
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
