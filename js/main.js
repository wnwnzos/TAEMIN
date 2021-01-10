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
    $(".pbtn").click(function(e){
        e.preventDefault();
        $(this).hide();
        $(".hide").show(500);
    });
    
    
    
    

 /*뮤비 버튼 클릭시 모달창 보이기******************/
    $(".vbtn").click(function(){
        $("#modal").fadeIn(500);
        $("body").css({
            overflowY:"hidden"
        });
    });
   
 /*닫기 클릭시 모달창 닫기******************/
    $("#modal span").click(function(){
        $("#modal").fadeOut(500);
        $("body").css({
            overflowY:"auto"
        });
    });
   
    
    
    /*탑버튼 스크롤 내릴시 보여지기*/
     $(window).scroll(function() {
            if ($(this).scrollTop() > 500) {
                $('.tbtn').fadeIn();
            } else {
                $('.tbtn').fadeOut();
            }
        });
    

    
    /*탑버튼 클릭시 상단으로!*/
  $(".tbtn").click(function() {
            $('html, body').animate({
                scrollTop : 0
            }, 400);
            return false;
        });




}); // jQB ///////////////////////////////////////////////////
