/**
 * 配置编译环境和线上环境之间的切换
 *
 * h5Url: web页面域名地址
 * baseUrl: api域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://jianqiyun-manage-api.frp.hanku.net.cn'; // 测试环境
  // baseUrl = 'http://192.168.1.105:18002';
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://jianqiyun-manage-api.frp.hanku.net.cn'; // 测试环境
}

export { baseUrl };
