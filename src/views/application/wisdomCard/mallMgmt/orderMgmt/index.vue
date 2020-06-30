<template>
  <div class="height100 mallMgmt-orderMgmt">
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class="content">
      <vActionBar :actions="actions"></vActionBar>
      <div class="cardTabs">
        <vCardTabs @onCardTabsChange="onCardTabsChange" :tabPaneList="tabPaneList"></vCardTabs>
      </div>
      <div class="table-wrap">
        <vTable :columns="columns" :data="data" @onSelectionChange="onSelectionChange"></vTable>
      </div>
    </div>
    <vDrawer 
      :visible="visible" 
      title="订单详情"
      hiddenFooter
      :width="860"
      maskClosable
      @onCancel="onCancel">
      <div class="orderMgmtProgress">
        <div class="progressItem" v-for="(item, index) in progressList" :key="`element${index}`">
          <img src="@/assets/images/complete.png" alt="">
          <div class="name">12</div>
          <div class="date">2020.02.23 11:23:56</div>
        </div>
      </div>
      <div class="baseInfo mt20 padding24">
        <div class="sectionTitle">
          <div class="name">基础信息</div>
        </div>
        <div class="sectinoContent">
          <div class="item">
            <div class="name">订单号</div>
            <div class="value">123838</div>
          </div>
          <div class="item">
            <div class="name">订单状态</div>
            <div class="value flex_dom flex_item_between flex_item_mid">
                <div class="status">待发货 （等待买家付款）</div>
                <div class="btns flex_dom">
                  <vButton type='primary' text='立即发货' @click='confirm' class='mr18'></vButton>
                  <vButton type='default' text='退款' @click='confirm' class='mr18'></vButton>
                  <vButton type='default' text='关闭订单' @click='confirm' class='mr18'></vButton>
                  <vButton type='default' text='添加备注' @click='confirm' class='mr18'></vButton>
                </div>
            </div>
          </div>
          <div class="item">
            <div class="name">付款方式</div>
            <div class="value">123838</div>
          </div>
          <div class="item">
            <div class="name">配送方式</div>
            <div class="value">123838</div>
          </div>
          <div class="item">
            <div class="name">买家</div>
            <div class="value">123838</div>
          </div>
          <div class="item">
            <div class="name">收货人</div>
            <div class="value">123838</div>
          </div>
          <div class="item">
            <div class="name">联系电话</div>
            <div class="value">123838</div>
          </div>
        </div>
      </div>
      <div class="baseInfo mt20 padding24">
        <div class="sectionTitle">
          <div class="name">基础信息</div>
        </div>
        <div class="sectinoContent">
          <vTable :columns="columns2" :data="data2" hiddenPage></vTable>
        </div>
        <div class="statistical flex_dom flex_item_between">
          <div class="item">
            <div class="name">商品小计</div>
            <div class="value">123838</div>
          </div>
          <div class="item">
            <div class="name">运费</div>
            <div class="value">123838</div>
          </div>
          <div class="item">
            <div class="name">实付</div>
            <div class="value">123838</div>
          </div>
        </div>
      </div>
    </vDrawer>
  </div>
</template>

<script>
import { operationH } from '@/utils/index';
import completeIcon from '@/assets/images/complete.png'
export default {
  components: {},
  data() {
    return {
      searchFormProps: {
        items: [
          {
            field: 'type',
            type: 'select',
            placeholder: '不按时间',
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
            field: 'type2',
            type: 'daterange',
            placeholder: '时间'
          },
          {
            field: 'daterange',
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
            field: 'type',
            type: 'input',
            placeholder: '订单号'
          },
          {
            field: 'type',
            type: 'input',
            placeholder: '关键词'
          }
        ]
      },
      actions: [
        { text: '导出', type: 'primary', onClick: this.onAdd },
        { text: '批量导出', onClick: this.onAdd }
      ],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'name'
        },
        {
          title: '商品清单',
          key: 'cname'
        },
        {
          title: '买家',
          key: 'date1'
        },
        {
          title: '实付金额(元)',
          key: 'date2'
        },
        {
          title: '状态',
          key: 'type'
        },
        {
          title: '配送方式',
          key: 'date2'
        },
        {
          title: '操作',
          key: 'address',
          width: 220,
          render: (h, params) => {
            const o = [
              {
                name: '查看',
                click: () => {
                  this.onCheckDetail()
                  // this.$router.push('/application/wisdomCard/radarMgmt/visitorListMore')
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
      progressList: [
        {
          img: completeIcon,
          name: '买家下单',
          date: '2020.02.23 11:23:56'
        },
        {
          img: completeIcon,
          name: '买家付款',
          date: '2020.02.23 11:23:59'
        },
        {
          img: '',
          name: '确认收货',
          date: '2020.02.23 11:23:56'
        },
        {
          img: '',
          name: '订单完成 ',
          date: '2020.02.23 11:23:56'
        }
      ],
      columns2: [
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
          title: '类别',
          key: 'date1'
        },
        {
          title: '单价(元)',
          key: 'date2'
        },
        {
          title: '数量',
          key: 'type'
        },
        {
          title: '原价(元）',
          key: 'date2'
        },
        {
          title: '折扣',
          key: 'type'
        },
        {
          title: '状态',
          key: 'date2'
        }
      ],
      data2: {
        list: [
          {
            name: '',
            date1: 2
          }
        ]
      },
      tabPaneList: [
        { label: '全部', name: 'cardTab1' },
        { label: '待付款', name: 'cardTab2' },
        { label: '待发货', name: 'cardTab3' },
        { label: '待收货', name: 'cardTab4' },
        { label: '已完成', name: 'cardTab5' },
        { label: '已关闭', name: 'cardTab6' },
        { label: '维权申请', name: 'cardTab7' },
        { label: '维权完成', name: 'cardTab8' }
      ]
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
    onCancel() {
      this.visible = false
    },
    onCheckDetail() {
      this.visible = true
    }
    // onBeforeClose() {
    //   // 返回 Promise 可以阻止关闭
    //   return new Promise((resolve, reject) => {})
    // }
  }
};
</script>

<style lang="less">
@import "./index.less";
// .mallMgmt-orderMgmt{
  .padding24{
    padding: 24px;
  }
  .baseInfo{
    // height: 426px;
    background: #fff;
  }
  .item{
    height: 50px;
    display: flex;
    align-items: center;
    .name{
      color: #868992;
      font-size: 14px;
      width: 100px;
      text-align: right;
    }
    .value{
      flex: 1;
      color: #3C404B;
      margin-left: 20px;
      font-weight: 500;
      .status{
        color: #FDAD03;
      }
    }
  }
  .orderMgmtProgress{
    width: 100%;
    height: 228px;
    background-color: #fff;
    display: flex;
    .progressItem{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width: 30px;
        height: 30px;
      }
      .name{
        font-size: 16px;
        color: #868992;
        margin: 10px 0;
      }
      .activeName{
        font-size: 16px;
        color: #3C404B;
        margin: 10px 0;
      }
      .date{
        font-size: 14px;
        color: #666972;
      }
    }
  }
  .statistical{
    padding: 0 40px 0 20px;
    background: #FAFDFF;
  }
// }

</style>
