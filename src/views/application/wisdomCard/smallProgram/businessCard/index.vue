<template>
  <div class="height100 businessCardWrap">
    <vSearchForm v-bind="searchFormProps" @onSubmit="onSearch"></vSearchForm>
    <div class="content">
      <div class="table-wrap">
        <vTable :columns="columns" :data="data"></vTable>
      </div>
    </div>
    <!-- <vDrawerForm 
      :visible.sync="drawerFormVisible" 
      :title="add ? '新增名片' : '修改名片'"
      v-bind="drawerFormProps"
      :maskClosable="false"
      @onSubmit="onSubmitDrawerForm">
    </vDrawerForm> -->
    <!-- <vModalDetail 
      :visible.sync="detailVisible" 
      title="名片详情"
      :fill="false"
      :items="detailItem"
      labelWidth="20%"
      >
    </vModalDetail> -->
    <vModal
      :visible="detailVisible"
      title="名片详情"
      @onCancel="detailVisible = false"
      >
      <div class="modalContent">
        
        <div class="infoField">
          <div class="fieldName">姓名</div>
          <div class="fieldValue ov">11</div>
        </div>
        <div class="infoField">
          <div class="fieldName">性别</div>
          <div class="fieldValue ov">男</div>
        </div>
        <div class="infoField">
          <div class="fieldName">我的头像</div>
          <div class="fieldValue">
            <img class="image" :src="logo" alt="">
          </div>
        </div>
        <div class="infoField">
          <div class="fieldName">手机号</div>
          <div class="fieldValue ov">1234578</div>
        </div>
        <div class="infoField">
          <div class="fieldName">微信号</div>
          <div class="fieldValue ov">222</div>
        </div>
        <div class="infoField">
          <div class="fieldName">邮箱</div>
          <div class="fieldValue ov">222</div>
        </div>
        <div class="infoField">
          <div class="fieldName">我的企业</div>
          <div class="fieldValue">
            <img class="image" :src="logo" alt="">
          </div>
        </div>
        <div class="infoField">
          <div class="fieldName">公司名称</div>
          <div class="fieldValue ov">222</div>
        </div>
        <div class="infoField">
          <div class="fieldName">职位</div>
          <div class="fieldValue ov">222</div>
        </div>
        <div class="infoField">
          <div class="fieldName">公司地址</div>
          <div class="fieldValue ov">222</div>
        </div>
        <div class="infoField">
          <div class="fieldName">我的推荐</div>
          <div class="fieldValue">
            <img class="image" :src="logo" alt="">
          </div>
        </div>
        <div class="infoField">
          <div class="fieldName">我的简介</div>
          <div class="fieldValue ov">222</div>
        </div>
        <div class="infoField">
          <div class="fieldName">音频文件</div>
          <div class="fieldValue ov">222</div>
        </div>
        
        <div class="infoField">
          <div class="fieldName">企业名称</div>
          <div class="fieldValue ov">222</div>
        </div>
        
        <div class="infoField">
          <div class="fieldName">我的视频</div>
          <div class="fieldValue">
            <img class="image" :src="logo" alt="">
          </div>
        </div>
        <div class="infoField" style="width: 100%">
          <div class="fieldName">我的图片</div>
          <div class="fieldValue">
            <img class="image" :src="logo" alt="">
          </div>
        </div>
        <!-- <div class="fieldValue" v-else-if="item.type === 'imgs'">
            <template v-for="(url, index) in item.imgsList" >
              <img 
                class="image" 
                :src="url"
                :key="`element${index}`"
                alt="">
            </template>
          </div> -->
      </div>
    </vModal>
  </div>
</template>

<script>
import { operationH } from '@/utils/index';
import logo from '@/assets/images/logo.png'
export default {
  components: {},
  data() {
    return {
      searchFormProps: {
        items: [
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
            placeholder: '姓名/手机号/邮箱'
          }
        ]
      },
      columns: [
        {
          title: '编号',
          key: 'name'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '公司',
          key: 'cname'
        },
        {
          title: '职位',
          key: 'date1'
        },
        {
          title: '手机',
          key: 'date2'
        },
        {
          title: '邮箱',
          key: 'type'
        },
        {
          title: '添加时间',
          key: 'date2'
        },
        {
          title: '雷达 开启/关闭',
          key: 'status',
          render: (h, params) => {
            let status = params.row.status === 1 ? true : false;
            let _this = this;
            return h('i-switch', {
              props: {
                // 开关的值
                value: status
              },
              on: {
                'on-change': value => {
                  params.row.status = value ? 1 : 0;
                  _this.onSwitchChange(params.row.status);
                }
              }
            });
          }
        },
        {
          title: '操作',
          key: 'address',
          width: 200,
          render: (h, params) => {
            const o = [
              {
                name: '查看',
                click: () => {
                  this.detailVisible = true
                }
              }
            ]
            return operationH(h, params, o)
          }
        }
      ],
      data: {
        list: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
            status: 1
          }
        ],
        page: {
          showtotal: true, // 是否显示总条数
          total: 100, // 总条数
          pageSize: 10 // 每页条数
        }
      },
      detailVisible: false,
      logo
    };
  },
  computed: {},
  mounted() {
    // console.log(this.$refs.table.offsetHeight - 73)
  },
  methods: {
    onSearch(searchFormRef, data) {
      console.log('data: ', data);
      // console.log('searchFormRef: ', searchFormRef);
    }
    // onCancelDrawerForm() {
    //   this.drawerFormVisible = false
    // },
    // onSubmitDrawerForm(form) {
    //   console.log(' form: ', form);
    //   console.log('完成后取消');
    // }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
.modalContent{
      height: 470px;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      .infoField {
        width: 50%;
        display: flex;
        margin-bottom: 30px;
        .fieldName {
          width: 100px;
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
</style>
