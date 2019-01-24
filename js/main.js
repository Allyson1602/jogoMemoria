const cardboard = document.querySelector("#cardboard")
const images = [
    'angular.svg',
    'aurelia.svg',
    'backbone.svg',
    'ember.svg',
    'react.svg',
    'vue.svg'
]

let cardHTML = ''
images.forEach(img => {
    cardHTML += `
    <div class="memory-card" data-card="${img}">
        <img src="img/${img}" class="front-face" />
        <img src="img/js-badge.svg" class="back-face" />
    </div>
    `
})

cardboard.innerHTML = cardHTML.repeat(2);

// #######################FIM HTML#######################

const CARDS = document.querySelectorAll('.memory-card');
let firstCard, secondCard;
let lockCard = false;

function flipCard(){
    if(lockCard) return false;

    this.classList.add('flip');
    if(!firstCard){
        firstCard = this;
        return true;
    }else{
        secondCard = this;
    }
    
    checkForMatch();

    function checkForMatch(){
        let isMatch = firstCard.dataset.card === secondCard.dataset.card;

        !isMatch ? disableCards() : resetCards(isMatch);
    }
}

function disableCards(){
    lockCard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetCards();
    }, 1000);
 
}

(function shuffleCard(){
    CARDS.forEach( card => {
        let rand = Math.floor(Math.random() * 12);
        card.style.order = rand;
    })
})();

function resetCards(isMatch = false){
    if(isMatch){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }
    [firstCard, secondCard, lockCard] = [null, null, false];
}

CARDS.forEach(card => card.addEventListener('click', flipCard));