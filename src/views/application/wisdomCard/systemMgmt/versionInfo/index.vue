<template>
  <div class="contentWrap">
    <div class="content height100" style="overflow: auto">
      <Form
        :model="form"
        label-position="right"
        :label-width="140"
      >
        <Row class="mt30">
          <Col span="10">
            <FormItem label="站点名称" prop="userName">
              <Input v-model="form.userName" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <Row class="mt30">
          <Col span="10">
            <FormItem label="版本信息" prop="password">
              <Input v-model="form.password" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="btn flex_dom flex_item_mid">
      <vButton @click="onSubmit" text="提交" type="primary" :isForm="true" class="mr20"></vButton>
      <vButton @click="onClearCache" text="清除缓存" :isForm="true" class="mr20"></vButton>
    </div>
    <vConfirm
      :visible="showConfirm"
      text="修改内容还没保存是否修改"
      @onOk="onUpdate"
      @onCancel="onCancel"
    >
    </vConfirm>
    <vConfirm
      :visible="clearVisible"
      text="是否清除缓存"
      @onOk="onConfirmClear"
      @onCancel="onCancelClear"
    >
    </vConfirm>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapActions, mapState } from 'vuex';

export default {
  components: {},
  data() {
    return {
      form: {
        userName: '',
        password: ''
      },
      showConfirm: false,
      clearVisible: false
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
      this.showConfirm = true;
    },
    onUpdate() {
      console.log('this.form: ', this.form);
      // this.userModify(this.form).then(res => {
      //   console.log('res: ', res);
      //   if (res.code === '200') {
      //     this.$Message.success(res.msg)
      //     this.customerDetail({ id: this.$route.query.customerId })
      //   }
      // })
      this.onCancel();
    },
    onAdd() {},
    onRadioChange(cur) {
      console.log('cur: ', cur);
    },
    onCancel() {},
    onClearCache() {
      this.clearVisible = true
    },
    onConfirmClear() {
      console.log('clear');
      this.onCancelClear()
    },
    onCancelClear() {
      this.clearVisible = false
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
