$(document).ready(function () {

    $('#section-wrap').unbind('scroll')
    //实现滚动翻页效果
    var counterOfPage = 0;
    var isChangeing = false; //页面是否正在变化
    function changeIcon() {
        var index = parseInt($('#section-wrap').attr('class').substr(-1));
        for (var i = 0; i < $('#navigation ul li').length; i++) {
            $('#navigation ul li').eq(i).removeClass();
        }
        $('#navigation ul li').eq(index).addClass('active');
    }

    function upPage() {
        if (counterOfPage < 5) {
            counterOfPage++;
            //counterOfPage %= 6;
            $('#section-wrap').attr('class', 'section-wrap-' + counterOfPage);
            changeIcon();
            isChangeing = true;
        }
    } //下一页
    function downPage() {
        counterOfPage--;
        if (counterOfPage < 0) {
            counterOfPage = 0;
        }
        counterOfPage %= 6;
        $('#section-wrap').attr('class', 'section-wrap-' + counterOfPage);
        changeIcon();
        isChangeing = true;
    } //上一页

    function changePage() {
        $('#section-wrap').attr('class', 'section-wrap-' + counterOfPage);
        changeIcon()
        isChangeing = true;
    }
    $('#section-wrap').mousewheel(function (event) {

        // event.preventDefault();
        //console.log(event.deltaY + " mousewheel")

        if (!isChangeing) {
            if (event.deltaY < 0) {
                upPage();
                setTimeout(function () {
                    isChangeing = false;
                    //console.log('changeover');
                    return
                }, 1000); //异步执行
                //console.log('change it')
            } else {
                downPage();
                setTimeout(function () {
                    isChangeing = false;
                    //console.log('changeover');
                    return
                }, 1000); //异步执行
                //console.log('change it')
            }
        } else {
            //console.log($('#section-wrap').find('section').eq(counterOfPage).offset().top - $(document).scrollTop())
            return;
        }
    })

    $('#navigation ul li').click(function () {
        if (!isChangeing) {
            var index = $('#navigation ul li').index($(this));
            counterOfPage = index;
            //console.log(index);
            changePage();
            setTimeout(function () {
                isChangeing = false;
                return;
            }, 1000);
        }


    });
    $(document).keydown(function (event) {
        // alert('do it');
        if (event.keyCode == 38) {
            // alert('do it');//向上键
            if (!isChangeing) {
                downPage();
                setTimeout(function () {
                    isChangeing = false;
                    //console.log('changeover');
                    return
                }, 1000); //异步执行
            }

        } else if (event.keyCode == 40) {
            //alert('do it');//向下键
            if (!isChangeing) {
                upPage();
                setTimeout(function () {
                    isChangeing = false;
                    //console.log('changeover');
                    return
                }, 1000); //异步执行
            }

        }
    });
    $('#home-page-btn').click(function () {
        if (!isChangeing) {
            upPage();
            setTimeout(function () {
                isChangeing = false;
                //console.log('changeover');
                return
            }, 1000); //异步执行
        }
    });
    //下面的函数是用来调节经历页左右滑动的功能
    var exprienceCounter = 0;
    var isExperiencePageChanging = false;

    function changeActive() {
        var index = parseInt($('#resume-introduction .school-info-content').attr('id').substr(-1));
        for (var i = 0; i < $('#resume-introduction .dot-arrange .li-box').length; i++) {
            $('#resume-introduction .dot-arrange .li-box').eq(i).find('div').removeClass();
        }
        $('#resume-introduction .dot-arrange .li-box').eq(index).find('div').addClass('li-active');
    }

    function leftPage() {
        if (exprienceCounter > 0) {
            exprienceCounter--;
            $('#resume-introduction .school-info-content').attr('id', 'school-info-content-' + exprienceCounter);
            changeActive();
            isExperiencePageChanging = true;
            //console.log(exprienceCounter);
            console.log(exprienceCounter+"leftPage");
        }

    }

    function rightPage() {
        if (exprienceCounter < 2) {
            exprienceCounter++;
            $('#resume-introduction .school-info-content').attr('id', 'school-info-content-' + exprienceCounter);
            changeActive();
            isExperiencePageChanging = true;
              //console.log(exprienceCounter+"rightPage");
        }
        else if (exprienceCounter == 2) {
            exprienceCounter = 0;
            $('#resume-introduction .school-info-content').attr('id', 'school-info-content-' + exprienceCounter);
            changeActive();
            isExperiencePageChanging = true;
             // console.log(exprienceCounter+"rightPage");
        }
    }
    //移动端优先============================
    //=====================================
    var startX = 0; //手指开始的X方向
    var startY = 0; //开始的Y方向的值
    var moveEndX = 0;
    var moveEndY = 0;

    $('#section-wrap').on('touchstart', function (event) {
        event.preventDefault();
        //alert('dashabi');
        startX = event.changedTouches[0].pageX;
        startY = event.changedTouches[0].pageY;
    });
    $('#section-wrap').on('touchmove', function (event) {
        event.preventDefault();
        moveEndX = event.changedTouches[0].pageX;
        moveEndY = event.changedTouches[0].pageY;
        var X = moveEndX - startX;
        var Y = moveEndY - startY;
        var determinePage = $('#resume-introduction').offset().top - $(document).scrollTop();
        //Y<0整体向上趋势
        if (Y < 0) {
            //手指向上滑动显示下一页
            if (X < 0) //整体向左趋势
            {
                if (Math.abs(X) > Math.abs(Y)) //向左滑动看右边的页面
                {

                    if (determinePage <= 10 && determinePage >= -10) { //正确判断是经历页面
                        //向左滑注意第一个页面向左滑动
                        // if (exprienceCounter == 0) {
                        //     exprienceCounter = 2;
                        // } else {
                        //     exprienceCounter--;
                        // }
                        // for (var i = 0; i < $('#resume-introduction .resume-introduction-content .school-info').length; i++) {
                        //     $('#resume-introduction .resume-introduction-content .school-info').eq(i).hide();
                        // }
                        // $('#resume-introduction .resume-introduction-content .school-info').eq(exprienceCounter).show();
                        if (!isExperiencePageChanging) {
                            rightPage();
                            setTimeout(function () {
                                isExperiencePageChanging = false;
                                ////console.log('changeover');
                                return
                            }, 1000); //异步执行
                        }
                    }
                } else { //向上滑动
                    if (!isChangeing) {
                        upPage();
                        setTimeout(function () {
                            isChangeing = false;
                            //console.log('changeover');
                            return
                        }, 1000); //异步执行
                    }
                }
            } else {
                if (Math.abs(X) > Math.abs(Y)) //向右滑动
                {
                    //alert('right');
                    if (determinePage <= 10 && determinePage >= -10) { //正确判断是经历页面

                        // if (exprienceCounter == 2) {
                        //     exprienceCounter = 0;
                        // } else {
                        //     exprienceCounter++;
                        // }
                        // for (var i = 0; i < $('#resume-introduction .resume-introduction-content .school-info').length; i++) {
                        //     $('#resume-introduction .resume-introduction-content .school-info').eq(i).hide();
                        // }
                        // $('#resume-introduction .resume-introduction-content .school-info').eq(exprienceCounter).show();
                        if (!isExperiencePageChanging) {
                            leftPage();
                            setTimeout(function () {
                                isExperiencePageChanging = false;
                                ////console.log('changeover');
                                return
                            }, 1000); //异步执行
                        }
                    }

                } else { //向上滑动
                    if (!isChangeing) {
                        upPage();
                        setTimeout(function () {
                            isChangeing = false;
                            //console.log('changeover');
                            return
                        }, 1000); //异步执行
                    }
                }
            }
        } else { //整体向下滑动
            if (X < 0) //整体向左趋势
            {
                if (Math.abs(X) > Math.abs(Y)) //向左滑动
                {
                    // alert('left');
                    if (determinePage <= 10 && determinePage >= -10) { //正确判断是经历页面
                            if(!isExperiencePageChanging){
                            rightPage();
                               setTimeout(function () {
                            isExperiencePageChanging= false;
                          
                            return
                        }, 1000); //异步执行
                        };
                    }
                } else { //向下滑动
                    if (!isChangeing) {
                        downPage();
                        setTimeout(function () {
                            isChangeing = false;
                            //console.log('changeover');
                            return
                        }, 1000); //异步执行
                    }

                }
            } else {
                if (Math.abs(X) > Math.abs(Y)) //向右滑动
                {
                    //alert('right');
                    if (determinePage <= 10 && determinePage >= -10) { //正确判断是经历页面
                        
                            if(!isExperiencePageChanging){
                            leftPage();
                               setTimeout(function () {
                            isExperiencePageChanging= false;
                            ////console.log('changeover');
                            return
                        }, 1000); //异步执行
                        }
                    }

                } else { //向下滑动
                    if (!isChangeing) {
                        downPage();
                        setTimeout(function () {
                            isChangeing = false;
                            //console.log('changeover');
                            return
                        }, 1000); //异步执行
                    }


                }
            }
        }
    });
    $('#home-page-btn').on('touchend', function (event) {
        if (!isChangeing) {
            upPage();
            setTimeout(function () {
                isChangeing = false;
                //console.log('changeover');
                return
            }, 1000); //异步执行
        }
    });
    $('#resume-introduction .resume-introduction-content .dot-arrange .li-box').click(function(){
        if(!isExperiencePageChanging){
        var index= $('#resume-introduction .resume-introduction-content .dot-arrange .li-box').index($(this));
        exprienceCounter=index;
        $('#resume-introduction .school-info-content').attr('id', 'school-info-content-' + exprienceCounter);
        changeActive();
        isExperiencePageChanging = true;
        setTimeout(function(){
            isExperiencePageChanging=false;
            return ;
        },1000);
    }
    })
})