$(function () { // jQB //////////////////////////////
    //    console.log("로딩완료!");

    new WOW().init();

    /*마우스효과**********************************/
    function lerp(a, b, n) {
        return (1 - n) * a + n * b
    }

    // Inizio Cursor
    class Cursor {
        constructor() {
            this.bind()
            //seleziono la classe del cursore
            this.cursor = document.querySelector('.js-cursor')

            this.mouseCurrent = {
                x: 0,
                y: 0
            }

            this.mouseLast = {
                x: this.mouseCurrent.x,
                y: this.mouseCurrent.y
            }

            this.rAF = undefined
        }

        bind() {
    ['getMousePosition', 'run'].forEach((fn) => this[fn] = this[fn].bind(this))
        }

        getMousePosition(e) {
            this.mouseCurrent = {
                x: e.clientX,
                y: e.clientY
            }
        }

        run() {
            this.mouseLast.x = lerp(this.mouseLast.x, this.mouseCurrent.x, 0.2)
            this.mouseLast.y = lerp(this.mouseLast.y, this.mouseCurrent.y, 0.2)

            this.mouseLast.x = Math.floor(this.mouseLast.x * 100) / 100
            this.mouseLast.y = Math.floor(this.mouseLast.y * 100) / 100

            this.cursor.style.transform = `translate3d(${this.mouseLast.x}px, ${this.mouseLast.y}px, 0)`

            this.rAF = requestAnimationFrame(this.run)
        }

        requestAnimationFrame() {
            this.rAF = requestAnimationFrame(this.run)
        }

        addEvents() {
            window.addEventListener('mousemove', this.getMousePosition, false)
        }

        on() {
            this.addEvents()

            this.requestAnimationFrame()
        }

        init() {
            this.on()
        }
    }

    const cursor = new Cursor()

    cursor.init();


    /*햄버거버튼 오버시 마우스모양커지기*/
    $("a").hover(function () {
        console.log("호버");
        $(".cursor svg").addClass("bigC");
    });




    /*햄버거버튼 클릭시**********************/
    $(".hamburger").click(function () {

        $(this).toggleClass("open");
        $(".menu_wrap").toggleClass("menu_open");
        $("body").toggleClass("bodyoh");
        $(".tbtn").toggleClass("hide")
    });

    /*메뉴li호버시 왼쪽영역 배경 썸네일 바뀌게***********/
    var bgi = [
        "images/menu1.jpg",
        "images/menu2.jpg",
        "images/menu3.jpg",
        "images/menu4.gif"
    ];

    ///////////// each ///////////////
    $(".menu_img> ul> li").each(function (idx, ele) {
        $(ele).css({
            background: "url(" + bgi[idx] + ") no-repeat",
            backgroundSize: "cover",
            //            backgroundPosition: "center",


        });
    }); ///////////// each ///////////////



    //// mouseenter ///////////////////////////////////////////////
    $(".mlist > ul > li").mouseenter(function () {
        //li호버시 li왼쪽으로 밀기
        $(this).stop().animate({
            right: "10%",
        }, 500);

        // li호버시 해당 썸네일 보이기
        var idx = $(this).index();

        $(".menu_img> ul> li").eq(idx).addClass("on").siblings().removeClass("on");


    }); //// mouseenter ///////////////////////////////////////////////


    //// mouseeleave ///////////////////////////////////////////////
    $(".mlist > ul > li").mouseleave(function () {


        $(this).stop().animate({
            right: "0"
        }, 500);
    }); //// mouseeleave ///////////////////////////////////////////////



    /*메뉴창안에 메뉴들 클릭시***************/
    $(".mlist > ul > li a").click(function () {
        $("body").removeClass("bodyoh");
        $(".menu_wrap").removeClass("menu_open");
        $(".hamburger").removeClass("open");
        $(".tbtn").removeClass("hide");
    });




    /*상단배너*************************************/

    // fade효과로 계속 넘어가게 setInterval함수를 사용
    // setInterval(함수,시간)
    // 대상: #ban img
    var tg = $(".topban ul li");
    var seq = 0; //순번

    setInterval(function () {

        // 순번증가
        seq++;
        if (seq === 5) seq = 0;

        // 대상을 순서대로 class="on"주기
        tg.eq(seq).addClass("on")
            .siblings().removeClass("on");


    }, 5000);



    /*갤러리영역***********************************/
    $(".hide").hide();
    /*더보기버튼 클릭시 보이기*/
    $(".pbtn").click(function (e) {
        e.preventDefault();
        $(this).hide();
        $(".hide").show(500);
    });





    /*뮤비 버튼 클릭시 모달창 보이기******************/
    $(".vbtn").click(function () {
        $("#modal").fadeIn(500);
        $("body").css({
            overflowY: "hidden"
        });
    });

    /*닫기 클릭시 모달창 닫기******************/
    $("#modal span").click(function () {
        $("#modal").fadeOut(500);
        $("body").css({
            overflowY: "auto"
        });
        $("#mainVid").attr("src", "")
    });
    /*모달창외 바깥클릭시 모달창 닫기*/
    $("#modal").click(function () {
        $("#modal").fadeOut(500);
        $("body").css({
            overflowY: "auto"
        });
        $("#mainVid").attr("src", "")
    });



    /*탑버튼 스크롤 내릴시 보여지기*/
    $(".tbtn").hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.tbtn').fadeIn();
        } else {
            $('.tbtn').fadeOut();
        }
    });



    /*탑버튼 클릭시 상단으로!*/
    $(".tbtn").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });


    // 모바일일때(화면375이하) /////////////////////////////////////////////////
    if ($(window).width() <= 375) {

        $(".menu_img> ul> li").each(function (idx, ele) {
            $(ele).css({
                backgroundPosition: "center",


            });
        }); ///////////// each ///////////////


        $(".mlist > ul > li").mouseenter(function () {
            //li호버시 li왼쪽으로 밀기 없애기
            $(this).stop().animate({
                right: "0",
            }, 500);

            // li호버시 해당 썸네일 보이기 없애기
            $(".menu_img> ul> li").eq(0).addClass("on").siblings().removeClass("on");


        }); //// mouseenter ///////////////////////////////////////////////




        $(window).scroll(function () {

            var scrolltop = $(document).scrollTop();
            //            console.log("스크롤위치"+scrolltop);

            var height = $(document).height();
            //            console.log("보여지는창높이"+height);

            var height_win = $(window).height();
            //            console.log("html의문서높이"+height_win);


            //  (스크롤을 맨 밑으로 내렸을 때의 스크롤 길이 값)   == (문서의 길이) - (창의 길이)
            if (Math.round($(window).scrollTop()) == $(document).height() - $(window).height()) {
                console.log("맨아래맞음?");

                $(".tbtn").addClass("on")
                $(".tbtn>a").addClass("on")
            } else {
                $(".tbtn").removeClass("on")
                $(".tbtn>a").removeClass("on")
            }

        });








    } //////////////////모바일일때 //////////////////////////////////





}); // jQB ///////////////////////////////////////////////////
