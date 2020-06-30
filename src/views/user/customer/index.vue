<template>
  <div class="height100">
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class="content">
      <vActionBar :actions="actions"></vActionBar>
      <div class="table-wrap">
        <vTable :columns="columns" :data="userList" @page-change="onPageChange"></vTable>
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
      searchFormProps: {
        items: [
          {
            field: 'isExpired',
            type: 'select',
            placeholder: '用户状态',
            options: this.$store.getters.userStatusDic
          },
          {
            field: 'keywords',
            type: 'input',
            placeholder: '搜索' 
          }
        ]
      },
      columns: [
        {
          title: '名称',
          key: 'userName'
        },
        {
          title: '公司名称',
          key: 'companyName'
        },
        {
          title: '注册时间',
          key: 'created'
        },
        {
          title: '到期时间',
          key: 'expireDate'
        },
        {
          title: '操作',
          key: 'address',
          render: (h, params) => {
            const o = [
              {
                name: '编辑',
                click: () => {
                  this.$router.push({ path: '/user/customer/modify', query: { customerId: params.row.customerId }})
                }
              },
              {
                name: '禁用',
                click: () => {
                  this.visible = true
                  this.customerId = params.row.customerId
                },
                color: '#FF6010'
              }
            ]
            return operationH(h, params, o)
          }
        }
      ],
      visible: false,
      customerId: '',
      actions: [
        { text: '+添加客户', type: 'primary', onClick: this.onAdd }
      ]
    };
  },
  computed: mapState({
    userList: state => state.user.userList
  }),
  mounted() {
    this.getUserList();
  },
  methods: {
    ...mapActions([
      'getUserList',
      'userDelete'
    ]),
    onSubmit(searchFormRef, params) {
      this.getUserList(params)
      console.log('params: ', params);
      console.log('searchFormRef: ', searchFormRef);
    },
    onAdd() {
      this.$router.push({
        path: '/user/customer/add'
      })
    },
    // 确认删除
    onOk() {
      this.userDelete({ id: this.customerId }).then(res => {
        console.log('res: ', res);
        if (res.code === '200') {
          this.getUserList();
          this.$Message.success(res.msg);
        }
        this.onCancel()
      })
    },
    onCancel() {
      this.visible = false
    },
    onPageChange(curPageNum) {
      console.log('curPageNum: ', curPageNum);
      this.getUserList({ pageNum: curPageNum })
    }
  }
  
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
