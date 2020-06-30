<style>
  .ivu-modal-content{
    height: 100%;
  }
  .ivu-modal-header{
    padding: 16px 24px;
    border-bottom: 0;
  }
  .ivu-modal-body{
    height: calc(100% - 54px - 64px);
    overflow: auto;
    padding: 24px;
  }
  .ivu-modal-footer{
    border-top: 0;
    padding: 16px 24px;
  }
  .ivu-modal-footer .ivu-btn-text{
      border-color: #2d8cf0;
      color: #2d8cf0;
  }
</style>
<template>
  <!-- <div class="modalDetailWrap"> -->
    <Modal
      :styles="{width: !fill ? '742px' : '480px', height: '670px', overflow: 'auto'}"
      v-model="isOpen"
      :title="title"
      :class-name="className"
      @on-ok="onOk"
      @on-cancel="onCancel">
      <div class="items">
        <div class="modalItem" v-for="(item, index) in items" :key="'element' + index" :style="{width: (fill || !fill && item.fill) ? '100%' : '50%'}">
          <div class="infoField">
            <div class="fieldName" :style="{width: fill ? '200px' : '100px'}">{{item.name}}</div>
            <div class="fieldValue" v-if="item.type === 'img'">
              <img class="image" :src="item.value" alt="">
            </div>
            <div class="fieldValue" v-else-if="item.type === 'imgs'">
              <template v-for="(url, index) in item.imgsList" >
                <img 
                  class="image" 
                  :src="url"
                  :key="`element${index}`"
                  alt="">
              </template>
            </div>
            <div class="fieldValue ov" :title="item.value" v-else>
              <vButton v-if="item.type === 'button'" isForm :type="item.buttonProps.type" :text="item.buttonProps.text" @click="item.buttonProps.onClick()"></vButton>
              <span v-else :style="{color: item.color}">{{item.value}}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  <!-- </div> -->
</template>
<script>

export default {
  props: {
    // 是否填满
    fill: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '详细信息'
    },
    items: {
      type: Array,
      default: () => ({
        // btnType: '',
        name: '',
        value: '',
        type: 'text', // text / img / button /imgs,
        fill: false, // 两列的情况下是否独占一行
        buttonProps: {
          text: '',
          type: '',
          iForm: false,
          onClick: () => {},
          color: '#33393F'
        }
      })
    },
    labelWidth: {
      type: String,
      default: '30%'
    },
    visible: {
      type: Boolean
    },
    className: {
      type: String
    }
    // okText: {
    //   type: String,
    //   default: '确认'
    // },
    
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
    isOpen: {
      get() {
        return this.visible
      },
      set(val) {}
    }
  },
  methods: {
    onOk() {
      this.$emit('update:visible', false)
    },
    onCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="less" scoped>
// .modalDetailWrap{
  .items{
    display: flex;
    flex-wrap: wrap;
    .modalItem{
      // width: 50%;
      // padding: 0 30px;
      margin-bottom: 30px;
      
      .infoField {
        flex: 1;
        display: flex;
        .fieldName {
          text-align: right;
          color: #868992;
          font-size: 14px;
          font-weight: 500;
        }
        .ov{
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .fieldValue {
          // width: 70%;
          flex: 1;
          padding-left: 30px;
          font-size: 14px;
          font-weight: 500;
          .image{
            width: 80px;
            height: 80px;
          }
        }
      }
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
  
// }
</style>