/* ===============================================================

common scripts

=============================================================== */

  window.onunload = function(){};

  var g = {
    //isSp:function(){ return ( g.winW() <= g.point1 )? true : false ; },// SP or PC
    isTb:function(){ return ( g.winW() <= g.point )? true : false ; },// SP or PC
    winW:function(){ return $( window ).width(); },
    winH:function(){ return $( window ).height(); },
    winT:function(){ return $( window ).scrollTop(); },
    point: 768
  }

  var _ua = (function(u){
    return {
      Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
        || u.indexOf("ipad") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
        || u.indexOf("kindle") != -1
        || u.indexOf("silk") != -1
        || u.indexOf("playbook") != -1,
      Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
        || u.indexOf("iphone") != -1
        || u.indexOf("ipod") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
        || u.indexOf("blackberry") != -1
    }
  })(window.navigator.userAgent.toLowerCase());

  var Common = function(){};

  Common = {

    fadeAlpha : function(){

      $('.fadeAlpha').hover(function(){
        $(this).removeClass('out').addClass('over');
      },
      function(){
        $(this).removeClass('over').addClass('out');
      });

    },

    accordion : function(){

      $('.accordion').find('dt').not('.other').on("click", function() {
          $(this).next('dd').slideToggle()
            .siblings('dd:visible').slideUp()
              .prev('dt').removeClass('active');

          $(this).parent().toggleClass('active');

        // if($(this).hasClass('active')){
        //   var on = $(this).find('img').attr('src').replace('_off','_on');
        //   $(this).find('img').attr('src', on);
        // }else{
        //   var off = $(this).find('img').attr('src').replace('_on','_off');
        //   $(this).find('img').attr('src', off);
        // }
      });

    },

    tab : function(){

      var $tab = $('div.inner');
      var $nav = $tab.find('.tabNav a');
      var $tabBody = $tab.find('.tabBody');

      $tabBody.not(':first').hide();
      $nav.eq(0).parent().addClass('active');

      $nav.click(function(){
        var $this = $(this);
        var targetTabId = $this.attr('href');

        $nav.parent().removeClass('active');
        $tabBody.hide();
        $this.parent().addClass('active');
        $(targetTabId).show();

        return false;
      });

    },

    smoothScroll : function(){

      $('a[href^="#"]').not('a[href^="#tab"], a[href^="#modal"]').click(function() {
        $('html,body').animate({ scrollTop:
          $($(this).attr('href')).offset().top }, 'slow','swing');
          return false;
        });

    },

    currentNav : function(){

      var url = window.location.pathname;

      $('.nav.pg li a[href="'+url+'"]').parent().addClass('current');

      var url = url.replace(/\w*\.html$/,'');
      $('.nav.dr li a[href="'+url+'"]').parent().addClass('current');

      if ( $('.nrp li.current').size() > 0 ) {
        var $crimg = $('li.current').find("img[src*='_off']");
        $crimg.attr('src', $crimg.attr("src").replace(/_off/,'_on'));
      }

      /* CURRENT画像置換
      $('.nrp li').each(function(){

        var off = $(this).find('img').attr('src'),
             on = off.replace(/_off/, '_on');

       if ( $(this).hasClass('current') ) {
         $(this).find('img').attr('src', on);
       }

      });
      */

    },

    rollover : function(){

      $("img[src*='_on']").parents('li').addClass("current");

      $("img,input[type='image']").hover(function(){
        if ($(this).attr("src")){
          $(this).attr("src",$(this).attr("src").replace("_off.", "_on."));
        }
      },function(){
        if ($(this).attr("src") && !$(this).parents('li').hasClass("current") ){
          $(this).attr("src",$(this).attr("src").replace("_on.", "_off."));
        }
      });

    },

    selectBox : function(){

      $('.selectBox').find('select').change(function(){

        $(this).addClass('selected');

      });

    },

    modal : function(){

    	$.preloadImages = function(){
    		for(var i = 0; i<arguments.length; i++){
    			$('<img>').attr('src', arguments[i]);
    		}
    	};
    	$.preloadImages('/common/images/common/password_area_01.png', '/common/images/common/password_area_02.png', '/common/images/common/password_area_03.png', '/common/images/common/password_area_04.png');

      var $pwdInput = $('.password')
      var max = $pwdInput.attr('maxlength');
      $('#dialog').find('span.btn').click(function(){

        var txtLength  = $pwdInput.val().length;

        if ( txtLength < 4 ) {
          $('.pwdWrap').attr('data-length', txtLength);

          var val1 = $(this).text();
          var val2 = $pwdInput.val();
          var pwd = val2 + val1;
          $pwdInput.val(pwd);
        }

      });

      var $ready = $('[data-remodal-id=ready]');

      if ( $ready.size() >= 1 ){

        var inst = $.remodal.lookup[$ready.data('remodal')];
        inst.open();

      }

    },

    resizeFnc : function(){

      //resizeFlag
      if ( g.isSp() ) {
        $('body').removeClass('pcview').addClass('spview');
      } else {
        $('body').removeClass('spview').addClass('pcview');
      }

      //SP Image changer
      if ( g.isTb() ) {

        var before = /sp_/,
            after = 'tb_';

        replaceImg();

      } else {

        var before = /sp_/,
            after = 'tb_';

        replaceImg();

      }

      function replaceImg(){
        $('img[src*=sp_],img[src*=tb_]').each(function(){
          var tbImg = $(this).attr('src').replace(before, after);
          if( $(this).attr('src').match(before) ) {
            $(this).attr('src', tbImg);
          }
        });
      }

    },

    share : function(){

      var shareTitle = encodeURI($('title').html());
      var shareUrl = encodeURI(document.URL);
      var shareUrlComponent = encodeURIComponent(document.URL);
      $('.twitterShare a').attr("href", "http://twitter.com/share?url="+ shareUrl + "&text=" + shareTitle);
      $('.facebookShare a').attr("href", "http://www.facebook.com/sharer.php?u="+ shareUrl +"&t=" + shareTitle);
      $('.googleShare a').attr("href", "https://plus.google.com/share?url=" + shareUrl);
      $('.tumblrShare a').attr("href", "http://www.tumblr.com/share/link?&url=" + shareUrlComponent + "&name=" + shareTitle);
      $('.pinterestShare a').attr("href", " http://pinterest.com/pin/create/button/?url=" + shareUrl + "&media=画像URL" + shareTitle );
      $('.linkedinShare a').attr("href", "http://www.linkedin.com/shareArticle?mini=true&url=" + shareUrl + "&title=" + shareTitle);
      $('.lineShare a').attr("href", "http://line.me/R/msg/text/?" + shareTitle + shareUrl);
      $(".share a").click(function(){
        window.open(this.href, "social_window","width=600,height=600,resizable=yes,scrollbars=yes,toolbar=yes");
        return false;
      });

      //FaceBook Like button
      $('body').prepend('<div id="fb-root"></div>');
      $('.fbLike').prepend('<div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="75" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>');

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.6&appId=1482213392083332";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

    },

    uaFnc : function(){

      function androidSversion() {
        var ua = navigator.userAgent;
        if( ua.indexOf("Android") > 0 ){
          var androidversion =      parseFloat(ua.slice(ua.indexOf("Android")+8));
          return androidversion;
        }
      }

      if(androidSversion() <= 4.4){
       $('html').addClass(' android');
      }

      // if( _ua.Mobile || _ua.Tablet ){
      //   //スマホ OR タブレットの場合
      // }

    },

    headerPd : function(){

      $('header').parents('body').addClass('headerPadding');

    },

  }

  $(function() {

    Common.smoothScroll();
    Common.accordion();
    Common.tab();
    //Common.currentNav();
    //Common.rollover();
    Common.selectBox();
    Common.modal();
    Common.share();
    Common.uaFnc();
    Common.headerPd();

    $(window).on('load resize', function(){

      //Common.resizeFnc();

    });

});


// placeholder
$(function(){
    $(window).load(function(){
        $('.place').each(function(){
            var thisTitle = $(this).attr('title');
            if(!(thisTitle === '')){
                $(this).wrapAll('<span style="text-align:left;position:relative;"></span>');
                $(this).parent('span').append('<span class="placeholder">' + thisTitle + '</span>');
                $('.placeholder').css({
                    top:'5%',
                    left:'5px',
                    fontSize:'100%',
                    lineHeight:'120%',
                    textAlign:'left',
                    color:'#A9A9A9',
                    overflow:'hidden',
                    position:'absolute',
                    zIndex:'99'
                }).click(function(){
                    $(this).prev().focus();
                });

                $(this).focus(function(){
                    $(this).next('span').css({display:'none'});
                });

                $(this).blur(function(){
                    var thisVal = $(this).val();
                    if(thisVal === ''){
                        $(this).next('span').css({display:'inline-block'});
                    } else {
                        $(this).next('span').css({display:'none'});
                    }
                });

                var thisVal = $(this).val();
                if(thisVal === ''){
                    $(this).next('span').css({display:'inline-block'});
                } else {
                    $(this).next('span').css({display:'none'});
                }
            }
        });
    });
});
