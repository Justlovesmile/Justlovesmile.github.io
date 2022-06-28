let kk = {};

kk.showRightMenu = function(isTrue, x=0, y=0){
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top',x+'px').css('left',y+'px');

    if(isTrue){
        $rightMenu.show();
    }else{
        $rightMenu.hide();
    }
}

let rmWidth = $('#rightMenu').width();
let rmHeight = $('#rightMenu').height();
let domhref = '';
window.oncontextmenu = function(event){
    let pageX = event.clientX + 10;	//加10是为了防止显示时鼠标遮在菜单上
    let pageY = event.clientY;
    
    // 鼠标默认显示在鼠标右下方，当鼠标靠右或考下时，将菜单显示在鼠标左方\上方
    if(pageX + rmWidth > window.innerWidth){
        pageX -= rmWidth;
    }
    if(pageY + rmHeight > window.innerHeight){
        pageY -= rmHeight;
    }
    domhref = event.target.href;
    if (domhref){$('#menu-sharelink').html('<i class="fa fa-link"></i><span>复制链接</span>')}
    else{$('#menu-sharelink').html('<i class="fa fa-share"></i><span>分享本页</span>')}
    kk.showRightMenu(true, pageY, pageX);
    $('#rightmenu-mask').attr('style','display: flex');
    return false;
};

function RemoveRightMenu(){
    kk.showRightMenu(false);
    $('#rightmenu-mask').attr('style','display: none');
}

$('#menu-backward').on('click',function(){window.history.back();});
$('#menu-forward').on('click',function(){window.history.forward();});
$('#menu-refresh').on('click',function(){window.location.reload();});

kk.switchDarkMode = function(){
    RemoveRightMenu();
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
};

$('#menu-darkmode').on('click',kk.switchDarkMode);

$('#menu-home').on('click',function(){window.location.href = window.location.origin;});

if (document.addEventListener){document.addEventListener('DOMMouseScroll', RemoveRightMenu, false);}window.onmousewheel = document.onmousewheel = RemoveRightMenu;
if (document.getElementById("post-comment")){$("#menu-msg").attr("href",'#post-comment');}

kk.copyPageUrl = function() {
    var e = window.location.href;
    kk.copyUrl(e);
    btf.snackbarShow("<span class='note success'>复制本页地址成功</span>");
    RemoveRightMenu();
};
kk.copyUrl = function(e) {
    $("body").after("<input id='copyVal'></input>");
    var t = e,
    n = document.getElementById("copyVal");
    n.value = t;
    n.select();
    n.setSelectionRange(0, n.value.length);
    document.execCommand("copy");
    $("#copyVal").remove()
};
$("#menu-newwindow").on("click",function() {window.open(domhref);RemoveRightMenu();})
$('#menu-sharelink').on('click',function(){if (domhref){kk.copyUrl(domhref);btf.snackbarShow("<span class='note success'>复制超链接成功</span>");RemoveRightMenu();}else{kk.copyPageUrl()}});
