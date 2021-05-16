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
            start:'top 60%',
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

gsap.registerPlugin(ScrollTrigger);

let timeout;
let body = document.body;

gsap.to('.contenant', {
  scrollTrigger: {
    markers: false,
    trigger: '.contenant',
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
});

// PARTIE 2 //

// ANIMATION VRAI //

/*const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  
    gsap.fromTo('.animation-complet-vrai',
          { 
      duration: '1.5',
      ease: 'power3.out',
      opacity: 0,},
                
      { 
      opacity: 1,},          
   );

    gsap.from('.animation-img-vrai',
          { 
      duration: '1.5',
      ease: 'power3.out',
      scale: '0.8' }
   );
    
    gsap.from('.animation-txt-vrai',
          { 
      duration: '1.5',
      ease: 'back.out',
      opacity: 0,
      x: '-100px',
    }

   );

   gsap.from('.cercle-vrai',
            { 
      delay: 0.1,
      duration: '1',
      ease: 'power3.out',
      scaleX: '0.3',
      rotation: 60,}

   );
    
     gsap.fromTo('.animation-complet-vrai',
        {
        duration: '1.5',
        ease: 'power3.out',
        opacity: 1,
      },   
                 
        { 
        delay: '2', 
       opacity: 0,
       duration: '1',
       repeat: 0,
       onComplete() {console.log('FINI')},
      } 
   );
}); */


// ANIMATION FAUSSE //

/*btn.addEventListener('click', () => {
  
  gsap.fromTo('.animation-complet-fausse',
        { 
    duration: '1.5',
    ease: 'power3.out',
    opacity: 0,},
              
    { 
    opacity: 1,},          
 );

  gsap.from('.animation-mauvaise',
        { 
    duration: '1.5',
    ease: 'power3.out',
    scale: '0.8' }
 );
  
  gsap.from('.animation-txt-fausse',
        { 
    duration: '1.5',
    ease: 'back.out',
    opacity: 0,
    x: '-100px',
  }

 );

 gsap.from('.cercle-fausse',
          { 
    delay: 0.1,
    duration: '1',
    ease: 'power3.out',
    scaleX: '0.3',
    rotation: 60,}

 );
  
   gsap.fromTo('.animation-complet-fausse',
      {
      duration: '1.5',
      ease: 'power3.out',
      opacity: 1,
    },   
               
      { 
      delay: '2', 
     opacity: 0,
     duration: '1',
     repeat: 0,
     onComplete() {console.log('FINI')},
    } 
 );
}); */

// QUIZ //
const questionList =

  fetch('https://bts-discographie.go.yj.fr/bts-api/index.php/wp-json/wp/v2/posts/')
  .then(response => response.json())
  .then(data => {new Quiz(data)});

  class Quiz {
    constructor(questionList) {
      this.index = 0;
      this.score = 0;
      this.questionList = questionList;
 
      this.questionList.forEach((question, value) => {
        this.creerHtml(question, value + 1);
      });
      
      this.setVisible(this.index);
      this.answers();
    }
    creerHtml(quest, value) {
      this.modalbody = document.querySelector("#quiz .modal-body");
      this.div = document.createElement("div");
      this.div.classList.add("question");
      this.modalbody.appendChild(this.div);
  
      this.strong = document.createElement("strong");
      this.strong.innerText = quest.acf.q;
      this.div.appendChild(this.strong);
  
      this.br = document.createElement("br");
      this.div.appendChild(this.br);
  
      if ("o1" in quest.acf) {
        let radio = document.createElement("input");
        let label = document.createElement("label");      
        
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question" + value);
        radio.setAttribute("value", "1");
        this.div.appendChild(radio);
  
  
        label.innerText = quest.acf.o1;
        this.div.appendChild(label);
  
        this.br = document.createElement("br");
        this.div.appendChild(this.br);
      }
  
      if ("o2" in quest.acf) {
        let radio = document.createElement("input");
        let label = document.createElement("label");      
        
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question" + value);
        radio.setAttribute("value", "2");
        this.div.appendChild(radio);
  
    
        label.innerText = quest.acf.o2;
        this.div.appendChild(label);
  
        this.br = document.createElement("br");
        this.div.appendChild(this.br);
      }
  
      if ("o3" in quest.acf) {
        let radio = document.createElement("input");
        let label = document.createElement("label"); 
        
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question" + value);
        radio.setAttribute("value", "3");
        this.div.appendChild(radio);
        
        label.innerText = quest.acf.o3;
        this.div.appendChild(label);
  
        this.br = document.createElement("br");
        this.div.appendChild(this.br);
      }
  
      if ("o4" in quest.acf) {
        let radio = document.createElement("input");
        let label = document.createElement("label");    
        
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question" + value);
        radio.setAttribute("value", "4");
        this.div.appendChild(radio);
  
        label.innerText = quest.acf.o4;
        this.div.appendChild(label);
  
        this.br = document.createElement("br");
        this.div.appendChild(this.br);
      }
    }
    
    setVisible(number) {
      let divquest = document.querySelectorAll(".question");
      
      divquest.forEach((q) => {
        q.classList.remove("is-visible");
        divquest[number].classList.add("is-visible");
      });
    }
    answers() {
      let Reponse = document.querySelectorAll("input[type = 'radio']");
      
      Reponse.forEach((radio) => {
        radio.addEventListener("change", () => {
          if (radio.checked) {
            if (radio.value == this.questionList[this.index].acf.r) {
              this.score++;
              this.goodAnswer();
            } else {
              this.score--;
              if(this.score == -1) { this.score = 0 };
              this.wrongAnswer();
            }
            if (this.index <= this.questionList.length - 1) {
              if (this.index == this.questionList.length -1) {
                this.div.innerText = `${this.score}/8`;
                this.div.insertAdjacentHTML('afterbegin', '<strong>Pointage</strong><br>') ;
              return false;
            }
              this.index++;
              this.setVisible(this.index); 
            }
          }
        });
      });
    }



    wrongAnswer(){

      gsap.fromTo('.animation-complet-fausse',
          { 
      duration: '1.5',
      ease: 'power3.out',
      opacity: 0,},     
      { 
      opacity: 1,},          
   );

    gsap.from('.animation-mauvaise',
          { 
      duration: '1.5',
      ease: 'power3.out',
      scale: '0.8',
     } 
     
   );
    
    gsap.from('.animation-txt-fausse',
          { 
      duration: '1.5',
      ease: 'back.out',
      opacity: 0,
      x: '-100px',
    }

   );

   gsap.from('.cercle-fausse',
            { 
      delay: 0.1,
      duration: '1',
      ease: 'power3.out',
      scaleX: '0.3',
      rotation: 60,}

   );
    
     gsap.fromTo('.animation-complet-fausse',
        {
        duration: '1.5',
        ease: 'power3.out',
        opacity: 1,
      },   
                 
        { 
        delay: '2', 
       opacity: 0,
       duration: '1',
       repeat: 0,
       onComplete() {console.log('FINI')},
      } ,

      gsap.fromTo('.animations',
      { duration: 1.5,
        zIndex: 2,
      },
      { delay: 3,
        zIndex: -1,
      }
      )
   );


    }
    goodAnswer(){
      
      
      gsap.fromTo('.animation-complet-vrai',
           { 
          duration: '1.5',
          ease: 'power3.out',
          opacity: 0,
        },        
          { 
          opacity: 1,
          },          
       );
    
        gsap.from('.animation-bonne',
              { 
          duration: '1.5',
          ease: 'power3.out',
          scale: '0.8' }
       );
        
        gsap.from('.animation-txt-vrai',
              { 
          duration: '1.5',
          ease: 'back.out',
          opacity: 0,
          x: '-100px',
        }
    
       );
    
       gsap.from('.cercle-vrai',
                { 
          delay: 0.1,
          duration: '1',
          ease: 'power3.out',
          scaleX: '0.3',
          rotation: 60,}
    
       );
        
         gsap.fromTo('.animation-complet-vrai',
            {
            duration: '1.5',
            ease: 'power3.out',
            opacity: 1,
          },   
          
            { 
            delay: '2', 
           opacity: 0,
           duration: '1',
           repeat: 0,
           onComplete() {console.log('FINI')},
          } 
       );

       gsap.fromTo('.animations',
       { duration: 1.5,
         zIndex: 2,
       },
       { delay: 3,
         zIndex: -1,
       }
       )

    }

  
  }

  
