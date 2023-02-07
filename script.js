const CARDS = [
    {
        id: 1,
        name: 'car',
        img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mike-b-170811.jpg&fm=jpg'
    },
    {
        id: 2,
        name: 'flower',
        img: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?cs=srgb&dl=pexels-pixabay-56866.jpg&fm=jpg'
    },
    {
        id: 3,
        name: 'animals',
        img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRG87OqwveVRysa7M-3cPvsmaCfrwLKJMJ9h7skQZKXoTSIOx-Z9DOqEwjcEn2q_jtUu2NWHAhJkoGC9iE'
    },
    {
        id: 4,
        name: 'birds',
        img:'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcS0GTLqxXPZ1lJb5cV2xTfL_AiNNa4zWbl1TOjlvHwtaB1-xdeIfeo-PjdyNgAcrYzenmfzkDJ7J8pG5fE'
    },
    {
        id: 5,
        name: 'reptils',
        img :'https://i.natgeofe.com/n/5506954d-6e0f-444c-aa83-a24adbe874e1/reptiles-hero_4x3.jpg'
    },
    {
        id: 6,
        name:'snake',
        img:'https://cdn.pixabay.com/photo/2015/02/28/15/25/snakes-653639__480.jpg'
    },
    {
        id: 7,
        name: 'insect',
        img:'https://images.pexels.com/photos/144243/ladybugs-ladybirds-bugs-insects-144243.jpeg?cs=srgb&dl=pexels-pixabay-144243.jpg&fm=jpg'
    },
    {
        id: 8,
        name: 'cat',
        img:'https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80'
    },
    {
        id: 9,
        name: 'shinchan',
        img:'https://wallpaper.dog/large/20469119.jpg'
    },
    {
        id: 10,
        name: 'doremon',
        img:'https://freepngimg.com/thumb/doraemon/71299-nobi-youtube-nobita-television-doraemon-free-photo-png-thumb.png'
    },
    {
        id: 11,
        name: 'dora',
        img:'https://w7.pngwing.com/pngs/175/1001/png-transparent-dora-the-explorer-swiper-cartoon-dora-photography-vertebrate-computer-wallpaper-thumbnail.png'
            
    },
    {
        id: 12,
        name: 'heidi',
        img:'https://wallpapercave.com/wp/wp2506920.jpg'
    }
];
const cardContainer = document.querySelector('.card-container');
const available = document.querySelector('#available');
const modalTitle = document.querySelector('#modal-title');
const modal = document.querySelector('#modal');
let currentCards = [...CARDS, ...CARDS];
let isPaused = false;
let counter = CARDS.length + 10;
let isLose = false;

function shuffle(array) {
    let counter = array.length,
        temp,
        index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function win() {
    isPaused = true;
    modalTitle.innerHTML = 'You win!';
    modal.classList.add('modal--open');
}

function lose() {
    isLose = true;
    modalTitle.innerHTML = 'You lose';
    modal.classList.add('modal--open');
}

function handleClick(e) {
    const { target } = e;
    if (
        !isPaused &&
        !isLose &&
        !target.classList.contains('card--guessed') &&
        !target.classList.contains('card--picked')
    ) {
        isPaused = true;
        const picked = cardContainer.querySelector('.card--picked');
        if (picked) {
            if (picked.dataset.id === target.dataset.id) {
                target.classList.remove('card--picked');
                picked.classList.remove('card--picked');
                target.classList.add('card--guessed');
                picked.classList.add('card--guessed');
                isPaused = false;
            } else {
                target.classList.add('card--picked');
                setTimeout(() => {
                    target.classList.remove('card--picked');
                    picked.classList.remove('card--picked');
                    isPaused = false;
                }, 1500);
            }
            console.log('counter', counter);
            counter -= 1;
            available.innerHTML = counter;
            if (counter === 0) {
                lose();
            }
        } else {
            target.classList.add('card--picked');
            isPaused = false;
        }

        
        const isWin = cardContainer.querySelectorAll('card--guessed').length === currentCards.length;
        if (isWin) {
            win();
        }
    }
}

function drawCards() {
    cardContainer.innerHTML = '';
    available.innerHTML = counter;

    shuffle(currentCards).forEach((el) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', el.id);
        card.innerHTML = `
          <div class="card__front">
            <img
              class="front__img"
              src="${el.img}"
              alt="${el.name}"
            />
            <h6 class="card__name">${el.name}</h6>
          </div>
          <div class="card__back">
            <img
              class="back__img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGVKnfZv0o_O0gm4TQ44v5Zx94azcB-QMQRso344ga&s"
              alt="Thought"
            />
          </div>
        `;
        card.addEventListener('click', handleClick);
        cardContainer.appendChild(card);
    });
}

document.querySelector('#play-again').addEventListener('click', function () {
    modal.classList.remove('modal--open');
    isPaused = false;
    isLose = false;
    counter = CARDS.length + 10;
    drawCards();
});

drawCards();


