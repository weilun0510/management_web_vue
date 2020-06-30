<template>
  <div class="uploadWrap">
    <template v-if="uploadType === 'picture'">
      <div class="demo-upload-list" v-for="(item, index) in fileList" :key="index">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </div>
      <Upload
        :on-success="onSuccess"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :show-upload-list="showUploadList"
        :max-size="maxSize"
        :format="format"
        :headers="headers"
        multiple
        name="files"
        type="drag"
        :action="baseUrl + '/common/oss/upload'"
        style="display: inline-block;width:100px;">
          <div class="addFiles">
            <img src="@/assets/images/upload.png" alt="">
          </div>
      </Upload>
      <div class="tip" v-if="fileTip">{{fileTip}}</div>
      <Modal title="查看" v-model="visible">
        <img :src="viewImage.url" v-if="visible" style="width: 100%">
      </Modal>
    </template>
    <template v-else>
      <Upload
        :on-success="onSuccess"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :on-remove="handleRemove"
        :headers="headers"
        :max-size="maxSize"
        name="files"
        :format="format"
        :action="baseUrl + '/common/oss/upload'">
        <vButton type="primary" text="上传文件"></vButton>
      </Upload>
    </template>
  </div>
</template>

<script>
import { baseUrl } from '@/config/env';
export default {
  props: {
    // 图片还是文件
    uploadType: {
      type: String,
      required: true,
      default: 'picture' // 'picture' || 'file'
    },
    // 接受类型
    format: {
      type: Array,
      default: function() {
        if (this.uploadType === 'picture') {
          return ['jpg', 'jpeg', 'png']
        }
        return ['xls', 'xlsx', 'MP3', 'AAC', 'Ogg', 'Vorbis']
      }
    },
    // 文件大小
    maxSize: {
      type: Number,
      default: 2048 // 单位kb
    },
    // 最多文件数量
    maxFiles: {
      type: Number,
      default: 1
    },
    showUploadList: {
      type: Boolean,
      default: false
    },
    // 默认文件列表
    fileList: {
      type: Array,
      default: () => []
    },
    // 文件提示
    fileTip: {
      type: String,
      required: false
    },
    // 表单参数
    field: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {
      baseUrl,
      headers: {
        'Authorization': localStorage.getItem('token') || ''
      },
      visible: false,
      viewImage: {
        url: ''
      },
      localUploadList: []
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleView(item) {
      this.viewImage = item
      this.visible = true;
    },
    handleRemove({ url }) {
      this.fileList.splice(this.fileList.findIndex(item => item.url === url), 1)
    },
    onSuccess(res, file) {
      console.log('res: ', res);
      const item = {
        url: res.data[0].url
      }
      this.fileList.push(item)
      this.$emit('onChange', this.fileList, this.field)
    },
    handleFormatError(file) {
      let desc = '请选择图片格式文件'
      if (this.uploadType === 'file') {
        desc = '请选择正确的文件格式'
      } 
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: desc
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超过最大超过限制',
        desc: '文件  ' + file.name + ' 太大，不能超过' + this.maxSize + 'kb'
      });
    },
    handleBeforeUpload(file) {
      console.log('file: ', file);
      const check = this.fileList.length < this.maxFiles;
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传' + this.maxFiles + '个文件'
        });
      }
      return check;
    }
    // handleBeforeUpload(file) {
    //   // 创建一个 FileReader 对象
    //   let reader = new FileReader()
    //   // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
    //   // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
    //   // 读取文件作为 URL 可访问地址
    //   reader.readAsDataURL(file)

    //   const _this = this
    //   reader.onloadend = function(e) {
    //     console.log('reader: ', reader);
    //     file.url = reader.result
    //     _this.localUploadList.push(file)
    //   }
    // }
  }
};
</script>

<style lang="less">
@import '~@/assets/less/main.less';
.uploadWrap{
  .addFiles{
    width: 100px;
    height:100px;
    img{
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
  .ivu-upload-drag, .ivu-upload-drag:hover{
    border: none;
  }
  .demo-upload-list{
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 20px;
  }
  .demo-upload-list img{
      width: 100%;
      height: 100%;
  }
  .demo-upload-list-cover{
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
      display: block;
  }
  .demo-upload-list-cover i{
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
  }
}

</style>
