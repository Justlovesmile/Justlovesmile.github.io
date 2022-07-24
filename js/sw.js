const CACHE_NAME="ICDNCache";let cachelist=[];self.addEventListener("install",(async function(t){self.skipWaiting(),t.waitUntil(caches.open(CACHE_NAME).then((function(t){return console.log("Opened cache"),t.addAll(cachelist)})))})),self.addEventListener("fetch",(async t=>{try{t.respondWith(handle(t.request))}catch(e){t.respondWith(handleerr(t.request,e))}}));const handleerr=async(t,e)=>new Response(`<h1>CDN分流器遇到了致命错误</h1>\n    <b>${e}</b>`,{headers:{"content-type":"text/html; charset=utf-8"}});let cdn={gh:{jsdelivr:{url:"https://cdn.jsdelivr.net/gh"},jsdelivr_fastly:{url:"https://fastly.jsdelivr.net/gh"},jsdelivr_gcore:{url:"https://gcore.jsdelivr.net/gh"},tianli:{url:"https://cdn1.tianli0.top/gh"},cnortles:{url:"https://cdn.cnortles.top/gh"}},combine:{jsdelivr:{url:"https://cdn.jsdelivr.net/combine"},jsdelivr_fastly:{url:"https://fastly.jsdelivr.net/combine"},jsdelivr_gcore:{url:"https://gcore.jsdelivr.net/combine"},tianli:{url:"https://cdn1.tianli0.top/combine"},cnortles:{url:"https://cdn.cnortles.top/combine"}},npm:{eleme:{url:"https://npm.elemecdn.com"},jsdelivr:{url:"https://cdn.jsdelivr.net/npm"},zhimg:{url:"https://unpkg.zhimg.com"},unpkg:{url:"https://unpkg.com"},bdstatic:{url:"https://code.bdstatic.com/npm"},pigax_jsd:{url:"https://u.pigax.cn/npm"},pigax_unpkg:{url:"https://unpkg.pigax.cn/"},cnortles:{url:"https://cdn.cnortles.top/npm"}}};const handle=async function(t){const e=t.url,n=e.split("/")[2];let r=[];for(let s in cdn)for(let l in cdn[s])if(n==cdn[s][l].url.split("https://")[1].split("/")[0]&&e.match(cdn[s][l].url)){r=[];for(let t in cdn[s])r.push(e.replace(cdn[s][l].url,cdn[s][t].url));return e.indexOf("@latest/")>-1?lfetch(r,e):caches.match(t).then((function(n){return n||lfetch(r,e).then((function(e){return caches.open(CACHE_NAME).then((function(n){return n.put(t,e.clone()),e}))}))}))}return fetch(t)},lfetch=async(t,e)=>{let n=new AbortController;const r=async t=>new Response(await t.arrayBuffer(),{status:t.status,headers:t.headers});return Promise.any||(Promise.any=function(t){return new Promise(((e,n)=>{let r=(t=Array.isArray(t)?t:[]).length,s=[];if(0===r)return n(new AggregateError("All promises were rejected"));t.forEach((t=>{t.then((t=>{e(t)}),(t=>{r--,s.push(t),0===r&&n(new AggregateError(s))}))}))}))}),Promise.any(t.map((t=>new Promise(((e,s)=>{fetch(t,{signal:n.signal}).then(r).then((t=>{200==t.status?(n.abort(),e(t)):s(t)}))})))))};