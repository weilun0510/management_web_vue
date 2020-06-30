<template>
  <div class="contentWrap">
    <div class="content" style="overflow: auto">
      <div class="title flex_dom flex_item_mid flex_item_between">
        <div class="text">所属子管理员组：{{adminPermissionDedail.permissionsName}}</div>
      </div>
      <div style="height: calc(100% - 50px);">
        <Row type="flex" style="marginLeft: 24px">
          <Col span="21">
            <Tree ref="tree" :data="adminPermissionMenuTree" show-checkbox @on-check-change="onCheckChange"></Tree>
          </Col>
        </Row>
      </div>
    </div>
    <div class="btn flex_dom flex_item_mid">
      <vButton @click="onSubmit" text="提交" type="primary" :isForm="true" class="mr20"></vButton>
      <vButton @click="onCancel" text="取消" :isForm="true"></vButton>
    </div>
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
          key: 'cname'
        },
        {
          title: '子管理员数/个',
          key: 'date1'
        }
      ],
      selectedIds: []
    };
  },
  computed: {
    ...mapState({
      userAdminDetailInfo: state => state.user.userAdminDetailInfo,
      adminPermissionMenuTree: state => state.permission.adminPermissionMenuTree,
      adminPermissionDedail: state => state.permission.adminPermissionDedail
    })
  },
  mounted() {
    this.getAdminPermissionDetail({ id: this.userAdminDetailInfo.permissionsId }).then(res => {
      this.getAdminPermissionMenuTree({ flag: 'userAdminModify' })
    })
    // console.log(this.$refs.table.offsetHeight - 73)
  },
  methods: {
    ...mapActions([
      'getAdminPermissionMenuTree',
      'getAdminPermissionDetail',
      'adminPermissionModify'
    ]),
    onSubmit() {
      const permissionsMenuList = this.selectedIds.map(id => ({ menuId: id, permissionsId: this.userAdminDetailInfo.permissionsId }))
      const params = {
        ...this.adminPermissionDedail,
        permissionsMenuList
      }
      this.adminPermissionModify(params).then(res => {
        if (res.code === '200') {
          this.$Message.success(res.msg);
          this.getAdminPermissionDetail({ id: this.userAdminDetailInfo.permissionsId })
          this.onCancel()
        }
      })
    },
    onBack() {
      this.$router.back();
    },
    onCancel() {
      this.showConfirm = false;
      console.log('取消');
    },
    onCheckChange() {
      console.log('this.$refs: ', this.$refs);
      const ids = this.$refs.tree.getCheckedAndIndeterminateNodes()
      
      console.log('ids: ', ids);
      this.selectedIds = ids.map(item => item.menuId);

      console.log('this.selectedIds: ', this.selectedIds);
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
