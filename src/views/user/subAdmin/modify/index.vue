<template>
  <div class="height100">
    <vTab :data="tabList" @handleClick="this.onTabsChange"></vTab>
    <div class="user flex_dom flex_item_mid flex_item_between">
      <div class="flex_dom flex_item_mid">
        <Avatar
          shape="square"
          :src="userAdminDetailInfo.userAvatar"
          style="height: 40px; width: 40px"
        ></Avatar>
        <div class="name">{{userAdminDetailInfo.userName}}</div>
      </div>
      
      <div class="v-flex" style="cursor: pointer;" @click="this.visible = true">
        <img src="@/assets/images/jy.png" alt="停用" style="marginRight: 5px;" />
        <span style="color: #FF6010">停用</span>
      </div>
    </div>
    <baseInfo v-if="activeTab === 0"></baseInfo>
    <accountNumber v-else-if="activeTab === 1"></accountNumber>
    <permissions v-else-if="activeTab === 2"></permissions>
    <!-- <usePeriod v-else-if="activeTab === 3"></usePeriod> -->
    <operationLog v-else></operationLog>
    <vConfirm text='确定禁用该用户？' @onOk='onOk' @onCancel='onCancel' :visible='visible'></vConfirm>
  </div>
</template>

<script>
import baseInfo from './baseInfo/index.vue'
import accountNumber from './accountNumber/index.vue'
import permissions from './permissions/index.vue'
import operationLog from './operationLog/index.vue'
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    baseInfo,
    accountNumber,
    permissions,
    operationLog
  },
  data() {
    return {
      tabList: ['基本信息', '创建账号数', '可用权限', '操作日志'],
      activeTab: 0,
      visible: false
    };
  },
  computed: {
    ...mapState({
      userAdminDetailInfo: state => state.user.userAdminDetailInfo
    })
  },
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
  },
  methods: {
    ...mapActions([
      'userAdminDelete'
    ]),
    onTabsChange(i) {
      this.activeTab = i;
    },
    // 确认删除
    onOk() {
      this.userAdminDelete({ id: this.$route.query.adminId }).then(res => {
        if (res.code === '200') {
          this.getUserAdminList();
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
