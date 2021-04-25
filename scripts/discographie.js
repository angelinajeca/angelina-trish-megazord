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

// QUIZ //

const questionList = [
  
  {
    q: "En quelle année BTS à débuter ?",
    o1: "2015",
    o2: "2013",
    o3: "2017",
    o4: "2014",
    
    r: 2
  },
    
  {
    q: "Combien y a-t-il de membres dans BTS ?",
    o1: "4",
    o2: "6",
    o3: "5",
    o4: "7",
    
    r: 4
  },
    
  {
    q: "Quelle chanson ont-ils chantée aux Grammys 2021 ?",
    o1: "Life Goes On",
    o2: "Dynamite",
    o3: "Black Swan",
    o4: "On",
    
    r: 2
  },
    
  {
    q: "Leur compte Twitter @BTS_twt à combien d'abonnés ?",
    o1: "17.2 M",
    o2: "25.0 M",
    o3: "34.5 M",
    o4: "40.5 M",
    
    r: 3
  },
     
   {
    q: "Qui est le leader de BTS ?",
    o1: "RM (Kim Namjoon)",
    o2: "Suga (Min Yoongi)",
    o3: "Jin (Kim Seokjin)",
    o4: "Jungkook (Jeon Jungkook)",
    
  r: 1
  },
    
  { 
  q: "Qui sont les vocalistes de BTS ?",
  o1: "RM, Suga, J-Hope",
  o2: "Jimin, Jin, Jungkook, V",
  o3: "Suga, Jin, Jungkook",
  o4:"J-Hope, Suga, RM, V",
    
  r: 2
  } ,
    
  {
   q: "Quel est le nom de leur premier album ?",
    o1:"Dark & Wild",
    o2: "Love Yourself Her",
    o3: "O!RUL8,2?",
    o4: "Wings" ,
    
    r: 3
  },
    
  {
   q: "La musique 'Blood, Sweat & Tears' fait partie de quel album?", 
    o1:"Skool Luv Affair",
    o2: "Wings",
    o3: "Love Yourself : Tear",
    o4: "Dark & Wild", 
    
    r: 2
  }
    
  ];
  
  class Quiz {
    constructor(tableau) {
      this.index = 0;
      this.score = 0;
      this.questionList = tableau;
      
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
      this.strong.innerText = quest.q;
      this.div.appendChild(this.strong);
  
      this.br = document.createElement("br");
      this.div.appendChild(this.br);
  
      if ("o1" in quest) {
        let radio = document.createElement("input");
        let label = document.createElement("label");      
        
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question" + value);
        radio.setAttribute("value", "1");
        this.div.appendChild(radio);
  
  
        label.innerText = quest.o1;
        this.div.appendChild(label);
  
        this.br = document.createElement("br");
        this.div.appendChild(this.br);
      }
  
      if ("o2" in quest) {
        let radio = document.createElement("input");
        let label = document.createElement("label");      
        
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question" + value);
        radio.setAttribute("value", "2");
        this.div.appendChild(radio);
  
    
        label.innerText = quest.o2;
        this.div.appendChild(label);
  
        this.br = document.createElement("br");
        this.div.appendChild(this.br);
      }
  
      if ("o3" in quest) {
        let radio = document.createElement("input");
        let label = document.createElement("label"); 
        
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question" + value);
        radio.setAttribute("value", "3");
        this.div.appendChild(radio);
        
        label.innerText = quest.o3;
        this.div.appendChild(label);
  
        this.br = document.createElement("br");
        this.div.appendChild(this.br);
      }
  
      if ("o4" in quest) {
        let radio = document.createElement("input");
        let label = document.createElement("label");    
        
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question" + value);
        radio.setAttribute("value", "4");
        this.div.appendChild(radio);
  
        label.innerText = quest.o4;
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
            if (radio.value == this.questionList[this.index].r) {
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
  
  new Quiz(questionList);


