//function show_runtime() {if(document.getElementById("webtime")==null){return false;}else{window.setTimeout("show_runtime()", 1000);var X = new Date("7/10/2019 23:59:59");var Y = new Date();var T = (Y.getTime() - X.getTime());var M = 24 * 60 * 60 * 1000;var a = T / M;var A = Math.floor(a);var b = (a - A) * 24; var B = Math.floor(b);var c = (b - B) * 60;var C = Math.floor((b - B) * 60);var D = Math.floor((c - C) * 60);document.getElementById("webtime").innerHTML = "已运行: " + A + "天" + B + "小时" + C + "分" + D + "秒"}}
//var colortap = function (r) {function t() {return b[Math.floor(Math.random() * b.length)]}  function e() {return String.fromCharCode(94 * Math.random() + 33)}function n(r) {for(var n=document.createDocumentFragment(),i=0;r>i;i++){var l=document.createElement("span");l.textContent=e(),l.style.color=t(),n.appendChild(l)}return n;}function i() {var t = o[c.skillI];c.step ? c.step-- : (c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay-- : (c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")), r.textContent = c.text, r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))), setTimeout(i, d)}var l = "",o = ["醒亦念卿，梦亦念卿","频繁记录，只因生活和你太值得","孜孜不倦，认真且怂"].map(function (r) {return r + ""}),a = 2,g = 1,s = 5,d = 75,b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],c = {text: "",prefixP: -s,skillI: 0,skillP: 0,direction: "forward",delay: a,step: g};i()};
//function unmouse(){document.onkeydown = document.onkeyup = document.onkeypress = function(event) {var e = event || window.event || arguments.callee.caller.arguments[0];if (e && (e.keyCode == 123 || (e.keyCode == 116 && e.type!='keypress'))) {e.returnValue = false;return (false);}}}
//function dark() {window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;var n,e,i,h,t=.05,s=document.getElementById("universe"),o=!0,a="180,184,240",r="226,225,142",d="226,225,224",c=[];function f(){n=window.innerWidth,e=window.innerHeight,i=.216*n,s.setAttribute("width",n),s.setAttribute("height",e)}function u(){h.clearRect(0,0,n,e);for(var t=c.length,i=0;i<t;i++){var s=c[i];s.move(),s.fadeIn(),s.fadeOut(),s.draw()}}function y(){this.reset=function(){this.giant=m(3),this.comet=!this.giant&&!o&&m(10),this.x=l(0,n-10),this.y=l(0,e),this.r=l(1.1,2.6),this.dx=l(t,6*t)+(this.comet+1-1)*t*l(50,120)+2*t,this.dy=-l(t,6*t)-(this.comet+1-1)*t*l(50,120),this.fadingOut=null,this.fadingIn=!0,this.opacity=0,this.opacityTresh=l(.2,1-.4*(this.comet+1-1)),this.do=l(5e-4,.002)+.001*(this.comet+1-1)},this.fadeIn=function(){this.fadingIn&&(this.fadingIn=!(this.opacity>this.opacityTresh),this.opacity+=this.do)},this.fadeOut=function(){this.fadingOut&&(this.fadingOut=!(this.opacity<0),this.opacity-=this.do/2,(this.x>n||this.y<0)&&(this.fadingOut=!1,this.reset()))},this.draw=function(){if(h.beginPath(),this.giant)h.fillStyle="rgba("+a+","+this.opacity+")",h.arc(this.x,this.y,2,0,2*Math.PI,!1);else if(this.comet){h.fillStyle="rgba("+d+","+this.opacity+")",h.arc(this.x,this.y,1.5,0,2*Math.PI,!1);for(var t=0;t<30;t++)h.fillStyle="rgba("+d+","+(this.opacity-this.opacity/20*t)+")",h.rect(this.x-this.dx/4*t,this.y-this.dy/4*t-2,2,2),h.fill()}else h.fillStyle="rgba("+r+","+this.opacity+")",h.rect(this.x,this.y,this.r,this.r);h.closePath(),h.fill()},this.move=function(){this.x+=this.dx,this.y+=this.dy,!1===this.fadingOut&&this.reset(),(this.x>n-n/4||this.y<0)&&(this.fadingOut=!0)},setTimeout(function(){o=!1},50)}function m(t){return Math.floor(1e3*Math.random())+1<10*t}function l(t,i){return Math.random()*(i-t)+t}f(),window.addEventListener("resize",f,!1),function(){h=s.getContext("2d");for(var t=0;t<i;t++)c[t]=new y,c[t].reset();u()}(),function t(){document.getElementsByTagName('html')[0].getAttribute('data-theme')=='dark'&&u(),window.requestAnimationFrame(t)}()};
//dark()

