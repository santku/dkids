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
           autoplay: true,
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

    },

    sliderDisabled : function(){

      $(window).on('load resize　orientationchange', function(){

        $('.horizon-swiper').each(function(){
          var n = $(this).find('.horizon-item').size();
          if ( n <= 10 && g.winW() >= 1051 ){
            $(this).addClass('disabled')
              .parent().addClass('nomore');
          } else {
            $(this).removeClass('disabled')
              .parent().removeClass('nomore');
          }
        });

        if ( $('.carousel').hasClass('disabled') ){
          $('.carousel.disabled').trigger('disabled');
        } else {
          $('.carousel').trigger('enabled');
        }

      });

      $('.carousel').on('disabled', function(){
        var n = $(this).find('.horizon-item').size();
        var l = ( n >= 10 && g.winW() >= 1051 ) ? $(this).offset().left : '3.3%';
        $('.carousel').not('.disabled').find('.horizon-inner').css('padding-left', l);

      });

      $('.carousel').not('.disabled').on('enabled', function(){
        var l = $(this).offset().left;
        var n = $(this).find('.horizon-item').size();
        $('.carousel').find('.horizon-inner').css('cssText','padding-left: 3.3%;');

      });

    },

    matchHeight : function(){

      $('nav.list').find('li').matchHeight();
      //$('.horizon-item').matchHeight();
      $('.recommend li').matchHeight();
      $('.carousel li').matchHeight();
      //$('#contents.search .app li p').matchHeight();

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

      if ( $('.tutorial').size() >= 1 ) {

  		  var $gallery = $('.tutorial .gallery').flickity({
  				prevNextButtons: false
  			});

  		  $gallery.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
  		    if ( typeof cellIndex == 'number' ) {
  		      $gallery.flickity( 'select', cellIndex );
  		    }
  		  });

        var flkty = $gallery.data('flickity');

        function updateStatus() {

          var cellNumber = flkty.selectedIndex;

          $('.gifplayer').each(function(i){

            var src = $(this).attr('src').match(/gif|png/);

            if ( i == cellNumber ) {
              $(this).attr('src', $(this).attr('src').replace('png', 'gif'));
            } else {
              $(this).attr('src', $(this).attr('src').replace('gif', 'png'));
            }

          });

        }

        var btnOffset = $gallery.find('.image').offset().top + 245;
        $gallery.find('.flickity-page-dots').css('top', btnOffset);

        $gallery.find('.gallery-cell').matchHeight();
        $gallery.find('.heading').matchHeight();
        $gallery.find('.text').matchHeight();

        $(window).on('load resize', function(){
          updateStatus();

          var btnOffset = $gallery.find('.image').offset().top + 245;
          $gallery.find('.flickity-page-dots').css('top', btnOffset);

        });

        $gallery.on( 'cellSelect', updateStatus );

      }

		},

		galleryMargin : function(){

			var W = $(window).width();
			var GW = $('.tutorial .gallery').width();
			var MR = ((GW-300)/2)/1.4;
			$('.tutorial .gallery-cell').css('marginRight',MR);

		},

    stamp : function(){
      if ( $('.stamp_2').find('.oubo').size() == 0 ) {
        $('.stamp_2').find('.month').addClass('pt');
      }
    },

    h100 : function(){

      if ( $('#contents').hasClass('license') || $('#contents').hasClass('privacy') ){
        $('html').addClass('h100');
      }

    }

  }

  $(function() {

    Pages.slider();
    Pages.voice();
    Pages.sliderDisabled();
    Pages.stamp();
    Pages.h100();

    $(window).on('load resize', function(){

      Pages.matchHeight();
      Pages.alignCenter();
			/*L-2tutorial*/
			Pages.galleryMargin();
			Pages.flickity();

    });

  });