<template>
  <div class="applicationList">
    <div style="height: 100%">
      <vTable :columns="columns" :data="data"></vTable>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '联系人',
          key: 'validity'
        },
        {
          title: '联系方式',
          key: 'additionalDay'
        },
        {
          title: '公司名称',
          key: 'additionalDay'
        },
        {
          title: '公司人数',
          key: 'additionalDay'
        },
        {
          title: '所属城市',
          key: 'additionalDay'
        },
        {
          title: '提交时间',
          key: 'additionalDay'
        }
      ],
      data: {
        list: [
          {
            validity: 1,
            additionalDay: 2
          }
        ],        
        page: {
          showtotal: true, // 是否显示总条数
          total: 122, // 总条数
          pageSize: 10 // 每页条数
        }
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit(form) {
      console.log('form: ', form);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
