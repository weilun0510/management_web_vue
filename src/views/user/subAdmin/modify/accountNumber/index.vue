<template>
  <div class="contentWrap">
    <div class="content" style="overflow: auto">
      <div class="title flex_dom flex_item_mid flex_item_between">
        <div class="text">所属子管理员组：{{adminPermissionDedail.permissionsName}}</div>
        <div class="v-flex edit" @click="onModify">
          <img src="@/assets/images/backups.png" alt="修改" />
          <span>修改</span>
        </div>
      </div>
      <div style="height: calc(100% - 50px);">
        <vTable :data="data" :columns="columns" :hiddenPage="true"></vTable>
      </div>
    </div>
    <vModal
      :visible="showModal"
      title="选择用户权限组"
      @onOk="onUpdate"
      @onCancel="onCancel"
    >
      <div class="flex_dom flex_item_mid">
        <div style="width: 80px;font-size: 14px;color: #868992;font-weight: 500;">权限组</div>
        <Select v-model="permissionsId" placeholder="请选择">
          <Option v-for="item in adminPermissionNoPageList" :value="item.adminPermissionsId" :key="item.adminPermissionsId">{{ item.permissionsName }}</Option>
        </Select>
      </div>
      <div style="color: #3189F5;font-size: 14px;font-weight: 500;padding-left: 69px;margin-top: 14px;">分配用户所属权限组后，该用户会自动拥有此权限组内的模块操作权限。
设置权限组后，系统会根据对应权限组的服务期限对用户的服务开始时间和结束时间进行初始化。</div>
    </vModal>
  </div>  
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  components: {},
  data() {
    return {
      columns: [
        {
          title: '客户数/个',
          key: 'canCustomerNumber'
        },
        {
          title: '子管理员数/个',
          key: 'canAdminNumber'
        }
      ],
      showModal: false,
      permissionsId: ''
    };
  },
  computed: {
    ...mapState({
      userAdminDetailInfo: state => state.user.userAdminDetailInfo,
      adminPermissionDedail: state => state.permission.adminPermissionDedail,
      adminPermissionNoPageList: state => state.permission.adminPermissionNoPageList
    }),
    data: function() {
      // `this` 指向 vm 实例
      return {
        list: [{
          appName: '轻说',
          canCustomerNumber: this.adminPermissionDedail.canCustomerNumber,
          canAdminNumber: this.adminPermissionDedail.canAdminNumber
        }],
        page: {}
      }
    }
  },
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
    this.getAdminPermissionDetail({ id: this.userAdminDetailInfo.permissionsId })
  },
  methods: {
    ...mapActions([
      'getAdminPermissionDetail',
      'getAdminPermissionNoPageList',
      'adminPermissionModify'
    ]),
    onBack() {
      this.$router.back();
    },
    onModify() {
      this.showModal = true
      this.getAdminPermissionNoPageList()
    },
    onUpdate() {
      
      this.adminPermissionModify({ adminPermissionsId: this.adminPermissionDedail.adminPermissionsId }).then(res => {
        if (res.code === '200') {
          this.$Message.success(res.msg)
          this.getAdminPermissionDetail({ id: this.userAdminDetailInfo.permissionsId })
          this.onCancel();
        }
      })
    },
    onCancel() {
      this.showModal = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
