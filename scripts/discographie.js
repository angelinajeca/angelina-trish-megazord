const swiper = new Swiper('.swiper-container', {
    effect: 'fade',
    direction: 'vertical',
    autoplay: {
      delay: 2000,
    },
    slidesPerView: 1,
    loop: true,
    allowTouchMove: false,
});

gsap.registerPlugin(ScrollTrigger);

const sectionList = document.querySelectorAll('section');

sectionList.forEach(section => {
const card = section.querySelector('.card');
const title = section.querySelector('h3');  
const video = section.querySelector('.video');

gsap.timeline({
  scrollTrigger: {
    markers: false,
    start: 'top 75%',
    end: 'bottom 15%',
    trigger: section,
    toggleActions: 'play none resume reverse',
  }
})

.from(card,{
  scale: 0.8,
  y: 100,
  opacity: 0,
})
.from(title,{
  x: -100,
  opacity: 0,
})

.from(video,{
  scale: 0.8,
  y: 100,
  opacity: 0,
})

});

let timeout;
let body = document.body;

gsap.to('.contenant', {
  scrollTrigger: {
    markers: false,
    trigger: '.contenant',
    scrub: 0.2,
    onUpdate: (e) => {
      body.classList.add('is-scrolling');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        body.classList.remove('is-scrolling');
      }, 250)
      
      if(e.direction == 1) {
        body.classList.add('direction-down');
        body.classList.remove('direction-up');
      } 
      if(e.direction == -1) {
        body.classList.remove('direction-down');
        body.classList.add('direction-up');
      }
    }
  }
})


