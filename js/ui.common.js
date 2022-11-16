; const uiCommon = (function (uiCommon, $window) {

    uiCommon.init = () => {
        // $window.on('beforeunload', function () {
        //     $window.scrollTop(0);
        // });

        uiCommon.eventBind.init(); // 이벤트 바인딩

        // component
        $('.btn_gray').length > 0 && uiCommon.layer.init(); // layer popup
    };

    // Layer Popup
    uiCommon.layer = {
        init() {
            var target = $('.btn_gray');
            var btnPopClose = $('.layer_popup_wrap .popup_close');
            var targetID;

            uiCommon.layer.open(target, targetID);
            uiCommon.layer.close(target, targetID, btnPopClose);
        },
        open(target, targetID) {
            for (var i = 0; i < target.length; i++) {
                target[i].addEventListener('click', function () {
                    targetID = this.getAttribute('href');
                    document.querySelector(targetID).style.display = 'block';
                });
            }
        },
        close(target, targetID, btnPopClose) {
            for (var j = 0; j < target.length; j++) {
                btnPopClose.on('click', function () {
                    this.parentNode.parentNode.style.display = 'none';
                });
            }
        },
    };

    uiCommon.slick = {
        init(el, opt) {
            return el.not('.slick-initialized').slick(opt);
        },
        destory(el) {
            el.filter('.slick-initialized').slick('unslick');
        },
    };

    uiCommon.eventBind = {
        init() {
            // 각 플러그인 객체 생성 호출
            $('.floating_btn').length > 0 && this.floatingBtn.init(); // 플로팅 버튼
            $('.faq_dt').length > 0 && this.accordion.init(); // 아코디언 이벤트
            this.header.init(); // 헤더 관련 이벤트
            this.slider.init(); // 슬라이더 생성호출 이벤트
        },
        header: {
            init() {

                $("#mu_hd").removeClass("bg_change");

                var hdTrg = $("#mu_hd");
                var hdOffset = hdTrg.offset().top + hdTrg.height();
            
                uiCommon.eventBind.header.search();
                uiCommon.eventBind.header.scroll(hdTrg, hdOffset);
            },


            search() {
                var searchBtn = document.querySelector('.search_btn');
                var cancelBtn = document.querySelector('.cancel_btn');
                var searchBox = document.querySelector('.search_box');
                searchBtn.onclick = () => {
                    searchBox.classList.add("active");
                }
                cancelBtn.onclick = () => {
                    searchBox.classList.remove("active");
                }
            },

            scroll(hdTrg, hdOffset) {
                //문서를 스크롤할 때(타겟, 이벤트) 
                $(window).scroll(function(){ //창이 스크롤 될 때 마다 
                    sctop = $(document).scrollTop();
                    hdFixed();

                    // top button controll
                    if ($(this).scrollTop() > 500) {
                        $('.floating_btn').fadeIn();
                    } else {
                        $('.floating_btn').fadeOut();
                    }
                });
                    
                function hdFixed(){
                    //hdOffset만큼 스크롤되면(스크롤양을 검사-조건문)
                    if(sctop > hdOffset) {
                        //헤더를 고정한다(타겟,클래스를 적용)
                        hdTrg.addClass("fixed bg_change");
                    } else {
                        hdTrg.removeClass("fixed bg_change");
                    }
                };
            }
        },
        floatingBtn: {
            init() {
                $(".floating_btn").click(function() {
                    $('html, body').animate({scrollTop:0}, '500');
                });
            },
        },
        slider: {
            init() {
                // 메인 슬라이드
                if ($('.main_wrapper').length) {
                    const $el = uiCommon.slick.init($('.main_wrapper'), {
                        infinite : true,	 
                        slidesToShow : 1,
                        slidesToScroll : 1,
                        speed : 3000,
                        autoplaySpeed: 3000,
                        autoplay : true,
                        variableWidth: true,
                        pauseOnHover: false, 
                        dots : true, 
                        dotsClass : 'mu_pagination',
                        prevArrow : $('.mu_slid_prev'),	
                        nextArrow : $('.mu_slid_next'),	
                    });

                    $('.slick-next').on('click', function () {
                        if ($(this).hasClass('slick-disabled')) {
                            $('.main_wrapper').slick('slickGoTo', 0);
                        }
                    });
                }

                // sec2 슬라이드
                if ($('.sec2_contents_wrap').length) {
                    const $el = uiCommon.slick.init($('.sec2_contents_wrap'), {
                        infinite : true,
                        autoplay : true,	 
                        speed : 1500,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        variableWidth: true,
                        centerMode: true, 
                        draggable: true,
                        arrows: false,
                        pauseOnFocus: false,
                        pauseOnHover: false, 
                        waitForAnimate: true
                    });

                }

                // sec3-1 슬라이드
                if ($('.sub3_slider_container1').length) {
                    const $el = uiCommon.slick.init($('.sub3_slider_container1'), {
                        infinite : true,
                        autoplay : true,	 
                        dots: false,
                        speed : 2500,
                        autoplaySpeed: 700,
                        slidesToShow: 1,
                        variableWidth: true,
                    });
                }

                // sec3-2 슬라이드
                if ($('.sub3_slider_container2').length) {
                    const $el = uiCommon.slick.init($('.sub3_slider_container2'), {
                        infinite : true,
                        autoplay : true,	
                        dots: false, 
                        speed : 2200,
                        autoplaySpeed: 300,
                        slidesToShow: 1,
                        variableWidth: true,
                    });

                }

            },
        },
        accordion: {
            init() {
                var $body = $('.faq_dt');

                $body.on('click', function () {
                    function slideDown(target) {
                        slideUp();
                        $(target).addClass('on').next().slideDown();
                    }
            
                    function slideUp() {
                        $('.faq_dt').removeClass('on').next().slideUp();
                    }
            
                    $(this).hasClass('on') ? slideUp() : slideDown(this);
            
                });
            },
        },
    };

    uiCommon.init();
    return uiCommon;
})(window.uiCommon || {}, $(window));