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

       //carousel
       $('.carousel').each(function(){
        if ( $(this).find('li').size() >= 4 ) {
          $(this).slick({
            slidesToShow: 6,
            slidesToScroll: 6,
            infinite: false,
            arrows: false,
            variableWidth: true,
            responsive: [
              {
                breakpoint: g.point,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
              }
            ]
          })
          .on('setPosition', function(){
            $(this).find('.slick-slide').matchHeight();
          });
        }
       });

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
    },

    voice : function(){

      $('#voice').find('article').click(function(){
        $(this).toggleClass('active').find('.hidden').slideToggle();
      });

    }

  }

  $(function() {

    Pages.owlCarousel();
    Pages.voice();

    $(window).on('load resize', function(){

      Pages.matchHeight();

    });

  });
