var vm = new Vue ({
    el: "#div-box",
    data: {
        chance: 5,//抽奖机会
        order: 0,
        prize: [],//奖品合集
        showprize: false,//幕布显示
        inform: false,//是否显示全部奖品
        msg: "",//抽奖键下面显示所有的奖品
        msg1: true,//显示本次获得的奖
        msg2: false,//显示抽奖机会已用完
        prizeList: [//1，6，7，18，19已抽
            { name: "No.10礼物🎁:玩偶",num: 1 },
            { name: "No.02礼物🎁:泡泡机",num: 1 },
            { name: "No.14礼物🎁:眼影盘",num: 1 },
            { name: "No.16礼物🎁:手链",num: 1 },
            { name: "No.17礼物🎁:手表",num: 1 },
            { name: "🎁",num: 0 },
        ]
    },
    methods: {
        //判断抽奖条件
        mychance: function(){//仅触发一次用.one(click)?
            $("#but").addClass("canclick")//禁止点击“抽奖”
            if (this.chance > 0) {
                this.myrotate();
                this.chance -= 1;
                $('#but').html("宝贝还有"+this.chance+"次机会")
                if (this.chance == 0){
                    $( "#but").css("background","#a0a0a0")
                }
            } else {
                this.showprize = true;
                this.msg1 = false;
                this.msg2 = true;   
            }
        },
        //确定奖项、旋转
        myrotate: function(){
            var that = this;//Vue方法中setTimeout改变变量的值无效
            setTimeout( function(){
                that.showprize = true;
                $("#but").removeClass("canclick");
            },5500 )
            var total = 0;
            this.prizeList.forEach (item => {
                total += item.num;
            });
            var prz=this.order
            this.order += 1;
            /*
            var choice = Math.floor ( Math.random() * total )
            var sum = 0;
            var prz = 0;
            for (var i = 0;i < this.prizeList.length;i++) {
                sum += this.prizeList[i].num
                if ( sum >= choice ) {
                    var n = i;
                    while(this.prizeList[n].num == 0){
                        n++;
                    } 
                    this.prizeList[n].num -= 1;
                    prz = n;
                    console.log(prz)
                    break;          
                }
            }*/
            var angles1 = Math.floor ( Math.random() * 60 ) -30;
            //避免在分界线上的误差
            if (angles1 < -25){
                angles1 = -25;
            }else if (angles1 > 25){
                angles1 = 25;
            }          
            var angles = prz * 60 + angles1;
            
            $("#circle").rotate({
                angle: 0,   //初始旋转的角度数，并且立即执行
                animateTo: angles*(-1) + 360 * 6, // 这里多旋转了5圈，圈数越多，转的越快
                duration: 5000,
                easing: $.easing.easeOutQuint//jq.easing                
            });
            this.prize.push( this.prizeList[prz].name );
            },

            //关闭提示层
            receive: function(){
                this.showprize = false;
                this.msg2 = false;
                this.msg1 = true;
                this.inform = true;
                var msg = "";
                this.prize.forEach (item => {
                    msg += "恭喜宝贝抽中"+item+"!<br><br>"
                });
                this.msg = msg;                
            },
        },   
}) 

