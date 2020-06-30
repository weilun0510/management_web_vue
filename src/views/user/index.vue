<template>
  <div class="height100">
    <vTab :data='tabList' @handleClick="this.onTabsChange"></vTab>
    <div style="height: calc(100% - 53px)">
      <customer v-if="activeIndex === 0"></customer>
      <subAdmin v-else-if="activeIndex === 1"></subAdmin>
      <recycleBin v-else-if="activeIndex === 2"></recycleBin>
      <tooltext v-else></tooltext>
    </div>
  </div>
</template>

<script>
import customer from './customer/index';
import subAdmin from './subAdmin/index';
import recycleBin from './recycleBin/index';
import tooltext from './tooltext/index';

export default {
  components: {
    customer,
    subAdmin,
    recycleBin,
    tooltext
  },
  data() {
    return {
      tabList: ['客户管理', '子管理员', '账户回收站', '自定义到期提示'],
      activeIndex: 0
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    onTabsChange(index) {
      console.log('index: ', index);
      this.activeIndex = index;
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('from: ', from);
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // next()
    next(vm => {
      console.log('vm: ', vm);
      if (from.path === '/user/customer/add' || from.path === '/user/customer/modify') {
        vm.$store._actions.getUserList[0]()
      } else if (from.path === '/user/subAdmin/add' || from.path === '/user/subAdmin/modify') {
        vm.$store._actions.getUserAdminList[0]()
      }
    // 通过 `vm` 访问组件实例
    })
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
