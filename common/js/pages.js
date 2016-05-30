/* ===============================================================

pages scripts

=============================================================== */

  window.onunload = function(){};

  var Pages = function(){};

  Pages = {

     slider : function(){

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

       $('.horizon-swiper').horizonSwiper({
         arrows: false
       });

    },

    sliderDisabled : function(){

      $(window).on('load resize　orientationchange', function(){

        $('.horizon-swiper').each(function(){
          var n = $(this).find('.horizon-item').size();
          if ( n <= 10 && g.winW() >= 1045 ){
            $(this).addClass('disabled');
          } else {
            $(this).removeClass('disabled');
            $('#wrap').removeClass('sliderDisabled');
          }
        });

        if ( $('.horizon-swiper').hasClass('disabled') ){
          $('.horizon-swiper.disabled').trigger('disabled');
        } else {
          $('.horizon-swiper').trigger('enabled');
        }

      });

      $('.horizon-swiper').on('disabled', function(){
        var l = $(this).offset().left;
        var n = $(this).find('.horizon-item').size();
        $('.horizon-swiper').not('.disabled').find('.horizon-inner').css('padding-left', l);

      });

      $('.horizon-swiper').not('.disabled').on('enabled', function(){
        var l = $(this).offset().left;
        var n = $(this).find('.horizon-item').size();
        $('.horizon-swiper').find('.horizon-inner').css('cssText','padding-left: 3.3%;');

      });

    },

    matchHeight : function(){

      $('nav.list').find('li').matchHeight();
      $('.horizon-item').matchHeight();
      $('.recommend li').matchHeight();

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

      $('.app').children('ul').not('.horizon-swiper').width( container + 2 );

    },

		flickity: function(){

		  var $gallery = $('.tutorial .gallery').flickity({
				prevNextButtons: false,
				pageDots: false
			});
		  $gallery.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
		    if ( typeof cellIndex == 'number' ) {
		      $gallery.flickity( 'select', cellIndex );
		    }
		  });

		},

		galleryMargin : function(){

			var W = $(window).width();
			var GW = $('.tutorial .gallery').width();
			var MR = ((GW-300)/2)/1.4;
			$('.tutorial .gallery-cell').css('marginRight',MR);

		}

  }

  $(function() {

    Pages.slider();
    Pages.voice();
    Pages.sliderDisabled();

    $(window).on('load resize', function(){

      Pages.matchHeight();
      Pages.alignCenter();
			/*L-2tutorial*/
			Pages.galleryMargin();
			Pages.flickity();

    });

  });



