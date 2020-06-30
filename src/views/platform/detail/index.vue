<template>
  <div class="platform-detail-wrap">
    <vTab :data='list' @handleClick='clickItem'></vTab>
    <div class='companyLogo'>
      <div class='logo'>
        <img src='@/assets/images/logo.png' />
        <p>力挽大网络科技公司</p>
      </div>
      <div class='btns v-flex'>
        <div class='enter' @click='enterCompany'>
          <img src='@/assets/images/enter.png' />进入企业</div>
        <div class='stop' @click='stopUse'>
          <img src='@/assets/images/jy.png' />停用</div>
      </div>
    </div>
    <div class='company-info'>
      <baseInfo v-show='activeIndex === 0'></baseInfo>
      <admin v-if='activeIndex === 1'></admin>
      <staff v-if='activeIndex === 2'></staff>
      <record v-if='activeIndex === 3'></record>
    </div>
  </div>
</template>

<script>
import icon from '@/assets/images/enter.png'
import baseInfo from './baseInfo/index'
import admin from './admin/index'
import staff from './staff/index'
import record from './record/index'
export default {
  components: {
    baseInfo,
    admin,
    staff,
    record
  },
  data() {
    return {
      activeIndex: 0,
      icon,
      form: {
        company: 1,
        address: 1,
        number: 1,
        date: ''
      },
      list: [
        '基本信息',
        '管理员',
        '客户员工',
        '操作日志'
      ]
    };
  },
  computed: {},
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
  },
  methods: {
    clickItem(index) {
      console.log(index)
      this.activeIndex = index
    },
    confirm() {
      alert('确认修改')
    },
    cancel() {
      this.$Modal.confirm({
        title: '提示',
        content: '修改内容还没保存是否保存',
        okText: '保存',
        onOk: () => {
          this.$Message.info('Clicked ok');
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel');
        }
      });
    },
    enterCompany() {
      window.location.href = 'https://dl.qscrm.com/#/login'
    },
    stopUse() {
      this.$Modal.confirm({
        title: '提示',
        content: '确定要停用吗？',
        onOk: () => {
          this.$Message.info('Clicked ok');
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
