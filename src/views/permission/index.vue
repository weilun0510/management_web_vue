<template>
  <div class="permissionWrap">
    <vTab :data='tabList' @handleClick='handleClick'></vTab>
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class='content'>
      <div class='height100'>
        <div class="btn-wrap">
          <vButton type='primary' :text='tabIndex === 0 ? "+添加客户组" : "+添加子管理员组"' @click='addPermission'></vButton>
        </div>
        <!-- <vActionBar :actions="actions" /> -->
        <div style="height: calc(100% - 69px)">
          <vTable
            :columns="tabIndex === 0 ? columns1 : columns2"
            :data="tableData"
            :autoHeight='false'
            @page-change="onPageChange">
          </vTable>
        </div>
      </div>
    </div>
    <vConfirm text='确定删除该客户权限组？（删除后不影响已配置客户权限）' @onOk='onOk' @onCancel='onCancel' :visible='visible'></vConfirm>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { operationH } from '@/utils/index';
import { Message } from 'view-design'
export default {
  components: {
  },
  data() {
    return {
      actions: [
        { text: this.tabIndex === 0 ? '+添加客户组' : '+添加子管理员组', type: 'primary', onClick: this.addPermission }
      ],
      tabIndex: 0,
      tabList: ['客户权限组', '子管理员权限组'],
      searchFormProps: {
        items: [
          {
            field: 'keywords',
            type: 'input',
            placeholder: '搜索' 
          }
        ]
      },
      columns1: [ // 客户权限组表头
        {
          title: '客户组',
          key: 'permissionsName'
        },
        {
          title: '创建人',
          key: 'createName'
        },
        {
          title: '轻说',
          key: 'customerPermissionsId',
          render: (h, params) => {
            return h('div', [
              h('div', {
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '可创建账户数: ' + params.row.canUserNumber),
              h('div', {
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '账号有效期: ' + params.row.validity)
            ]);
          }
        },
        {
          title: '操作',
          key: 'address',
          render: (h, params) => {
            const o = [
              {
                name: '编辑',
                click: () => {
                  // 客户权限组编辑
                  this.$router.push({ path: '/permission/customer/modify', query: { customerPermissionsId: params.row.customerPermissionsId }})
                }
              },
              {
                name: '删除',
                click: () => {
                  this.delAction(params.row.customerPermissionsId)
                }
              }
            ]
            return operationH(h, params, o)
          }
        }
      ],
      columns2: [ // 子管理员权限组
        {
          title: '权限组名',
          key: 'permissionsName'
        },
        {
          title: '创建人',
          key: 'createName'
        },
        {
          title: '有效期',
          key: 'validity'
        },
        {
          title: '可创建客户（公司）数',
          key: 'canCustomerNumber'
        },
        {
          title: '操作',
          key: 'address',
          render: (h, params) => {
            const o = [
              {
                name: '编辑',
                click: () => {
                  this.$router.push({ path: '/permission/subAdmin/modify', query: { adminPermissionsId: params.row.adminPermissionsId }})
                }
              },
              {
                name: '删除',
                click: () => {
                  this.delAction(params.row.adminPermissionsId)
                }
              }
            ]
            return operationH(h, params, o)
          }
        }
      ],
      visible: false,
      curPermissionsId: null
    };
  },
  computed: mapState({
    tableData: function(state) {
      console.log(this.tabIndex);
      return this.tabIndex === 0 ? state.permission.permissionList : state.permission.adminPermissionList
    }
  }),
  watch: {
    tabIndex: function(val) {
      val === 0 ? this.getPermissionList() : this.adminPermissionList()
    }
  },
  mounted() {
    console.log('this.tabIndex: ', this.tabIndex);
    this.getPermissionList();
  },
  created() {
    console.log('this.tabIndex: ', this.$router);
    // console.log('this.tabIndex: ', this.$router.params.tabIndex);
  },
  methods: {
    ...mapActions([
      'getPermissionList',
      'permissionDelete',
      'adminPermissionList',
      'adminPermissionDelete'
    ]),
    addPermission() {
      if (this.tabIndex === 0) {
        this.$router.push({ path: '/permission/customer/add' })
      } else {
        this.$router.push({ path: '/permission/subAdmin/add' })
        
      }
    },
    // 点击tab
    handleClick(index) {
      this.tabIndex = index
    },
    onSubmit(searchFormRef, params) {
      this.tabIndex === 0 ? this.getPermissionList(params) : this.adminPermissionList(params)
    },
    delAction(id) {
      console.log('id: ', id);
      this.curPermissionsId = id;
      this.visible = true
    },
    // 确认删除
    onOk() {
      console.log('onOk')
      if (this.tabIndex === 0) {
        this.permissionDelete({ id: this.curPermissionsId }).then(res => {
          console.log('res: ', res);
          if (res.code === '200') {
            this.getPermissionList();
            Message.success(res.msg);
          }
          this.onCancel()
        })
      } else {
        this.adminPermissionDelete({ id: this.curPermissionsId }).then(res => {
          console.log('res: ', res);
          if (res.code === '200') {
            this.adminPermissionList();
            Message.success(res.msg);
          }
          this.onCancel()
        })
      }
    },
    onCancel() {
      this.visible = false
      console.log('onCancel')
    },
    // 编辑
    enterFirm() {

    },
    onPageChange(curPageNum) {
      if (this.tabIndex === 0) {
        this.getPermissionList({ pageNum: curPageNum })
      } else {
        this.adminPermissionList({ pageNum: curPageNum })
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // next()
    next(vm => {
      if (from.path === '/permission/customer/add' || from.path === '/permission/customer/modify') {
        vm.getPermissionList()
      }
      if (from.path === '/permission/subAdmin/add' || from.path === '/permission/subAdmin/modify') {
        vm.adminPermissionList()
      }
    // 通过 `vm` 访问组件实例
    })
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
