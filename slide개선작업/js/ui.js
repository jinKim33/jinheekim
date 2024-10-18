!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).blurify=t()}(this,(function(){"use strict";function e(e,t){var o=document.createElement("div");switch(arguments.length){case 1:return e in o.style;case 2:return o.style[e]=t,!!o.style[e];default:return!1}}function t(o){if(void 0===o&&(o={blur:6,mode:"auto",images:[]}),!(this instanceof t))return new t(o);"number"==typeof o&&(o={blur:o,images:arguments[1],mode:"auto"}),this.options=o,this.blur=o.blur||6,this.mode=o.mode||"css",console.log(),this.$els=1==o.images.nodeType?[o.images]:[].slice.call(o.images),"auto"==this.mode?e("filter","blur(1px)")?this.useCSSMode():this.useCanvasMode():"css"==this.mode?(this.blur=this.blur/2,this.useCSSMode()):this.useCanvasMode()}return t.prototype.useCSSMode=function(){var e=this;console.log(),this.$els.map((function(t){console.log(),t.src=t.dataset?t.dataset.src:t.getAttribute("data-src"),t.style.filter=t.style["-webkit-filter"]="blur("+e.blur+"px)"}))},t.prototype.useCanvasMode=function(){var e=this;this.imageType=this.options.imageType||"image/jpeg",function(e){var t=[],o=0,s=function(e){};function i(){++o==e.length&&s(t)}return 0===(e="object"!=typeof e?[e]:e).length&&s(t),e.map((function(e){var o=new Image;o.crossOrigin="*",o.src=e.dataset?e.dataset.src:e.getAttribute("data-src"),o.onload=i,o.onerror=i,t.push(o)})),{done:function(e){s=arguments[0]||s}}}(this.$els).done((function(t){t.map((function(t,o){e.$els[o].src=e.getDataURL(t)}))}))},t.prototype.blurify=function(e,t){var o=e.getContext("2d");o.globalAlpha=1/(2*+t);for(var s=-t;s<=t;s+=2)for(var i=-t;i<=t;i+=2)o.drawImage(e,i,s),i>=0&&s>=0&&o.drawImage(e,-(i-1),-(s-1));o.globalAlpha=1},t.prototype.getDataURL=function(e){var t=document.createElement("canvas"),o=t.getContext("2d");return t.width=e.width,t.height=e.height,o.drawImage(e,0,0),this.blurify(t,this.blur),t.toDataURL(this.imageType)},t}));
//blurify.min.js.map

