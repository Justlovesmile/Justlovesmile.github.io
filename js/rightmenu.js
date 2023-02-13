let rm = {};
rm.stopdragimg = $("img");
rm.stopdragimg.on("dragstart", function() {
    return false
});
rm.showRightMenu = function(isTrue, x = 0, y = 0) {
    let $rightMenu = $("#rightMenu");
    $rightMenu.css("top", x + "px")
        .css("left", y + "px");
    if (isTrue) {
        $rightMenu.show();
        stopMaskScroll()
    } else {
        $rightMenu.hide()
    }
};
rm.hideRightMenu = function() {
    rm.showRightMenu(false);
    $("#rightmenu-mask").attr("style", "display: none");
};
let rmWidth = $("#rightMenu").width();
let rmHeight = $("#rightMenu").height();
rm.reloadrmSize = function() {
    rmWidth = $("#rightMenu").width();
    rmHeight = $("#rightMenu").height()
};
let domhref = "";
let domImgSrc = "";
window.oncontextmenu = function(event) {
    if (document.body.clientWidth > 768) {
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let $rightMenuOther = $(".rightMenuOther");
        let $rightMenuPlugin = $(".rightMenuPlugin");
        let $rightMenuCopyText = $("#menu-copytext");
        let $rightMenuCommentText = $("#menu-commenttext");
        let $rightMenuNewWindow = $("#menu-newwindow");
        let $rightMenuCopyLink = $("#menu-copylink");
        let $rightMenuCopyImg = $("#menu-copyimg");
        let $rightMenuDownloadImg = $("#menu-downloadimg");
        let $rightMenuSearch = $("#menu-search");
        let $rightMenuSearchBaidu = $("#menu-searchBaidu");
        let href = event.target.href;
        let imgsrc = event.target.currentSrc;
        let pluginMode = false;
        $rightMenuOther.show();
        if (selectTextNow && window.getSelection()) {
            pluginMode = true;
            $rightMenuCopyText.show();
            $rightMenuCommentText.show();
            $rightMenuSearch.show();
            $rightMenuSearchBaidu.show();
            $rightMenuOther.hide()
        } else {
            $rightMenuCopyText.hide();
            $rightMenuCommentText.hide();
            $rightMenuSearchBaidu.hide();
            $rightMenuSearch.hide()
        }
        if (href) {
            pluginMode = true;
            $rightMenuNewWindow.show();
            $rightMenuCopyLink.show();
            $rightMenuOther.hide();
            domhref = href
        } else {
            $rightMenuNewWindow.hide();
            $rightMenuCopyLink.hide()
        }
        if (imgsrc) {
            pluginMode = true;
            $rightMenuCopyImg.show();
            $rightMenuDownloadImg.show();
            $rightMenuOther.hide();
            domImgSrc = imgsrc
        } else {
            $rightMenuCopyImg.hide();
            $rightMenuDownloadImg.hide()
        }
        if (pluginMode) {
            $rightMenuPlugin.show()
        } else {
            $rightMenuPlugin.hide()
        }
        rm.reloadrmSize();
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth + 10
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= pageY + rmHeight - window.innerHeight
        }
        rm.showRightMenu(true, pageY, pageX);
        $("#rightmenu-mask")
            .attr("style", "display: flex");
        return false
    }
};
rm.downloadimging = false;

function downloadImage(imgsrc, name) {
    rm.hideRightMenu();
    if (rm.downloadimging == false) {
        rm.downloadimging = true;
        btf.snackbarShow("正在下载中，请稍后", false, 1e4);
        setTimeout(function() {
            let image = new Image;
            image.setAttribute("crossOrigin", "anonymous");
            image.onload = function() {
                let canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                let context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                let url = canvas.toDataURL("image/png");
                let a = document.createElement("a");
                let event = new MouseEvent("click");
                a.download = name || "photo";
                a.href = url;
                a.dispatchEvent(event)
            };
            image.src = imgsrc;
            btf.snackbarShow("图片已添加盲水印，请遵守版权协议");
            rm.downloadimging = false
        }, "10000")
    } else {
        btf.snackbarShow("有正在进行中的下载，请稍后再试")
    }
}
rm.writeClipImg = function(imgsrc) {
    console.log("按下复制");
    rm.hideRightMenu();
    btf.snackbarShow("正在下载中，请稍后", false, 1e4);
    if (rm.downloadimging == false) {
        rm.downloadimging = true;
        setTimeout(function() {
            copyImage(imgsrc);
            btf.snackbarShow("复制成功！图片已添加盲水印，请遵守版权协议");
            rm.downloadimging = false
        }, "10000")
    }
};