if (document.getElementById('post-cover')) {
  const node = document.getElementById('post-cover')
  const img = node.getAttribute('data-lazy-src') || node.getAttribute('src')
  RGBaster.colors(img, {
      paletteSize: 30,
      exclude: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(254,254,254)"],
      success: function(t) {
        if (t.dominant != 'rgb()'){
          const c = t.dominant.match(/\d+/g);
          if(c[0]>210&&c[1]>210&&c[2]>210){
            c[0]=210;c[1]=210;c[2]=210;
          }
          const Color = `rgba(${c[0]},${c[1]},${c[2]})`;
          let fontColor;
          //const grayLevel = c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;
          const grayLevel = c[0] * 0.213 + c[1] * 0.715 + c[2] * 0.072;
          //if (grayLevel >= 190) {
          if (grayLevel >= 255/2) {
            // 若为浅色，把文字设置为黑色
            fontColor = '#000';
            metaColor = '#1C1C1C';
          } else {
            fontColor = '#fff';
            metaColor = '#eee';
          }
          document.styleSheets[0].addRule(":root", "--mj-main:" + Color + "!important")
          document.styleSheets[0].addRule(":root", "--mj-titlecolor:" + fontColor + "!important")
          document.styleSheets[0].addRule(":root", "--mj-metacolor:" + metaColor + "!important")
        } else {
          document.styleSheets[0].addRule(":root", "--mj-main: rgba(210,210,210) !important")
          document.styleSheets[0].addRule(":root", "--mj-titlecolor: #000 !important")
          document.styleSheets[0].addRule(":root", "--mj-metacolor: #1C1C1C !important")
        }
      },
      error: function() {
        document.styleSheets[0].addRule(":root", "--mj-main: rgba(210,210,210) !important")
        document.styleSheets[0].addRule(":root", "--mj-titlecolor: #000 !important")
        document.styleSheets[0].addRule(":root", "--mj-metacolor: #1C1C1C !important")
      }
  })
} else {
  //document.styleSheets[0].addRule(":root", "--mj-main: #007AFF !important")
  document.styleSheets[0].addRule(":root", "--mj-titlecolor: var(--mj-fontcolor) !important")
}

function switchDarkMode() { // Switch Between Light And Dark Mode
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  if (nowMode === 'light') {
    activateDarkMode()
    saveToLocal.set('theme', 'dark', 2)
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
  } else {
    activateLightMode()
    saveToLocal.set('theme', 'light', 2)
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
  }
  // handle some cases
  typeof utterancesTheme === 'function' && utterancesTheme()
  typeof FB === 'object' && window.loadFBComment()
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
}
function scrollToTop() {btf.scrollToDest(0, 500)}
function switchPostChart () {
  // 这里为了统一颜色选取的是“明暗模式”下的两种字体颜色，也可以自己定义
  let color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4c4948' : 'rgba(255,255,255,0.7)'
  if (document.getElementById('posts-chart')) {
    let postsOptionNew = postsOption
    postsOptionNew.textStyle.color = color
    postsOptionNew.title.textStyle.color = color
    postsOptionNew.xAxis.axisLine.lineStyle.color = color
    postsOptionNew.yAxis.axisLine.lineStyle.color = color
    postsChart.setOption(postsOptionNew)
  }
  if (document.getElementById('tags-chart')) {
    let tagsOptionNew = tagsOption
    tagsOptionNew.textStyle.color = color
    tagsOptionNew.title.textStyle.color = color
    tagsOptionNew.xAxis.axisLine.lineStyle.color = color
    tagsOptionNew.yAxis.axisLine.lineStyle.color = color
    tagsChart.setOption(tagsOptionNew)
  }
  if (document.getElementById('categories-chart')) {
    let categoriesOptionNew = categoriesOption
    categoriesOptionNew.textStyle.color = color
    categoriesOptionNew.title.textStyle.color = color
    categoriesOptionNew.legend.textStyle.color = color
    categoriesChart.setOption(categoriesOptionNew)
  }
}
function switchVisitChart () {
  // 这里为了统一颜色选取的是“明暗模式”下的两种字体颜色，也可以自己定义
  let color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4c4948' : 'rgba(255,255,255,0.7)'
  if (document.getElementById('map-chart')) {
    let mapOptionNew = mapOption
    mapOptionNew.title.textStyle.color = color
    mapOptionNew.visualMap.textStyle.color = color
    mapChart.setOption(mapOptionNew)
  }
  if (document.getElementById('trends-chart')) {
    let trendsOptionNew = trendsOption
    trendsOptionNew.title.textStyle.color = color
    trendsOptionNew.xAxis.axisLine.lineStyle.color = color
    trendsOptionNew.yAxis.axisLine.lineStyle.color = color
    trendsOptionNew.textStyle.color = color
    trendsChart.setOption(trendsOptionNew)
  }
  if (document.getElementById('sources-chart')) {
    let sourcesOptionNew = sourcesOption
    sourcesOptionNew.title.textStyle.color = color
    sourcesOptionNew.legend.textStyle.color = color
    sourcesOptionNew.textStyle.color = color
    sourcesChart.setOption(sourcesOptionNew)
  }
}

