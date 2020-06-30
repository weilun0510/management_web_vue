<template>
  <div class="wisdomCard-platformConcept height100">
    <!-- <div class="table-list">
      <vTable :columns="columns" :data="data" :hiddenPage="true"></vTable>
    </div> -->
    <div class="containerWrap"> 
      <div class="container">
        <div class="containerLeft">
          <div class="sectionItem cardStatus">
            <div class="sectionTitle">
              <div class="name">名片状态</div>
            </div>
            <div class="sectionContent mt20">
              <div class="cardList">
                <div class="cardStatusItem" v-for="(item, index) in cardList" :key="index" :style="{backgroundImage: 'url(' + item.bgImg + ')'}">
                  <div class="name">
                    <div class="text">{{item.name}}</div>
                    <div class="tipIcon">
                      <img :src="item.icon" alt="">
                    </div>
                  </div>
                  <div class="num">
                    2260
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sectionItem dataView mt20">
            <div class="sectionTitle">
              <div class="name">概览数据</div>
              <vTab :data='dataTabsList' hiddenUnderline @handleClick="this.onDataTabsChange"></vTab>
            </div>
            <div class="sectionContent mt20">
              <div class="cardList">
                <div class="item" v-for="(item, index) in dataList" :key="index">
                  <div class="num">
                    2260
                  </div>
                  <div class="name">
                    <div class="text">{{item.name}}</div>
                    <div class="tipIcon">
                      <img :src="item.icon" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sectionItem orderView mt20">
            <div class="sectionTitle">
              <div class="name">订单概览</div>
              <vTab :data='orderTabsList' hiddenUnderline @handleClick="this.onOrderTabsChange"></vTab>
            </div>
            <div class="sectionContent orderViewContent">
              <div class="circleBox">
                <div class="name mt20">成交量/交易量(件)</div>
                <div class="data">
                  <div class="count">12 / 16</div>
                  <i-circle
                    :size="120"
                    :trail-width="10"
                    :stroke-width="10"
                    :percent="75"
                    stroke-color="#5FBEFB">
                  </i-circle>
                </div>
              </div>
              <div class="circleBox">
                <div class="name mt20">成交额/交易额(元)</div>
                <div class="data line">
                  <div class="count">3,669.00 / 5,669.00</div>
                  <i-circle
                    :size="120"
                    :trail-width="10"
                    :stroke-width="10"
                    :percent="75"
                    stroke-color="#FECF82">
                  </i-circle>
                </div>
              </div>
              <div class="circleBox">
                <div class="name mt20">人均消费(元)</div>
                <div class="data">
                  <div class="count">6115.00</div>
                  <img src="@/assets/images/gs_rjxf.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="containerRight">
          <div class="sectionItem withdrawal">
            <div class="sectionTitle">
              <div class="name">提现申请</div>
            </div>
            <div class="sectionContent mt20">
              <div class="contentLeft">
                <img class="img" src="@/assets/images/tixian.png" alt="">
                <div class="money">
                  <img class="icon" src="@/assets/images/jine.png" alt="">
                  <div class="text">总金额：</div>
                  <div class="amount">89989</div>
                  <div class="text">元</div>
                </div>
              </div>
              <div class="contentRight">
                <div class="text">公司提现申请</div>
                <div class="amount">123</div>
              </div>
            </div>
          </div>
          <div class="sectionItem operations mt20">
            <div class="sectionTitle">
              <div class="name">操作日志</div>
              <div class="more">更多</div>
            </div>
            <div class="sectionContent mt20">
              <vTable :columns="columns" :data="tableData" style="padding: 0" :hiddenPage="true"></vTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemBg0 from '@/assets/images/ryzsBg.png';
import itemBg1 from '@/assets/images/kaitongBg.png';
import itemBg2 from '@/assets/images/gszsBg.png';
import itemBg3 from '@/assets/images/rjyqlBg.png';
import itemIcon0 from '@/assets/images/ryzs.png';
import itemIcon1 from '@/assets/images/kaitong.png';
import itemIcon2 from '@/assets/images/gszs.png';
import itemIcon3 from '@/assets/images/rjyql.png';
import dataIcon0 from '@/assets/images/gs_icon_khzs.png';
import dataIcon1 from '@/assets/images/gs_icon_dzzs.png';
import dataIcon2 from '@/assets/images/gs_icon_ydzs.png';
import dataIcon3 from '@/assets/images/gs_icon_zfzs.png';
export default {
  components: {
  },
  data() {
    return {
      columns: [
        {
          title: '操作员',
          key: 'apptype'
        },
        {
          title: '操作内容',
          key: 'message'
        },
        {
          title: '操作时间',
          key: 'date'
        }
      ],
      tableData: {
        list: [
          {
            apptype: 1,
            message: '请问企鹅请问请问',
            date: '2020.02.03 12:23:23'
          }
        ]
      },
      cardList: [
        {
          name: '人员总数',
          bgImg: itemBg0,
          icon: itemIcon0
        },
        {
          name: '已开通/剩余开通',
          bgImg: itemBg1,
          icon: itemIcon1
        },
        {
          name: '公司总数',
          bgImg: itemBg2,
          icon: itemIcon2
        },
        {
          name: '人均邀请量',
          bgImg: itemBg3,
          icon: itemIcon3
        }
      ],
      dataTabsList: ['汇总', '近三日', '近七日', '近一个月'],
      dataList: [
        {
          name: '客户总数',
          icon: dataIcon0
        },
        {
          name: '点赞总数',
          icon: dataIcon1
        },
        {
          name: '阅读总数',
          icon: dataIcon2
        },
        {
          name: '转发总数',
          icon: dataIcon3
        }
      ],
      orderTabsList: ['今日', '昨日', '近七日', '本月'],
      orderData: {

      }
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    onSwitchChange(status) {
      console.log('status: ', status);
    },
    onDataTabsChange() {},
    onOrderTabsChange() {}
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
