<template>
  <div class="groupSentMsg">
    <div class="content height100">
      <vCardTabs @onCardTabsChange="onCardTabsChange" :tabPaneList="tabPaneList"></vCardTabs>
      <div class="myForm">
        <Form
        :model="form"
        label-position="right"
        style="width: 50%"
        :label-width="140">
          <div class="echartsBox">
            <Row class="mt30" v-show="tabName === 'cardTab1'">
              <Col span="21">
                <FormItem label="群发内容" prop="userName">
                  <Input v-model="form.userName" type="textarea" placeholder="请输入" :autosize="{minRows: 6,maxRows: 10}" />
                  <RadioGroup v-model="form.phone">
                    <Radio label="1" style="marginRight: 30px">小程序链接</Radio>
                    <Radio label="2"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row class="mt30" v-show="tabName === 'cardTab1'">
              <Col span="21">
                <FormItem label="跳转页面" prop="password">
                  <Select placeholder="跳转页面" v-model="form.password">
                    <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row class="mt30" v-show="tabName === 'cardTab2'">
              <Col span="21">
                <FormItem label="群发内容" prop="phone">
                  <Select placeholder="群发内容">
                    <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </div>
        </Form>
        <div class="treeWrap">
          <div>选择用户</div>
          <Row type="flex">
            <Col span="21">
              <Tree ref="tree" :data="tree" multiple show-checkbox @on-check-change="onCheckChange"></Tree>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="btn flex_dom flex_item_mid">
      <vButton @click="onUpdate" text="提交" type="primary" :isForm="true" class="mr20"></vButton>
    </div>
    <vConfirm
      :visible="showConfirm"
      text="修改内容还没保存是否修改"
      @onOk="onSubmit"
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
        password: '',
        phone: ''
      },
      showConfirm: false,
      tabPaneList: [
        { label: '用户群发', name: 'cardTab1' },
        { label: '员工群发', name: 'cardTab2' }
      ],
      tabName: 'cardTab1',
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
      ],
      options: [
        {
          value: 1,
          label: 22
        },
        {
          value: 2,
          label: 3
        }
      ],
      selectedIds: []
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
    onUpdate() {
      this.showConfirm = true;
    },
    onSubmit() {
      console.log(this.selectedIds);
      console.log(this.form);
      // this.userModify(this.form).then(res => {
      //   console.log('res: ', res);
      //   if (res.code === '200') {
      //     this.$Message.success(res.msg)
      //     this.customerDetail({ id: this.$route.query.customerId })
      //   }
      // })
      this.onCancel();
    },
    onCardTabsChange(name) {
      this.tabName = name
      if (name === 'cardTab1') {
        // this.onGrowthChart()
      } else {
        // this.onPieCharts()
      }
    },
    onCancel() {},
    onCheckChange() {
      const ids = this.$refs.tree.getCheckedAndIndeterminateNodes()
      this.selectedIds = ids.map(item => item.title);
      console.log('this.selectedIds: ', this.selectedIds);
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
