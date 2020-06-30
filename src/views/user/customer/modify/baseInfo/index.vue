<template>
  <div class="contentWrap">
    <div class="content height100" style="overflow: auto">
      <div class="contentTitle">账号信息</div>
      <Form
        :model="form"
        ref="form"
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
            <FormItem label="推荐人">
              <Input v-model="form.referrer" placeholder="请输入" />
            </FormItem>
            <div style="marginLeft: 100px;marginTop: 20px;color: #868992;">某个管理员创建，即为该用户推荐人</div>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="手机号" prop="phone">
              <Input v-model="form.phone" placeholder="请输入" />
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
            <FormItem label="公司名称" prop="companyName">
              <Input v-model="form.companyName" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="公司地址">
              <Input v-model="form.companyAddress" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="上次登录时间">
              <div style="color: #3C404B;font-weight: 500;">{{form.loginTime}}</div>
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="14">
            <FormItem label="上次登录ip">
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
        <Row class="mt30">
          <Col span="14">
            <FormItem label="到期时间">
              <div style="color: #3189F5;font-weight: 500;cursor: pointer;" @click="modalVisible = true">
                {{this.$moment(this.form.expireDate).format('YYYY-MM-DD')}}
                <!-- {{this.$moment(form.validity).format("YYYY-MM-DD")}} -->
              </div>
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
    <vModal
        :visible="modalVisible"
        title="修改天数"
        @onOk="onUpdate"
        @onCancel="onCancel">
        <div class="v-flex">
          <div style="width: 100px; padding: 30px 0;">到期提示</div>
          <DatePicker v-model="form.expireDate" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
        </div>
      </vModal>
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
        referrer: '',
        phone: '',
        email: '',
        companyName: '',
        companyAddress: '',
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
        ],        
        companyName: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }
        ]
      },
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
      showConfirm: false,
      headers: {
        'Authorization': localStorage.getItem('token') || ''
      },
      modalVisible: false,
      baseUrl
    };
  },
  computed: {
    ...mapState({
      customerDetailInfo: state => state.user.customerDetailInfo
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
    customerDetailInfo: function(val) {
      this.form = val ? cloneDeep(val) : {}
    }
  },
  mounted() {
    this.customerDetail({ id: this.$route.query.customerId })
  },
  methods: {
    ...mapActions([
      'userModify',
      'customerDetail'
    ]),
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return;
        this.showConfirm = true;
      })
     
    },
    handleSuccess(res, file) {
      this.form.userAvatar = res.data[0].url;
      console.log('uploadsuccess');
      this.customerDetail({ id: this.$route.query.customerId })
    },
    onError(error, file, fileList) {
      console.log('error, file, fileList: ', error, file, fileList);
    },
    onBack() {
      this.$router.back();
    },
    onUpdate() {
      console.log('确认');
      console.log('this.form: ', this.form);
      this.userModify(this.form).then(res => {
        console.log('res: ', res);
        if (res.code === '200') {
          this.$Message.success(res.msg)
          this.customerDetail({ id: this.$route.query.customerId })
        }
      })
      this.onCancel();
    },
    onCancel() {
      this.showConfirm = false;
      this.modalVisible = false;
      console.log('取消');
    },
    onAdd() {},
    onRadioChange(cur) {
      console.log('cur: ', cur);
    },
    onPermissionsModeGroupChange(value) {
      console.log('value: ', value);
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
