<template>
  <div class="contentWrap">
    
    <div class="title flex_dom flex_item_mid flex_item_between">
      <div class="text">所属用户组：{{permissionDetail.permissionsName}}</div>
      <div class="v-flex edit" @click="onOpenUpdate">
        <img src="@/assets/images/backups.png" alt="修改" />
        <span>修改</span>
      </div>
    </div>
    <div class="table-list">
      <vTable :columns="columns" :data="data" :hiddenPage="true"></vTable>
    </div>
    <vModal
      :visible="showModal"
      title="选择用户权限组"
      @onOk="onUpdate"
      @onCancel="onCancel"
    >
      <div class="flex_dom flex_item_mid">
        <div style="width: 80px;font-size: 14px;color: #868992;font-weight: 500;">权限组</div>
        <Select v-model="permissionsName" placeholder="请选择">
          <Option v-for="item in permissionNoPageList" :value="item.permissionsName" :key="item.customerPermissionsId">{{ item.permissionsName }}</Option>
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
  props: {},
  components: {},
  data() {
    return {
      permissionsName: null, // 权限组名称
      permissionsModeGroup: 1,
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
      columns: [
        {
          title: '应用名',
          key: 'appName'
        },
        {
          title: '可创建账户数/个',
          key: 'canUserNumber'
        },
        {
          title: '有效期/天',
          key: 'validity'
        }
      ],
      showModal: false
    };
  },
  computed: {
    ...mapState({
      permissionDetail: state => state.permission.permissionDetail,
      permissionNoPageList: state => state.permission.permissionNoPageList,
      customerPermissionsId: state => state.user.customerDetailInfo.permissionsId
    }),
    data: function() {
      // `this` 指向 vm 实例
      console.log('this.permissionDetail: ', this.permissionDetail);
      return {
        list: [
          {
            appName: '轻说',
            canUserNumber: this.permissionDetail.canUserNumber,
            validity: this.permissionDetail.validity
          }
        ],
        page: {}
      }
    }
  },
  watch: {},
  mounted() {
    this.getPermissionDetail({ id: this.customerPermissionsId })
  },
  methods: {
    ...mapActions([
      'getPermissionDetail',
      'getPermissionNoPageList',
      'getPermissionModify'
    ]),
    onOpenUpdate() {
      this.showModal = true;
      this.getPermissionNoPageList()
    },
    onUpdate() {
      const params = {
        customerPermissionsId: this.customerPermissionsId,
        permissionsName: this.permissionsName
      }
      this.getPermissionModify(params).then(res => {
        console.log('res: ', res);
        if (res.code === '200') {
          this.$Message.success(res.msg)
          this.getPermissionDetail({ id: this.customerPermissionsId })
        }
      })
      this.onCancel();
    },
    onCancel() {
      this.showModal = false;
      console.log('取消');
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
