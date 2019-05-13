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
        input = form.getElementsByTagName('input'),
        contactForm = document.querySelector('#form'),
        statusMessage = document.createElement('div');
        statusMessage.classList.add("status");

    function sendForm(elem) {
    elem.addEventListener("submit", function (e) {
        e.preventDefault();
        elem.appendChild(statusMessage);

        let formData = new FormData(elem);

        function postData(data) {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();

                request.open("POST", "server.php");
                request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

                request.onreadystatechange = function () {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4) {
                        if (request.status == 200 && request.status < 4) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                };
                request.send(data);
            });
        }
        function clearInput() {
            [...input].forEach(elem => (elem.value = ""));
        }
        postData(formData)
            .then(() => (statusMessage.innerHTML = message.loading))
            .then(() => (statusMessage.innerHTML = message.success))
            .catch(() => (statusMessage.innerHTML = message.failure))
            .then(clearInput);
    });
    }
    sendForm(form);
    sendForm(contactForm);

    //validation

    let inputsPhone = document.querySelectorAll('input[name="phone"]')

    function onlyNumber(input) {
        input.onkeydown = function () {
            return (this.value = this.value.replace(/[^0-9]/g, ""));
        };
    }
    [...inputsPhone].forEach(elem => onlyNumber(elem));

    });