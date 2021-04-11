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

gsap.registerPlugin(ScrollTrigger);

const sectionList = document.querySelectorAll('section');

sectionList.forEach(section => {
    const textes = section.querySelector('h3');
    const cartes  = section.querySelector('.cards');
    const carrousel  = section.querySelector('.swiper-container');
    const video  = section.querySelector('.video'); 

    gsap.timeline({
        scrollTrigger:{
            markers: false,
            start:'top 70%',
            end: 'bottom 15%',
            trigger: section, 
            toggleActions: 'play complete none reverse',
        }
    })
    .from(textes,{
        x: -100,
        opacity: 0,
    })

    .from(cartes,{
        scale: 0.8,
        y: 100,
        opacity: 0,
    })

    .from(video,{
        scale: 0.8,
        y: 100,
        opacity: 0,
    })
    .from(carrousel,{
        scale: 0.8,
        y: 100,
        opacity: 0,
    })
});