document.getElementById("menu-darkmode").addEventListener("click", function () { setTimeout(switchPostChart, 100); setTimeout(switchVisitChart, 100)})
document.getElementById("darkmode_navswitch").addEventListener("click", function () { setTimeout(switchPostChart, 100); setTimeout(switchVisitChart, 100) })
//分类条
function categoriesBarActive(){
  var urlinfo = window.location.pathname;
  urlinfo = decodeURIComponent(urlinfo)
  //console.log(urlinfo);
  //判断是否是首页
  if (urlinfo == '/'){
    if (document.querySelector('#category-bar')){
      document.getElementById('首页').classList.add("select")
    }
  }else {
    // 验证是否是分类链接
    var pattern = /\/categories\/.*?\//;
    var patbool = pattern.test(urlinfo);
    //console.log(patbool);
    // 获取当前的分类
    if (patbool) {
      var valuegroup = urlinfo.split("/");
      //console.log(valuegroup[2]);
      // 获取当前分类
      var nowCategorie = valuegroup[2];
      if (document.querySelector('#category-bar')){
        document.getElementById(nowCategorie).classList.add("select");
      }
    }
  } 
}
//标签条
function tagsBarActive(){
  var urlinfo = window.location.pathname;
  urlinfo = decodeURIComponent(urlinfo)
  //console.log(urlinfo);
  //判断是否是首页
  if (urlinfo == '/'){
    if (document.querySelector('#tags-bar')){
      document.getElementById('首页').classList.add("select")
    }
  }else {
    // 验证是否是分类链接
    var pattern = /\/tags\/.*?\//;
    var patbool = pattern.test(urlinfo);
    //console.log(patbool);
    // 获取当前的标签
    if (patbool) {
      var valuegroup = urlinfo.split("/");
      //console.log(valuegroup[2]);
      // 获取当前分类
      var nowTag = valuegroup[2];
      if (document.querySelector('#category-bar')){
        document.getElementById(nowTag).classList.add("select");
      }
    }
  } 
}
//鼠标控制横向滚动
function topCategoriesBarScroll(){
  if (document.getElementById("category-bar-items")){
    let xscroll = document.getElementById("category-bar-items");
    xscroll.addEventListener("mousewheel", function (e) {
    //计算鼠标滚轮滚动的距离
    let v = -e.wheelDelta / 2;
    xscroll.scrollLeft += v;
    //阻止浏览器默认方法
    e.preventDefault();
}, false);
  }
}
//鼠标控制横向滚动
function topPostsBarScroll(){
  if (document.body.clientWidth <= 768) {
    //console.log("topPostsBarScroll")
    if (document.getElementById("homeTopGroup")){
      let xscroll = document.getElementById("homeTopGroup");
      xscroll.addEventListener("mousewheel", function (e) {
      //计算鼠标滚轮滚动的距离
      let v = -e.wheelDelta / 2;
      xscroll.scrollLeft += v;
      //阻止浏览器默认方法
      e.preventDefault();
      }, false);
    }
  }
}
categoriesBarActive()
tagsBarActive()
topCategoriesBarScroll()
topPostsBarScroll()