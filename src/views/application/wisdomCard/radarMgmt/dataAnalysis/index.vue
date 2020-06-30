<template>
  <div class="height100 dataAnalysisWrap">
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSubmit"></vSearchForm>
    <div class="container">
      <div class="content height100">
        <div class="tabs">
          <div class="cardTabs">
            <vCardTabs @onCardTabsChange="onCardTabsChange" :tabPaneList="tabPaneList"></vCardTabs>
          </div>
          <div class="tabRight">
            <vTab :data='dateTabList' hiddenUnderline @handleClick="this.onDateTabListchange"></vTab>
          </div>
        </div>
        <div class="echartsWrap">
          <div v-show="tabName === 'cardTab1'" class="echartsBox">
            <div class="title mt20">本月后台分析</div>
            <div class="explan mt20">数据来源：简企云——智慧名片</div>
            <div id="cardTabId1" class="mt20" style="width: 100%; height: 85%"></div>
          </div>
          <div class="echartsBox" ref="echartsBox2">
            <div class="title mt20">访客兴趣占比</div>
            <div id="cardTabId2" class="mt20" style="width: 100%; height: 85%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      searchFormProps: {
        items: [
          {
            field: 'type',
            type: 'select',
            placeholder: '不按时间',
            options: [
              {
                value: 1,
                label: 22
              },
              {
                value: 2,
                label: 3
              }
            ]
          },
          {
            field: 'daterange',
            type: 'daterange',
            placeholder: '选择日期'
          },
          {
            field: 'type',
            type: 'select',
            placeholder: '选择公司',
            options: [
              {
                value: 1,
                label: 22
              },
              {
                value: 2,
                label: 3
              }
            ]
          },
          {
            field: 'keyword',
            type: 'input',
            placeholder: '微信名/手机号/用户名/推荐人'
          }
        ]
      },
      tabPaneList: [
        { label: '增长趋势', name: 'cardTab1' },
        { label: '兴趣占比', name: 'cardTab2' }
      ],
      dateTabList: ['最近七日', '本月', '近一个月', '近半年'],
      tabName: 'cardTab1', // 激活的面板
      // dateRange: [],
      avtiveDateSelected: 'last7'
    };
  },
  computed: {
    // dateRange: function() {
    //   const avtiveDateSelected = this.avtiveDateSelected;
    //   const format = 'MM-DD'
    //   var today = moment().format(format);
    //   var last7 = moment().subtract('days', 6).format(format);
    //   var lart30 = moment().subtract('days', 29).format(format);
    //   var thisMonth = moment().startOf('month').format(format);
    //   const dateRange = [];
    //   switch (avtiveDateSelected) {
    //     case 0:
    //       $('#createTimeStart').val(today)
    //       break;
    //     case '7':
    //       $('#createTimeStart').val(last7);
    //       break;
    //     case '30':
    //       $('#createTimeStart').val(lart30);
    //       break;
    //     case 'month':
    //       $('#createTimeStart').val(thisMonth);
    //       break;
    //   }
    //   return dateRange;
    // }

  },
  mounted() {
    setTimeout(() => {
      this.onGrowthChart()
      this.onPieCharts()
    }, 1000)
  },
  methods: {
    onSubmit(searchFormRef, data) {
      console.log('data: ', data);
      // console.log('searchFormRef: ', searchFormRef);
    },
    onCardTabsChange(name) {
      this.tabName = name
      if (name === 'cardTab1') {
        // this.onGrowthChart()
      } else {
        // this.onPieCharts()
      }
    },
    
    onGrowthChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('cardTabId1'))
      // 指定图表的配置项和数据
      const option = {    
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['访客增长趋势', '转发增长趋势'],
          top: '10'
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // data: this.businessView,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: { // 坐标轴的标签
            show: true, // 是否显示
            color: '#A0A4AA' // 默认轴线的颜色, 
          },
          axisLine: { // 坐标轴 轴线
            show: false
          },
          axisTick: { // 坐标轴 刻度
            show: true, // 是否显示
            inside: false, // 是否朝内
            length: 4, // 长度
            lineStyle: { // 默认取轴线的样式
              color: '#A0A4AA',
              width: 1,
              type: 'solid'
            }
          },
          boundaryGap: true //x轴间隔
        },
        yAxis: {
          type: 'value',
          // name: '金额',
          axisLabel: { // 坐标轴的标签
            // show: false, // 是否显示轴线
            color: '#A0A4AA' // 文字颜色
          },
          axisLine: { // y坐标轴
            show: false
          },
          axisTick: { // 刻度线
            show: false
          },
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(128, 128, 128, 0.1)']
            }
          }
        },
        series: [
          {
            name: '访客增长趋势',
            type: 'line',
            stack: '总量1',
            data: [820, 2932, 901, 934, 1290, 1330, 1320],
            color: '#0097FE'
          },
          {
            name: '转发增长趋势',
            type: 'line',
            stack: '总量2',
            data: [820, 9323, 901, 934, 1290, 1330, 1320],
            color: '#FFC862'
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    onPieCharts() {
      const myChart = this.$echarts.init(document.getElementById('cardTabId2'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 150,
          top: 'middle',
          data: ['对公司感兴趣', '对产品感兴趣', '对数据感兴趣']
        },
        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '对公司感兴趣', color: 'blue' },
              { value: 310, name: '对产品感兴趣' },
              { value: 234, name: '对数据感兴趣' }
            ]
        
          }
        ],
        color: ['#0097FE', '#71EBCF', '#FFC862']
      };
      myChart.setOption(option)
    },
    onDateTabListchange(index) {
      // let arr = [];
      // if (index === '7') {
      //   for (let i = 0; i > -7; i--) {
      //     arr.unshift(this.getDay(i));
      //   }
      // } else {
      //   for (let i = 0; i > -30; i--) {
      //     arr.unshift(this.getDay(i));
      //   }
      // }
    },
    indexTransitionParam(index) {
      let param = '';
      switch (index) {
        case 0:
          param = '7'
          break
        case 1:
          param = '本月'
          break
        case 2:
          param = '近一个月'
          break
        case 3:
          param = '近半年'
          break
      }
      return param
    },
    /**
     *获取最近N天的日期
    *@params [number] day 前几天/后几天
    * @memberof List
    */
    getDay(day) {
      let today = new Date();
      let targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
      // 选中日期的月份+日期
      let month = today.getMonth() + 1;
      let date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
      let tDate = month + '-' + date;
      console.log('tDate: ', tDate);
      return tDate;
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
