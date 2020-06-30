<template>
  <div>
    <Form :model="form" label-position="right" :label-width="130">
      <div class='changeLogo mt32'>
        <div class='label-name'>
          企业logo
        </div>
        <div class='logoImg'>
          <img src='@/assets/images/logo.png' />
          <div class='changeBtn'>更换logo</div>
        </div>
      </div>
      <Row class='mt32'>
        <Col span="14">
          <FormItem label="企业名称" >
            <Input v-model="form.company" />
          </FormItem>
        </Col>
      </Row>
      <Row class='mt32'>
        <Col span="14">
          <FormItem label="公司地址" >
            <Input v-model="form.addresss" />
          </FormItem>
        </Col>
      </Row>
      <Row class='mt32'>
        <Col span="14">
          <FormItem label="统一社会信用代码" >
            <Input v-model="form.number" />
          </FormItem>
        </Col>
      </Row>
      <div class='type mt32'>
        <div class='label-name'>
          应用类型
        </div>
        <div>哈哈哈</div>
      </div>
      <Row class='mt32'>
        <Col span="14">
          <FormItem label="到期时间">
            <!-- <DatePicker v-model='form.date' type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
            <Input @click.native='onSelectDate' readonly prefix="ios-calendar-outline" />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class='formAction'>
      <vButton type='primary' text='确认修改' @click='confirm' class='mr18'></vButton>
      <vButton type='default' text='取消' @click='cancel'></vButton>
    </div>
    <vModal :visible="dateVisible" title="设置到期时间" @onOk="onUpdateDate" @onCancel="onCancel" class-name="expirationTime">
      <div class="flex_dom radioGroup">
        <RadioGroup v-model="activeRadio">
          <Radio label="date1">
            设置日期
          </Radio>
          <Radio label="date2">
            跟随管理员期限
          </Radio>
      </RadioGroup>
      </div>
      <DatePicker type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
      <div v-if="activeRadio === 'date1'" class="deadline flex_dom flex_item_mid">
        <div class="text">选择期限</div>
        <div class="flex_dom">
          <div v-for="(item, index) in days" :key="item" class="v-flex dayItem" @click="onSelectDays(index)" :class="{'activeDay': activeDay === index}">
            {{item}}
          </div>
        </div>
      </div>
    </vModal>
  </div>
</template>

<script>
import icon from '@/assets/images/enter.png'
export default {
  components: {
  },
  data() {
    return {
      icon,
      form: {
        company: 1,
        address: 1,
        number: 1,
        date: ''
      },
      list: [
        '基本信息',
        '管理员',
        '操作员',
        '操作日志'
      ],
      dateVisible: false,
      switch1: false,
      days: ['7天', '30天', '180天'],
      activeRadio: 'date1',
      activeDay: 0
    };
  },
  computed: {},
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
  },
  watch: {
    // dateVisible: function(newValue, oldValue) {
    //   console.log('newValue, oldValue: ', newValue, oldValue);
    //   return newValue
    // }
  },
  methods: {
    onSelectDays(index) {
      console.log('index: ', index);
      this.activeDay = index;
    },
    onSwitchchange() {

    },
    onSelectDate() {
      this.dateVisible = true
    },
    onUpdateDate() {
      this.onCancel()
    },
    onCancel() {
      this.dateVisible = false
      console.log('close')
    },
    clickItem(index) {
      console.log(index)
    },
    confirm() {
      alert('确认修改')
    },
    cancel() {
      this.$Modal.confirm({
        title: '提示',
        content: '修改内容还没保存是否保存',
        okText: '保存',
        onOk: () => {
          this.$Message.info('Clicked ok');
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel');
        }
      });
    },
    enterCompany() {
      window.location.href = 'https://dl.qscrm.com/#/login'
    },
    stopUse() {
      this.$Modal.confirm({
        title: '提示',
        content: '确定要停用吗？',
        onOk: () => {
          this.$Message.info('Clicked ok');
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../index.less";
@import "./index.less";
</style>
