

<template>
  <div class="formSimpleWrap">
    <div class="formSimple">
      <Form ref="form" :model="form" :rules="rules" :label-width="labelwidth">
        <Row :gutter="24" v-for="(item, index) in items" :key="index" style="padding-bottom: 20px">
          <Col :md="col" :sm="col" :xs="col">
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
    <div class="btn flex_dom flex_item_mid">
      <vButton @click="onSubmit" text="提交" type="primary" :isForm="true" class="mr20"></vButton>
      <vButton @click="onCancel" text="取消" :isForm="true"></vButton>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array
    },
    rules: {
      type: Object
    },
    labelwidth: {
      type: Number,
      default: 100
    },
    col: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      form: {
      }
    }
  },
  created() {
    if (this.items) {
      this.items.forEach(item => {
        this.$set(this.form, item.field, item.initialValue || '')
      })
    }
    console.log('this.form: ', this.form);
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return 
        }
        this.$emit('onSubmit', this.form)
      })
    },
    onCancel() {
      this.$refs['form'].resetFields()
      this.form = {}
    }
  }

}
</script>
<style lang="less" scoped>
@import '~@/assets/less/main.less';
  .formSimpleWrap {
    height: 100%;
    position: relative;
    background: #fff;
    padding: 24px 0;
    .formSimple{
      height: 100%;
      overflow: auto;
    }
    .btn{
      position: absolute;
      right: 24px;
      bottom: 24px;
    }
  }
</style>