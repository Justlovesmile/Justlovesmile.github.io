"use strict";
var fdata = {
    jsonurl: "",
    apiurl: "https://fcircle.justlovesmile.top/",
    apipublicurl: "https://fcircle.justlovesmile.top/",
    initnumber: 30,
    stepnumber: 30,
    article_sort: "created",
    error_img: "https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c"
};
if ("undefined" != typeof fdataUser) for (var key in fdataUser) fdataUser[key] && (fdata[key] = fdataUser[key]);
var article_num = "",
sortNow = "",
UrlNow = "",
friends_num = "",
container = document.getElementById("cf-container") || document.getElementById("fcircleContainer"),
localSortNow = localStorage.getItem("sortNow"),
localUrlNow = localStorage.getItem("urlNow");
function loadStatistical(a) {
    article_num = a.article_num,
    friends_num = a.friends_num;
    '\n  <div id="cf-state" class="cf-new-add">\n    <div class="cf-state-data">\n      <div class="cf-data-friends">\n        <span class="cf-label">订阅</span>\n        <span class="cf-message">'.concat(a.friends_num, '</span>\n      </div>\n      <div class="cf-data-active" onclick="changeEgg()">\n        <span class="cf-label">活跃</span>\n        <span class="cf-message">').concat(a.active_num, '</span>\n      </div>\n      <div class="cf-data-article" onclick="clearLocal()">\n        <span class="cf-label">日志</span>\n        <span class="cf-message">').concat(a.article_num, '</span>\n      </div>\n    </div>\n    <div id="cf-change">\n        <span id="cf-change-created" data-sort="created" onclick="changeSort(event)" class="').concat("created" == sortNow ? "cf-change-now": "", '">Created</span> | <span id="cf-change-updated" data-sort="updated" onclick="changeSort(event)" class="').concat("updated" == sortNow ? "cf-change-now": "", '" >Updated</span>\n    </div>\n  </div>\n  ');
    var t = '\n    <div id="cf-more" class="cf-new-add" onclick="loadNextArticle()"><i class="fas fa-angle-double-down"></i></div>\n    <div id="cf-footer" class="cf-new-add">\n     <span id="cf-version-up" onclick="checkVersion()"></span>\n     <span class="cf-data-lastupdated">更新于：'.concat(a.last_updated_time, '</span>\n     <span class="cf-data-lastupdated">订阅:').concat(a.friends_num, " 活跃:").concat(a.active_num, " 日志:").concat(a.article_num, '</span>\n    </div>\n  ');
    container && container.insertAdjacentHTML("afterend", t)
}
function loadArticleItem(a, t, e) {
    var c = "",
    n = article_num < e ? article_num: e;
    if (t < article_num) {
        for (var o = t; o < n; o++) {
            var l = a[o];
            c += '\n      <div class="cf-article">\n        <a class="cf-article-title" href="'.concat(l.link, '" target="_blank" rel="noopener nofollow" data-title="').concat(l.title, '">').concat(l.title, '</a>\n        <span class="cf-article-floor">').concat(l.floor, '</span>\n        <div class="cf-article-avatar no-lightbox flink-item-icon">\n <a href="').concat(l.link, '" class="" target="_blank" rel="noopener nofollow"><img class="cf-img-avatar avatar" src= "https://npm.elemecdn.com/guli-heo/others/loading.png" data-lazy-src="').concat(l.avatar, '" alt="avatar" onerror="this.src=\'').concat(fdata.error_img, '\'; this.onerror = null;"><span class="cf-article-author">').concat(l.author, '</span></a>\n          <span class="cf-article-time">\n            <span class="cf-time-created" style="').concat("created" == sortNow ? "": "display:none", '">').concat(l.created, '</span>\n            <span class="cf-time-updated" style="').concat("updated" == sortNow ? "": "display:none", '"><i class="fas fa-history">更新于</i>').concat(l.updated, "</span>\n          </span>\n        </div>\n      </div>\n      ")
        }
        container.insertAdjacentHTML("beforeend", c),
        fetchNextArticle()
    } else document.getElementById("cf-more").outerHTML = '<div id="cf-more" class="cf-new-add" onclick="loadNoArticle()"><small>一切皆有尽头！</small></div>'
}
function fetchNextArticle() {
    var start = document.getElementsByClassName("cf-article").length,
    end = start + fdata.stepnumber,
    articleNum = article_num,
    fetchUrl;
    articleNum < end && (end = articleNum),
    start < articleNum ? (UrlNow = localStorage.getItem("urlNow"), fetchUrl = UrlNow + "rule=" + sortNow + "&start=" + start + "&end=" + end, fetch(fetchUrl).then(function(a) {
        return a.json()
    }).then(function(json) {
        var nextArticle = eval(json.article_data);
        console.log("已预载?rule=" + sortNow + "&start=" + start + "&end=" + end),
        localStorage.setItem("nextArticle", JSON.stringify(nextArticle))
    })) : (start = articleNum) && (document.getElementById("cf-more").outerHTML = '<div id="cf-more" class="cf-new-add" onclick="loadNoArticle()"><small>一切皆有尽头！</small></div>'),
    lazyLoadInstance.update()
}
function loadNextArticle() {
    for (var a = JSON.parse(localStorage.getItem("nextArticle")), t = "", e = 0; e < a.length; e++) {
        var c = a[e];
        t += '\n<div class="cf-article">\n        <a class="cf-article-title" href="'.concat(c.link, '" target="_blank" rel="noopener nofollow" data-title="').concat(c.title, '">').concat(c.title, '</a>\n <span class="cf-article-floor">').concat(c.floor, '</span>\n        <div class="cf-article-avatar no-lightbox flink-item-icon">\n <a href="').concat(c.link, '" class="" target="_blank" rel="noopener nofollow"><img class="cf-img-avatar avatar" src= "https://npm.elemecdn.com/guli-heo/others/loading.png" data-lazy-src="').concat(c.avatar, '" alt="avatar" onerror="this.src=\'').concat(fdata.error_img, '\'; this.onerror = null;"><span class="cf-article-author">').concat(c.author, '</span></a>\n          <span class="cf-article-time">\n            <span class="cf-time-created" style="').concat("created" == sortNow ? "": "display:none", '">').concat(c.created, '</span>\n            <span class="cf-time-updated" style="').concat("updated" == sortNow ? "": "display:none", '"><i class="fas fa-history">更新于</i>').concat(c.updated, "</span>\n          </span>\n        </div>\n      </div>\n      ")
    }
    container.insertAdjacentHTML("beforeend", t),
    fetchNextArticle()
}
function loadNoArticle() {
    var a = sortNow + "ArticleData";
    localStorage.removeItem(a),
    localStorage.removeItem("statisticalData"),
    document.getElementById("cf-more").remove(),
    window.scrollTo(0, document.getElementsByClassName("cf-state").offsetTop)
}
function clearLocal() {
    localStorage.removeItem("updatedArticleData"),
    localStorage.removeItem("createdArticleData"),
    localStorage.removeItem("nextArticle"),
    localStorage.removeItem("statisticalData"),
    localStorage.removeItem("sortNow"),
    localStorage.removeItem("urlNow"),
    location.reload()
}
function checkVersion() {
    var a = fdata.apiurl + "version";
    fetch(a).then(function(a) {
        return a.json()
    }).then(function(a) {
        console.log(a);
        var t = a.status,
        e = a.current_version,
        c = a.latest_version,
        n = document.getElementById("cf-version-up");
        n.innerHTML = 0 == t ? "当前版本：v" + e: 1 == t ? "发现新版本：v" + e + " ↦ " + c: "网络错误，检测失败！"
    })
}
function changeEgg() {
    var a;
    fdata.jsonurl || fdata.apiurl ? (document.querySelectorAll(".cf-new-add").forEach(function(a) {
        return a.remove()
    }), localStorage.removeItem("updatedArticleData"), localStorage.removeItem("createdArticleData"), localStorage.removeItem("nextArticle"), localStorage.removeItem("statisticalData"), container.innerHTML = "", UrlNow = localStorage.getItem("urlNow"), a = fdata.apipublicurl + "all?", UrlNow !== a ? changeUrl = fdata.apipublicurl + "all?": fdata.jsonurl ? changeUrl = fdata.apipublicurl + "postjson?jsonlink=" + fdata.jsonurl + "&": fdata.apiurl && (changeUrl = fdata.apiurl + "all?"), localStorage.setItem("urlNow", changeUrl), FetchFriendCircle(sortNow, changeUrl)) : clearLocal()
}
function FetchFriendCircle(sortNow, changeUrl) {
    var end = fdata.initnumber,
    fetchUrl = changeUrl ? changeUrl + "rule=" + sortNow + "&start=0&end=" + end: UrlNow + "rule=" + sortNow + "&start=0&end=" + end;
    fetch(fetchUrl).then(function(a) {
        return a.json()
    }).then(function(json) {
        var statisticalData = json.statistical_data,
        articleData = eval(json.article_data),
        articleSortData = sortNow + "ArticleData";
        loadStatistical(statisticalData),
        loadArticleItem(articleData, 0, end),
        localStorage.setItem("statisticalData", JSON.stringify(statisticalData)),
        localStorage.setItem(articleSortData, JSON.stringify(articleData))
    })
}
function changeSort(a) {
    sortNow = a.currentTarget.dataset.sort,
    localStorage.setItem("sortNow", sortNow),
    document.querySelectorAll(".cf-new-add").forEach(function(a) {
        return a.remove()
    }),
    container.innerHTML = "",
    changeUrl = localStorage.getItem("urlNow"),
    initFriendCircle(sortNow, changeUrl),
    fdata.apiurl && checkVersion()
}

localSortNow && localUrlNow ? (sortNow = localSortNow, UrlNow = localUrlNow) : (sortNow = fdata.article_sort, UrlNow = fdata.jsonurl ? fdata.apipublicurl + "postjson?jsonlink=" + fdata.jsonurl + "&": fdata.apiurl ? fdata.apiurl + "all?": fdata.apipublicurl + "all?", console.log("当前模式：" + UrlNow), localStorage.setItem("urlNow", UrlNow), localStorage.setItem("sortNow", sortNow));

function initFriendCircle(a, t) {
    var e = a + "ArticleData";
    JSON.parse(localStorage.getItem("statisticalData")),
    JSON.parse(localStorage.getItem(e));
    container.innerHTML = "",
    FetchFriendCircle(a, t)
}
initFriendCircle(sortNow);