

const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', ()=>{
    menu.classList.add('active');
});

closeElem.addEventListener('click', ()=>{
    menu.classList.remove('active');
});

// const counters = document.querySelectorAll('.skills__ratings-counter'),
//       lines = document.querySelectorAll('.skills__ratings-line span');

//       counters.forEach((item,i)=>{
//         lines[i].style.width = item.innerHTML;//вытащили содержимео span и дали его в ширину
//     });

fetch('portfolio.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const portfolioContent = document.querySelector('.portfolio__wrapper');
        data.forEach((item,i)=>{
            console.log(i)
            // Создаем элемент <a>
            const portfolioItem = document.createElement('a');
            portfolioItem.href = '#';
            
            
            if(i==3) {
                portfolioItem.className = 'portfolio__item vertical';
            } 
            else {
                portfolioItem.className = 'portfolio__item';
            }
            if(i==5) {
                portfolioItem.className = 'portfolio__item horizonal' ;
            } 
            // Создаем элемент <img>
            const img = document.createElement('img');
            img.src = item.img; // Предполагаем, что в JSON есть поле image
            img.alt = item.name; // Предполагаем, что в JSON есть поле name
            console.log(item.img)
            // Создаем элемент <div> для покрытия
            const cover = document.createElement('div');
            cover.className = 'portfolio__item-cover';

            // Создаем элемент <h1>
            const title = document.createElement('h1');
            title.textContent = item.name; // Предполагаем, что в JSON есть поле name

            // Создаем элемент <p>
            const description = document.createElement('p');
            description.textContent = item.descr; // Предполагаем, что в JSON есть поле description

            // Собираем структуру
            cover.appendChild(title);
            cover.appendChild(description);
            portfolioItem.appendChild(img);
            portfolioItem.appendChild(cover);
            portfolioContent.appendChild(portfolioItem); // Добавляем элемент в контейнер
        })
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });

//плавный скрол
function scrollTo(element) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.offsetTop
    });
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
 
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//form and tg bot
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const text = document.getElementById('text').value;

    const message = `Новое сообщение от ${name} (${email}): ${text}`;

    const token = '8005011499:AAGpskvq5mQ41s2FdpxUG5r8xIpEApURIDI'; // Замените на токен вашего бота
    const chatId = '2019712807'; // Замените на ваш chat ID

    const url =`https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Сообщение отправлено!');
            document.getElementById('contactForm').reset(); // Сброс формы
        } else {
            alert('Ошибка при отправке сообщения.');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка при отправке сообщения.');
    });
});