(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-b5c178b8"],{"38c6":function(n,e,t){"use strict";t.r(e),t("6762"),t("2fdb");var i=t("cebc"),o=t("5880"),a={name:"layout",data:function(){return{isCollapsed:!1,breadList:[],levelList:"",curRoute:this.$route.path,userInfo:JSON.parse(localStorage.getItem("userInfo")),level2Menu:[],openNames:[],routes:[]}},created:function(){this.getBreadcrumb(),this.getSideMenu()},mounted:function(){},watch:{$route:function(){this.getBreadcrumb()}},computed:Object(i.a)({},Object(o.mapState)({menuPermissionList:function(n){return n.permission.menuPermissionList}}),{rotateIcon:function(){return["menu-icon",this.isCollapsed?"rotate-icon":""]},menuitemClasses:function(){return["menu-item",this.isCollapsed?"collapsed-menu":""]}}),methods:Object(i.a)({},Object(o.mapActions)(["logout","getSideMenuPermission"]),{getSideMenu:function(){var n=this;this.getSideMenuPermission().then(function(e){var t=n.$router.options.routes[2].children.filter(function(n){return n.id}).filter(function(e){return n.menuPermissionList.includes(e.path)});n.routes=n.listToTree(t),n.$nextTick(function(){n.$refs.side_menu.updateOpened(),n.$refs.side_menu.updateActiveName()})})},collapsedSider:function(){this.$refs.side1.toggleCollapse()},getBreadcrumb:function(){var n=this.$route.matched;this.breadList=n},onLogout:function(){localStorage.clear(),this.$router.push({path:"/login"})},listToTree:function(n){for(var e,t={},i=[],o=0;o<n.length;o++)t[n[o].id]=n[o],n[o].children=[],n[o].title=n[o].meta.title,n[o].isOpen=!1;for(o=0;o<n.length;o+=1)0!==(e=n[o]).pid?(t[e.pid].children.push(e),e.path===this.$route.path&&this.openNames.push(t[e.pid].path)):i.push(e);return i}})},r=t("2455");function s(n){t("822e")}var l=Object(r.a)(a,function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("div",{staticClass:"layoutWrap"},[i("Layout",[i("Sider",{ref:"side1",attrs:{"hide-trigger":"",collapsible:"","collapsed-width":78},model:{value:n.isCollapsed,callback:function(e){n.isCollapsed=e},expression:"isCollapsed"}},[i("div",{staticClass:"web-logo v-flex"},[i("img",{attrs:{src:t("9d64"),alt:""}}),n._v(" "),i("span",[n._v("console")])]),n._v(" "),i("div",{staticClass:"sideMenu"},[i("Menu",{ref:"side_menu",attrs:{"active-name":n.$route.path,"open-names":n.openNames,theme:"dark",width:"auto"}},n._l(n.routes,function(e){return i("div",{key:e.id},[0<e.children.length?[i("Submenu",{attrs:{name:e.path}},[i("template",{slot:"title"},[i("div",{staticClass:"flex_dom flex_item_mid"},[i("div",{staticStyle:{width:"18px",height:"18px","margin-right":"8px"}},[i("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.icon,alt:""}})]),n._v(" "),i("div",{staticStyle:{"line-height":"18px"}},[n._v("\n                        "+n._s(e.title)+"\n                      ")])])]),n._v(" "),n._l(e.children,function(e){return i("MenuItem",{key:e.path,attrs:{name:e.path,to:e.path}},[n._v(n._s(e.title))])})],2)]:[i("MenuItem",{attrs:{name:e.path,to:e.path}},[i("div",{staticClass:"flex_dom flex_item_mid"},[i("div",{staticStyle:{width:"18px",height:"18px","margin-right":"8px"}},[i("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.icon,alt:""}})]),n._v(" "),i("div",{staticStyle:{"line-height":"18px"}},[n._v("\n                      "+n._s(e.title)+"\n                    ")])])])]],2)}),0)],1)]),n._v(" "),i("Layout",[i("Header",{staticClass:"layout-header-bar",staticStyle:{padding:"0 0 0 20px"}},[i("Breadcrumb",n._l(n.breadList,function(e,t){return i("BreadcrumbItem",{key:t,attrs:{to:e.path}},[n._v(n._s(e.meta.title))])}),1),n._v(" "),i("div",{staticClass:"userInfo"},[i("div",{staticClass:"message"},[i("img",{attrs:{src:t("fa24")}}),n._v("\n            通知\n          ")]),n._v(" "),i("div",{staticClass:"info flex_dom flex_item_mid"},[i("Avatar",{staticStyle:{width:"36px",height:"36px","margin-right":"10px"},attrs:{icon:"ios-person",src:n.userInfo&&n.userInfo.avatar}}),n._v(" "),i("Dropdown",{staticStyle:{"z-index":"901"}},[i("a",{attrs:{href:"javascript:void(0)"}},[i("span",{staticClass:"userName"},[n._v(n._s(n.userInfo&&n.userInfo.realName))]),n._v(" "),i("Icon",{attrs:{type:"ios-arrow-down"}})],1),n._v(" "),i("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[i("DropdownItem",[i("div",{staticClass:"flex_dom flex_item_mid",on:{click:n.onLogout}},[i("Icon",{attrs:{type:"ios-log-in",size:"18"}}),n._v(" "),i("div",{staticStyle:{"margin-left":"5px"}},[n._v("退出")])],1)])],1)],1)],1)])],1),n._v(" "),i("Content",{staticClass:"layout-content",style:{background:"#F5F7F9",minHeight:"260px"}},[i("keep-alive",[n.$route.meta.keepAlive?i("router-view",{staticClass:"router"}):n._e()],1),n._v(" "),n.$route.meta.keepAlive?n._e():i("router-view",{staticClass:"router"})],1)],1)],1)],1)},[],!1,s,null,null);e.default=l.exports},"71a2":function(n,e,t){(e=n.exports=t("2350")(!1)).push([n.i,"@import url(//at.alicdn.com/t/font_1204205_q7wa7p3ti9n.css);",""]),e.push([n.i,"/*\n\tHTML5 Reset :: style.css\n\t----------------------------------------------------------\n\tWe have learned much from/been inspired by/taken code where offered from:\n\n\tEric Meyer\t\t\t\t\t:: http://meyerweb.com\n\tHTML5 Doctor\t\t\t\t:: http://html5doctor.com\n\tand the HTML5 Boilerplate\t:: http://html5boilerplate.com\n\n-------------------------------------------------------------------------------*/\n/* Let's default this puppy out\n-------------------------------------------------------------------------------*/\nhtml,\nbody,\nbody div,\nspan,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\nabbr,\naddress,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\nsamp,\nsmall,\nstrong,\nsub,\nsup,\nvar,\nb,\ni,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\nfigure,\nfooter,\nheader,\nmenu,\nnav,\nsection,\ntime,\nmark,\naudio,\nvideo,\ndetails,\nsummary {\n  margin: 0;\n  font-size: 14px;\n  font-weight: normal;\n  vertical-align: baseline;\n}\narticle,\naside,\nfigure,\nfooter,\nheader,\nnav,\nsection,\ndetails,\nsummary {\n  display: block;\n}\n/* Handle box-sizing while better addressing child elements:\n   http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */\nhtml {\n  box-sizing: border-box;\n}\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n/* consider resetting the default cursor: https://gist.github.com/murtaugh/5247154 */\n/* Responsive images and other embedded objects */\n/* if you don't have full control over `img` tags (if you have to overcome attributes), consider adding height: auto */\nimg,\nobject,\nembed {\n  max-width: 100%;\n}\n/*\n   Note: keeping IMG here will cause problems if you're using foreground images as sprites.\n\tIn fact, it *will* cause problems with Google Maps' controls at small size.\n\tIf this is the case for you, try uncommenting the following:\n\n#map img {\n\t\tmax-width: none;\n}\n*/\n/* force a vertical scrollbar to prevent a jumpy page */\nhtml {\n  overflow-y: scroll;\n}\n/* we use a lot of ULs that aren't bulleted.\n\tyou'll have to restore the bullets within content,\n\twhich is fine because they're probably customized anyway */\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\na {\n  color: #333333;\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n  text-decoration: none;\n}\ndel {\n  text-decoration: line-through;\n}\nabbr[title],\ndfn[title] {\n  border-bottom: 1px dotted #000;\n  cursor: help;\n}\n/* tables still need cellspacing=\"0\" in the markup */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\nth {\n  font-weight: bold;\n  vertical-align: bottom;\n}\ntd {\n  font-weight: normal;\n  vertical-align: top;\n}\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\ninput,\nselect {\n  vertical-align: middle;\n  outline: 0;\n}\npre {\n  white-space: pre;\n  /* CSS2 */\n  white-space: pre-wrap;\n  /* CSS 2.1 */\n  white-space: pre-line;\n  /* CSS 3 (and 2.1 as well, actually) */\n  word-wrap: break-word;\n  /* IE */\n}\ninput[type=\"radio\"] {\n  vertical-align: text-bottom;\n}\ninput[type=\"checkbox\"] {\n  vertical-align: bottom;\n}\n.ie7 input[type=\"checkbox\"] {\n  vertical-align: baseline;\n}\n.ie6 input {\n  vertical-align: text-bottom;\n}\nselect,\ninput,\ntextarea {\n  font: 99% sans-serif;\n}\ntable {\n  font-size: inherit;\n  font: 100%;\n}\nsmall {\n  font-size: 85%;\n}\nstrong {\n  font-weight: bold;\n}\ntd,\ntd img {\n  vertical-align: top;\n}\n/* Make sure sup and sub don't mess with your line-heights http://gist.github.com/413930 */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n}\nsup {\n  top: -0.5em;\n}\nsub {\n  bottom: -0.25em;\n}\n/* standardize any monospaced elements */\npre,\ncode,\nkbd,\nsamp {\n  font-family: monospace, sans-serif;\n}\n/* hand cursor on clickable elements */\n.clickable,\nlabel,\ninput[type=button],\ninput[type=submit],\ninput[type=file],\nbutton {\n  cursor: pointer;\n}\n/* Webkit browsers add a 2px margin outside the chrome of form elements */\nbutton,\ninput,\nselect,\ntextarea {\n  margin: 0;\n}\n/* make buttons play nice in IE */\nbutton,\ninput[type=button] {\n  width: auto;\n  overflow: visible;\n}\n/* scale images in IE7 more attractively */\n.ie7 img {\n  -ms-interpolation-mode: bicubic;\n}\n/* prevent BG image flicker upon hover\n   (commented out as usage is rare, and the filter syntax messes with some pre-processors)\n.ie6 html {filter: expression(document.execCommand(\"BackgroundImageCache\", false, true));}\n*/\n/* let's clear some floats */\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden;\n}\n.clearfix:after {\n  clear: both;\n}\n.clearfix {\n  zoom: 1;\n}\ni,\nem {\n  font-style: normal;\n}\n.ov {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n/*背景色横向渐变*/\n/*公共样式方法 by 黄田汉  2018/08/30*/\n.ctt {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n#app,\nbody,\nhtml {\n  height: 100%;\n}\n::-webkit-scrollbar {\n  height: 0px;\n  width: 0px !important;\n}\n.height100 {\n  height: 100%;\n}\n.v-flex {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.flex_dom {\n  display: flex;\n  display: -webkit-box;\n  display: -webkit-flex;\n}\n.flex_column {\n  display: flex;\n  display: -webkit-box;\n  display: -webkit-flex;\n  flex-direction: column;\n  -webkit-flex-direction: column;\n}\n.flex_1 {\n  flex: 1;\n  -webkit-flex: 1;\n  display: block;\n  min-width: 0;\n}\n.flex_2 {\n  flex: 2;\n  -webkit-flex: 2;\n  display: block;\n  min-width: 0;\n}\n.flex_3 {\n  flex: 3;\n  -webkit-flex: 3;\n  display: block;\n  min-width: 0;\n}\n.flex_4 {\n  flex: 4;\n  -webkit-flex: 4;\n  display: block;\n  min-width: 0;\n}\n.flex_5 {\n  flex: 5;\n  -webkit-flex: 5;\n  display: block;\n  min-width: 0;\n}\n.flex_item_between {\n  justify-content: space-between;\n  -webkit-justify-content: space-between;\n}\n.flex_item_around {\n  justify-content: space-around;\n  -webkit-justify-content: space-around;\n}\n.flex_item_mid {\n  align-items: center;\n  -webkit-align-items: center;\n}\n.flex_item_stretch {\n  align-items: stretch;\n  -webkit-align-items: stretch;\n}\n.flex_item_center {\n  justify-content: center;\n  -webkit-justify-content: center;\n}\n.flex_wrap {\n  flex-wrap: wrap;\n  -webkit-flex-wrap: wrap;\n}\n.flex_auto {\n  flex: auto;\n  overflow: hidden;\n}\n.flex_item_end {\n  justify-content: flex-end;\n}\n.p18 {\n  padding: 18px;\n}\n.mt20 {\n  margin-top: 20px;\n}\n.mt30 {\n  margin-top: 30px;\n}\n.mr20 {\n  margin-right: 20px;\n}\n.mr12 {\n  margin-right: 12px;\n}\n.mr18 {\n  margin-right: 18px;\n}\n.mt18 {\n  margin-top: 18px;\n}\n.m18 {\n  margin: 18px;\n}\n.ov {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.font-limit-2 {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.sectionTitle {\n  display: flex;\n  justify-content: space-between;\n}\n.sectionTitle .name {\n  font-size: 16px;\n  color: #3C404B;\n  font-weight: 500;\n}\n.sectionTitle .name::before {\n  content: '';\n  border-right: 2px solid #0097FE;\n  margin-right: 8px;\n}\n.sectionTitle .more {\n  font-size: 12px;\n  color: #666972;\n  cursor: pointer;\n}\n.sectionTitle .tab-wrap ul[data-v-54017938] {\n  padding: 0;\n}\n.layoutWrap {\n  height: 100%;\n  border: 1px solid #d7dde4;\n  background: #f5f7f9;\n  position: relative;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.layoutWrap .sideMenu {\n  height: 100%;\n  overflow: scroll;\n}\n.layoutWrap .sideMenu .ivu-menu-dark .ivu-menu-item-active {\n  background: #0B1929 !important;\n  color: #fff;\n}\n.layoutWrap .sideMenu .ivu-menu-dark,\n.layoutWrap .sideMenu .ivu-menu-opened .ivu-menu-submenu-title,\n.layoutWrap .sideMenu .ivu-menu {\n  background: #0D2137;\n}\n.layoutWrap .sideMenu .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover {\n  background: #515a6e !important;\n}\n.layoutWrap .ivu-layout-sider {\n  background: #0D2137;\n}\n.layoutWrap .layout-content {\n  overflow: scroll;\n  min-width: 1200px;\n}\n.layoutWrap .web-logo {\n  height: 60px;\n  width: 100%;\n}\n.layoutWrap .web-logo img {\n  width: 50px;\n  height: 50px;\n}\n.layoutWrap .web-logo span {\n  font-size: 24px;\n  color: #fff;\n}\n.layoutWrap .ivu-layout {\n  height: 100%;\n}\n.layoutWrap .ivu-layout .ivu-layout-has-sider {\n  height: 100%;\n}\n.layoutWrap .layout-header-bar {\n  background: #fff;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n  display: flex;\n  justify-content: space-between;\n  border-bottom: 1px solid #EDF0F2;\n}\n.layoutWrap .layout-header-bar .userInfo {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.layoutWrap .layout-header-bar .userInfo .message {\n  color: #666972;\n  font-size: 14px;\n  margin-right: 24px;\n  display: flex;\n  align-items: center;\n}\n.layoutWrap .layout-header-bar .userInfo .message img {\n  width: 16px;\n  height: 16px;\n  margin-right: 4px;\n}\n.layoutWrap .layout-header-bar .userInfo .info {\n  padding: 0 24px;\n  box-shadow: 0px 0px 8px 0px rgba(57, 68, 82, 0.06);\n}\n.layoutWrap .layout-header-bar .userInfo .info .userName {\n  color: #666972;\n  font-size: 16px;\n  font-weight: 600;\n}\n.layoutWrap .layout-logo-left {\n  width: 90%;\n  height: 30px;\n  background: #5b6270;\n  border-radius: 3px;\n  margin: 15px auto;\n}\n.layoutWrap .menu-icon {\n  transition: all 0.3s;\n}\n.layoutWrap .rotate-icon {\n  transform: rotate(-90deg);\n}\n.layoutWrap .menu-item span {\n  display: inline-block;\n  overflow: hidden;\n  width: 69px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  vertical-align: bottom;\n  transition: width 0.2s ease 0.2s;\n}\n.layoutWrap .menu-item i {\n  transform: translateX(0px);\n  transition: font-size 0.2s ease, transform 0.2s ease;\n  vertical-align: middle;\n  font-size: 16px;\n}\n.layoutWrap .collapsed-menu span {\n  width: 0px;\n  transition: width 0.2s ease;\n}\n.layoutWrap .collapsed-menu i {\n  transform: translateX(5px);\n  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;\n  vertical-align: middle;\n  font-size: 22px;\n}\n",""])},"822e":function(n,e,t){var i=t("71a2");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals),(0,t("499e").default)("de9881b2",i,!0,{})},"9d64":function(n,e,t){n.exports=t.p+"static/img/logo.901b80bb.png"},fa24:function(n,e){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADlElEQVRYR+2XXWgUVxTHz7kz2yxJTcwGPygl0LTBgD4IK6YPPvj10pdSSwMx0DwINZvdZDXubGKyRkYaVnczCTU7+5G0tA8FG2xpHgyk1YJ5CIgPaW1RUQSjEvyINoS4JrubnXvKiJFgsjs7a0opOK/3nP/53T/nnnsHiUiA//DD/x3AwMBAwe9/3ZKJ06cIZAXGztuKbW1+f/t0PkaadqDBKf0MQB8DYAoQFoCoCAGvbqqs3t7SUpMyC2EKwH3kmD2ZmL8MgH8zxoaINCTA3UD0HmNifVQNnPnXAA55jlUnE4l+ItqychGcEgXmDoeCP5mBMHRgfHycffPdoMI5d78QJkR4CoCPAEAD4usAWSkRMX0dES/YSsr2+/3tM7mAZAUYHR3FwR/PnSWCfYjIETBW/HbRyUBAfrBUXJZDRVNP7jVy4h1EUAyIN8pKynbkApEVoNHlPcGJ+wDxmcXyVq36lX8k267cUsem5HxqWO8J3YlYWPnIyIWMAIdaOysS8blrAGARRbEm3BcYMhLT13WI1Hzyku6EKAi1Rj2REcDRJEWI00FEGIqFe2pyKb4Y09jc6uGaFkCAP2ORHnu23MwALmmSiDYWWAt29vX6x8wA6D3x8PGdKSIoKLKuqeztlScy5a8I4PV2ls8+m7uNCPEvDtTZ7HY7NwOgxza4PBeAYJcoCnXhvuBZUwDNLR0fppLJMQS8GYsom80W1+MdLu+3RLxeYMwTUbtPmwJoOty2eyGVPg+IV/rDyrb8AFpVIs0hMOyMqMrJNwBvHDDlgNvdvieZTv26Gk3IBHYiGur+0hRAY7PUxTU6iojnYmFlXz6nYHEaAuJE1QfVmzM9VpYNotDIiHh1+Le7QLDBYrF8op4+NZwPgKJ8b711+8p1ACgXmOCLqMHASjrLAFzNrZ+lNW0QECcPHthfkc8UfHknNHlrOOc/6BO1sNRW1dvle/gqxDKABqf0CwDtZcjkaLi7K5/dL81pcEmjQLQDGQ7EVMVpCOBwSvcJaD0iponA9B2wHPj5f4egP1xjEWWrIYCzSWrXOMl60uvufkn+giCI7kgo8LUhgB6gX6ez6dk1qwXwztryGUn6PJFTE2YqGgwGC6en50qzQS2IFurp8t03A274KtbFPB75/fj80z8AoNBInDF2Jqp21xvFLa7nBNDWJm+YiccvAtG72YQRgSMKfVE1eHxVAXIVyycuJwfyEc415x+qMgM/sMg30gAAAABJRU5ErkJggg=="}}]);