var fdata={jsonurl:"",apiurl:"",apipublieurl:"https://circle-of-friends-simple.vercel.app/",initnumber:20,stepnumber:10,article_sort:"created",error_img:"https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c"};if("undefined"!=typeof fdataUser)for(var key in fdataUser)fdataUser[key]&&(fdata[key]=fdataUser[key]);var article_num="",sortNow="",UrlNow="",friends_num="",container=document.getElementById("cf-container")||document.getElementById("fcircleContainer"),localSortNow=localStorage.getItem("sortNow"),localUrlNow=localStorage.getItem("urlNow");function loadStatistical(a){article_num=a.article_num,friends_num=a.friends_num;var t=`\n  <div id="cf-state" class="cf-new-add">\n    <div class="cf-state-data">\n      <div class="cf-data-friends">\n        <span class="cf-label">订阅</span>\n        <span class="cf-message">${a.friends_num}</span>\n      </div>\n      <div class="cf-data-active">\n        <span class="cf-label">活跃</span>\n        <span class="cf-message">${a.active_num}</span>\n      </div>\n      <div class="cf-data-article" onclick="clearLocal()">\n        <span class="cf-label">日志</span>\n        <span class="cf-message">${a.article_num}</span>\n      </div>\n    </div>\n    <div id="cf-change">\n        <span id="cf-change-created" data-sort="created" onclick="changeSort(event)" class="${"created"==sortNow?"cf-change-now":""}">Created</span> | <span id="cf-change-updated" data-sort="updated" onclick="changeSort(event)" class="${"updated"==sortNow?"cf-change-now":""}" >Updated</span>\n    </div>\n  </div>\n  `,e=`\n    <div id="cf-more" class="cf-new-add" onclick="loadNextArticle()"><i class="fas fa-angle-double-down"></i></div>\n    <div id="cf-footer" class="cf-new-add">\n     <span id="cf-version-up" onclick="checkVersion()"></span>\n     <span class="cf-data-lastupdated">更新于：${a.last_updated_time}</span>\n      Powered by <a target="_blank" href="https://github.com/Rock-Candy-Tea/hexo-circle-of-friends" target="_blank">FriendCircle</a>\n    </div>\n  `;container&&(container.insertAdjacentHTML("beforebegin",t),container.insertAdjacentHTML("afterend",e))}function loadArticleItem(a,t,e){var l="",r=e;if(e>article_num&&(r=article_num),t<article_num){for(var c=t;c<r;c++){var n=a[c];l+=`\n      <div class="cf-article">\n        <a class="cf-article-title" href="${n.link}" target="_blank" rel="noopener nofollow" data-title="${n.title}">${n.title}</a>\n        <span class="cf-article-floor">${n.floor}</span>\n        <div class="cf-article-avatar no-lightbox flink-item-icon">\n          <img class="cf-img-avatar avatar" src="${n.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">\n          <span class="cf-article-author">${n.author}</span>\n          <span class="cf-article-time">\n            <span class="cf-time-created" style="${"created"==sortNow?"":"display:none"}"><i class="far fa-calendar-alt">发表于</i>${n.created}</span>\n            <span class="cf-time-updated" style="${"updated"==sortNow?"":"display:none"}"><i class="fas fa-history">更新于</i>${n.updated}</span>\n          </span>\n        </div>\n      </div>\n      `}container.insertAdjacentHTML("beforeend",l),fetchNextArticle()}else document.getElementById("cf-more").outerHTML='<div id="cf-more" class="cf-new-add" onclick="loadNoArticle()"><small>一切皆有尽头！</small></div>'}function fetchNextArticle(){var start=document.getElementsByClassName("cf-article").length,end=start+fdata.stepnumber,articleNum=article_num;if(end>articleNum&&(end=articleNum),start<articleNum){UrlNow=localStorage.getItem("urlNow");var fetchUrl=UrlNow+"rule="+sortNow+"&start="+start+"&end="+end;fetch(fetchUrl).then((a=>a.json())).then((json=>{var nextArticle=eval(json.article_data);console.log("已预载?rule="+sortNow+"&start="+start+"&end="+end),localStorage.setItem("nextArticle",JSON.stringify(nextArticle))}))}else(start=articleNum)&&(document.getElementById("cf-more").outerHTML='<div id="cf-more" class="cf-new-add" onclick="loadNoArticle()"><small>一切皆有尽头！</small></div>')}function loadNextArticle(){for(var a=JSON.parse(localStorage.getItem("nextArticle")),t="",e=0;e<a.length;e++){var l=a[e];t+=`\n      <div class="cf-article">\n        <a class="cf-article-title" href="${l.link}" target="_blank" rel="noopener nofollow" data-title="${l.title}">${l.title}</a>\n        <span class="cf-article-floor">${l.floor}</span>\n        <div class="cf-article-avatar no-lightbox flink-item-icon">\n          <img class="cf-img-avatar avatar" src="${l.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">\n          <span class="cf-article-author">${l.author}</span>\n          <span class="cf-article-time">\n            <span class="cf-time-created" style="${"created"==sortNow?"":"display:none"}"><i class="far fa-calendar-alt"></i>${l.created}</span>\n            <span class="cf-time-updated" style="${"updated"==sortNow?"":"display:none"}"><i class="fas fa-history"></i>${l.updated}</span>\n          </span>\n        </div>\n      </div>\n      `}container.insertAdjacentHTML("beforeend",t),fetchNextArticle()}function loadNoArticle(){var a=sortNow+"ArticleData";localStorage.removeItem(a),localStorage.removeItem("statisticalData"),document.getElementById("cf-more").remove(),window.scrollTo(0,document.getElementsByClassName("cf-state").offsetTop)}function clearLocal(){localStorage.removeItem("updatedArticleData"),localStorage.removeItem("createdArticleData"),localStorage.removeItem("nextArticle"),localStorage.removeItem("statisticalData"),localStorage.removeItem("sortNow"),localStorage.removeItem("urlNow"),location.reload()}function checkVersion(){var a=fdata.apiurl+"version";fetch(a).then((a=>a.json())).then((a=>{console.log(a);var t=a.status,e=a.current_version,l=a.latest_version,r=document.getElementById("cf-version-up");r.innerHTML=0==t?"当前版本：v"+e:1==t?"发现新版本：v"+e+" ↦ "+l:"网络错误，检测失败！"}))}function FetchFriendCircle(sortNow,changeUrl){var end=fdata.initnumber,fetchUrl=UrlNow+"rule="+sortNow+"&start=0&end="+end;changeUrl&&(fetchUrl=changeUrl+"rule="+sortNow+"&start=0&end="+end),fetch(fetchUrl).then((a=>a.json())).then((json=>{var statisticalData=json.statistical_data,articleData=eval(json.article_data),articleSortData=sortNow+"ArticleData";loadStatistical(statisticalData),loadArticleItem(articleData,0,end),localStorage.setItem("statisticalData",JSON.stringify(statisticalData)),localStorage.setItem(articleSortData,JSON.stringify(articleData))}))}function changeSort(a){sortNow=a.currentTarget.dataset.sort,localStorage.setItem("sortNow",sortNow),document.querySelectorAll(".cf-new-add").forEach((a=>a.remove())),container.innerHTML="",changeUrl=localStorage.getItem("urlNow"),initFriendCircle(sortNow,changeUrl),fdata.apiurl&&checkVersion()}function initFriendCircle(sortNow,changeUrl){var articleSortData=sortNow+"ArticleData",localStatisticalData=JSON.parse(localStorage.getItem("statisticalData")),localArticleData=JSON.parse(localStorage.getItem(articleSortData));if(container.innerHTML="",localStatisticalData&&localArticleData){loadStatistical(localStatisticalData),loadArticleItem(localArticleData,0,fdata.initnumber),console.log("本地数据加载成功");var fetchUrl=UrlNow+"rule="+sortNow+"&start=0&end="+fdata.initnumber;fetch(fetchUrl).then((a=>a.json())).then((json=>{var statisticalData=json.statistical_data,articleData=eval(json.article_data),localSnum=localStatisticalData.article_num,newSnum=statisticalData.article_num,localAtile=localArticleData[0].title,newAtile=articleData[0].title;if(localSnum!==newSnum||localAtile!==newAtile){document.getElementById("cf-state").remove(),document.getElementById("cf-more").remove(),document.getElementById("cf-footer").remove(),container.innerHTML="";var articleSortData=sortNow+"ArticleData";loadStatistical(statisticalData),loadArticleItem(articleData,0,fdata.initnumber),localStorage.setItem("statisticalData",JSON.stringify(statisticalData)),localStorage.setItem(articleSortData,JSON.stringify(articleData)),console.log("热更新完成")}else console.log("API数据未更新")}))}else FetchFriendCircle(sortNow,changeUrl),console.log("第一次加载完成")}localSortNow&&localUrlNow?(sortNow=localSortNow,UrlNow=localUrlNow):(sortNow=fdata.article_sort,UrlNow=fdata.jsonurl?fdata.apipublieurl+"postjson?jsonlink="+fdata.jsonurl+"&":fdata.apiurl?fdata.apiurl+"all?":fdata.apipublieurl+"all?",console.log("当前模式："+UrlNow),localStorage.setItem("urlNow",UrlNow),localStorage.setItem("sortNow",sortNow)),initFriendCircle(sortNow);