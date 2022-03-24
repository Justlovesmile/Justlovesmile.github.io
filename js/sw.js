const CACHE_NAME="ICDNCache";let cachelist=[];self.addEventListener("install",(async function(t){self.skipWaiting(),t.waitUntil(caches.open(CACHE_NAME).then((function(t){return console.log("Opened cache"),t.addAll(cachelist)})))})),self.addEventListener("fetch",(async t=>{try{t.respondWith(handle(t.request))}catch(e){t.respondWith(handleerr(t.request,e))}}));const handleerr=async(t,e)=>new Response(`<h1>CDN分流器遇到了致命错误</h1>\n    <b>${e}</b>`,{headers:{"content-type":"text/html; charset=utf-8"}});let cdn={gh:{jsdelivr:{url:"https://cdn.jsdelivr.net/gh"},jsdelivr_fastly:{url:"https://fastly.jsdelivr.net/gh"},jsdelivr_gcore:{url:"https://gcore.jsdelivr.net/gh"},pigax_jsd:{url:"https://u.pigax.cn/gh"},pigax_chenyfan_jsd:{url:"https://cdn-jsd.pigax.cn/gh"},tianli:{url:"https://cdn1.tianli0.top/gh"},cnortles:{url:"https://cdn.cnortles.top/gh"},hin_cool:{url:"https://jsd.hin.cool/gh"}},combine:{jsdelivr:{url:"https://cdn.jsdelivr.net/combine"},jsdelivr_fastly:{url:"https://fastly.jsdelivr.net/combine"},jsdelivr_gcore:{url:"https://gcore.jsdelivr.net/combine"},pigax_jsd:{url:"https://u.pigax.cn/combine"},pigax_chenyfan_jsd:{url:"https://cdn-jsd.pigax.cn/combine"},tianli:{url:"https://cdn1.tianli0.top/combine"},cnortles:{url:"https://cdn.cnortles.top/combine"},hin_cool:{url:"https://jsd.hin.cool/combine"}},npm:{eleme:{url:"https://npm.elemecdn.com"},jsdelivr:{url:"https://cdn.jsdelivr.net/npm"},zhimg:{url:"https://unpkg.zhimg.com"},unpkg:{url:"https://unpkg.com"},bdstatic:{url:"https://code.bdstatic.com/npm"},pigax_jsd:{url:"https://u.pigax.cn/npm"},pigax_unpkg:{url:"https://unpkg.pigax.cn/"},pigax_chenyfan_jsd:{url:"https://cdn-jsd.pigax.cn/npm"},tianli:{url:"https://cdn1.tianli0.top/npm"},cnortles:{url:"https://cdn.cnortles.top/npm"},hin_cool:{url:"https://jsd.hin.cool/npm"}}};const handle=async function(t){const e=t.url,n=e.split("/")[2];let s=[];for(let r in cdn)for(let l in cdn[r])if(n==cdn[r][l].url.split("https://")[1].split("/")[0]&&e.match(cdn[r][l].url)){s=[];for(let t in cdn[r]){let n=e.split("/")[3],c=e.split("/")[4],i=e.split("/")[5];"gh"==n&&"Justlovesmile"==c&&s.push(e.replace(cdn[r][l].url+"/"+n+"/"+c+"/"+i,"gitee.com/justlovesmile/"+i+"/raw/master")),s.push(e.replace(cdn[r][l].url,cdn[r][t].url))}return e.indexOf("@latest/")>-1?lfetch(s,e):caches.match(t).then((function(n){return n||lfetch(s,e).then((function(e){return caches.open(CACHE_NAME).then((function(n){return n.put(t,e.clone()),e}))}))}))}return fetch(t)},lfetch=async(t,e)=>{let n=new AbortController;const s=async t=>new Response(await t.arrayBuffer(),{status:t.status,headers:t.headers});return Promise.any||(Promise.any=function(t){return new Promise(((e,n)=>{let s=(t=Array.isArray(t)?t:[]).length,r=[];if(0===s)return n(new AggregateError("All promises were rejected"));t.forEach((t=>{t.then((t=>{e(t)}),(t=>{s--,r.push(t),0===s&&n(new AggregateError(r))}))}))}))}),Promise.any(t.map((t=>new Promise(((e,r)=>{fetch(t,{signal:n.signal}).then(s).then((t=>{200==t.status?(n.abort(),e(t)):r(t)}))})))))};