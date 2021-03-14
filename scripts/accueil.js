const swiper = new Swiper('.swiper-container', {
    speed: 400,
    spacebetween:100,
    direction: 'horizontal',
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        bulletActiveClass: 'bullet-active',
        },
  });