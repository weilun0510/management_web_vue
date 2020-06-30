<template>
  <div class="contentWrap">
    <div class="content height100" style="overflow: auto">
      <div class="contentTitle">账号信息</div>
      <Form
        :model="form"
        ref="adminInfoRef"
        :rules="rules"
        label-position="right"
        :label-width="100"
        style="marginTop: 32px"
      >
        <Row class="mt30">
          <Col span="14">
            <FormItem label="头像">
              <div class="uploadImage">
                <Upload
                  ref="upload"
                  :on-success="handleSuccess"
                  :on-error="onError"
                  :headers="headers"
                  :show-upload-list="false"
                  :format="['jpg', 'jpeg', 'png']"
                  :max-size="2048"
                  type="drag"
                  name="files"
                  :action="baseUrl + '/common/oss/upload'"
                  style="display: inline-block;width:80px;"
                >
                  <div
                    class="tip"
                    :style="touxiang"
                  >
                    <div class="text">更换头像</div>
                  </div>
                </Upload>
              </div>
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="用户名" prop="userName">
              <Input v-model="form.userName" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="密码" prop="password">
              <Input v-model="form.password" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="备注">
              <Input v-model="form.remark" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <div class="contentTitle mt30">基本信息</div>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="手机号" prop="phone">
              <Input v-model="form.phone" type="number" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="邮箱" prop="email">
              <Input v-model="form.email" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="上次登陆时间">
              <div style="color: #3C404B;font-weight: 500;">{{form.loginTime}}</div>
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="上次登陆ip">
              <div style="color: #3C404B;font-weight: 500;">{{form.loginIp}}</div>
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="注册时间">
              <div style="color: #3C404B;font-weight: 500;">{{form.created}}</div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="btn flex_dom flex_item_mid">
      <vButton @click="onSubmit" text="提交" type="primary" :isForm="true" class="mr20"></vButton>
      <vButton @click="onBack" text="取消" :isForm="true"></vButton>
    </div>
      <vConfirm
      :visible="showConfirm"
      text="修改内容还没保存是否修改"
      @onOk="onUpdate"
      @onCancel="onCancel"
    >
    </vConfirm>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { phone } from '@/utils/validator';
import { mapActions, mapState } from 'vuex';
import { baseUrl } from '@/config/env';
export default {
  components: {},
  data() {
    return {
      form: {
        company: 1,
        username: '',
        password: '',
        remark: '',
        phone: '',
        email: '',
        loginTime: '',
        loginIp: '',
        created: '',
        validity: '',
        updated: '',
        userAvatar: ''
      },
      rules: {
        userName: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位数', trigger: 'blur' }
        ],        
        phone: [
          { required: true, 
            validator: phone, 
            trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]        
      },
      showConfirm: false,
      headers: {
        'Authorization': localStorage.getItem('token') || ''
      },
      baseUrl
    };
  },
  computed: {
    ...mapState({
      userAdminDetailInfo: state => state.user.userAdminDetailInfo
    }),
    touxiang: function() {
      // `this` 指向 vm 实例
      // return !this.showPassword ? '新建用户' : '已有用户'
      return {
        backgroundImage: 'url(' + this.form.userAvatar + ')',
        backgrounRrepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  watch: {
    userAdminDetailInfo: function(val) {
      this.form = val ? cloneDeep(val) : {}
    }
  },
  mounted() {
    this.userAdminDetail({ id: this.$route.query.adminId })
  },
  methods: {
    ...mapActions([
      'userAdminDetail',
      'userAdminModify'
    ]),
    onSubmit() {
      this.$refs['adminInfoRef'].validate((valid) => {
        if (!valid) return;
        this.showConfirm = true;
      })
    },
    handleSuccess(res, file) {
      this.form.userAvatar = res.data[0].url;
      this.userAdminDetail({ id: this.$route.query.adminId })
    },
    onError(error, file, fileList) {
      console.log('error, file, fileList: ', error, file, fileList);
    },
    onBack() {
      this.$router.back();
    },
    onUpdate() {
      console.log('确认');
      this.userAdminModify(this.form).then(res => {
        if (res.code === '200') {
          this.$Message.success(res.msg)
          this.userAdminDetail({ id: this.$route.query.adminId })
        }
      })
      this.onCancel();
    },
    onCancel() {
      this.showConfirm = false;
      console.log('取消');
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