function imageToBlob(imageURL) {
    const img = new Image;
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    img.crossOrigin = "";
    img.src = imageURL;
    return new Promise(resolve => {
        img.onload = function() {
            c.width = this.naturalWidth;
            c.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0);
            c.toBlob(blob => {
                resolve(blob)
            }, "image/png", .75)
        }
    })
}
async function copyImage(imageURL) {
    const blob = await imageToBlob(imageURL);
    const item = new ClipboardItem({
        "image/png": blob
    });
    navigator.clipboard.write([item])
}
rm.copyUrl = function(id) {
    $("body").after("<input id='copyVal'></input>");
    var text = id;
    var input = document.getElementById("copyVal");
    input.value = text;
    input.select();
    input.setSelectionRange(0, input.value.length);
    document.execCommand("copy");
    $("#copyVal").remove()
};

function stopMaskScroll() {
    if (document.getElementById("rightmenu-mask")) {
        let xscroll = document.getElementById("rightmenu-mask");
        xscroll.addEventListener("mousewheel", function(e) {
            rm.hideRightMenu()
        }, false)
    }
    if (document.getElementById("rightMenu")) {
        let xscroll = document.getElementById("rightMenu");
        xscroll.addEventListener("mousewheel", function(e) {
            rm.hideRightMenu()
        }, false)
    }
}
rm.rightmenuCopyText = function(txt) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(txt)
    }
    rm.hideRightMenu()
};
rm.copyPageUrl = function() {
    var url = window.location.href;
    rm.copyUrl(url);
    btf.snackbarShow("复制本页链接地址成功", false, 2e3);
    rm.hideRightMenu()
};
var selectTextNow = "";
var selectTextPre = "";
document.onmouseup = document.ondbclick = selceText;

function selceText() {
    var txt;
    if (document.selection) {
        txt = document.selection.createRange().text
    } else {
        txt = window.getSelection() + ""
    }
    if (txt) {
        selectTextNow = txt
        selectTextPre = txt
    } else {
        selectTextNow = ""
    }
}
rm.rightMenuCommentText = function(txt) {
    rm.hideRightMenu();
    var input = document.getElementsByClassName("el-textarea__inner")[0];
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("input", true, true);
    let inputValue = replaceAll(txt, "\n", "\n> ");
    input.value = "> " + inputValue + "\n\n";
    input.dispatchEvent(evt);
    var domTop = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, domTop - 80);
    input.focus();
    input.setSelectionRange(-1, -1)
};

function replaceAll(string, search, replace) {
    return string.split(search).join(replace)
}
rm.searchBaidu = function() {
    btf.snackbarShow("即将跳转到百度搜索", false, 2e3);
    setTimeout(function() {
        window.open("https://www.baidu.com/s?wd=" + selectTextPre)
    }, "2000");
    rm.hideRightMenu()
};
rm.searchlocal = function(txt) {
    var input = document.querySelector('#local-search-input input');
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);
    let inputValue = replaceAll(txt, "\n", "\n> ");
    input.value = inputValue;
    input.dispatchEvent(evt);
    rm.hideRightMenu();
}
rm.switchDarkMode = function() {
    rm.hideRightMenu();
    "light" === ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light") ? (activateDarkMode(), saveToLocal.set("theme", "dark", 2), void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)) : (activateLightMode(), saveToLocal.set("theme", "light", 2), void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)), "function" == typeof utterancesTheme && utterancesTheme(), "object" == typeof FB && window.loadFBComment(), window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout((() => window.disqusReset()), 200)
}
function addRightMenuClickEvent() {
    $("#menu-backward").on("click", function() {
            window.history.back();
            rm.hideRightMenu()
        });
    $("#menu-forward").on("click", function() {
            window.history.forward();
            rm.hideRightMenu()
        });
    $("#menu-refresh").on("click", function() {
            window.location.reload()
        });
    $("#menu-top").on("click", function() {
            btf.scrollToDest(0, 500);
            rm.hideRightMenu()
        });
    $(".menu-link").on("click", rm.hideRightMenu);
    $("#menu-darkmode").on("click", rm.switchDarkMode);
    $("#menu-home").on("click", function() {
            window.location.href = window.location.origin
        });
    $("#rightmenu-mask").on("click", rm.hideRightMenu);
    $("#rightmenu-mask").contextmenu(function() {
            rm.hideRightMenu();
            return false
        });
    $("#menu-copy").on("click", rm.copyPageUrl);
    $("#menu-copytext").on("click", function() {
            rm.rightmenuCopyText(selectTextPre);
            btf.snackbarShow("复制成功，复制和转载请标注本文地址")
        });
    $("#menu-commenttext").on("click", function() {
            rm.rightMenuCommentText(selectTextPre);
        });
    $("#menu-newwindow").on("click", function() {
            window.open(domhref);
            rm.hideRightMenu()
        });
    $("#menu-copylink").on("click", function() {
            rm.rightmenuCopyText(domhref);
            btf.snackbarShow("已复制链接地址")
        });
    $("#menu-downloadimg").on("click", function() {
            downloadImage(domImgSrc, "blog.justlovesmile.top")
        });
    $("#menu-copyimg").on("click", function() {
            rm.writeClipImg(domImgSrc)
        });
    $("#menu-searchBaidu").on("click", rm.searchBaidu);
    $("#menu-search").on("click", function() {rm.searchlocal(selectTextPre)});
}

addRightMenuClickEvent()