let menu = document.querySelector('.menu'),
    column = document.querySelectorAll('.column'),
    menuItem = document.createElement('li'),
    menuItems = document.querySelectorAll('.menu-item'),
    title = document.getElementById('title'),
    advertising = document.querySelector('.adv'),
    question = prompt('Как вы относитесь к технике Apple ?', ''),
    askQuestion = document.getElementById('prompt');

menu.appendChild(menuItem);
menu.insertBefore(menuItems[2], menuItems[1]);
menuItem.classList.add('menu-item');
menuItem.textContent = 'Пятый пункт';

document.body.style.background = 'url(img/apple_true.jpg) center no-repeat';
column[1].removeChild(advertising);
title.innerHTML = 'Мы продаём только <b>подлинную</b> технику Apple';

askQuestion.textContent = question;