<template>
  <div class="contentWrap" style="height: calc(100% - 133px)">
    <div class="content height100" style="overflow: auto">
      <div class="height100">
        <vTable :data="logList" :columns="columns" @page-change="onPageChange"></vTable>
      </div>
    </div>
  </div>  
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  components: {},
  data() {
    return {
      columns: [
        {
          title: '操作类型',
          key: 'operation_type'
        },
        {
          title: '操作内容',
          key: 'operation'
        },
        {
          title: '操作IP',
          key: 'ip'
        },
        {
          title: '操作时间',
          key: 'created'
        }
      ]
    };
  },
  computed: {
    ...mapState({
      userAdminDetailInfo: state => state.user.userAdminDetailInfo,
      logList: state => state.log.logList
    })
  },
  mounted() {
    this.getLog({ username: this.userAdminDetailInfo.userName })
  },
  methods: {
    ...mapActions([
      'getLog'
    ]),
    onPageChange(curPageNum) {
      console.log('curPageNum: ', curPageNum);
      this.getLog({ pageNum: curPageNum })
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
