
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/IPTV/index","pages/TV/TV","pages/movie/movie","pages/my/my"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"罗蛳粉的图书商店","navigationBarBackgroundColor":"#d81e06","backgroundColor":"#fff","enablePullDownRefresh":false},"tabBar":{"color":"#2c2c2c","selectedColor":"#d81e06","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/IPTV/index","iconPath":"static/tabbar/iptv.png","text":"首页"},{"pagePath":"pages/TV/TV","iconPath":"static/tabbar/TV.png","text":"分类"},{"pagePath":"pages/movie/movie","iconPath":"static/tabbar/movie.png","text":"购物车"},{"pagePath":"pages/my/my","iconPath":"static/tabbar/my.png","text":"我"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"ZG下载","compilerVersion":"3.6.4","entryPagePath":"pages/IPTV/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/IPTV/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"IPTV"}},{"path":"/pages/TV/TV","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"Tv"}},{"path":"/pages/movie/movie","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"Movie"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"My"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});