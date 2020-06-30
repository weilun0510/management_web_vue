<template>
  <vDrawer
    :title="title"
    :visible="visible"
    :maskClosable="maskClosable"
    :width="width"
    @onCancel="onCancel"
    @onSubmit="onSubmit"
  >
    <template>
      <div class="formWrap">
        <Form ref="searchFormRef" :model="form" :rules="rules" :label-width="labelwidth">
            <Row :gutter="24" style="width: 100%; " v-for="(item, index) in items" :key="index">
              <Col :md="16" :sm="16" :xs="16">
                <FormItem :label="item.name" :prop="item.field">
                  <Select  v-if="item.type === 'select'" v-model='form[item.field]'>
                    <Option v-for="item2 in item.options" :value="item2.value" :key="item2.value">{{ item2.label }}</Option>
                  </Select>
                  <Input v-if="item.type === 'input'" v-model='form[item.field]' :type="item.inputType || 'text'"></Input>
                  <RadioGroup v-model="form[item.field]" v-if="item.type === 'radio'">
                    <Radio v-for="item2 in item.options" :label="item2.value" :key="item2.value" style="margin-right: 30px">
                      {{ item2.label }}
                    </Radio>
                  </RadioGroup>
                  <vUpload 
                    v-if="item.type === 'upload'" 
                    :uploadType="item.uploadType" 
                    :fileList="item.fileList" 
                    :fileTip="item.fileTip" 
                    :maxFiles="item.maxFiles" 
                    @onChange="onUploadSuccess"
                    :field="item.field"
                    >
                  </vUpload>
                  <DatePicker v-if="item.type === 'daterange'" type="daterange" placement="bottom-end" ></DatePicker>
                  <DatePicker v-if="item.type === 'year'" type="year" placement="bottom-end" ></DatePicker>
                  <DatePicker v-if="item.type === 'month'" type="month" format="MM" placement="bottom-end" ></DatePicker>
                  <DatePicker v-if="item.type === 'date'" type="date" format="dd" placement="bottom-end" ></DatePicker>
                </FormItem>
              </Col>
            </Row>
        </Form>
      </div>
    </template>
  </vDrawer>   
</template>

<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String
    },
    width: {
      type: Number,
      default: 720
    },
    items: {
      type: Array
    },
    rules: {
      type: Object
    },
    maskClosable: {
      type: Boolean
    },
    labelwidth: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      form: {}
    }
  },
  created() {
    if (this.items) {
      this.items.forEach(item => {
        this.$set(this.form, item.field, item.initialValue || '')
      })
    }
  },
  methods: {
    onSubmit() {
      this.$refs['searchFormRef'].validate((valid) => {
        if (!valid) {
          return 
        }
        this.$emit('onSubmit', this.form)
      })
    },
    onCancel() {
      this.$emit('update:visible', false)
      this.$refs['searchFormRef'].resetFields()
      this.form = {}
    },
    // 文件
    onUploadSuccess(files, field) {
      console.log('files, field: ', files, field);
      this.form[field] = files
    }
  }
}
</script>

<style lang="less" scoped>
.formWrap{
  padding: 24px;
}
.demo-drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    background: #fff;
    justify-content: flex-end;
}
</style>