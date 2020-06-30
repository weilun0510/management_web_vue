<template>
  <div class="addPermissionWrap p18">
    <div class='permissionContent'>
      <Row class='flex_dom flex_item_mid row'>
        <Col :span='4'>
          <p>客户权限组名</p>
        </Col>
        <Col :span='13'>
          <Input v-model="customPermissions.permissionsName" placeholder="请输入客户权限组名称" />
        </Col>
      </Row>
      <Row class='flex_dom flex_item_mid row mt30 customerPAdd'>
        <Col :span='4'>
          <p>客户权限组</p>
        </Col>
        <Col :span='13'>
          <vTable :columns="columns" :data="data" :autoHeight="true" :hiddenPage="true" style="padding: 0 16px 16px 0"></vTable>
          <p class=tips>账号为0，表示无该应用权限</p>
        </Col>
      </Row>
      <div class="btn flex_dom flex_item_mid">
        <vButton @click="onSubmit" text="提交" type="primary" :isForm="true" class="mr20"></vButton>
        <vButton @click="onCancel" text="取消" :isForm="true"></vButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  components: {
  },
  data() {
    return {
      customPermissions: {
        type: 1,
        permissionsName: '',
        canUserNumber: null, //  可创建账户数
        validity: null // 有效期/天
      },
      columns: [
        {
          title: '应用名',
          key: 'cname'
        },
        {
          title: '可创建账户数/个',
          key: 'date1',
          render: (h, { row }) => {
            console.log('row: ', row);
            return h('Input', {
              props: {
                placeholder: '请输入',
                value: ''
              },
              style: {
                border: 'none',
                color: '#515a6e',
                width: '100%'
              },
              on: {
                input: (val) => {
                  this.customPermissions.canUserNumber = val
                }
              }
            })
          }
        },
        {
          title: '有效期/天',
          key: 'date1',
          render: (h, { row }) => {
            console.log('row: ', row);
            return h('Input', {
              props: {
                placeholder: '请输入',
                value: ''
              },
              style: {
                border: 'none',
                color: '#515a6e',
                width: '100%'
              },
              on: {
                input: (val) => {
                  this.customPermissions.validity = val
                }
              }
            })
          }
        }
      ],
      data: {
        list: [
          {
            cname: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          }
        ],
        page: {}
      }
    };
  },
  computed: {},
  mounted() {
    
  },
  methods: {
    ...mapActions([
      'permissionAdd'
    ]),
    onSubmit() {
      this.permissionAdd(this.customPermissions).then(res => {
        if (res.code === '200') {
          this.$Message.success(res.msg);
          this.onCancel()
        }
      })
    },
    onCancel() {
      this.$router.back()
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less">
.customerPAdd{
  .ivu-input{
    border: none;
  }
  .ivu-input:focus{
    box-shadow: none;
  }
}
</style>