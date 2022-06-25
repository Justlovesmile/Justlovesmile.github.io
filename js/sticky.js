var mySwiper = new Swiper('#stickyList', {
      direction: 'horizontal',
      speed: 600,
      loop: true,
      effect : 'fade',
      loopPreventsSlide: false,
      autoplay: {
        delay: 20000,
      },
      mousewheel: false,
      pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
      },
    })