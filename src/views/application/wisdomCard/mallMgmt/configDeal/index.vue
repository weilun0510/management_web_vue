<template>
  <div class="contentWrap">
    <div class="content height100" style="overflow: auto">
      <Form
        :model="form"
        ref="form"
        label-position="right"
        :label-width="140"
      >
        <div class="contentTitle">自动关闭未付款订单</div>
        <Row class="mt30">
          <Col span="10">
            <FormItem label="下单几天后(天)" prop="userName">
              <Input v-model="form.userName" type="number" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <div class="contentTitle mt30">自动收货</div>
        <Row class="mt30">
          <Col span="10">
            <FormItem label="发货几天后(天)" prop="password">
              <Input v-model="form.password" type="number" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <div class="contentTitle mt30">退款申请</div>
        <Row class="mt30">
          <Col span="10">
            <FormItem label="完成订单几天后(天)">
              <Input v-model="form.remark" type="number" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="10">
            <FormItem label="提现方式">
              <Radio v-model="form.referrer">提现到微信钱包</Radio>
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="10">
            <FormItem label="下月自动打款" prop="phone">
              <RadioGroup v-model="form.phone" @on-change="onRadioChange">
                <Radio label="开启" style="marginRight: 30px  "></Radio>
                <Radio label="关闭"></Radio>
            </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="10">
            <FormItem label="提现限制" prop="email">
              <Input v-model="form.email" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="10">
            <FormItem label="提现手续费(%)" prop="companyName">
              <Input v-model="form.companyName" type="number" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="btn flex_dom flex_item_mid">
      <vButton @click="onSubmit" text="提交" type="primary" :isForm="true" class="mr20"></vButton>
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

export default {
  components: {},
  data() {
    return {
      form: {
        company: 1,
        username: '',
        password: '',
        remark: '',
        referrer: true,
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
      showConfirm: false,
      modalVisible: false
    };
  },
  computed: {
    ...mapState({
      customerDetailInfo: state => state.user.customerDetailInfo
    })
  },
  watch: {
    customerDetailInfo: function(val) {
      this.form = val ? cloneDeep(val) : {}
    }
  },
  mounted() {
    // this.customerDetail({ id: this.$route.query.customerId })
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
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
