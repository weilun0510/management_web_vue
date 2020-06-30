<template>
  <div class="height100 wisdomCardWrap">
    <div style="height: 60px;">
      <Menu active-name="1" mode="horizontal" theme="light" width="auto" @on-select="onMenuChange">
        <div v-for='item in menuTree' :key='item.id'>
          <template v-if="item.children.length > 0">
            <Submenu :name='item.id' >
              <template slot="title">
                  {{item.title}}
              </template>
              <MenuItem v-for="item2 in item.children" :name="item2.id" :key="item2.id">{{item2.title}}</MenuItem>
            </Submenu>
          </template>
          <template v-else>
            <MenuItem :name="item.id">
              <template>
                  {{item.title}}
              </template>
            </MenuItem>
          </template>
        </div>
      </Menu>
    </div>
    <div style="height: calc(100% - 60px);"> 
      <platformConcept v-if="activeIndex === '1'"></platformConcept>
      <businessCard v-else-if="activeIndex === '2-1'"></businessCard>
      <visitorList v-else-if="activeIndex === '3-1'"></visitorList>
      <dataAnalysis v-else-if="activeIndex === '3-2'"></dataAnalysis>
      <requestWithdrawal v-else-if="activeIndex === '4-1'"></requestWithdrawal>
      <configDeal v-else-if="activeIndex === '4-2'"></configDeal>
      <goodsMgmt v-else-if="activeIndex === '4-3'"></goodsMgmt>
      <orderMgmt v-else-if="activeIndex === '4-4'"></orderMgmt>
      <dataStatistics v-else-if="activeIndex === '4-5'"></dataStatistics>
      <distributorApplication v-else-if="activeIndex === '5'"></distributorApplication>
      <versionInfo v-else-if="activeIndex === '6-1'"></versionInfo>
      <messageTemplate v-else-if="activeIndex === '6-2'"></messageTemplate>
      <shoppingNotice v-else-if="activeIndex === '6-3'"></shoppingNotice>
      <groupSentMsg v-else-if="activeIndex === '6-4'"></groupSentMsg>
      <operationLog v-else-if="activeIndex === '6-5'"></operationLog>
    </div>
  </div>
</template>

<script>
import platformConcept from './platformConcept'
import businessCard from './smallProgram/businessCard'
import visitorList from './radarMgmt/visitorList'
import dataAnalysis from './radarMgmt/dataAnalysis'
import requestWithdrawal from './mallMgmt/requestWithdrawal'
import configDeal from './mallMgmt/configDeal'
import goodsMgmt from './mallMgmt/goodsMgmt'
import orderMgmt from './mallMgmt/orderMgmt'
import dataStatistics from './mallMgmt/dataStatistics'
import distributorApplication from './distributorApplication'
import versionInfo from './systemMgmt/versionInfo'
import messageTemplate from './systemMgmt/messageTemplate'
import shoppingNotice from './systemMgmt/shoppingNotice'
import groupSentMsg from './systemMgmt/groupSentMsg'
import operationLog from './systemMgmt/operationLog'



export default {
  components: {
    platformConcept,
    businessCard,
    visitorList,
    dataAnalysis,
    requestWithdrawal,
    configDeal,
    goodsMgmt,
    orderMgmt,
    dataStatistics,
    distributorApplication,
    versionInfo,
    messageTemplate,
    shoppingNotice,
    operationLog,
    groupSentMsg
  },
  data() {
    return {
      tabList: ['平台概述', '小程序管理', '雷达管理', '商城管理', '分销商管理', '系统管理'],
      activeIndex: '1',
      menuTree: [
        {
          title: '平台概述',
          id: '1',
          children: []
        },
        {
          title: '小程序管理',
          id: '2',
          children: [
            {
              title: '名片管理',
              id: '2-1'
            }
          ]
        },
        {
          title: '雷达管理',
          id: '3',
          children: [
            {
              title: '访客列表',
              id: '3-1'
            },
            {
              title: '数据分析',
              id: '3-2'
            }
          ]
        },
        {
          title: '商城管理',
          id: '4',
          children: [
            {
              title: '提现申请',
              id: '4-1'
            },
            {
              title: '配置交易',
              id: '4-2'
            },
            {
              title: '商品管理',
              id: '4-3'
            },
            {
              title: '订单管理',
              id: '4-4'
            },
            {
              title: '数据统计',
              id: '4-5'
            }
          ]
        },
        {
          title: '分销商申请',
          id: '5',
          children: []
        },
        {
          title: '系统管理',
          id: '6',
          children: [
            {
              title: '版本信息',
              id: '6-1'
            },
            {
              title: '消息模板',
              id: '6-2'
            },
            {
              title: '购物通知',
              id: '6-3'
            },
            {
              title: '群发消息',
              id: '6-4'
            },
            {
              title: '操作日志',
              id: '6-5'
            }
          ]
        }
      ]
    };
  },
  created() {
  
  },
  methods: {
    onMenuChange(index) {
      console.log('index: ', index);
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
