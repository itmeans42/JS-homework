    window.addEventListener('DOMContentLoaded', function() {

        'use strict';

        let tab = document.querySelectorAll('.info-header-tab'),
            info = document.querySelector('.info-header'),
            tabContent = document.querySelectorAll('.info-tabcontent');

        function hideTabContent(a) {
            for(let i = a; i < tabContent.length; i++) {
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

        info.addEventListener('click', (e) => {
            let target = e.target;
            if (target && target.classList.contains('info-header-tab')) {
                for (let i = 0; i < tab.length; i++) {
                    if (target == tab[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });

    //timer 

    let deadline = '2019-05-30';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t /(1000 * 60 * 60));
            
            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
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
            hours.textContent = zero(t.hours) ;
            minutes.textContent = zero(t.minutes);
            seconds.textContent = zero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                }
            }
        }

        function zero(a) {
            if (a < 10) {
                a = '0' + a;
                }
                return a;
            }
            
        setClock('timer', deadline);

    //modal 
    
    let more = document.querySelector('.more'),
        descr = document.querySelector('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    
        more.addEventListener('click', () => {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        descr.addEventListener('click', () => {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';

    });

//form

    let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся :)',
		failure: 'Что-то пошло не так...'
	};

	let form = document.querySelector('.main-form'),
		contactForm = document.querySelector('#form'),
		inputNumber = document.querySelectorAll('input[type="tel"]'),
		statusMessage = document.createElement('div');

		for(let i = 0; i < inputNumber.length; i++){ 
			inputNumber[i].addEventListener('input', () => {
				inputNumber[i].value = inputNumber[i].value.replace(/[^\+\d]/g, '');
			});
		}
		statusMessage.classList.add('status');

	function sendForm(elem) {
		elem.addEventListener('submit', function(event) {
			event.preventDefault();
			elem.appendChild(statusMessage);
			let input = elem.getElementsByTagName('input');
			let formData = new FormData(elem);
			statusMessage.style.display = 'block';
		
			function postData(data){
				return new Promise(function(resolve,reject) {
					let request = new XMLHttpRequest();
					request.open('OPTIONS', 'server.php');// у меня почему-то не работает POST, ошибка 405
					request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

					request.addEventListener('readystatechange', function() {
						if (request.readyState < 4){
							resolve();
						} else if(request.readyState === 4 && request.status === 200) {
							resolve();
						} else {
							reject();
						}

					});

					let obj = {};
					formData.forEach(function(value, key) {
						obj[key] = value;
					});
					let json = JSON.stringify(obj);
					request.send(json);

				});
			} // postData

			function clearInput() { 
				for(let i = 0; i < input.length; i++) { 
					input[i].value = '';
				}
			}

			postData(formData)
				.then(()=> statusMessage.innerHTML = message.loading)
				.then(()=> {
					statusMessage.innerHTML = message.success;
					setTimeout(()=> { 
						statusMessage.style.display = 'none';
					}, 5000);
				})
				.catch(()=> statusMessage.innerHTML = message.failure)
				.then(clearInput);
		});
	}

	sendForm(form);
    sendForm(contactForm);

    });