<template>
  <div class="height100 goodsMgmt">
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class="content">
      <vActionBar :actions="actions"></vActionBar>
      <div class="tabLeft">
        <Tabs type="card" @on-click="onCardTabsChange">
          <TabPane label="出售中" name="cardTab1"></TabPane>
          <TabPane label="仓库中" name="cardTab2"></TabPane>
          <TabPane label="已售罄" name="cardTab3"></TabPane>
          <TabPane label="回收站" name="cardTab4"></TabPane>
        </Tabs>
      </div>
      <div class="table-wrap">
        <vTable :columns="columns" :data="data" @onSelectionChange="onSelectionChange"></vTable>
      </div>
    </div>
    <vDrawerForm 
      :visible.sync="drawerFormVisible" 
      :title="add ? '新增商品' : '修改商品'"
      :maskClosable="false"
      v-bind="drawerFormProps"
      @onSubmit="onSubmitDrawerForm">
    </vDrawerForm>
    <vConfirm text='是否删除此商品？删除后此商品将进入回收站' @onOk='onOk' @onCancel='onCancel' :visible='visible'></vConfirm>
  </div>
</template>

<script>
import { operationH } from '@/utils/index';
export default {
  components: {
  },
  data() {
    return {
      searchFormProps: {
        items: [
          {
            field: 'type',
            type: 'select',
            placeholder: '选择公司',
            options: [
              {
                value: 1,
                label: 22
              },
              {
                value: 2,
                label: 3
              }
            ]
          },
          {
            field: 'daterange',
            type: 'select',
            placeholder: '商品分类',
            options: [
              {
                value: 1,
                label: 22
              },
              {
                value: 2,
                label: 3
              }
            ]
          },
          {
            field: 'type',
            type: 'input',
            placeholder: '商品名称'
          }
        ]
      },
      drawerFormProps: {
        items: [
          {
            name: '用户名',
            field: 'companyName',
            type: 'input',
            initialValue: ''
          },
          {
            name: '商品名称',
            field: 'goodsName',
            type: 'input',
            initialValue: '苹果'
          },
          {
            name: '商品分类',
            field: 'companyName2',
            type: 'select',
            initialValue: '',
            options: [
              {
                value: 1,
                label: 22
              },
              {
                value: 2,
                label: 3
              }
            ]
          },
          {
            name: '商品类别',
            field: 'companyName2q',
            type: 'radio',
            initialValue: 1,
            options: [
              {
                value: 1,
                label: '虚拟物品'
              }
            ]
          },
          {
            name: '销售价(元)',
            field: 'money',
            type: 'input',
            inputType: 'number',
            initialValue: 1
          },
          {
            name: '原价(元)',
            field: 'money2',
            type: 'input',
            inputType: 'number',
            initialValue: 1
          },
          {
            name: '成本价(元)',
            field: 'money22',
            type: 'input',
            inputType: 'number',
            initialValue: 1
          },
          {
            name: '已出售数',
            field: 'money222',
            type: 'input',
            inputType: 'number',
            initialValue: 1
          },
          {
            name: '总库存',
            field: 'money22332',
            type: 'input',
            inputType: 'number',
            initialValue: 1
          },
          {
            name: '库存显示',
            field: 'companyNa2me2q',
            type: 'radio',
            initialValue: 1,
            options: [
              {
                value: 0,
                label: '否'
              },
              {
                value: 1,
                label: '是'
              }
            ]
          },
          {
            name: '商品图片',
            field: 'fileList',
            type: 'upload',
            fileList: [
              { url: 'https://static-shanghai.hanku.net.cn/jqymanage/customer-profiles/0b8e2d967cb2453b8b245a87b2e3075b.jpg' }
            ],
            maxFiles: 2
          },
          {
            name: '商品详情',
            field: 'goodsInfo',
            type: 'input',
            inputType: 'textarea',
            initialValue: '12'
          },
          {
            name: '最多购买数',
            field: 'goodsIn2fo',
            type: 'input',
            inputType: 'number',
            initialValue: '12'
          },
          {
            name: '配送方式',
            field: 'companyNam2e2q',
            type: 'radio',
            initialValue: 1,
            options: [
              {
                value: 1,
                label: '自提'
              },
              {
                value: 2,
                label: '核销'
              }
            ]
          },
          {
            name: '自动发货',
            field: 'ww',
            type: 'radio',
            initialValue: 1,
            options: [
              {
                value: 0,
                label: '否'
              },
              {
                value: 1,
                label: '是'
              }
            ]
          },
          {
            name: '状态',
            field: 'companyNamwe2q',
            type: 'radio',
            initialValue: 1,
            options: [
              {
                value: 1,
                label: '商家出售'
              },
              {
                value: 2,
                label: '放入仓库'
              }
            ]
          }
        ],
        rules: {
          companyName: [
            { required: true, message: '公司名不能为空' }
          ],
          goodsName: [
            { required: true, message: '商品名称不能为空' }
          ],
          password: [
            { required: true, trigger: 'blur', message: '密码不能为空' },
            { type: 'string', min: 6, message: '密码至少为6位字符', trigger: 'blur' }
          ], 
          customerPermissions: [
            { required: true, message: '权限方式不能为空' }
          ],
          permissionsId: [
            { required: true, message: '权限组不能为空' }
          ],
          validity: [
            { required: true, message: '有效期不能为空' }
          ]
        }
      },
      actions: [
        { text: '添加商品', type: 'primary', onClick: this.onAddGoods },
        { text: '批量删除', onClick: () => {} },
        { text: '批量下架', onClick: () => {} },
        { text: '批量上架', onClick: () => {} },
        { text: '批量分类', onClick: () => {} },
        { text: '恢复到仓库', onClick: () => {} }
      ],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '排序',
          key: 'name'
        },
        {
          title: '缩放图',
          key: 'name',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: ''
              },
              style: {
                width: '56px',
                height: '56px',
                margin: '10px 0'
              }
            })
          }
        },
        {
          title: '商品名称',
          key: 'cname'
        },
        {
          title: '实际销量',
          key: 'date1'
        },
        {
          title: '库存',
          key: 'date2'
        },
        {
          title: '类别',
          key: 'type'
        },
        {
          title: '单价(元)',
          key: 'date2'
        },
        {
          title: '添加时间',
          key: 'date2'
        },
        {
          title: '活动',
          key: 'date2'
        },
        {
          title: '状态',
          key: 'date2'
        },
        {
          title: '操作',
          key: 'address',
          width: 220,
          render: (h, params) => {
            const o = [
              {
                name: '编辑',
                click: () => {
                  // this.$router.push('/application/wisdomCard/mallMgmt/goodsMgmt/add')
                  this.onUpdateGoods()
                }
              },
              {
                name: '删除',
                click: () => {
                  this.visible = true
                }
              },
              {
                name: '链接',
                click: () => {
                  console.log(1);
                }
              }
            ]
            return operationH(h, params, o)
          }
        }
      ],
      data: {
        list: [
          {
            id: 1,
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
            status: 1
          },
          {
            id: 2,
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
            status: 1
          }
        ],
        page: {
          showtotal: true, // 是否显示总条数
          total: 100, // 总条数
          pageSize: 10 // 每页条数
        }
      },
      selectionId: [],
      visible: false,
      drawerFormVisible: false,
      add: false,
      modify: false
    };
  },
  computed: {},
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
  },
  methods: {
    onSubmit(searchFormRef, data) {
      console.log('data: ', data);
      // console.log('searchFormRef: ', searchFormRef);
    },
    onCardTabsChange() {

    },
    onSelectionChange(selection) {
      console.log('selection: ', selection);
      this.selectionId = selection.map(item => item.id)
      console.log('this.selectionId: ', this.selectionId);
    },
    // 确认删除
    onOk() {
      // this.userDelete({ id: this.customerId }).then(res => {
      //   console.log('res: ', res);
      //   if (res.code === '200') {
      //     this.getUserList();
      //     this.$Message.success(res.msg);
      //   }
      //   this.onCancel()
      // })
    },
    onAddGoods() {
      this.add = true
      this.drawerFormVisible = true
    },
    onUpdateGoods() {
      this.modify = true
      this.drawerFormVisible = true
    },
    onCancel() {
      this.visible = false
    },
    onCancelDrawerForm() {
      this.drawerFormVisible = false
    },
    onSubmitDrawerForm(form) {
      console.log(' form: ', form);
      console.log('完成后取消');
    },
    onUploadSuccess(files) {
      // this.fileList = files
      console.log('this.fileList: ', this.fileList);
    }
  }  
}
</script>
<style lang="less">
@import "./index.less";
</style>
