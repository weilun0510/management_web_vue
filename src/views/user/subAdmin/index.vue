<template>
  <div class="height100">
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class="content">
      <vActionBar :actions="actions" />
      <div class="table-wrap">
        <vTable :columns="columns" :data="userAdminList" @page-change="onPageChange"></vTable>
      </div>
    </div>
    <vConfirm text='确定禁用该用户？' @onOk='onOk' @onCancel='onCancel' :visible='visible'></vConfirm>
  </div>
</template>

<script>
import { operationH } from '@/utils/index';
import { mapActions, mapState } from 'vuex';
export default {
  components: {},
  data() {
    return {
      actions: [
        { text: '+添加子管理员', type: 'primary', onClick: this.onAdd }
      ],
      searchFormProps: {
        items: [
          {
            field: 'keyword',
            type: 'input',
            placeholder: '用户名或手机号' 
          }
        ]
      },
      activeIndex: 0,
      columns: [
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '子管理员权限组',
          key: 'permissionsName'
        },
        {
          title: '注册时间',
          key: 'created'
        },
        {
          title: '到期时间',
          key: 'validity'
        },
        {
          title: '操作',
          key: 'operation',
          render: (h, params) => {
            const o = [
              {
                name: '编辑',
                click: () => {
                  this.$router.push({ path: '/user/subAdmin/modify', query: { adminId: params.row.adminId }})
                }
              },
              {
                name: '禁用',
                click: () => {
                  this.visible = true
                  this.adminId = params.row.adminId
                },
                color: '#FF6010'
              }
            ]
            return operationH(h, params, o)
          }
        }
      ],
      data: {
        list: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          }
        ],
        page: {}
      },
      visible: false,
      adminId: ''
    };
  },
  computed: mapState({
    userAdminList: state => state.user.userAdminList
  }),
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
    this.getUserAdminList();
  },
  methods: {
    ...mapActions([
      'getUserAdminList',
      'userAdminDelete'
    ]),
    onSubmit(searchFormRef, data) {
      this.getUserAdminList(data);
    },
    onAdd() {
      this.$router.push({ path: '/user/subAdmin/add' })
    },
    // 确认删除
    onOk() {
      this.userAdminDelete({ id: this.adminId }).then(res => {
        if (res.code === '200') {
          this.getUserAdminList();
          this.$Message.success(res.msg);
        }
        this.onCancel()
      })
    },
    onCancel() {
      this.visible = false
    },
    onPageChange(curPageNum) {
      this.getUserAdminList({ pageNum: curPageNum })
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
