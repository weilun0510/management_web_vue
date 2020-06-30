<template>
  <div class="tab-wrap"  :style="{height: hiddenUnderline ? '23px' : '53px' }">
    <ul>
      <li 
        v-for='(item, index) in data' 
        :key='index' 
        @click='clickItem(index)' 
        :style="{color: index === activeIndex ? '#308EF3' : '', minWidth: hiddenUnderline ? '70px' : '110px' }"
        >
        {{item}}
      </li>
      <div class='line' v-if='!hiddenUnderline' :style="'left:' + offsetLeft + 'px'"></div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    hiddenUnderline: {
      type: Boolean,
      required: false
    }
    // minWidth: {
    //   type: String,
    //   required: false
    // },
  },
  components: {},
  data() {
    return {
      offsetLeft: '39px',
      activeIndex: 0,
      styleObj: {
        color: '#308EF3'
      }
    };
  },
  computed: {},
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
  },
  methods: {
    clickItem(index) {
      this.offsetLeft = index * 110 + 39
      this.activeIndex = index
      this.$emit('handleClick', index)
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/main.less';
.tab-wrap{
  background: #fff;
  ul{
    .flex_dom;
    .flex_item_mid;
    height: 100%;
    // padding: 16px 0;
    // height: 53px;
    position: relative;
    li{
      color: #666972;
      min-width: 110px;
      text-align: center;
      // height: 100%;
      cursor: pointer;
      font-weight: 500;
    }
    .line{
      position: absolute;
      bottom: 0px;
      left: 39px;
      .wh(32px, 2px);
      background: @default-color;
      transition: .3s ease;
    }
  }
}
</style>
