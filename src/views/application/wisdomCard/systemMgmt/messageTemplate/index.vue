<template>
  <div class="contentWrap">
    <div class="content height100" style="overflow: auto">
      1
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
      showConfirm: false
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
    onCancel() {}
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
