

<template>
  <div class="searchForm">
    <Form ref="searchFormRef" :model="data">
        <Row :gutter="24" type="flex" align="middle" justify="end" style="width: 100%">
          <Col :md="4" :sm="24" :xs="24" v-for="(item, index) in items" :key="index">
            <FormItem :props="data[item.field]" style="margin-left: 0;margin-right: 0">
              <div class="select-wrap v-flex flex_dom">
                <Select :placeholder="item.placeholder" v-if="item.type === 'select'" v-model='data[item.field]'>
                  <Option v-for="item2 in item.options" :value="item2.value" :key="item2.value">{{ item2.label }}</Option>
                </Select>
              </div>
              <Input v-if="item.type === 'input'" v-model='data[item.field]' :placeholder="item.placeholder"></Input>
              <DatePicker v-if="item.type === 'daterange'" type="daterange" placement="bottom-end" :placeholder="item.placeholder"></DatePicker>
              <DatePicker v-if="item.type === 'year'" type="year" placement="bottom-end" :placeholder="item.placeholder"></DatePicker>
              <DatePicker v-if="item.type === 'month'" type="month" format="MM" placement="bottom-end" :placeholder="item.placeholder"></DatePicker>
              <DatePicker v-if="item.type === 'date'" type="date" format="dd" placement="bottom-end" :placeholder="item.placeholder"></DatePicker>
            </FormItem>
          </Col>
          <Col :md="3" :sm="24" :xs="24">
            <div class="btn flex_dom flex_item_mid">
              <div v-for="(item, index) in actions" :key="'action' + index">
                <vButton :text="item.text" :type="item.type" @click="onClick(item.text)"></vButton>
              </div>
            </div>
          </Col>
        </Row>
    </Form>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array
    },
    // actions: {
    //   type: Array
    // },
    onSubmit: {
      type: Function
    }
  },
  data() {
    return {
      data: {
      },
      actions: [
        { type: 'primary', text: '查询' },
        { text: '重置' }
      ]
    }
  },
  methods: {
    onClick(text) {
      if (text === '查询') {
        this.$emit('onSubmit', this.$refs['searchFormRef'], this.data)
      } else {
        for (let key in this.data) {
          this.data[key] = ''
        }
        this.$emit('onSubmit', this.$refs['searchFormRef'], {})
      }
    }
  },
  created() {
    if (this.items) {
      this.items.forEach(item => {
        // this.data[item.field] = ''
        this.$set(this.data, item.field, '')
      })
    }
    console.log('this.data: ', this.data);
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/less/main.less';
  .searchForm {
    width: 100%;
    height: 56px;
    background-color: #fff;
    border-top: 1px solid @line-color;
    .ivu-form{
      height: 100%;
      .ivu-row-flex{
        height: 100%;
        margin: 0 !important;
      }
    }
    .btn{
      >:first-child{
        margin-right: 18px;
      }
    }
  }
</style>