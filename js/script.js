window.addEventListener('DOMContentLoaded', function() {

   'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

   function hideTabContent(a) {
      for (let i = a; i < tabContent.length; i++) {
         tabContent[i].classList.remove('show');
         tabContent[i].classList.add('hide');
      }
   }

   hideTabContent(1);

   function showTabContent(b) {
      if (tabContent[b].classList.contains('hide')) {
         tabContent[b].classList.remove('hide');
         tabContent[b].classList.add('show');
      }
   }

   info.addEventListener('click', (event) => {
      let target = event.target;
      if (target && target.classList.contains('info-header-tab')) {
         for (let i = 0; i < tab.length; i++) {
            if(target == tab[i]) {
               hideTabContent(0);
               showTabContent(i);
               break;
            }
         }
      }
   });

   //таймер

   let deadline = '2018-10-21';

   function getTimeRemaining(endtime) {
      let t = Date.parse(endtime) - Date.parse(new Date()),
          seconds = Math.floor((t/1000) % 60),
          minutes = Math.floor((t/1000/60) % 60),
          hours = Math.floor((t/(1000*60*60)));

          return {
             'total': t,
             'hours': hours,
             'minutes': minutes,
             'seconds': seconds
          }; 

   }

   function setClock(id, endtime) {
      let timer = document.getElementById(id),
          hours = timer.querySelector('.hours'),
          minutes = timer.querySelector('.minutes'),
          seconds = timer.querySelector('.seconds'),
          timeInterval = setInterval(updateClock, 1000);

      function updateClock() {
         let t = getTimeRemaining(endtime);

         function addZero(num){
            if(num <= 9) {
                return '0' + num;
            } else  {
               return num; 
            }
        }

         hours.textContent = t.hours;
         minutes.textContent = t.minutes;
         seconds.textContent = t.seconds;

         if (t.total <= 0) {
            clearInterval(timeInterval);
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
         }
          
      }
   }
   setClock('timer', deadline);

   // modal
   function modalWindow(openModal){
      let  overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close'),
      open = document.querySelectorAll(openModal);

      for(let i = 0; i < open.length; i++) {

         open[i].addEventListener('click', () => {
          overlay.style.display = 'block';
          open[i].classList.add('more-splash');
          document.body.style.overflow = 'hidden';
         });
   
         close.addEventListener('click', () => {
            overlay.style.display = 'none';
            open[i].classList.remove('more-splash');
            document.body.style.overflow = '';
         });
      }
   }
   modalWindow('.more');
   modalWindow('.description-btn');

   //Form

   let message = {
      loading: 'Загрузка...',
      succes: 'Спасиюо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };

   let form = document.querySelector('.main-form'),
      formBottom = document.querySelector('#form'),
      input = document.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
      statusMessage.classList.add('status');

   function sendForm(form) {
      form.addEventListener('submit', function(event) {
         event.preventDefault();
            // form.appendChild(statusMessage
            let formData = new FormData(form);

            function postData() {

               return new Promise(function(resolve, reject) {
                  let request = new XMLHttpRequest();

                  request.open('POST', 'server.php');

                  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                  request.onreadystatechange = function() {
                     if (request.readyState < 4) {
                        resolve();
                     } else if (request.readyState === 4) {
                        if (request.status == 200 && request.status < 300) {
                           resolve();                     
                        } else {
                           reject();
                        }
                     }
                  };

                  let obj = {};
                    formData.forEach(function (value, key) {
                        obj[key] = value;
                    });
                    let json = JSON.stringify(obj);
                    request.send(json);
               });
            }

            function clearInput() {
               for(let i = 0; i < input.length; i++) {
               input[i].value = '';
               }
            }

            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.sucsess)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput);
      });
   }
   sendForm(form);
   sendForm(formBottom);

   // slaider

   let slideIndex = 1,
       slides = document.querySelectorAll('.slider-item'),
       prev = document.querySelector('.prev'),
       next = document.querySelector('.next'),
       dotsWrap = document.querySelector('.slider-dots'),
       dots = document.querySelectorAll('.dot');

   showSlides(slideIndex);

   function showSlides(n) {

      if (n > slides.length) {
         slideIndex = 1;
      }

      if (n < 1) {
         slideIndex = slides.length;
      }

      slides.forEach((item) => item.style.display = 'none');
      // for (let i = 0; i < slides.length; i++) { одно и тоже что и записб выше
      //    slides[i]. style.display = 'none';
      // }
      dots.forEach((item) => item.classList.remove('dot-active'));

      slides[slideIndex - 1].style.display = 'block';
      dots[slideIndex - 1].classList.add('dot-active');
   }
   
   function plusSlides(n) { 
      showSlides(slideIndex += n);
   }

   function currentSlider(n) {
      showSlides(slideIndex = n); 
   }

   prev.addEventListener('click', function() {
      plusSlides(-1);
   });

   next.addEventListener('click', function() {
      plusSlides(1);
   });

   dotsWrap.addEventListener('click', function(event) {
      for (let i = 0; i < dots.length + 1; i++) {
         if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
            currentSlider(i);
         }
      }
   });
});