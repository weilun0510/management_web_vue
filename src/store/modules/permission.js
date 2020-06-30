// import types from '../types';
import { 
  permissionList, 
  permissionDelete, 
  permissionAdd, 
  permissionDetail, 
  permissionModify, 
  permissionNoPageList, 
  adminPermissionList, 
  adminPermissionAdd, 
  adminPermissionModify,
  adminPermissionDelete, 
  adminPermissionNoPageList,
  adminPermissionDedail,
  adminPermissionMenuTree,
  menuPermission
} from '@/api/permission';
import { cloneDeep } from 'lodash';
const state = {
  permissionList: {
    list: [],
    page: {}
  },
  permissionDetail: {}, // 权限组详情
  adminPermissionDedail: {}, // 权限组-管理员权限组-详情
  permissionNoPageList: [],
  adminPermissionNoPageList: [],
  adminPermissionList: {
    list: [],
    page: {}
  },
  adminPermissionMenuTree: [], // 菜单权限树
  menuPermissionList: [] // 侧边栏菜单权限列表
};
const actions = {
  // 客户-权限列表
  async getPermissionList(context, payload) {
    const res = await permissionList(payload)
    context.commit('uploadlist', {
      tableName: 'permissionList',
      data: res.data
    })
  },
  // 权限组-客户权限组-不分页列表
  async getPermissionNoPageList(context, payload) {
    const res = await permissionNoPageList(payload)
    context.commit('permissionNoPageList', res.data)
  },
  async permissionDelete(context, payload) {
    const res = await permissionDelete(payload)
    return res;
  },
  async permissionAdd(context, payload) {
    const res = await permissionAdd(payload)
    return res;
  },
  // 客户权限组-修改
  async getPermissionModify(context, payload) {
    const res = await permissionModify(payload)
    return res;
  },
  async getPermissionDetail(context, payload) {
    const res = await permissionDetail(payload)
    context.commit('permissionDetailM', res.data)
    return res;
  },
  async adminPermissionList(context, payload) {
    const res = await adminPermissionList(payload)
    context.commit('uploadlist', {
      tableName: 'adminPermissionList',
      data: res.data
    })
  },
  // 权限组-管理员权限组-不分页列表
  async getAdminPermissionNoPageList(context, payload) {
    const res = await adminPermissionNoPageList(payload)
    context.commit('adminPermissionNoPageList', res.data)
  },
  // 权限组-管理员权限组-详情
  async getAdminPermissionDetail(context, payload) {
    const res = await adminPermissionDedail(payload)
    context.commit('adminPermissionDedail', res.data)
    return res;
  },
  // 权限组-管理员权限组-修改
  async adminPermissionModify(context, payload) {
    return await adminPermissionModify(payload)
  },
  // 权限组-添加权限组
  async adminPermissionAdd(context, payload) {
    const res = await adminPermissionAdd(payload)
    return res;
  },
  async adminPermissionDelete(context, payload) {
    const res = await adminPermissionDelete(payload)
    return res;
  },
  // 菜单权限树
  async getAdminPermissionMenuTree(context, payload) {
    const res = await adminPermissionMenuTree(payload)
    const flag = (payload && payload.flag) || ''
    context.commit('adminPermissionMenuTree', {
      data: res.data,
      flag
    })
    return res;
  },
  // 侧边栏菜单权限
  async getSideMenuPermission(context, payload) {
    const res = await menuPermission(payload)
    context.commit('menuPermission', res.data.menuPermission)
    return res;
  }
  
}
const mutations = {
  uploadlist(state, { tableName, data }) {
    state[tableName] = {
      list: data.records,
      page: {
        showtotal: true, // 是否显示总条数
        total: data.total, // 总条数
        pageSize: data.size, // 每页条数
        current: data.current
      }
    }
  },
  permissionDetailM(state, payload) {
    state.permissionDetail = payload
  },
  permissionNoPageList(state, payload) {
    state.permissionNoPageList = payload
  },
  adminPermissionNoPageList(state, payload) {
    state.adminPermissionNoPageList = payload
  },
  adminPermissionDedail(state, payload) {
    state.adminPermissionDedail = payload
  },
  adminPermissionMenuTree(state, { data, flag }) {
    let tree = []
    const list = cloneDeep(data);
    if (flag) {
      // 权限管理-管理员-编辑页面
      // 用户管理-管理员-编辑页面
      let selectedIds = []
      if (state.adminPermissionDedail.permissionsMenuList) {
        selectedIds = state.adminPermissionDedail.permissionsMenuList.map(item => item.menuId);
      }
      tree = listToTree(list, selectedIds)
    } else {
      tree = listToTree(list)
    }
    
    function listToTree(list, selectedIds) {
      let map = {}, node, tree = [], i;
      for (i = 0; i < list.length; i++) {
        map[list[i].menuId] = list[i]; 
        list[i].children = [];
        list[i].title = list[i].menuName; 

        // selectedIds 存在表示有选中的节点
        if (selectedIds && selectedIds.length) {
          list.forEach((element, i) => {
            if (selectedIds.includes(element.menuId)) {
              list[i].checked = true
            } else {
              list[i].checked = false
            }
          });
        }
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== 0) {
          map[node.parentId].children.push(node);
        } else {
          tree.push(node);
        }
      }
      return tree;
    }
    
    state.adminPermissionMenuTree = tree
  },
  menuPermission(state, payload) {
    state.menuPermissionList = payload
  }
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
};
