window.addEventListener('load', () => {

  let fundsurl = "https://api.doctorxiong.club/v1/fund?code=" + fundslist.funds

  var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
  httpRequest.open('GET', fundsurl, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
  httpRequest.send();//第三步：发送请求  将请求参数写在URL中
  /**
   * 获取数据后的处理程序
   */
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var json = httpRequest.responseText;//获取到json字符串，还需解析
      var obj = eval('(' + json + ')');
      // console.log(obj.data)
      const fundsArray = obj.data.map(e => {
        return {
          'code': e.code,
          'name': e.name,
          'dayGrowth': e.expectGrowth,
          'color': (e.expectGrowth > 0) ? 'red' : 'green',
        }
      })
      // console.log(fundsArray)
      saveToLocal.set('mj-funds', JSON.stringify(fundsArray), 5 / (60 * 24))
      const data = saveToLocal.get('mj-funds');
      generateHtml(JSON.parse(data))
    }
  };

  const generateHtml = array => {
    let result = ''

    if (array.length) {
      for (let i = 0; i < array.length; i++) {
        result += `<div class='funds-list-item'><div class='content'>
        <span class='fund_name'>${array[i].name}</span>
        <div class='fund_dayGrowth' style='color: ${array[i].color}'><span>${array[i].dayGrowth}%</span></div>
        </div></div>`;
      }
    } else {
      result += '暂时还没有关注基金...';
    }

    let $dom = document.querySelector('#card-funds .funds-list');
    $dom.innerHTML = result;
    window.lazyLoadInstance && window.lazyLoadInstance.update();
    window.pjax && window.pjax.refresh($dom);
  }

  const fundsInit = () => {
    // console.log('运行')
    if (document.querySelector('#card-funds .funds-list')) {
      const data = saveToLocal.get('mj-funds');
      if (data) {
        generateHtml(JSON.parse(data))
      } else {
      }
    }
  }
  const weiboInit = () =>{
    fetch('https://weibo-top-api-chi.vercel.app/api').then(data => data.json()).then(data => {
      let html = '<style>#weibo-container{height:300px;overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none}#weibo-container::-webkit-scrollbar{display:none}.weibo-list-item{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:nowrap}.weibo-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-right:auto}.weibo-num{float:right}.weibo-hotness{display:inline-block;padding:0 6px;transform:scale(.8) translateX(-3px);color:#fff;border-radius:8px}.weibo-new{background:#ff3852}.weibo-hot{background:#ff9406}.weibo-recommend{background:#00b7ee}.weibo-adrecommend{background:#febd22}.weibo-friend{background:#8fc21e}.weibo-boom{background:#bd0000}.weibo-topic{background:#ff6f49}.weibo-topic-ad{background:#4dadff}.weibo-boil{background:#f86400}</style>'
      html += '<div class="weibo-list">'
      let hotness = {
        '爆': 'weibo-boom',
        '热': 'weibo-hot',
        '沸': 'weibo-boil',
        '新': 'weibo-new',
        '荐': 'weibo-recommend'
      }
      for (let item of data) {
        html += '<div class="weibo-list-item"><div class="weibo-hotness ' + hotness[(item.hot || '荐')] + '">' + (item.hot || '荐') + '</div>'
          + '<span class="weibo-title"><a title="' + item.title + '"href="' + item.url + '" target="_blank">' + item.title + '</a></span>'
          + '<div class="weibo-num"><span>' + item.num + '</span></div></div>'
      }
      html += '</div>'
      document.getElementById('weibo-container').innerHTML = html
    }).catch(function (error) {
      console.log(error);
    });
  }

  fundsInit();
  weiboInit();
  document.addEventListener('pjax:complete', fundsInit);
})