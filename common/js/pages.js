/* ===============================================================

pages scripts

=============================================================== */

  window.onunload = function(){};

  var Pages = function(){};

  Pages = {

     owlCarousel : function(){

       //slider
       var $slider = $('.slider');
       if ( $slider.hasClass('centerMode') ){

         //slider centerMode
         $('.slider.centerMode').slick({
           centerMode: true,
           slidesToShow: 2,
           slidesToScroll: 1,
           responsive: [
             {
               breakpoint: g.point,
               settings: {
                 slidesToShow: 1,
                 slidesToScroll: 1
               }
             },
             {
               breakpoint: 426,
               settings: {
                 centerMode: false,
                 slidesToShow: 1,
                 slidesToScroll: 1,
               }
             }
           ]
         });

       } else if ( $slider.hasClass('dots') ){

         $slider.slick({
           dots: true,
           arrows: false,
           centerMode: false,
           slidesToShow: 1,
           slidesToScroll: 1
         });

       } else {

         $slider.slick({
           centerMode: false,
           slidesToShow: 1,
           slidesToScroll: 1
         });

       }


         $('.horizon-swiper').horizonSwiper({
           arrows: false
         });


      //  //carousel
      //  var $carousel = $('.carousel');
      //  var length = $carousel.find('li').size();
      //  function carousel() {
      //    $carousel.each(function(){
      //     if ( $(this).find('li').size() >= 4 ) {
      //       $(this).slick({
      //         slidesToShow: 6,
      //         slidesToScroll: 6,
      //         infinite: false,
      //         arrows: false,
      //         variableWidth: true,
      //         responsive: [
      //           {
      //             breakpoint: g.point,
      //             settings: {
      //               slidesToShow: 3,
      //               slidesToScroll: 3
      //             }
      //           }
      //         ]
      //       });
      //     }
      //    });
      //  }
       //
      //  $(window).on('load', carousel);
       //
      //  $carousel.on('setPosition', function(){
      //    $(this).find('.slick-slide').matchHeight();
      //  });
       //
      //  if ( _ua.Tablet ) {
       //
      //    $(window).on("load orientationchange resize",function(){
      //      if (Math.abs(window.orientation) === 90 && _ua.Tablet ) {
      //        $carousel.slick('unslick');
      //      } else{
      //        $(window).trigger('slickOn');
      //        $(window).on('slickOn', carousel);
      //      }
       //
      //    });
       //
      //  }

       $('.movieTmb').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         infinite: false,
         arrows: false,
         variableWidth: true
       });

       $('.prBanner').slick({
         dots: true,
         centerMode: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         infinite: false,
         arrows: false,
         variableWidth: true
       });

    },

    matchHeight : function(){
      $('nav.list').find('li').matchHeight();
      $('.horizon-item').matchHeight();
    },

    voice : function(){

      $('#voice').find('article').click(function(){
        $(this).toggleClass('active').find('.hidden').slideToggle();
      });

    },

    alignCenter : function(){

      var $elem = $('.app.select, .app.logout');
      var parent = $('.app.select, .app.logout').width();
      var width = $elem.find('li').outerWidth(true);
      var length = Math.floor( parent / width );
      var container = width * length;

      $('.app').find('ul').width( container + 2 );

    }

  }

  $(function() {

    Pages.owlCarousel();
    Pages.voice();

    $(window).on('load resize', function(){

      Pages.matchHeight();
      Pages.alignCenter();

    });

  });
