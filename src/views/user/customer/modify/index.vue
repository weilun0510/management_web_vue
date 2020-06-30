<template>
  <div class="height100">
    <vTab :data="tabList" @handleClick="this.onTabsChange"></vTab>
    <div class="user flex_dom flex_item_mid flex_item_between">
      <div class="flex_dom flex_item_mid">
        <Avatar
          shape="square"
          :src="customerDetailInfo.userAvatar"
          style="height: 40px; width: 40px"
        ></Avatar>
        <div class="name">{{customerDetailInfo.userName}}</div>
      </div>
      <div class="v-flex" style="cursor: pointer;" @click="visible = true">
        <img src="@/assets/images/jy.png" alt="停用" style="marginRight: 5px;" />
        <span style="color: #FF6010">停用</span>
      </div>
    </div>
    <baseInfo v-if="activeTab === 0"></baseInfo>
    <accountAccess v-else-if="activeTab === 1"></accountAccess>
    <accountLife v-else-if="activeTab === 2"></accountLife>
    <vConfirm text='确定禁用该用户？' @onOk='onOk' @onCancel='onCancel' :visible='visible'></vConfirm>
  </div>
</template>

<script>
import baseInfo from './baseInfo/index.vue';
import accountAccess from './accountAccess/index'
import accountLife from './accountLife/index'

import { mapActions, mapState } from 'vuex';

export default {
  components: {
    baseInfo,
    accountAccess,
    accountLife
  },
  data() {
    return {
      customerId: this.$route.query.customerId,
      tabList: ['基本信息', '账号权限', '用户账号使用期限'],
      activeTab: 0,
      visible: false
    };
  },
  computed: {
    ...mapState({
      customerDetailInfo: state => state.user.customerDetailInfo
    })
  },
  mounted() {},
  watch: {
  },
  created() {},
  methods: {
    ...mapActions([
      'userDelete'
    ]),
    onTabsChange(index) {
      this.activeTab = index;
    },
    // 确认删除
    onOk() {
      this.userDelete({ id: this.$route.query.customerId }).then(res => {
        if (res.code === '200') {
          this.$Message.success(res.msg);
        }
        this.onCancel()
      })
    },
    onCancel() {
      this.visible = false
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
