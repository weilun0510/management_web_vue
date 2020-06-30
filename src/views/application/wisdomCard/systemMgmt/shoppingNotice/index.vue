<template>
  <div class="shoppingNotice">
    <div class="content height100" style="overflow: auto">
      <div class="flex_dom">
        <div class="name">推送选项</div>
        <CheckboxGroup v-model="fruit">
          <Checkbox label="香蕉"></Checkbox>
          <Checkbox label="苹果"></Checkbox>
          <Checkbox label="西瓜"></Checkbox>
        </CheckboxGroup>
      </div>
      <div class="flex_dom mt20">
        <div class="name">推送人</div>
        <Tree ref="tree" :data="tree" multiple show-checkbox @on-check-change="onCheckChange"></Tree>
      </div>
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
      showConfirm: false,
      tree: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ]
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
