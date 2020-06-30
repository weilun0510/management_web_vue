<template>
  <div class='vTable' ref='table'>
    <Table 
      :columns='columns' 
      :data='data.list' 
      :loading='loading' 
      :height='!autoHeight ? tableHeight : ""' 
      @on-selection-change="onSelectionChange"></Table>
    <Page 
      v-if="!hiddenPage" 
      :total="data.page.total" 
      :show-total='data.page.showtotal' 
      :show-sizer='data.page.showSizer' 
      :page-size='data.page.pageSize' 
      :current="data.page.current" 
      @on-change='changePage' 
      @on-page-size-change='pageSizeChange' 
      class='mt20 table-page'>
      <slot>合计:<span class="amount">{{data.page.total}}</span>条</slot>
    </Page>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        page: {
          type: Object,
          // required: true,
          default: () => ({
            // showSizer: true, // 是否显示每页条数
            // showtotal: true, // 是否显示总条数
            // total: 100, // 总条数
            // pageSize: 10 // 每页条数
            // current: 1 // 当前页码
          })
        },
        list: {
          type: Array,
          required: true
        }
      })
    },
    hiddenPage: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    autoHeight: {
      type: Boolean,
      default: false // true 不限制高度 false 限制高度 若限制高度 父组件需将vTable包裹并且设置高度 不可使用百分比
    }
  },
  data() {
    return {
      tableHeight: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = this.$refs.table.offsetHeight - 32// padding
      if (!this.hiddenPage) {
        this.tableHeight -= 53 // page
      }
    })
  },
  methods: {
    // 页面改变
    changePage(page) {
      console.log({ page })
      this.$emit('page-change', page)
    },
    // 切换每页条数时的回调，返回切换后的每页条数
    pageSizeChange(size) {
      this.$emit('size-change', size)
    },
    onSelectionChange(selection) {
      this.$emit('onSelectionChange', selection)
    }

  }
}
</script>
<style lang="less">
@import '~@/assets/less/main.less';
  .vTable{
    height: 100%;
    overflow: hidden;
    background: #fff;
    padding: 16px;
    position: relative;
    .table-page{
      width: 100%;
      text-align: right;
    }
    .ivu-table:before{
      background-color: #fff;
    }
    .amount{
      margin: 0 5px;
    }
  }
</style>