<template>
  <div class="wrap mixin-class v-bg">
      123
      <!-- <vInput :data=''></vInput> -->
      <vInput :value='value' @input='change'></vInput>
      <vInput name='abc2' ></vInput>
      <!-- <Input v-model='data'></Input> -->
      <Button @click='chaxun'>chaxun</Button>
      <div class='height' style="height: 500px;">
        <vTable border :columns="columns1" :autoHeight='false' :data="data1"  @page-change='changePage' @size-change='pageSizeChange'></vTable>
      </div>
      <i-switch v-model="switch1" @on-change="change"></i-switch>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      switch1: true,
      pageObject: {},
      value: 'value',
      data: '',
      content: '本人保证以下入职所填写的教育培训经历、工作经历等各项料真实有效，没有填写虚假信息或隐瞒事实真相；同时保证与之前曾任职单位无存在任何遗留问题，更无任何违法乱纪行为，如有捷饰任何不利于申请此职位的资料，自愿接受公司的解雇处理，同时承担因隐瞒事实而带来的一切后果。',
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'Jon Snow1',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    };
  },
  computed: {},
  mounted() {},
  methods: {
    pageSizeChange(size) {
      console.log({ size })
    },
    changePage(val) {
      console.log({ val })
    },
    change(val) {
      console.log('change', val)
    },
    chaxun() {
      // this.value = '123'
      console.log(this.value)
    },
    abc(val) {
      console.log('abc', val)
    },
    abc2(val) {
      console.log('abc2', val)
    },
    getValue(val) {
      console.log({ val })
    }
  }
};
</script>

<style lang="less" scoped>

</style>
