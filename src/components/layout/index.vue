<template>
  <div class="layoutWrap">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <div class='web-logo v-flex'>
          <img src="@/assets/images/logo.png" alt="">
          <span>console</span>
        </div>
        <div class="sideMenu">
          <Menu ref="side_menu" :active-name="$route.path" :open-names="openNames" theme="dark" width="auto">
            <div v-for='item in routes' :key='item.id'>
                <!-- 有下拉 -->
                <template v-if="item.children.length > 0">
                  <Submenu :name='item.path' >
                    <template slot="title">
                      <div class="flex_dom flex_item_mid">
                        <div style="width: 18px; height: 18px;margin-right: 8px;">
                          <img :src="item.icon" alt="" style="width: 100%; height: 100%;">
                        </div>
                        <div style="line-height: 18px">
                          {{item.title}}
                        </div>
                      </div>
                    </template>
                    <template>
                      <MenuItem v-for="item2 in item.children" :name="item2.path" :to='item2.path' :key="item2.path">{{item2.title}}</MenuItem>
                    </template>
                  </Submenu>
                </template>
                <template v-else>
                  <MenuItem :name="item.path" :to='item.path'>
                    <div class="flex_dom flex_item_mid">
                      <div style="width: 18px; height: 18px;margin-right: 8px;">
                        <img :src="item.icon" alt="" style="width: 100%; height: 100%;">
                      </div>
                      <div style="line-height: 18px">
                        {{item.title}}
                      </div>
                    </div>
                  </MenuItem>
                </template>
            </div>
          </Menu>
        </div>
        </Sider>
      <Layout>
        <Header style="padding: 0 0 0 20px" class="layout-header-bar">
          <!-- <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '0 20px'}"
            type="md-menu"
            size="24"
          ></Icon> -->
          
          <Breadcrumb>
            <BreadcrumbItem v-for='(item, index) in breadList' :key="index" :to="item.path">{{item.meta.title}}</BreadcrumbItem>
          </Breadcrumb>
          <div class='userInfo'>
            <div class='message'>
              <img src='@/assets/images/clock.png' />
              通知
            </div>
            <div class="info flex_dom flex_item_mid">
              <Avatar icon="ios-person" :src="userInfo && userInfo.avatar" style="width: 36px; height: 36px;margin-right: 10px;" />
              <Dropdown style="z-index: 901">
                <a href="javascript:void(0)">
                  <span class="userName">{{userInfo && userInfo.realName}}</span>
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>
                      <div class="flex_dom flex_item_mid" @click="onLogout">
                        <Icon type="ios-log-in" size="18" />
                        <div style="margin-left: 5px">退出</div>
                      </div>
                    </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content class='layout-content' :style="{background: '#F5F7F9', minHeight: '260px'}">
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive" class="router"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" class="router"></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'layout',
  data() {
    return {
      isCollapsed: false,
      breadList: [],
      levelList: '',
      curRoute: this.$route.path, // 只匹配一级的当前路由路径
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      level2Menu: [],
      openNames: [],
      routes: []
    }
  },
  created() {
    this.getBreadcrumb()
    // 获取侧边栏菜单
    this.getSideMenu()
  },
  mounted() {
  },
  watch: {
    $route(route) {
      this.getBreadcrumb()
    }
  },
  computed: {
    ...mapState({
      menuPermissionList: state => state.permission.menuPermissionList
    }),
    rotateIcon() {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    ...mapActions([
      'logout',
      'getSideMenuPermission'
    ]),
    getSideMenu() {
      this.getSideMenuPermission().then((res) => {
        const routerList = this.$router.options.routes[2].children;
        // 过滤自己的router
        const myFilterRoutes = routerList.filter(router => router.id)
        // 匹配后端router权限
        const newTree = myFilterRoutes.filter(item => this.menuPermissionList.includes(item.path))
        // const newTree = myFilterRoutes.filter(item => item.path)
        // 将一 二级数组集合转为tree格式
        this.routes = this.listToTree(newTree)
        this.$nextTick(() => {
          this.$refs.side_menu.updateOpened()
          this.$refs.side_menu.updateActiveName()
        })
      })
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      // console.log('matched: ', matched);
      // matched.shift()
      this.breadList = matched;
    },
    onLogout() {
      localStorage.clear()
      this.$router.push({ path: '/login' })
    },
    listToTree(list, selectedIds) {
      let map = {}, node, tree = [], i;
      for (i = 0; i < list.length; i++) {
        map[list[i].id] = list[i]; 
        list[i].children = [];
        list[i].title = list[i].meta.title; 
        list[i].isOpen = false
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.pid !== 0) {
          map[node.pid].children.push(node);
          if (node.path === this.$route.path) {
            this.openNames.push(map[node.pid].path)
          }
          // }
        } else {
          tree.push(node);
        }
      }
      return tree;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '~@/assets/less/main.less';
.layoutWrap{
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .sideMenu{
    height: 100%;
    overflow:scroll;
    // 选中
    .ivu-menu-dark .ivu-menu-item-active{
        background: #0B1929 !important;
        color: #fff;
      }
    // 背景, 未选中, 展开未选中
    .ivu-menu-dark, .ivu-menu-opened .ivu-menu-submenu-title, .ivu-menu{
      background: #0D2137;
    }
    // submenu鼠标经过
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover{
      background: #515a6e !important;
    }
  }
  .ivu-layout-sider{
    background: #0D2137;
  }
  .layout-content{
    overflow: scroll;
    min-width: 1200px;
  }
  
  .web-logo{
    height: 60px;
    width: 100%;
    img{
      width: 50px;
      height: 50px;
    }
    span{
      font-size:24px;
      color: #fff;
    }
  } 
  .ivu-layout{
    height: 100%;
    .ivu-layout-has-sider{
      height: 100%
    }
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #EDF0F2;
    .userInfo{
      .v-flex;
      .message{
        color: #666972;
        font-size: 14px;
        margin-right: 24px;
        display: flex;
        align-items: center;
        img{
          .wh(16px, 16px);
          margin-right: 4px;
        }
      }
      .info{
        padding: 0 24px;
        box-shadow:0px 0px 8px 0px rgba(57,68,82,0.06);
        .userName{
          color: #666972;
            font-size: 16px;
            font-weight: 600;
        }
      }
    }
  }
  .layout-logo-left{
      width: 90%;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      margin: 15px auto;
  }
  .menu-icon{
      transition: all .3s;
  }
  .rotate-icon{
      transform: rotate(-90deg);
  }
  .menu-item span{
      display: inline-block;
      overflow: hidden;
      width: 69px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width .2s ease .2s;
  }
  .menu-item i{
      transform: translateX(0px);
      transition: font-size .2s ease, transform .2s ease;
      vertical-align: middle;
      font-size: 16px;
  }
  .collapsed-menu span{
      width: 0px;
      transition: width .2s ease;
  }
  .collapsed-menu i{
      transform: translateX(5px);
      transition: font-size .2s ease .2s, transform .2s ease .2s;
      vertical-align: middle;
      font-size: 22px;
  }
}  
</style>