;(function (window, document, $, undefined) {
  var UI = UI || {};

  document.documentElement.setAttribute("data-agent", navigator.userAgent);

  UI = {
    pcFlag : false,
    moFlag : false,
    userAgentCheck: function(){
      var deviceCheck;
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        deviceCheck = true
      } else{
        deviceCheck = false;
      }
      return deviceCheck;
    },
    mobileCheck : function () {
      var winW = window.innerWidth;
      var deviceFlag;

      if (winW <= 720) { // 220412 : 1280->720
        deviceFlag = true
      } else {
        deviceFlag = false;
      }

      return deviceFlag;
    },

    goTop : function () {
      var toTopWrap = '.btn-top-wrap',
          toTopButton = '.btn-unit__top';
      var toTopOptions = {
        appearAt: 100,
        scrollSpeed: 400,
        fadeSpeed: 200
      }

      $(document).on('click', toTopButton, function (e) {
        e.preventDefault();
        $("html, body").animate({
          scrollTop: 0
        }, toTopOptions.scrollSpeed);
      });

      $(window).scroll(function () {
        if ($(this).scrollTop() > parseInt(toTopOptions.appearAt)) {
          $(toTopWrap).fadeIn(toTopOptions.fadeSpeed);
        } else {
          $(toTopWrap).fadeOut(toTopOptions.fadeSpeed);
        }
      });
    },
    dimmed : function(state){
      var hiddenC = 'body-hidden';
      if (state) {
        $('body').addClass(hiddenC).css({
          'top' : -winScroll
        })
      } else {
        $('body').removeClass(hiddenC).removeAttr('style');
        $(window).scrollTop(winScroll);
      }
    },
    gnb : {
      init : function(){
        var menuOpenChk = 'is-menu-open';
        $(document).on('click', '.gnb__sub a', function (ev) {
            if($(this).attr("href").indexOf('/main/mainJournal') >= 0){
                sessionStorage.removeItem('GV_STORY_FILTER_PARM');
            }
        });
        $(document).on('click', '#menuNav', function (ev) {
          $('.menu-section').addClass('is-open').fadeIn(100, function () {
            UI.billboardSlide.init();
          });

          $('html, body').addClass(menuOpenChk);
          $('.hmg-site').removeClass('is-open');
          $('.policy_date').removeClass('is-open');

          if( !UI.mobileCheck() ) {
            $(window).scrollTop(0);
          }
          ev.preventDefault();
          UI.setFocusLoop($('.menu-section'));
          UI.setAriaHidden($('.menu-section')[0]);
        });

        $(document).on('click', '.menu-close', function () {
          $(this).closest('.menu-section').removeClass('is-open');
          $('body').removeClass(menuOpenChk);
          UI.removeFocusLoop();
          UI.removeAriaHidden();
        });

        $('.menu__search .search-box__input').on('input', function(){
          $(this).closest('.search-box').addClass('is-active');
        })

        $(document).on('click', '.menu-layer__prev', function (ev) {
          $(this).closest('[data-layer]').hide();
          if (UI.mobileCheck()) {
            UI.gnb.layerFocusUnlock($(this).closest('[data-layer]'));
          }
          if ($(this).closest('.hmg-links-wrap').length > 0) {
            $(this).closest('.hmg-links-wrap').find('.hmg-links__view').removeClass('is-open');
          }
          ev.preventDefault();
        });

        $(document).on('click', '[data-menu-btn]', function (ev) {
          var menuLayer = $(this).data('menu-btn');
          $('[data-layer]').hide();
          $('[data-layer=' + menuLayer + ']').show();

          ev.preventDefault();

          if (UI.mobileCheck()) {
            UI.gnb.layerFocusLock($('[data-layer=' + menuLayer + ']'));
          }
        });

        $(document).on('click', '.hmg-links__view', function (ev) {
          var menuSect = '.menu-section',
              hmgLinkCont = '.hmg-links__contents';
          if ($(this).hasClass('is-open')) {
            $(this).closest(menuSect).removeClass('is-open--hmg')
            $(this).removeClass('is-open');
            $(hmgLinkCont).find('.menu-layer').hide();
            $(hmgLinkCont).hide();
            $(this).find('i').text(ComUtils.getMessage(ComUtils.getLang(), 'LBL0000132'));
          } else {
            if(!UI.mobileCheck()) {
              $(this).closest(menuSect).addClass('is-open--hmg')
              $(this).find('i').text(ComUtils.getMessage(ComUtils.getLang(), 'LBL0000133'));
            }
            $(this).addClass('is-open');
            $(hmgLinkCont).show();
            $(hmgLinkCont).find('.menu-layer').show();
            if (UI.mobileCheck()) {
              UI.gnb.layerFocusLock($(hmgLinkCont).find('.menu-layer'));
            }
          }
        });
      },
      layerFocusLock: function(activeLayer){
        UI.removeFocusLoop();
        $('.menu-section .gnb--mobile').find('a, button, input').attr('tabindex', '-1').attr('data-layer-tabindex', true);
        $('.menu-section .billboard').find('a, button, input').attr('tabindex', '-1').attr('data-layer-tabindex', true);
        $('.menu-section .menu__search').find('a, button, input').attr('tabindex', '-1').attr('data-layer-tabindex', true);
        if (!activeLayer.closest('hmg-links__contents')) {
          $('.menu-section .hmg-links-wrap').find('a, button, input').attr('tabindex', '-1').attr('data-layer-tabindex', true);
        } else {
          $('.menu-section .hmg-links__block').find('a, button, input').attr('tabindex', '-1').attr('data-layer-tabindex', true);
        }

        activeLayer.find('a, button')[0].focus();

        var menuLength = activeLayer.find('ul li').length;
        activeLayer.find('.menu-layer__prev').on('keydown.gnbLayerFocus', function(e){
          var keyC = e.keyCode;
          if (keyC == 9 && e.shiftKey == true) {
            $('.menu-close').focus();
            e.preventDefault();
          };
        });
        activeLayer.find('ul li').eq(menuLength-1).find('a').on('keydown.gnbLayerFocus', function(e){
          var keyC = e.keyCode;
          if (keyC == 9 && e.shiftKey == false) {
            $('.menu-close').focus();
            e.preventDefault();
          };
        });
        $('.menu-close').on('keydown.gnbLayerFocus', function(e){
          var keyC = e.keyCode;
          if (keyC == 9) {
            e.preventDefault();
            if (e.shiftKey == true) {
              activeLayer.find('ul li').eq(menuLength-1).find('a').focus();
            } else {
              activeLayer.find('.menu-layer__prev').focus();
            }
          };
        });

        $('.menu-section .billboard').attr('aria-hidden', true).attr('data-layer-aria');
        $('.menu-section .menu__contents').attr('aria-hidden', true).attr('data-layer-aria');
        $('.menu-section .hmg-links-wrap').attr('aria-hidden', true).attr('data-layer-aria');
        activeLayer.attr('aria-hidden', false).attr('data-layer-aria');
      },
      layerFocusUnlock: function(activeLayer){
        $('.menu-section .gnb--mobile').find('a, button, input').removeAttr('tabindex data-layer-tabindex');
        $('.menu-section .billboard').find('a, button, input').removeAttr('tabindex data-layer-tabindex');
        $('.menu-section .menu__search').find('a, button, input').removeAttr('tabindex data-layer-tabindex');
        $('.menu-section .hmg-links-wrap').find('a, button, input').removeAttr('tabindex data-layer-tabindex');
        var menuLength = activeLayer.find('ul li').length;
        activeLayer.find('.menu-layer__prev').off('keydown.gnbLayerFocus');
        activeLayer.find('ul li').eq(menuLength-1).find('a').off('keydown.gnbLayerFocus');
        $('.menu-close').off('keydown.gnbLayerFocus');

        $('.menu-section .billboard').removeAttr('aria-hidden data-layer-aria');
        $('.menu-section .menu__contents').removeAttr('aria-hidden data-layer-aria');
        $('.menu-section .hmg-links-wrap').removeAttr('aria-hidden data-layer-aria');
        activeLayer.removeAttr('aria-hidden data-layer-aria');

        UI.setFocusLoop($('.menu-section'));
      },
      resize : function(flag){
        if (flag == true) { //mo면
          $('.menu-hmg-company').hide();
          if ($('.hmg-links__view').hasClass('is-open') && $('.hmg-links__contents').is(':visible')) {
            $('.hmg-links__contents').find('.menu-layer').hide();
            $('.hmg-links__contents').hide();
            $('.hmg-links__view').removeClass('is-open')
          }

          if( $('.menu-section').hasClass('is-open--hmg') && $('.hmg-links__contents').is(':visible') ){
            $('.hmg-links__contents').hide();
            $('.menu-section').removeClass('is-open--hmg');
          }
        } else { //pc면
          $('.menu-section').find('[data-layer]').each(function(idx){
            var $this = $(this);
            if ($this.is(":visible")) {
              if ($this.attr('data-layer') != 'menu-hmg-links') {
                $this.find('.menu-layer__prev').trigger('click');
              }
            }
          });
          $('.menu-hmg-company').show();
          $('[data-layer-aria]').each(function(){
            $(this).removeAttr('aria-hidden data-layer-aria');
          })
          $('[data-layer-tabindex]').each(function(){
            $(this).removeAttr('tabindex data-layer-tabindex');
          })
        }
      }
    },
    footer : function () {
      /* footer language */
      $(document).on('click', '.nav-lang a', function (ev) {
        var selLangIdx = $(this).index(),
            langActive = 'is-active';

        $('.nav-lang').each(function(){
          $(this).find('a').removeClass(langActive).eq(selLangIdx).addClass(langActive);
        });

        ev.preventDefault();
      });

      /* group site */
      $(document).on('click', '.hmg-site__label', function (ev) {
        var groupBox = $('.hmg-site');
        var openActive = 'is-open';
        if (groupBox.hasClass(openActive)) {
          groupBox.removeClass(openActive);
          $(ev.currentTarget).attr('aria-expanded', false);
          $(this).find('i').text(ComUtils.getMessage(ComUtils.getLang(), 'LBL0000132'));
        } else {
          groupBox.addClass(openActive);
          $(ev.currentTarget).attr('aria-expanded', true);
          $(this).find('i').text(ComUtils.getMessage(ComUtils.getLang(), 'LBL0000133'));
        }
        ev.preventDefault();
      });

      $(document).on('click', '.policy_date_btn' , function (ev) {
        var groupBox = $('.policy_date');
        var openActive = 'is-open';
        if (groupBox.hasClass(openActive)) {
          groupBox.removeClass(openActive);
        } else {
          groupBox.addClass(openActive);
        }
        ev.preventDefault();
      });
    },
    menuTab :  {
      menuVar : {
        tabSection : '.menu-tab-wrap',
        tabs    : '.menu-tab__block',
        tabItem : '.menu-tab__item',
        tabActive : 'is-active',
        tabSticky : 'is-fixed',
        layerCheck : 'is-layer-open'
      },
      stickyTab : function(scroll){
        if ($(this.menuVar.tabSection).length) {
          var $stickyContainer = $(this.menuVar.tabSection),
              $calPoint = $(this.menuVar.tabs),
              $endPoint = $('.footer'),
              $navButton = $('.menu-nav'),
              calH = Math.floor($stickyContainer.innerHeight());
          var footerCheck = $endPoint.length;
          var footerFlag;

          if (footerCheck > 0) {
            footerFlag = scroll < ($endPoint[0].offsetTop - calH); //브라우저 최상단에서부터 footer까지의 Y축 위치값 - 메뉴높이가 스크롤위치보다 위에 있으면 true,아니면 false

          } else {
            footerFlag = true;
          }

          if( $('body').hasClass(this.menuVarlayerCheck) && UI.mobileCheck()){
            return false;
          }

          if ($stickyContainer.hasClass('type-search')) {//통합검색이면(키워드 검색시 나오는 결과 페이지)
            if( scroll >= $stickyContainer.offset().top && footerFlag) {//스크롤 위치가 메뉴바밑으로 내려가고 footerFlag가 참이면 
              $stickyContainer.addClass(this.menuVar.tabSticky);
              this.gnbReverse(true); //로고색상 반전
              if (scroll < Math.floor($calPoint.offset().top - calH)) {
                  $stickyContainer.removeClass(this.menuVar.tabSticky); //stick기능 빼기
                  this.gnbReverse(false); //로고색상 반전 해제
              } else if (scroll >= Math.floor($calPoint.offset().top - calH) && footerFlag){ //footerFlag가 참이면
                  $stickyContainer.addClass(this.menuVar.tabSticky); //sticky기능 추가
                  this.gnbReverse(true);
              }
            } else {
                $stickyContainer.removeClass(this.menuVar.tabSticky);
                this.gnbReverse(false);
            }
            if (!UI.mobileCheck()) { //모바일이면
              if( scroll >= 100 && footerFlag) {
                $navButton.addClass(this.menuVar.tabSticky).addClass('search-nav');
              } else {
                $navButton.removeClass(this.menuVar.tabSticky).removeClass('search-nav');
              }
            } else {
              $navButton.removeClass('search-nav');
            }
          } else {
            if( scroll >= $stickyContainer.offset().top && footerFlag) {
              $stickyContainer.addClass(this.menuVar.tabSticky);
              $navButton.addClass(this.menuVar.tabSticky);
              this.gnbReverse(true);

              if (scroll < Math.floor($calPoint.offset().top - calH)) {
                  $stickyContainer.removeClass(this.menuVar.tabSticky);
                  $navButton.removeClass(this.menuVar.tabSticky);
                  this.gnbReverse(false);
              } else if (scroll >= Math.floor($calPoint.offset().top - calH) && footerFlag){
                  $stickyContainer.addClass(this.menuVar.tabSticky);
                  $navButton.addClass(this.menuVar.tabSticky);
                  this.gnbReverse(true);
              }
            } else {
                $stickyContainer.removeClass(this.menuVar.tabSticky);
                $navButton.removeClass(this.menuVar.tabSticky);
                this.gnbReverse(false);
            }
          }
        } else {
          var $calPoint = $(this.menuVar.tabs),
              $endPoint = $('.footer'),
              $navButton = $('.menu-nav');
          var footerCheck = $endPoint.length;
          var footerFlag;

          if (footerCheck > 0) {
            footerFlag = scroll < $endPoint[0].offsetTop;
          } else {
            footerFlag = true;
          }

          if( $('body').hasClass(this.menuVarlayerCheck) && UI.mobileCheck()){
            return false;
          }

          if( scroll >= 100 && footerFlag) {
            $navButton.addClass(this.menuVar.tabSticky).addClass('no-tab');
          } else {
            $navButton.removeClass(this.menuVar.tabSticky).removeClass('no-tab');
          }
        }
      },
      gnbReverse : function(sticky){ //로고 반전색상 
        if (sticky == true) {
          if ($('.header-wrap').hasClass('header-reverse')) {
            $('.header-wrap').removeClass('header-reverse').attr('data-header-color', 'reverse');
          }
        } else {
          if ($('.header-wrap').attr('data-header-color') == 'reverse') {
            $('.header-wrap').addClass('header-reverse').removeAttr('data-header-color');
          }
        }
      },
    },
    billboardSlide : {
      bSwiper: null,
      bSwiperEl: '.billboard .swiper',
      config: {
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
        slideVisibleClass: 'swiper-slide-visible',
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        a11y: {
          prevSlideMessage: '이전 빌보드 슬라이드',
          nextSlideMessage: '다음 빌보드 슬라이드',
        },
        on: {
          reachBeginning: function (){
            setTimeout(function(){
              $('.billboard .billboard__cont').addClass('first').removeClass('last');
            }, 200)
          },
          transitionStart: function(){
            $('.billboard .billboard__cont').removeClass('first last');
          },
          transitionEnd: function(){
            if (this.activeIndex == 0) {
              setTimeout(function(){
                $('.billboard .billboard__cont').addClass('first').removeClass('last');
              }, 200)
            }
          },
          slideChangeTransitionEnd: function(){
            if (this.activeIndex != 0) {
              $('.billboard .billboard__cont').removeClass('first last');
            }

            if (this.isBeginning == true) {
              setTimeout(function(){
                $('.billboard .billboard__cont').addClass('first').removeClass('last');
              }, 200)
            } else if (this.isEnd == true) {
              $('.billboard .billboard__cont').addClass('last').removeClass('first');
            }
            if (this.activeIndex == 0) {
              setTimeout(function(){
                $('.billboard .billboard__cont').addClass('first').removeClass('last');
              }, 200)
            }
          },
        }
      },
      init: function () {
        var wrapW = $(this.bSwiperEl).width();
        var slideW = $(this.bSwiperEl).find('.swiper-wrapper .swiper-slide').eq(0).outerWidth(true);
        var slidesLength = $(this.bSwiperEl).find('.swiper-wrapper .swiper-slide').length;

        // console.log(wrapW, slideW, slidesLength);

        if ( slidesLength > 0 ){
        if (wrapW <= slideW * slidesLength) {
          if (!$(this.bSwiperEl).hasClass('swiper-container-initialized')) {
            this.bSwiper = new Swiper(this.bSwiperEl, this.config);
          } else {
            this.bSwiper.update();
          }
        } else {
          if( this.bSwiper != null ){
            this.bSwiper.update();
          }
        }
}
      },
      resize: function(){
        this.init();
      }
    },
    menuTabSlide : {
      tSwiper: null,
      tSwiperEl: '.menu-tab.swiper',
      config: {
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
        slideVisibleClass: 'swiper-slide-visible',
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        a11y: {
          prevSlideMessage: '이전 탭 슬라이드',
          nextSlideMessage: '다음 탭 슬라이드',
        },
      },
      init: function () {
        if ( $(this.tSwiperEl).find('.swiper-slide').length > 0 ){
          if (!$(this.tSwiperEl).hasClass('swiper-container-initialized')) {
            this.tSwiper = new Swiper(this.tSwiperEl, this.config);
            var tabActiveIdx = $(this.tSwiperEl).find('.menu-tab__item.is-active').index();
            if ( tabActiveIdx > 0) {
              $(this.tSwiperEl).find('.is-active a').trigger('click touchstart');
                UI.menuTabSlide.tSwiper.slideTo( tabActiveIdx , 0)

              setTimeout(function(){
                UI.menuTabSlide.tSwiper.slideTo( tabActiveIdx , 0)
              }, 0)
            }
          } else {
            this.tSwiper.update();
          }
          this.focusEvent();
        }
      },
      resize: function () {
        // console.log(this.tSwiper)
        if(this.tSwiper != null){
          this.tSwiper.destroy();
          this.tSwiper = null;
          this.init();
        }

      },
      focusEvent : function () {
        $(this.tSwiperEl).find('a').on('focus', function(e){
          var focusIdx = $(e.target).closest('.swiper-slide').index();
          if(focusIdx == 0){
              UI.menuTabSlide.tSwiper.slideTo( focusIdx , 0);
          }
        });
      },
    },
    cardSwiper : function(){
      var cardSwiperArray = [];
      $('.card-list.swiper').each(function (idx) {
        var $this = $(this);
        var $cardSwiperContainer = $(this).closest('.card-block');
        if (!$cardSwiperContainer.hasClass('swiper-active')) {
            var lengthChk;
            if ($cardSwiperContainer.hasClass('card-col3')) {
              lengthChk = 3
            } else if ($cardSwiperContainer.hasClass('card-col4')) {
              lengthChk = 4
            }else {
              lengthChk = 1
            }

            //  if ($cardSwiperContainer.find('.card').length >= lengthChk) {
            if ($cardSwiperContainer.find('.card.swiper-slide').length >= 2) {
              $this.addClass('card-swiper-0' + idx);

              if ($cardSwiperContainer.hasClass('card-full')) {
                $this.append('<div class="swiper-pagination card-banner-indicator card-swiper-indi-0' + idx + '" aria-label="slide'+idx+'">');
              }
              $cardSwiperContainer.addClass('swiper-active');
              $cardSwiperContainer.append('<button type="button" class="card-swiper-btn swiper-button-prev swiper-btn-0' + idx + '" role="button" aria-label="prev">');
              $cardSwiperContainer.append('<button type="button" class="card-swiper-btn swiper-button-next swiper-btn-0' + idx + '" role="button" aria-label="next">');

              if(! $cardSwiperContainer.hasClass('card-col-multi')) {
                if ($cardSwiperContainer.hasClass('card-full')) {
                  var cardSwiper = new Swiper('.card-swiper-0' + idx, {
                    slidesPerView: 'auto',
                    navigation: {
                      nextEl: '.swiper-button-next.swiper-btn-0' + idx,
                      prevEl: '.swiper-button-prev.swiper-btn-0' + idx,
                    },
                    a11y: {
                      prevSlideMessage: '이전 컨텐츠',
                      nextSlideMessage: '다음 컨텐츠',
                    },
                    pagination: {
                      el: '.card-banner-indicator.card-swiper-indi-0' + idx,
                      type: 'bullets',
                    },
                    breakpoints: {
                      719: {
                        slidesPerView: 'auto',
                      },
                    },
                    slideVisibleClass: 'swiper-slide-visible',
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    on: {
                      init: function () {
                        var sw = this;
                        setTimeout(function(){
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          UI.swiperChangeEv(sw);
                        }, 300);
                      },
                      reachBeginning: function(){
                        if (document.activeElement == $cardSwiperContainer.find('.swiper-button-prev')[0]) {
                          setTimeout(function(){
                            $cardSwiperContainer.find('.swiper-button-next').focus();
                            $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          }, 300)
                        } else {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }
                      },
                      reachEnd: function(){
                        if (document.activeElement == $cardSwiperContainer.find('.swiper-button-next')[0]) {
                          setTimeout(function(){
                            $cardSwiperContainer.find('.swiper-button-prev').focus();
                            $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          }, 300)
                        } else {
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }
                      },
                      beforeSlideChangeStart: function(){
                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                      },
                      transitionEnd: function(){
                        UI.swiperChangeEv(this);
                        if (this.isBeginning) {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        } else if (this.isEnd) {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        } else {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        }
                      },
                    },
                  });
                } else if ($cardSwiperContainer.hasClass('card-col3')) {
                  var cardSwiper = new Swiper('.card-swiper-0' + idx, {
                    slidesPerView: 'auto',
                    slidesPerGroup: 3,
                    navigation: {
                      nextEl: '.swiper-button-next.swiper-btn-0' + idx,
                      prevEl: '.swiper-button-prev.swiper-btn-0' + idx,
                    },
                    a11y: {
                      prevSlideMessage: '이전 카드 슬라이드',
                      nextSlideMessage: '다음 카드 슬라이드',
                    },
                    pagination: {
                      el: '.card-banner-indicator.card-swiper-indi-0' + idx,
                      type: 'bullets',
                    }, breakpoints: {
                      719: {
                        slidesPerGroup : 1,
                        centeredSlides: true,
                      },
                    },
                    slideVisibleClass: 'swiper-slide-visible',
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    on: {
                      init: function () {
                        var sw = this;
                        setTimeout(function(){
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          UI.swiperChangeEv(sw);
                        }, 300);
                      },
                      reachBeginning: function(){
                        if (document.activeElement == $cardSwiperContainer.find('.swiper-button-prev')[0]) {
                          setTimeout(function(){
                            $cardSwiperContainer.find('.swiper-button-next').focus();
                            $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          }, 300)
                        } else {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }
                      },
                      reachEnd: function(){
                        if (document.activeElement == $cardSwiperContainer.find('.swiper-button-next')[0]) {
                          $cardSwiperContainer.find('.swiper-button-prev').focus();
                          setTimeout(function(){
                            $cardSwiperContainer.find('.swiper-button-prev').focus();
                            $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          }, 300)
                        } else {
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }
                      },
                      beforeSlideChangeStart: function(){
                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                      },
                      transitionEnd: function(){
                        UI.swiperChangeEv(this);
                        if (this.isBeginning) {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0'} , {'aria-hidden' : false});
                        } else if (this.isEnd) {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0'} , {'aria-hidden' : false});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        } else {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        }
                      },
                    },
                  });
                } else {
                  var cardSwiper = new Swiper('.card-swiper-0' + idx, {
                    slidesPerView: 'auto',
                    slidesPerGroup: 4,
                    navigation: {
                      nextEl: '.swiper-button-next.swiper-btn-0' + idx,
                      prevEl: '.swiper-button-prev.swiper-btn-0' + idx,
                    },
                    a11y: {
                      prevSlideMessage: '이전 컨텐츠',
                      nextSlideMessage: '다음 컨텐츠',
                    },
                    pagination: {
                      el: '.card-banner-indicator.card-swiper-indi-0' + idx,
                      type: 'bullets',
                    },
                    slideVisibleClass: 'swiper-slide-visible',
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    breakpoints: {
                      719: {
                        slidesPerGroup : 1,
                        centeredSlides: true,
                      },
                    },
                    on: {
                      init: function () {
                        var sw = this;
                        setTimeout(function(){
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          UI.swiperChangeEv(sw);
                        }, 300);
                      },
                      reachBeginning: function(){
                        if (document.activeElement == $cardSwiperContainer.find('.swiper-button-prev')[0]) {
                          setTimeout(function(){
                            $cardSwiperContainer.find('.swiper-button-next').focus();
                            $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          }, 300)
                        } else {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }
                      },
                      reachEnd: function(){
                        if (document.activeElement == $cardSwiperContainer.find('.swiper-button-next')[0]) {
                          $cardSwiperContainer.find('.swiper-button-prev').focus();
                          setTimeout(function(){
                            $cardSwiperContainer.find('.swiper-button-prev').focus();
                            $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          }, 300)
                        } else {
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }
                      },
                      beforeSlideChangeStart: function(){
                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                      },
                      transitionEnd: function(){
                        UI.swiperChangeEv(this);
                        if (this.isBeginning) {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        } else if (this.isEnd) {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        } else {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        }
                      },
                    },
                  });
                }
              } else {

                //multi type
                if ($cardSwiperContainer.hasClass('card-col4')) {
                  var cardSwiper = new Swiper('.card-swiper-0' + idx, {
                    slidesPerView: 'auto',
                    slidesPerGroup: 4,
                    navigation: {
                      nextEl: '.swiper-button-next.swiper-btn-0' + idx,
                      prevEl: '.swiper-button-prev.swiper-btn-0' + idx,
                    },
                    a11y: {
                      prevSlideMessage: '이전 컨텐츠 슬라이드',
                      nextSlideMessage: '다음 컨텐츠 슬라이드',
                    },
                    pagination: {
                      el: '.card-banner-indicator.card-swiper-indi-0' + idx,
                      type: 'bullets',
                    }, breakpoints: {
                      899: {
                        slidesPerGroup : 3,
                        centeredSlides: false,
                      },
                      719: {
                        slidesPerGroup : 1,
                        centeredSlides: true,
                      },
                    },
                    slideVisibleClass: 'swiper-slide-visible',
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    on: {
                      init: function () {
                        var sw = this;
                        setTimeout(function(){
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          UI.swiperChangeEv(sw);
                        }, 300);
                      },
                      reachBeginning: function(){
                        if (document.activeElement == $cardSwiperContainer.find('.swiper-button-prev')[0]) {
                          setTimeout(function(){
                            $cardSwiperContainer.find('.swiper-button-next').focus();
                            $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          }, 300)
                        } else {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }
                      },
                      reachEnd: function(){
                        if (document.activeElement == $cardSwiperContainer.find('.swiper-button-next')[0]) {
                          $cardSwiperContainer.find('.swiper-button-prev').focus();
                          setTimeout(function(){
                            $cardSwiperContainer.find('.swiper-button-prev').focus();
                            $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          }, 300)
                        } else {
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }
                      },
                      beforeSlideChangeStart: function(){
                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                      },
                      transitionEnd: function(){
                        UI.swiperChangeEv(this);
                        if (this.isBeginning) {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        } else if (this.isEnd) {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        } else {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        }
                      },
                    },
                  });
                } else {
                  var cardSwiper = new Swiper('.card-swiper-0' + idx, {
                    slidesPerView: 'auto',
                    slidesPerGroup: 3,
                    navigation: {
                      nextEl: '.swiper-button-next.swiper-btn-0' + idx,
                      prevEl: '.swiper-button-prev.swiper-btn-0' + idx,
                    },
                    a11y: {
                      prevSlideMessage: '이전 컨텐츠 슬라이드',
                      nextSlideMessage: '다음 컨텐츠 슬라이드',
                    },
                    pagination: {
                      el: '.card-banner-indicator.card-swiper-indi-0' + idx,
                      type: 'bullets',
                    },
                    slideVisibleClass: 'swiper-slide-visible',
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    breakpoints: {
                      899: {
                        slidesPerGroup : 3,
                        centeredSlides: false,
                      },
                      719: {
                        slidesPerGroup : 1,
                        centeredSlides: true,
                      },
                    },
                    on: {
                      init: function () {
                        var sw = this;
                        setTimeout(function(){
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          UI.swiperChangeEv(sw);
                        }, 300);
                      },
                      reachBeginning: function(){
                        if (document.activeElement == $cardSwiperContainer.find('.swiper-button-prev')[0]) {
                          setTimeout(function(){
                            $cardSwiperContainer.find('.swiper-button-next').focus();
                            $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          }, 300)
                        } else {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }
                      },
                      reachEnd: function(){
                        if (document.activeElement == $cardSwiperContainer.find('.swiper-button-next')[0]) {
                          $cardSwiperContainer.find('.swiper-button-prev').focus();
                          setTimeout(function(){
                            $cardSwiperContainer.find('.swiper-button-prev').focus();
                            $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          }, 300)
                        } else {
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }
                      },
                      beforeSlideChangeStart: function(){
                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                      },
                      transitionEnd: function(){
                        UI.swiperChangeEv(this);
                        if (this.isBeginning) {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        } else if (this.isEnd) {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        } else {
                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        }
                      },
                    },
                  });
                }
              }
              cardSwiperArray.push(cardSwiper);
            }

        }
//        if ($cardSwiperContainer.hasClass('card-col4') || $cardSwiperContainer.hasClass('card-col3') || $cardSwiperContainer.hasClass('card-full')) {
//          var lengthChk;
//          if ($cardSwiperContainer.hasClass('card-col3')) {
//            lengthChk = 3
//          } else if ($cardSwiperContainer.hasClass('card-col4')) {
//            lengthChk = 4
//          }else {
//            lengthChk = 1
//          }
//
//          //  if ($cardSwiperContainer.find('.card').length >= lengthChk) {
//          if ($cardSwiperContainer.find('.card.swiper-slide').length >= 2) {
//            $this.addClass('card-swiper-0' + idx);
//
//            if ($cardSwiperContainer.hasClass('card-full')) {
//              $this.append('<div class="swiper-pagination card-banner-indicator card-swiper-indi-0' + idx + '" aria-label="slide'+idx+'">');
//            }
//            $cardSwiperContainer.addClass('swiper-active');
//            $cardSwiperContainer.append('<button type="button" class="card-swiper-btn swiper-button-prev swiper-btn-0' + idx + '" role="button" aria-label="prev">');
//            $cardSwiperContainer.append('<button type="button" class="card-swiper-btn swiper-button-next swiper-btn-0' + idx + '" role="button" aria-label="next">');
//
//            if(! $cardSwiperContainer.hasClass('card-col-multi')) {
//              if ($cardSwiperContainer.hasClass('card-full')) {
//                var cardSwiper = new Swiper('.card-swiper-0' + idx, {
//                  slidesPerView: 'auto',
//                  navigation: {
//                    nextEl: '.swiper-button-next.swiper-btn-0' + idx,
//                    prevEl: '.swiper-button-prev.swiper-btn-0' + idx,
//                  },
//                  a11y: {
//                    prevSlideMessage: '이전 컨텐츠',
//                    nextSlideMessage: '다음 컨텐츠',
//                  },
//                  pagination: {
//                    el: '.card-banner-indicator.card-swiper-indi-0' + idx,
//                    type: 'bullets',
//                  },
//                  breakpoints: {
//                    719: {
//                      slidesPerView: 'auto',
//                    },
//                  },
//                  slideVisibleClass: 'swiper-slide-visible',
//                  watchSlidesProgress: true,
//                  watchSlidesVisibility: true,
//                  on: {
//                    init: function () {
//                      var sw = this;
//                      setTimeout(function(){
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        UI.swiperChangeEv(sw);
//                      }, 300);
//                    },
//                    reachBeginning: function(){
//                      if (document.activeElement == $cardSwiperContainer.find('.swiper-button-prev')[0]) {
//                        setTimeout(function(){
//                          $cardSwiperContainer.find('.swiper-button-next').focus();
//                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        }, 300)
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      }
//                    },
//                    reachEnd: function(){
//                      if (document.activeElement == $cardSwiperContainer.find('.swiper-button-next')[0]) {
//                        setTimeout(function(){
//                          $cardSwiperContainer.find('.swiper-button-prev').focus();
//                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        }, 300)
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      }
//                    },
//                    beforeSlideChangeStart: function(){
//                      $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                    },
//                    transitionEnd: function(){
//                      UI.swiperChangeEv(this);
//                      if (this.isBeginning) {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      } else if (this.isEnd) {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      }
//                    },
//                  },
//                });
//              } else if ($cardSwiperContainer.hasClass('card-col3')) {
//                var cardSwiper = new Swiper('.card-swiper-0' + idx, {
//                  slidesPerView: 'auto',
//                  slidesPerGroup: 3,
//                  navigation: {
//                    nextEl: '.swiper-button-next.swiper-btn-0' + idx,
//                    prevEl: '.swiper-button-prev.swiper-btn-0' + idx,
//                  },
//                  a11y: {
//                    prevSlideMessage: '이전 카드 슬라이드',
//                    nextSlideMessage: '다음 카드 슬라이드',
//                  },
//                  pagination: {
//                    el: '.card-banner-indicator.card-swiper-indi-0' + idx,
//                    type: 'bullets',
//                  }, breakpoints: {
//                    719: {
//                      slidesPerGroup : 1,
//                      centeredSlides: true,
//                    },
//                  },
//                  slideVisibleClass: 'swiper-slide-visible',
//                  watchSlidesProgress: true,
//                  watchSlidesVisibility: true,
//                  on: {
//                    init: function () {
//                      var sw = this;
//                      setTimeout(function(){
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        UI.swiperChangeEv(sw);
//                      }, 300);
//                    },
//                    reachBeginning: function(){
//                      if (document.activeElement == $cardSwiperContainer.find('.swiper-button-prev')[0]) {
//                        setTimeout(function(){
//                          $cardSwiperContainer.find('.swiper-button-next').focus();
//                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        }, 300)
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      }
//                    },
//                    reachEnd: function(){
//                      if (document.activeElement == $cardSwiperContainer.find('.swiper-button-next')[0]) {
//                        $cardSwiperContainer.find('.swiper-button-prev').focus();
//                        setTimeout(function(){
//                          $cardSwiperContainer.find('.swiper-button-prev').focus();
//                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        }, 300)
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      }
//                    },
//                    beforeSlideChangeStart: function(){
//                      $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                    },
//                    transitionEnd: function(){
//                      UI.swiperChangeEv(this);
//                      if (this.isBeginning) {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0'} , {'aria-hidden' : false});
//                      } else if (this.isEnd) {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0'} , {'aria-hidden' : false});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      }
//                    },
//                  },
//                });
//              } else {
//                var cardSwiper = new Swiper('.card-swiper-0' + idx, {
//                  slidesPerView: 'auto',
//                  slidesPerGroup: 4,
//                  navigation: {
//                    nextEl: '.swiper-button-next.swiper-btn-0' + idx,
//                    prevEl: '.swiper-button-prev.swiper-btn-0' + idx,
//                  },
//                  a11y: {
//                    prevSlideMessage: '이전 컨텐츠',
//                    nextSlideMessage: '다음 컨텐츠',
//                  },
//                  pagination: {
//                    el: '.card-banner-indicator.card-swiper-indi-0' + idx,
//                    type: 'bullets',
//                  },
//                  slideVisibleClass: 'swiper-slide-visible',
//                  watchSlidesProgress: true,
//                  watchSlidesVisibility: true,
//                  breakpoints: {
//                    719: {
//                      slidesPerGroup : 1,
//                      centeredSlides: true,
//                    },
//                  },
//                  on: {
//                    init: function () {
//                      var sw = this;
//                      setTimeout(function(){
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        UI.swiperChangeEv(sw);
//                      }, 300);
//                    },
//                    reachBeginning: function(){
//                      if (document.activeElement == $cardSwiperContainer.find('.swiper-button-prev')[0]) {
//                        setTimeout(function(){
//                          $cardSwiperContainer.find('.swiper-button-next').focus();
//                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        }, 300)
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      }
//                    },
//                    reachEnd: function(){
//                      if (document.activeElement == $cardSwiperContainer.find('.swiper-button-next')[0]) {
//                        $cardSwiperContainer.find('.swiper-button-prev').focus();
//                        setTimeout(function(){
//                          $cardSwiperContainer.find('.swiper-button-prev').focus();
//                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        }, 300)
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      }
//                    },
//                    beforeSlideChangeStart: function(){
//                      $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                    },
//                    transitionEnd: function(){
//                      UI.swiperChangeEv(this);
//                      if (this.isBeginning) {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      } else if (this.isEnd) {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      }
//                    },
//                  },
//                });
//              }
//            } else {
//
//              //multi type
//              if ($cardSwiperContainer.hasClass('card-col4')) {
//                var cardSwiper = new Swiper('.card-swiper-0' + idx, {
//                  slidesPerView: 'auto',
//                  slidesPerGroup: 4,
//                  navigation: {
//                    nextEl: '.swiper-button-next.swiper-btn-0' + idx,
//                    prevEl: '.swiper-button-prev.swiper-btn-0' + idx,
//                  },
//                  a11y: {
//                    prevSlideMessage: '이전 컨텐츠 슬라이드',
//                    nextSlideMessage: '다음 컨텐츠 슬라이드',
//                  },
//                  pagination: {
//                    el: '.card-banner-indicator.card-swiper-indi-0' + idx,
//                    type: 'bullets',
//                  }, breakpoints: {
//                    899: {
//                      slidesPerGroup : 3,
//                      centeredSlides: false,
//                    },
//                    719: {
//                      slidesPerGroup : 1,
//                      centeredSlides: true,
//                    },
//                  },
//                  slideVisibleClass: 'swiper-slide-visible',
//                  watchSlidesProgress: true,
//                  watchSlidesVisibility: true,
//                  on: {
//                    init: function () {
//                      var sw = this;
//                      setTimeout(function(){
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        UI.swiperChangeEv(sw);
//                      }, 300);
//                    },
//                    reachBeginning: function(){
//                      if (document.activeElement == $cardSwiperContainer.find('.swiper-button-prev')[0]) {
//                        setTimeout(function(){
//                          $cardSwiperContainer.find('.swiper-button-next').focus();
//                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        }, 300)
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      }
//                    },
//                    reachEnd: function(){
//                      if (document.activeElement == $cardSwiperContainer.find('.swiper-button-next')[0]) {
//                        $cardSwiperContainer.find('.swiper-button-prev').focus();
//                        setTimeout(function(){
//                          $cardSwiperContainer.find('.swiper-button-prev').focus();
//                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        }, 300)
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      }
//                    },
//                    beforeSlideChangeStart: function(){
//                      $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                    },
//                    transitionEnd: function(){
//                      UI.swiperChangeEv(this);
//                      if (this.isBeginning) {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      } else if (this.isEnd) {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      }
//                    },
//                  },
//                });
//              } else {
//                var cardSwiper = new Swiper('.card-swiper-0' + idx, {
//                  slidesPerView: 'auto',
//                  slidesPerGroup: 3,
//                  navigation: {
//                    nextEl: '.swiper-button-next.swiper-btn-0' + idx,
//                    prevEl: '.swiper-button-prev.swiper-btn-0' + idx,
//                  },
//                  a11y: {
//                    prevSlideMessage: '이전 컨텐츠 슬라이드',
//                    nextSlideMessage: '다음 컨텐츠 슬라이드',
//                  },
//                  pagination: {
//                    el: '.card-banner-indicator.card-swiper-indi-0' + idx,
//                    type: 'bullets',
//                  },
//                  slideVisibleClass: 'swiper-slide-visible',
//                  watchSlidesProgress: true,
//                  watchSlidesVisibility: true,
//                  breakpoints: {
//                    899: {
//                      slidesPerGroup : 3,
//                      centeredSlides: false,
//                    },
//                    719: {
//                      slidesPerGroup : 1,
//                      centeredSlides: true,
//                    },
//                  },
//                  on: {
//                    init: function () {
//                      var sw = this;
//                      setTimeout(function(){
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        UI.swiperChangeEv(sw);
//                      }, 300);
//                    },
//                    reachBeginning: function(){
//                      if (document.activeElement == $cardSwiperContainer.find('.swiper-button-prev')[0]) {
//                        setTimeout(function(){
//                          $cardSwiperContainer.find('.swiper-button-next').focus();
//                          $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        }, 300)
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      }
//                    },
//                    reachEnd: function(){
//                      if (document.activeElement == $cardSwiperContainer.find('.swiper-button-next')[0]) {
//                        $cardSwiperContainer.find('.swiper-button-prev').focus();
//                        setTimeout(function(){
//                          $cardSwiperContainer.find('.swiper-button-prev').focus();
//                          $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        }, 300)
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      }
//                    },
//                    beforeSlideChangeStart: function(){
//                      $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                    },
//                    transitionEnd: function(){
//                      UI.swiperChangeEv(this);
//                      if (this.isBeginning) {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      } else if (this.isEnd) {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                      } else {
//                        $cardSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                        $cardSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                      }
//                    },
//                  },
//                });
//              }
//            }
//            cardSwiperArray.push(cardSwiper);
//          }
//        }
      });
    },
    actSwiper : function(){
      var actSwiperArray = [];

      $('.act-snippet-wrap .swiper').each(function (idx) {
        var $this = $(this);
        var $actSwiperContainer =  $this;

        if( $actSwiperContainer.find('.swiper-slide').length > 1 ){
          $this.addClass('act-swiper-0' + idx);
          $this.attr('data-swiper', 'act-swiper-0' + idx);

          $actSwiperContainer.addClass('swiper-active');
          $actSwiperContainer.append('<div class="act-swiper-scrollbar swiper-scrollbar swiper-scroll-0' + idx + '">');
          $actSwiperContainer.append('<button type="button" class="act-snippet-btn swiper-button-prev swiper-btn-0' + idx + '" tabindex="0" role="button" aria-label="prev">');
          $actSwiperContainer.append('<button type="button" class="act-snippet-btn swiper-button-next swiper-btn-0' + idx + '" tabindex="0" role="button" aria-label="next">');

          var actSwiper = new Swiper('.act-swiper-0' + idx, {
            slidesPerView: 1,
            navigation: {
              nextEl: '.swiper-button-next.act-snippet-btn.swiper-btn-0' + idx,
              prevEl: '.swiper-button-prev.act-snippet-btn.swiper-btn-0' + idx,
            },
            a11y: {
              prevSlideMessage: '이전 컨텐츠',
              nextSlideMessage: '다음 컨텐츠',
            },
            scrollbar: {
              el: '.swiper-scrollbar.act-swiper-scrollbar.swiper-scroll-0' + idx,
            },
            observer: true,
            observeParents: true,
            slideVisibleClass: 'swiper-slide-visible',
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            breakpoints: {
              899: {
                slidesPerView: 'auto',
              },
              719: {
                slidesPerView: 1,
              },
            },
            on: {
              beforeResize: function () {
                if (window.innerWidth <= 899) {
                  $actSwiperContainer.find('.swiper-slide').css('width', '');
                }
              },
              init: function () {
                var sw = this;
                setTimeout(function(){
                  $actSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                  UI.swiperChangeEv(sw);
                }, 300);
              },
              reachBeginning: function(){
                if (document.activeElement == $actSwiperContainer.find('.swiper-button-prev')[0]) {
                  setTimeout(function(){
                    $actSwiperContainer.find('.swiper-button-next').focus();
                    $actSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                  }, 300)
                } else {
                  $actSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                }
              },
              reachEnd: function(){
                UI.swiperChangeEv(this);

                if (document.activeElement == $actSwiperContainer.find('.swiper-button-next')[0]) {
                  $actSwiperContainer.find('.swiper-button-prev').focus();
                  setTimeout(function(){
                    $actSwiperContainer.find('.swiper-button-prev').focus();
                    $actSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                  }, 300)
                } else {
                  $actSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                }
              },
              beforeSlideChangeStart: function(){
                $actSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                $actSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
              },
              transitionEnd: function(){
                UI.swiperChangeEv(this);
                if (this.isBeginning) {
                  $actSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                  $actSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                } else if (this.isEnd) {
                  $actSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                  $actSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                } else {
                  $actSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                  $actSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                }
              },
            },
          });

          actSwiperArray.push(actSwiper);
        }

      })
    },

    boxSwiper : function(){
      var boxSwiperArray = [];

      $('.box-slide.swiper').each(function (idx) {
        var $this = $(this);
        var $boxSwiperContainer =  $this;

        $this.addClass('act-swiper-0' + idx);

        $boxSwiperContainer.addClass('swiper-active');
        //s:231215 add
        if ($boxSwiperContainer.find('.box-slide-scrollbar').length !== 0){
          return
        }
        //e:231215 add
        $boxSwiperContainer.append('<div class="box-slide-scrollbar swiper-scrollbar swiper-scroll-0' + idx + '"><div class="progressbar-fill">');
        $boxSwiperContainer.append('<button type="button" class="box-slide-btn swiper-button-prev swiper-btn-0' + idx + '" tabindex="0" role="button" aria-label="prev">');
        $boxSwiperContainer.append('<button type="button" class="box-slide-btn swiper-button-next swiper-btn-0' + idx + '" tabindex="0" role="button" aria-label="next">');
        //  swiper-button-prev
        var boxSwiper = new Swiper('.act-swiper-0' + idx, {
          slidesPerView: 'auto',
          centeredSlides: true,
          navigation: {
            nextEl: '.swiper-button-next.box-slide-btn.swiper-btn-0' + idx,
            prevEl: '.swiper-button-prev.box-slide-btn.swiper-btn-0' + idx,
          },
          a11y: {
            prevSlideMessage: '이전 뉴스',
            nextSlideMessage: '다음 뉴스',
          },
          // pc -> loop, scrollbar -> pagination scroll
          // scrollbar: {
          //   el: '.swiper-scrollbar.box-slide-scrollbar.swiper-scroll-0' + idx,
          // },
          pagination: {
            el: '.swiper-scrollbar.box-slide-scrollbar.swiper-scroll-0' + idx,
            type : 'custom',
          },
          loop: true,
          observer: true,
          observeParents: true,
          slideVisibleClass: 'swiper-slide-visible',
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          breakpoints: {
            720: {
              loop : false,
            }
          },
          on: {
            init: function () {
              var sw = this;
              setTimeout(function(){
                $boxSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                UI.swiperChangeEv(sw);
              }, 300);
              var progressbar = $boxSwiperContainer.find('.progressbar-fill');
              var swiperLength = $boxSwiperContainer.find( '.swiper-slide:not(.swiper-slide-duplicate)' ).length;
              var progressbarSize = (100/swiperLength).toFixed(2);
              progressbar.css({
                'width' : progressbarSize+'%'
              });
            },
            reachBeginning: function(){
              if (document.activeElement == $boxSwiperContainer.find('.swiper-button-prev')[0]) {
                setTimeout(function(){
                  $boxSwiperContainer.find('.swiper-button-next').focus();
                  $boxSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                }, 300)
              } else {
                $boxSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
              }
            },
            reachEnd: function(){
              if (document.activeElement == $boxSwiperContainer.find('.swiper-button-next')[0]) {
                $boxSwiperContainer.find('.swiper-button-prev').focus();
                setTimeout(function(){
                  $boxSwiperContainer.find('.swiper-button-prev').focus();
                  $boxSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                }, 300)
              } else {
                $boxSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
              }
            },
            beforeSlideChangeStart: function(){
              $boxSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
              $boxSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
            },
            beforeTransitionStart:function(){
              var progressbar = $boxSwiperContainer.find('.progressbar-fill');
              var swiperLength = $boxSwiperContainer.find( '.swiper-slide:not(.swiper-slide-duplicate)' ).length;
              var progressbarSize = (100/swiperLength).toFixed(2);
              progressbar.css({
                'transform':'translateX('+ this.realIndex*100 +'%)',
                'width' : progressbarSize+'%'
              });
            },
            transitionEnd: function(){
              UI.swiperChangeEv(this);
              if (this.isBeginning) {
                $boxSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                $boxSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
              } else if (this.isEnd) {
                $boxSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                $boxSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
              } else {
                $boxSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                $boxSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
              }
            },
          },
        });

        boxSwiperArray.push(boxSwiper);
      })
    },

    boxImgSwiper : function(){
      var boxImgSwiperArray = [];
      $('.component-slide-image .s-slide-image.swiper').each(function (idx) {
        var $this = $(this);
        var $boxImgSwiperContainer =  $this;
        if($this.find( '.swiper-slide' ).length > 0){
          $this.addClass('boxImg-swiper-0' + idx);
          $boxImgSwiperContainer.addClass('swiper-active');
          var centeredSlides = !($this.closest('.s-box--vertical').length > 0 || $this.closest('.s-box--multi').length > 0);/*240626 modify*/
          var boxImgSwiper = new Swiper('.boxImg-swiper-0' + idx, {
            slidesPerView: 'auto',
            centeredSlides: centeredSlides,/* 240626 add*/
            scrollbar: {
              el: '.s-slide-image.boxImg-swiper-0' + idx + ' .swiper-scrollbar',
            },
            navigation: {
              nextEl: '.s-slide-image.boxImg-swiper-0' + idx + ' .swiper-button-next',
              prevEl: '.s-slide-image.boxImg-swiper-0' + idx + ' .swiper-button-prev',
            },
            a11y: {
              prevSlideMessage: '이전 이미지 슬라이드',
              nextSlideMessage: '다음 이미지 슬라이드',
            },
            observer: true,
            observeParents: true,
            slideVisibleClass: 'swiper-slide-visible',
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            breakpoints: {
              // 899: {
              //   slidesPerView: 'auto',
              //   // centeredSlides: true,
              // },
            },
            on: {
              init: function () {
                var sw = this;
                var $slideImg = $boxImgSwiperContainer.find('.swiper-slide-active').find('.s-slide__img');
                var imgHeight = $slideImg.height();
                var $btns = $boxImgSwiperContainer.find('.s-slide-btn');
                var btnHeight = $btns.height() / 2;
                $btns.css({
                  'top': (imgHeight / 2) - btnHeight,
                });
              setTimeout(function(){
                $boxImgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                UI.swiperChangeEv(sw);
              }, 300);
              },
              reachBeginning: function(){
                if (document.activeElement == $boxImgSwiperContainer.find('.swiper-button-prev')[0]) {
                  setTimeout(function(){
                    $boxImgSwiperContainer.find('.swiper-button-next').focus();
                    $boxImgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                  }, 300)
                } else {
                  $boxImgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                }
               
              },
              reachEnd: function(){
                if (document.activeElement == $boxImgSwiperContainer.find('.swiper-button-next')[0]) {
                  $boxImgSwiperContainer.find('.swiper-button-prev').focus();
                  setTimeout(function(){
                    $boxImgSwiperContainer.find('.swiper-button-prev').focus();
                    $boxImgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                    
                  }, 300)
                } else {
                  $boxImgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                }
                   
              },
              beforeSlideChangeStart: function(){
                $boxImgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                $boxImgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
      
              },
              transitionEnd: function(){
                UI.swiperChangeEv(this);
                if (this.isBeginning) {
                  $boxImgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                  $boxImgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                } else if (this.isEnd) {
                  $boxImgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                  $boxImgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});

                } else {
                  $boxImgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                  $boxImgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                }
              },
              /* start : ★★ 작업한 부분 ★★ */
               slideChange: function () {  
                 //1. 마지막 슬라이드 전 슬라이드 일 경우: 이전슬라이드 transform값 + 마지막 슬라이드 넓이값 - margin*2 - padding-right;
                 const totalSlide = this.slides.length;
                 const lastSlideIndex = totalSlide - 1;
                 const wrapper = this.wrapperEl.closest('.s-slide-image');
                 //마지막 인덱스에 도달했을때 위치 고정
                 if(this.activeIndex === lastSlideIndex){
                   const targtX = window.getComputedStyle(this.wrapperEl).getPropertyValue("transform").match(/(-?[0-9\.]+)/g)[4]; 
                   const WrapperRect = parseFloat(this.slides[lastSlideIndex].getBoundingClientRect().width);
                   const paddingRight = parseFloat(window.getComputedStyle(wrapper).paddingRight);
                   const computedStyle = window.getComputedStyle(this.slides[lastSlideIndex]);
                   const marginLeft = parseFloat(computedStyle.marginLeft);
                   var translateX = Math.abs(targtX) + WrapperRect + (marginLeft * 2) - paddingRight;
                   this.slides[lastSlideIndex].parentElement.style.transform  = `translate3d(${-translateX}px, 0, 0)`;
                 }
               },
                /* end : ★★ 작업한 부분 ★★ */

              /* 기존 
              slideChange: function () {  
                var totalWidth = 0;
                var thisSlide = this.wrapperEl.querySelectorAll('.s-box--horizon .swiper-slide');
                //모든 슬라이드의 총 너비 계산
                thisSlide.forEach(function(slide) {
                  totalWidth += slide.offsetWidth;
                  }); 
                const totalSlide = this.slides.length;
                const lastSlideIndex = totalSlide - 1;
                const wrapper = this.wrapperEl.closest('.s-slide-image');
                //마지막 인덱스에 도달했을때 위치 고정
                  if (this.activeIndex === lastSlideIndex) {
                      const WrapperRect =  this.slides[lastSlideIndex].getBoundingClientRect();
                      const paddingRight = parseFloat(window.getComputedStyle(wrapper).paddingRight);
                      const computedStyle = window.getComputedStyle(this.slides[lastSlideIndex]);
                      const marginLeft = parseFloat(computedStyle.marginLeft);
                      var translateX = totalWidth - WrapperRect.width + (marginLeft * 2 * totalSlide) - paddingRight;
                      this.slides[lastSlideIndex].parentElement.style.transform  = `translate3d(${-translateX}px, 0, 0)`;
                    }
              //   }, */

            },
          });
          boxImgSwiperArray.push(boxImgSwiper);
        }
      })
    },
    imgSwiper : function(){
      var imgSwiperArray = [];
      function ctrlPostionReset( $imgSwiperContainer ){
        var $slideImg = $imgSwiperContainer.find('.swiper-slide-active').find('.s-slide__img');
        var imgHeight = $slideImg.height();
        var $btns = $imgSwiperContainer.find('.s-slide-btn');
        var $page = $imgSwiperContainer.find('.swiper-pagination');
        var btnHeight = $btns.height() / 2;
        var pagePostion = imgHeight - 40;
        $btns.css({
          'top': (imgHeight / 2) - btnHeight,
        });
        setTimeout(function(){
          pagePostion = imgHeight - $page.height() - parseInt($page.css('right'));
          $page.css({
            'top': pagePostion
          });
        }, 100)
      }

      $('.s-slide-fraction .s-slide-image.swiper').each(function (idx) {
        var $this = $(this);
        var $imgSwiperContainer =  $this;

        if( $this.find( '.swiper-slide' ).length > 0) {
          $this.addClass('img-swiper-0' + idx);

          $imgSwiperContainer.addClass('swiper-active');

          var imgSwiper = new Swiper('.img-swiper-0' + idx, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: true,
            pagination: {
              el: '.s-slide-image.img-swiper-0' + idx + ' .swiper-pagination',
              type: 'fraction',
            },
            navigation: {
              nextEl: '.s-slide-image.img-swiper-0' + idx + ' .swiper-button-next',
              prevEl: '.s-slide-image.img-swiper-0' + idx + ' .swiper-button-prev',
            },
            a11y: {
              prevSlideMessage: '이전 상세 이미지',
              nextSlideMessage: '다음 상세 이미지',
            },
            observer: true,
            observeParents: true,
            slideVisibleClass: 'swiper-slide-visible',
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            resizeObserver:true,
            on: {
              init: function () {
                var sw = this;
                setTimeout(function(){
                  $imgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                  UI.swiperChangeEv(sw);
                }, 300);

                ctrlPostionReset( $imgSwiperContainer );
              },
              reachBeginning: function(){
                if (document.activeElement == $imgSwiperContainer.find('.swiper-button-prev')[0]) {
                  setTimeout(function(){
                    $imgSwiperContainer.find('.swiper-button-next').focus();
                    $imgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                  }, 300)
                } else {
                  $imgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                }
              },
              reachEnd: function(){
                if (document.activeElement == $imgSwiperContainer.find('.swiper-button-next')[0]) {
                  $imgSwiperContainer.find('.swiper-button-prev').focus();
                  setTimeout(function(){
                    $imgSwiperContainer.find('.swiper-button-prev').focus();
                    $imgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                  }, 300)
                } else {
                  $imgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                }
              },
              beforeSlideChangeStart: function(){
                $imgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                $imgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
              },
              transitionEnd: function(){
                UI.swiperChangeEv(this);
                if (this.isBeginning) {
                  $imgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                  $imgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                } else if (this.isEnd) {
                  $imgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                  $imgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                } else {
                  $imgSwiperContainer.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                  $imgSwiperContainer.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                }

                ctrlPostionReset( $imgSwiperContainer );
              },
              resize : function(){
                ctrlPostionReset( $imgSwiperContainer );
              }
            },
          });

          imgSwiperArray.push(imgSwiper);
        }
      })
    },
    tagSwiper : function(){
      $('.tag-list-wrap').each(function (idx) {
        var $this = $(this);
        if (!$this.hasClass('swiper-active')) {
            $this.find('.swiper').addClass('tag-swiper-0' + idx);
            if ($this.find('.tag-item').length > 1) {
                $this.addClass('swiper-active');
                $this.append('<button type="button" class="tag-swiper-btn swiper-button-prev tag-swiper-btn-0' + idx + '" tabindex="0" role="button" aria-label="prev">');
                $this.append('<button type="button" class="tag-swiper-btn swiper-button-next tag-swiper-btn-0' + idx + '" tabindex="0" role="button" aria-label="next">');

                var tagSwiper = new Swiper('.tag-swiper-0' + idx, {
                  slidesPerView: 'auto',
                  navigation: {
                    nextEl: '.swiper-button-next.tag-swiper-btn-0' + idx,
                    prevEl: '.swiper-button-prev.tag-swiper-btn-0' + idx,
                  },
                  a11y: {
                    prevSlideMessage: '이전 태그 슬라이드',
                    nextSlideMessage: '다음 태그 슬라이드',
                  },
                  pagination: {
                    el: '.tag-slide-indicator.tag-swiper-indi-0' + idx,
                    type: 'bullets',
                  },
                  slideVisibleClass: 'swiper-slide-visible',
                  watchSlidesProgress: true,
                  watchSlidesVisibility: true,
                  on: {
                    init: function () {
                      var sw = this;
                      setTimeout(function(){
                        $this.find('.swiper-button-prev').attr('tabindex', '-1');
                        $this.find('.swiper-button-prev').attr('aria-hidden', true);
                        UI.swiperChangeEv(sw);
                      }, 300);
                    },
                    reachBeginning: function(){
                      if (document.activeElement == $this.find('.swiper-button-prev')[0]) {
                        setTimeout(function(){
                          $this.find('.swiper-button-next').focus();
                          $this.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }, 300)
                      } else {
                        $this.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                      }
                    },
                    reachEnd: function(){
                      var _self = this;
                      if (document.activeElement == $this.find('.swiper-button-next')[0]) {
                        $this.find('.swiper-button-prev').focus();
                        setTimeout(function(){
                          $this.find('.swiper-button-prev').focus();
                          $this.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        }, 300)
                      } else {
                        $this.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                      }

                      setTimeout(function(){
                        UI.swiperChangeEv(_self);
                      }, 500);
                    },
                    beforeSlideChangeStart: function(){
                      $this.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                      $this.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                    },
                    transitionEnd: function(){
                      UI.swiperChangeEv(this);
                      if (this.isBeginning) {
                        $this.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                        $this.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                      } else if (this.isEnd) {
                        $this.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        $this.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
                      } else {
                        $this.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                        $this.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
                      }
                    },
                  },
                });
              }
        }
        // 이하 원래 코드
//          $this.find('.swiper').addClass('tag-swiper-0' + idx);

          // if ($this.hasClass('card-full')) {
          //   $this.find('.swiper').append('<div class="swiper-pagination tag-slide-indicator tag-swiper-indi-0' + idx + '" aria-label="slide'+idx+'">');
          // }

//        if ($this.find('.tag-item').length > 1) {
//          $this.addClass('swiper-active');
//          $this.append('<button type="button" class="tag-swiper-btn swiper-button-prev tag-swiper-btn-0' + idx + '" tabindex="0" role="button" aria-label="prev">');
//          $this.append('<button type="button" class="tag-swiper-btn swiper-button-next tag-swiper-btn-0' + idx + '" tabindex="0" role="button" aria-label="next">');
//
//          var tagSwiper = new Swiper('.tag-swiper-0' + idx, {
//            slidesPerView: 'auto',
//            navigation: {
//              nextEl: '.swiper-button-next.tag-swiper-btn-0' + idx,
//              prevEl: '.swiper-button-prev.tag-swiper-btn-0' + idx,
//            },
//            a11y: {
//              prevSlideMessage: '이전 태그 슬라이드',
//              nextSlideMessage: '다음 태그 슬라이드',
//            },
//            pagination: {
//              el: '.tag-slide-indicator.tag-swiper-indi-0' + idx,
//              type: 'bullets',
//            },
//            slideVisibleClass: 'swiper-slide-visible',
//            watchSlidesProgress: true,
//            watchSlidesVisibility: true,
//            on: {
//              init: function () {
//                var sw = this;
//                setTimeout(function(){
//                  $this.find('.swiper-button-prev').attr('tabindex', '-1');
//                  $this.find('.swiper-button-prev').attr('aria-hidden', true);
//                  UI.swiperChangeEv(sw);
//                }, 300);
//              },
//              reachBeginning: function(){
//                if (document.activeElement == $this.find('.swiper-button-prev')[0]) {
//                  setTimeout(function(){
//                    $this.find('.swiper-button-next').focus();
//                    $this.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                  }, 300)
//                } else {
//                  $this.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                }
//              },
//              reachEnd: function(){
//                var _self = this;
//                if (document.activeElement == $this.find('.swiper-button-next')[0]) {
//                  $this.find('.swiper-button-prev').focus();
//                  setTimeout(function(){
//                    $this.find('.swiper-button-prev').focus();
//                    $this.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                  }, 300)
//                } else {
//                  $this.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                }
//
//                setTimeout(function(){
//                  UI.swiperChangeEv(_self);
//                }, 500);
//              },
//              beforeSlideChangeStart: function(){
//                $this.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                $this.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//              },
//              transitionEnd: function(){
//                UI.swiperChangeEv(this);
//                if (this.isBeginning) {
//                  $this.find('.swiper-button-prev').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                  $this.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                } else if (this.isEnd) {
//                  $this.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                  $this.find('.swiper-button-next').attr({'tabindex' : '-1'} , {'aria-hidden' : true});
//                } else {
//                  $this.find('.swiper-button-prev').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                  $this.find('.swiper-button-next').attr({'tabindex' : '0' } , {'aria-hidden' : false});
//                }
//              },
//            },
//          });
//        }
      })
    },

    hashtagSwiper : function(){
      $('.hashtag-list-wrap').each(function (idx) {
        var $this = $(this);
        if (!$this.hasClass('swiper-active')) {
          $this.find('.swiper').addClass('hashtag-swiper-0' + idx);
          if ($this.find('.hashtag-item').length > 1) {
    
            var hashtagSwiper = new Swiper('.hashtag-swiper-0' + idx, {
            slidesPerView: 'auto',
            observer: true,
            observeParents: true,
            slideVisibleClass: 'swiper-slide-visible',
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            a11y: {
              prevSlideMessage: '이전 컨텐츠',
              nextSlideMessage: '다음 컨텐츠',
              },
            });
          }
        }
      })
    },

    totalSearch : {
      keywordSwiper : null,
      hmgSnippetSwiper : null,
      init: function(){
        this.keywordSlide();
        this.hmgSnippetSlide();
      },
      keywordSlide: function(){
        var winW = window.innerWidth;

        if ($('.keyword__block').length) {
          if (winW <= 720 && this.keywordSwiper == null) {
            this.keywordSwiper = new Swiper('.keyword__block.swiper', {
              slidesPerView: "auto",
              observer: true,
            });
            this.focusEvent();
          } else if (winW > 720 && this.keywordSwiper != null) {
            this.keywordSwiper.destroy();
            this.keywordSwiper = null;
            $('.keyword__list.swiper-wrapper').removeAttr('style');
            $('.keyword__item.swiper-slide').removeAttr('style');
          }
        }
      },
      hmgSnippetSlide: function(){
          /* s:240618 add */
          if ($('.snippet').length) {
            if (this.hmgSnippetSwiper == null) {
              this.hmgSnippetSwiper = new Swiper(".snippet.swiper", {
                slidesPerView: 'auto',
                spaceBetween: 24,
                pagination: {
                  el: ".swiper-pagination",
                },
                scrollbar: {
                  el: ".swiper-scrollbar",
                },
                slideVisibleClass: 'swiper-slide-visible',
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                observer: true,
                observeParents: true,
                breakpoints: {
                  899: {
                    spaceBetween: 8,
                  },
                },
              });
            } else if (this.hmgSnippetSwiper != null) {
              this.hmgSnippetSwiper.destroy();
              this.hmgSnippetSwiper = null;
              $('.snippet__list.swiper-wrapper').removeAttr('style');
              $('.snippet__list.swiper-wrapper').removeAttr('style');
            }
          }  
          /* e:240618 add */
      },
      resize: function(){
        this.keywordSlide();
      },
      focusEvent : function () {
        $('.keyword__block.swiper').find('a').on('focus', function(e){
          var focusIdx = $(e.target).closest('.swiper-slide').index();
          UI.totalSearch.keywordSwiper.slideTo( focusIdx , 0);
        });
      }
    },
    swiperChangeEv : function(sw){
      var slideSize = sw.slides[0].getBoundingClientRect().width;

      function getTranslateXY(el) {
        var style = window.getComputedStyle(el)
        var matrix = style.transform || style.webkitTransform || style.mozTransform;
        var matrixType = matrix.indexOf('3d') >=0 ? '3d' : '2d';
        var matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
        // var matrix = new DOMMatrixReadOnly(style.transform);

        if (matrixType === '2d') {
          return {
            translateX: matrixValues[4],
            translateY: matrixValues[5],
          }
        }

        if (matrixType === '3d') {
          return {
            translateX: matrixValues[12],
            translateY: matrixValues[13],
          }
        }
      }

      var wrapTransitionX = getTranslateXY(sw.$wrapperEl[0]).translateX;
      var prevSlideLength = Math.floor(Math.abs(wrapTransitionX) / slideSize);
      var swSlide;
      var $swSlide;

      $(sw.$wrapperEl).find('.swiper-slide').attr('aria-hidden', true).attr('tabindex', '-1')
      $(sw.$wrapperEl).find('.swiper-slide').find('a, button').attr('tabindex', '-1');

      //console.log('wrapTransitionX:' + wrapTransitionX +'// prevSlideLength: ' + prevSlideLength + '// sw.isEnd: ' + sw.isEnd);

      if (sw.params.slidesPerGroup > 1) {
        //console.log('move multiple item');
        for(i = 0; i < sw.params.slidesPerGroup; i++) {
          swSlide  = $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength+i)[0];
          $swSlide = $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength+i);

          if( swSlide != undefined){
            swSlide.removeAttribute('aria-hidden');
          }

          if( $swSlide != undefined){
            $swSlide.removeAttr('tabindex');
          }

          if( $swSlide.find('a, button') != undefined){
            $swSlide.find('a, button').removeAttr('tabindex');
          }
        }
      } else {
        if (sw.params.slidesPerView == 1) {
          console.log('move one item, set one item, show one item');
          $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength)[0].removeAttribute('aria-hidden');
          $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength).removeAttr('tabindex');
          $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength).find('a, button').removeAttr('tabindex');
        } else {
          var perViewCalc = Math.floor(sw.width / slideSize);
          // console.log('perViewCalc :'+perViewCalc + '// prevSlideLength :' + prevSlideLength)

          if (perViewCalc >= 2) {
            console.log('move one item, set auto item, show multiple item');
         // s: 231208 add tag-list case
            if (perViewCalc == 5 ){
              prevSlideLength = prevSlideLength;
              for(i = 0; i < perViewCalc; i++) {
                $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength+i)[0].removeAttribute('aria-hidden');
                $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength+i).removeAttr('tabindex');
                $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength+i).find('a, button').removeAttr('tabindex');
              }
              return
            }
            // e: 231208 add tag-list case
            if(sw.isEnd) {
              prevSlideLength = prevSlideLength + 1;
            }

            for(i = 0; i < perViewCalc; i++) {
              $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength+i)[0].removeAttribute('aria-hidden');
              $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength+i).removeAttr('tabindex');
              $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength+i).find('a, button').removeAttr('tabindex');
            }
          } else {
            console.log('move one item, set auto item, show one item');
            $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength)[0].removeAttribute('aria-hidden');
            $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength).removeAttr('tabindex');
            $(sw.$wrapperEl).find('.swiper-slide').eq(prevSlideLength).find('a, button').removeAttr('tabindex');
          }
        }
      }
    },
    filter : {
      el : {
        filterOpen : '.search-box__filter',
        filterClose : '.filter-close',
        filterClear : '.search-box__delete',
        filterInput : '.search-box__input',
        filterAcc   : '.c-listopen__btn',
      },
      active: function(e){
        var $this = $(e.currentTarget);
        var layerOpenCheck = 'is-layer-open';
        var $filterWrap = $this.closest('.filter-wrap');

        if ($filterWrap.hasClass('is-open')) {
          $filterWrap.removeClass('is-open');
          $filterWrap.find('.filter-section').hide();
          $('body').removeClass(layerOpenCheck);
          UI.removeFocusLoop();
          UI.removeAriaHidden();
          // if ($this.closest('.search-wrap').length > 0) {
            //   $this.closest('.search-wrap').css('z-index', '');
            // }
        } else {
          $filterWrap.addClass('is-open');
          $('body').addClass(layerOpenCheck);
          $filterWrap.find('.filter-section').show();
          UI.setFocusLoop($filterWrap.find('.filter-section'));
          UI.setAriaHidden($filterWrap.find('.filter-section')[0]);
        // if ($this.closest('.search-wrap').length > 0) {
        //   $this.closest('.search-wrap').css('z-index', '105');
        // }

          var $openList = $filterWrap.find('.filter-group.c-listopen');

          if( $openList.length ) {
            $openList.each(function(idx){
              if( $(this).hasClass('is-open') ){
                $(this).find(UI.filter.el.filterAcc).find('.ir').text('목록 닫기');
              }else {
                $(this).find(UI.filter.el.filterAcc).find('.ir').text('목록 열기');
              }
            });
          }

        }
        // autoComplete hide
        $('.search-box-recent').removeClass('is--open');
      },
      clear: function(e){
        var $this = $(e.currentTarget);
        var $inputWrap = $this.closest('.search-box');
        var $input = $inputWrap.find('.search-box__input');
        $input.val('');
        $input.focus();
        $this.hide();
      },
      inputActive: function(e){
        var $input = $(e.target);
        if ($input.val != '') {
          $input.closest('.search-box').find('.search-box__delete').show();
        } else {
          $input.closest('.search-box').find('.search-box__delete').hide();
        }
      },
      filterGroup : function(e){
        var $this = $(e.currentTarget);
        var $filterGroup = $this.closest('.filter-group');
        if ($filterGroup.hasClass('is-open')) {
          $filterGroup.removeClass('is-open');
          $this.find('.ir').text('목록 열기');
        } else {
          $filterGroup.addClass('is-open');
          $this.find('.ir').text('목록 닫기');
        }
      },
      init : function(){
        $(this.el.filterOpen).off('click', this.active).on('click', this.active);
        $(this.el.filterClose).off('click', this.active).on('click', this.active);
        $(this.el.filterClear).off('click', this.clear).on('click', this.clear);
        $(this.el.filterAcc).off('click', this.filterGroup).on('click', this.filterGroup);
        $(this.el.filterInput).off('input', this.inputActive).on('input', this.inputActive);
      }
    },
    platLayer : function(){
      var platWrapper = '.c-platbox',
          platLayer = '.c-platbox-wrap',
          openName = 'is-open';

      $(platWrapper).find('.btn-oper, .btn-unit__download, .btn').on('click',function(e){
        var $thisWrapper = $(this).closest(platWrapper);

        $(platWrapper).each(function(i){
            if( $thisWrapper != $(this) ){
                $(this).removeClass(openName);
            }
        });

        $(document).on('click.download', function(e){
          var $target = $(e.target);

          if( $target.closest(platWrapper).length == 0 && !$target.hasClass('c-platbox')) {
            $(platWrapper).removeClass(openName);
            $(document).off('click.download');
          }
        });

        if ( $thisWrapper.find(platLayer).length ) {
          if ( $thisWrapper.hasClass(openName) ){
            $(platWrapper).removeClass(openName);
            $thisWrapper.removeClass(openName);
            $(document).off('click.download');
          }else {
            $thisWrapper.addClass(openName);
          }
          e.preventDefault();
        }

        $(platLayer).find('a').on('focusout',function(){
          var $thisWrapper = $(this).closest(platWrapper),
              totalLen  = $thisWrapper.find('li').length;

          if( $(this).closest('li').index() == totalLen - 1 ){
            $(platWrapper).removeClass(openName);
            $(document).off('click.download');
          }
        });

      });

      //download
      $('.c-platbox__link').on('click', function(e){
        var $this = $(this);
        if ( $this.find('.btn-icon__downall').length ){
          $this.closest(platWrapper).removeClass(openName);
        }
        e.preventDefault();
      })

    },

    filterfocusout : function(){
      document.addEventListener('focusin', searchFocus, false);
      function searchFocus() {
        $( ".swiper a, .swiper button, .swiper-slide a, .card-section a, .menu-wrap button, .header-wrap botton, .gnb__sub a, .gnb__sub li" ).on("focusin", function(){
          $('.search-box-recent').removeClass('is--open');
        })
      }
    },

    storyIndex : {
      selector: {
        stickyArea : '.component-anchor',
        indexList : '.s-anchor__list',
        isSticky : 'is-sticky',
        isActive : 'is-open',
        clickFlag : false,
        anchorIndex : [],
      },
      selectorRefresh : function(){
          this.selector.stickyArea = '.component-anchor',
          this.selector.indexList = '.s-anchor__list',
          this.selector.clickFlag = false,
          this.selector.anchorIndex = []
      },
      parallax : function(){
        // console.log('UI.userAgentCheck()', UI.userAgentCheck());
        if (UI.userAgentCheck()) {
          $('.component-parallax').addClass('parallax__mo');
        }
      },
      init : function(){
        this.parallax();
        var stickyArea = $(this.selector.stickyArea);
        var indexList = stickyArea.find(this.selector.indexList);
        var $indexActiveBtn = $('.btn-toggle');

        indexList.find('li').each(function(){
          UI.storyIndex.selector.anchorIndex.push($(this).find('a').attr('href'));
        });

        $indexActiveBtn.on('click', function(){
          stickyArea.toggleClass(UI.storyIndex.selector.isActive);
        });

        indexList.find('a').on('click', function(e) {
          var $this = $(this);
          var idx = $this.closest('li').index();
          var moveTarget = $(this).attr('href');

          var moveValue = $(moveTarget).offset().top;

          e.preventDefault();
          UI.storyIndex.selector.clickFlag = true;

          stickyArea.removeClass(UI.storyIndex.selector.isActive);

          indexList.find('li.on').removeClass('on');
          $this.closest('li').addClass('on');

          var addScrollTop = 0;

          if (UI.mobileCheck()) {
            $('.s-anchor__tit').text($this.text());
            addScrollTop = 20;
            if($('.component-anchor').hasClass('is-sticky')){
                if($(moveTarget).hasClass('component-sub')){
                    addScrollTop -= ($('.sticky-area').outerHeight(true)/3);
                }else{
                    addScrollTop -= $('.sticky-area').outerHeight(true);
                }
            }
          }else{
              if($('.shadow-box').offset().top == 100){
                  moveValue = moveValue - 80;
              }
          }

          $('html, body').stop().animate({
              scrollTop: (moveValue + indexList.height()) - $('.sticky-area').outerHeight(true) + addScrollTop,
          }, 500, function(){
            UI.storyIndex.selector.clickFlag = false;
          })
        });
    
        var recommendLy = '.component-recommend-ly',
            $recommendLy = $('.component-recommend-ly .tooltip-platbox');
        if($(recommendLy).length){          
            $recommendLy.css({'opacity':'0','display':'none'});
        }

      },
      scroll : function(nowT) {
        var stickyArea = $(this.selector.stickyArea);
        var indexList = stickyArea.find(this.selector.indexList);
        var calcT = $('.sticky-area').outerHeight(true);

        if( (calcT != null) && (indexList.find('li').length > 0) ){
          if (nowT >= stickyArea.offset().top + stickyArea.innerHeight() - 70) {
            if (!stickyArea.hasClass(UI.storyIndex.selector.isSticky)) {
              stickyArea.addClass(UI.storyIndex.selector.isSticky);
              stickyArea.css({
                'padding-top': calcT+'px',
              })
            }
          } else {
            stickyArea.css({
              'padding-top': '',
            });
            stickyArea.removeClass(UI.storyIndex.selector.isSticky);
            stickyArea.removeClass(UI.storyIndex.selector.isActive);
          }
        }

        var anchorArr = [];
        var anchorH = nowT + calcT;

        for (var i=0; i < this.selector.anchorIndex.length; i++) {
          var el = this.selector.anchorIndex[i];
          anchorArr[i] = $(el).offset().top;
          
          if (UI.storyIndex.selector.clickFlag == false) {

            for( j=0; j <anchorArr.length; j++ ){
              if(anchorArr[j+1] == 'undefined' || anchorArr[j+1] == undefined || anchorArr[j+1] == null){
                indexList.find('li').eq(anchorArr.length).addClass('on').siblings('li').removeClass('on');
              }else{
                if( anchorArr[j] <= anchorH && anchorArr[j+1] > anchorH) {
                  indexList.find('li').eq(j).addClass('on').siblings('li').removeClass('on');
                }
              }
              if(nowT < anchorArr[0]){
                  indexList.find('li').eq(0).addClass('on').siblings('li').removeClass('on');
              }
              
              if (UI.mobileCheck()) {
                $('.s-anchor__tit').text(indexList.find('li.on').text());
              }
            }
          }
        }
        
        var recommendLy = '.component-recommend-ly';
        if($(recommendLy).length){
          var historyEl = $('.hmg-story-container'),
              endEl = $('.share-group'),
              $recommendLy = $('.component-recommend-ly .tooltip-platbox');
              $(recommendLy).closest('.full-ly-wrap').addClass('has--recommend-ly');

          if (nowT > historyEl.offset().top + (historyEl.outerHeight() /2)) {
            if ($recommendLy.hasClass('is-open')) {
              $recommendLy.css({'opacity':'1','display':'block'});
            }
            if ($(window).innerHeight() + nowT >= endEl.offset().top) {

            }
          } else {
            $recommendLy.css({'opacity':'0','display':'none'}); 
          }
        }
      },
    },
    setCalendar : function(){
      var calendarInput = '.calendar__input';
      if( $(calendarInput).length) {
        $(calendarInput).datepicker({
          dateFormat: 'yy.mm.dd.',
          prevText: '이전 달',
          nextText: '다음 달',
          monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          dayNames: ['일', '월', '화', '수', '목', '금', '토'],
          dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
          dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
          showMonthAfterYear: true,
          buttonText: "선택",
          yearSuffix: '년',
          showOtherMonths: true,
          selectOtherMonths: true,
          changeYear: true,
          showButtonPanel: true,
          showOn: "button",
          buttonText: "달력 선택",
          // buttonImageOnly: true,
          beforeShow: function(){
            
            // 웹접근성 관련 
            setTimeout(function(){
                $('#ui-datepicker-div').attr('tabindex', '0');
                $('#ui-datepicker-div>div>a').attr('tabindex', '0');
                $('#ui-datepicker-div>div>a:first').focus();
            }, 100)
            
            //그룹방송 날짜 관련
            if(typeof setGroupBroadCalendarDay == 'function'){
                setTimeout(function(){
                    $(".ui-datepicker-calendar td").addClass('ui-state-disabled');
                    $(".ui-datepicker-calendar td").attr('tabindex', "-1");
                    $(".ui-datepicker-calendar td a").attr('tabindex', "-1");
                    for(var i=0; i<groupBroadDate.length; i++){
                        var broadDate = groupBroadDate[i];
                        var broadYear = broadDate.split('-')[0];
                        var broadMonth = Number(broadDate.split('-')[1]) - 1;
                        var broadDay = Number(broadDate.split('-')[2]);
                        $("td[data-year='"+broadYear+"'][data-month='"+broadMonth+"'] > a[data-date='"+broadDay+"']").parent('td').removeClass('ui-state-disabled');
                        $("td[data-year='"+broadYear+"'][data-month='"+broadMonth+"'] > a[data-date='"+broadDay+"']").attr('tabindex', '0');
                    }
                }, 100);
            }
   
            setTimeout(function(){
              if (GV_DEFAULT_LANGUAGE == 'KO') {
                  $('.ui-datepicker-year').attr('title', '연도').removeAttr('aria-label');
              } else {
                  $('.ui-datepicker-year').attr('title', 'year').removeAttr('aria-label');
              }
              
              if ($('.ui-datepicker-calendar').find('caption').length <= 0) {
                  $('.ui-datepicker-calendar').prepend('<caption>날짜선택</caption>')
              }
            }, 1000);
          },
          //그룹방송 날짜 관련
          onChangeMonthYear: function(year, month, inst) {
              if(typeof setGroupBroadCalendarDay == 'function'){
                  $(".ui-datepicker-calendar td").addClass('ui-state-disabled');
                  $(".ui-datepicker-calendar td").attr('tabindex', "-1");
                  $(".ui-datepicker-calendar td a").attr('tabindex', "-1");
                  
                  setTimeout(function(){
                      $(".ui-datepicker-calendar td").addClass('ui-state-disabled');
                      $(".ui-datepicker-calendar td").attr('tabindex', "-1");
                      $(".ui-datepicker-calendar td a").attr('tabindex', "-1");
                      for(var i=0; i<groupBroadDate.length; i++){
                          var broadDate = groupBroadDate[i];
                          var broadYear = broadDate.split('-')[0];
                          var broadMonth = Number(broadDate.split('-')[1]) - 1;
                          var broadDay = Number(broadDate.split('-')[2]);
                          $("td[data-year='"+broadYear+"'][data-month='"+broadMonth+"'] > a[data-date='"+broadDay+"']").parent('td').removeClass('ui-state-disabled');
                          $("td[data-year='"+broadYear+"'][data-month='"+broadMonth+"'] > a[data-date='"+broadDay+"']").attr('tabindex', '0');
                      }
                  }, 50);
                  
              }
          },
          // 웹접근성 관련 
          onClose : function(){
              closeCalendarFunc(this);
          },
        });
      }
      $('.btn-calendar').on('click', function(){
        var calMatch = $(this).siblings(calendarInput);
        calMatch.datepicker('show');
      });
    },
    setFocusLoop: function(activeEl){
      var firstEl = activeEl.find('a:visible, button:visible, input:visible, [role="button"]:visible')[0];
      firstEl.focus();
      $(window).on('keydown.focusEvent', function(e){
        var keyC = e.keyCode;
        var focusEl = document.activeElement;
        if(keyC == 9 && e.shiftKey == true && focusEl == activeEl.find('a:visible, button:visible, input:visible, [role="button"]:visible')[0]) {
          e.preventDefault();
          activeEl.find('a:visible, button:visible, input:visible, [role="button"]:visible')[activeEl.find('a:visible, button:visible, input:visible, [role="button"]:visible').length-1].focus();
        };
        if(keyC == 9 && e.shiftKey == false && focusEl == activeEl.find('a:visible, button:visible, input:visible, [role="button"]:visible')[activeEl.find('a:visible, button:visible, input:visible, [role="button"]:visible').length-1]) {
          e.preventDefault();
          activeEl.find('a:visible, button:visible, input:visible, [role="button"]:visible')[0].focus();
        }
      });
    },
    removeFocusLoop: function(){
      $(window).off('keydown.focusEvent');
    },
    setAriaHidden: function(activeEl) {
      do {
        for (var b = activeEl.parentElement.childNodes, c = 0; c < b.length; c++)
          1 === b[c].nodeType && b[c] !== activeEl && "SCRIPT" !== b[c].tagName.toUpperCase() && "STYLE" !== b[c].tagName.toUpperCase() && (b[c].setAttribute("data-aria-hidden", b[c].getAttribute("aria-hidden") || "null"),
          b[c].setAttribute("aria-hidden", "true"));
          activeEl = activeEl.parentElement;
      } while (activeEl !== document.body)
    },
    removeAriaHidden: function() {
      for (var a = document.querySelectorAll("[data-aria-hidden]"), b = 0; b < a.length; b++) {
        var c = a[b].getAttribute("data-aria-hidden");
        "null" === c ? a[b].removeAttribute("aria-hidden") : a[b].setAttribute("aria-hidden", c);
        a[b].removeAttribute("data-aria-hidden")
      }
    },
    tooltip: function(){
      $('.s-cont__txt .tooltip-platbox__text').on('focus mouseenter', function(e){
        var tooltipWrap = $(e.currentTarget).closest('.tooltip-platbox');
        var left = $(e.currentTarget)[0].getBoundingClientRect().left;
        var width = parseInt(tooltipWrap.find('.tooltip-wrap').css('width'), 10);
        $(e.currentTarget).addClass('active');

        boxPosition(tooltipWrap.find('.tooltip-wrap'), left, width);
        tooltipWrap.addClass('is-open');

        e.preventDefault();
      });

      $('.s-cont__txt .tooltip-platbox__text').on('blur mouseleave', function(e){
        var tooltipWrap = $(e.currentTarget).closest('.tooltip-platbox');
        $(e.currentTarget).removeClass('active');

        setTimeout(function(){
          if (!tooltipWrap.find('.tooltip-wrap').hasClass('active')) {
            tooltipWrap.removeClass('is-open');
            tooltipWrap.find('.tooltip-wrap').css('margin-left', '').hide();
          }
        }, 300);
      })

      $('.s-cont__txt .tooltip-wrap').on('mouseenter', function(e){
        $(e.currentTarget).addClass('active');
      })

      $('.s-cont__txt .tooltip-wrap').on('mouseleave', function(e){
        var tooltipWrap = $(e.currentTarget).closest('.tooltip-platbox');
        $(e.currentTarget).removeClass('active');

        setTimeout(function(){
          if (!tooltipWrap.find('.tooltip-platbox__text').hasClass('active')) {
            tooltipWrap.removeClass('is-open');
            tooltipWrap.find('.tooltip-wrap').css('margin-left', '').hide();
          }
        }, 300);
      });

      $('.s-cont__txt .tooltip__more').on('focus', function(e){
        $(e.currentTarget).closest('.tooltip-wrap').addClass('active');
      });

      $('.s-cont__txt .tooltip__more').on('blur', function(e){
        var tooltipWrap = $(e.currentTarget).closest('.tooltip-platbox');
        tooltipWrap.find('.tooltip-wrap').removeClass('active');

        setTimeout(function(){
          if (!tooltipWrap.find('.tooltip-platbox__text').hasClass('active')) {
            tooltipWrap.removeClass('is-open');
            tooltipWrap.find('.tooltip-wrap').css('margin-left', '').hide();
          }
        }, 300);
      });

      function boxPosition(box, left, width) {
        if (left + width > $(window).innerWidth()) {
          var calcSize = left + width - $(window).innerWidth();

          box.css({'margin-left': '-' + (calcSize+10) + 'px'}).show();
        } else {
          box.show();
        }
      }
    },
    fullTypeLayer : {
      layout: '[data-layout]',
      endCheck: 'scroll-complete',
      endPoint : '.share-group',
      endStartTime : null,
      calcNum: null,
      init: function(){
        // this.scroll();
        console.log('UI.userAgentCheck()', UI.userAgentCheck());
        if( ! UI.userAgentCheck() ){
          $('html').addClass('device-pc');
        }
      },
      scroll: function(scrollT){

        $(this.layout).each(function(idx, el){
          var layoutType = $(el).attr('data-layout');
          var layoutCont = $('[data-role="'+ layoutType +'-container"]');
          var layoutInner = $('[data-role="'+ layoutType +'-inner"]');
          var winWith = $(window).innerWidth();

          UI.fullTypeLayer.endPoint = '.shadow-box';
          UI.fullTypeLayer.calcNum = 60;
          UI.fullTypeLayer.startNum = 5;

          if ( winWith >= 900 ){
            if (layoutType == 'scale') {
              var defaultW;
              var afterW;
              if ( winWith == 1400 ) {
                defaultW = '1240px';
                afterW = '100%';
              } else if ( winWith > 1400 ) {
                defaultW =  winWith - 160 + 'px';
                // console.log(defaultW);
                afterW = '100%';
              } else if ( winWith > 899 &&  winWith <= 1399 ) {
                defaultW = '88.57143vw';
                afterW = '100vw'
              } else {
                defaultW = '100%';
                afterW = '100%'
              }
  
              var pointTop = layoutCont.offset().top;
              var pointEnd = $(UI.fullTypeLayer.endPoint).innerHeight();

              if (scrollT > pointTop) {
                if ((pointEnd - $(window).innerHeight() + UI.fullTypeLayer.calcNum  > scrollT) && (scrollT > UI.fullTypeLayer.startNum)) {
                  if (!layoutInner.hasClass('type-full')) {
                    layoutInner.addClass('type-full');
                    layoutInner.stop().animate({
                      'width': afterW,
                      'box-shadow': 'none'
                    }, 500);
                  }
                } else {
                  if (layoutInner.hasClass('type-full')) {
                    layoutInner.removeClass('type-full');
                    layoutInner.stop().animate({
                      'width': defaultW,
                      'box-shadow': '0 0 40px 0 rgba(0, 0, 0, .5);'
                    }, 500)
                  }
                }
              } else if (scrollT <= UI.fullTypeLayer.startNum) {
                if (layoutInner.hasClass('type-full')) {
                  layoutInner.removeClass('type-full');
                  layoutInner.stop().animate({
                    'width': defaultW,
                    'box-shadow': '0 0 40px 0 rgba(0, 0, 0, .5);'
                  }, 500)
                }
              } 
            }
          } else {
            layoutInner.css({'width':'100%', 
              'box-shadow': '0 0 40px 0 rgba(0, 0, 0, .5);'
            });
          }
        });
      }
    },
    scroll : function(scollT){
      UI.menuTab.stickyTab(scollT);
      if ($('.component-anchor').length) {
        UI.storyIndex.scroll(scollT)
      }
      if($('[data-layout]').length) {
        this.fullTypeLayer.scroll(scollT);
      }
    },
    resize : function(scrollT, winW, winH){
      if ( (this.mobileCheck() == false) && (this.pcFlag == false) ) { //처음 mo -> pc
        this.pcFlag = true;
        this.moFlag = false;
        this.gnb.resize(this.mobileCheck());
        this.billboardSlide.resize();
        this.totalSearch.resize();
        this.menuTabSlide.resize();
      }
      if ( (this.mobileCheck() == true) && (this.moFlag == false) ) { //처음 pc -> mo
        this.pcFlag = false;
        this.moFlag = true;
        this.gnb.resize(this.mobileCheck());
        this.billboardSlide.resize();
        this.totalSearch.resize();
        this.menuTabSlide.resize();
      }
      this.fullTypeLayer.scroll();
      this.menuTab.stickyTab(scrollT);
    },
    init : function () {
      var _scrollTop = $(window).scrollTop();
      this.gnb.init();
      this.footer();
      this.menuTabSlide.init();
      this.billboardSlide.init();
      // this.menuTab.stickyTab( _scrollTop );
      this.goTop();
      //this.mainVisualSwiper();
      this.cardSwiper();
      this.actSwiper();
      this.boxSwiper();
      this.boxImgSwiper();
      this.imgSwiper();
      this.tagSwiper();
      this.hashtagSwiper(); //230412 add
      this.totalSearch.init();
      this.filter.init();
      this.platLayer();
      this.filterfocusout(); //231208 add
      this.storyIndex.init();
      this.tooltip();
      this.setCalendar();

      if($('[data-layout]').length) {
        this.fullTypeLayer.init();
        this.fullTypeLayer.scroll(_scrollTop);
      }
    },
  }

  $(window).on('scroll', function(){
    var _scrollTop = $(this).scrollTop();
    UI.scroll(_scrollTop);
  });

  $(window).on('load', function () {
    UI.init();
    new blurify({
      images: document.querySelectorAll('.blurify'),
      blur: 6,
      mode: 'auto',
    });
    if (UI.mobileCheck() == true) {
      UI.pcFlag = false;
      UI.moFlag = true;
    } else {
      UI.pcFlag = true;
      UI.moFlag = false;
    }
  });

  $(window).on('resize', function () {
    var _scrollTop = $(this).scrollTop(),
        _winWidth = $(this).innerWidth(),
        _winHeight = $(this).innerHeight();

    UI.resize(_scrollTop, _winWidth, _winHeight);
  });

  window.hdgUI = UI;
})(window, document, jQuery);