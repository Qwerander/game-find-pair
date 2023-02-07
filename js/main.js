/* eslint-disable no-param-reassign */
// eslint-disable-next-line func-names
(function () {
  let delay;
  let pair = [];
  const cards = [];
  let count = 0;
  let time;
  let id = null;
  let cardContainer;
  let card1;
  let cardInner;
  let cardBack;
  let cardFront;
  const container = document.getElementById('container');

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    } return array;
  }

  function createArray(x, y) {
    let flag;
    if (y === 2 || y === 4 || y === 6 || y === 8 || y === 10) {
      flag = true;
    } else {
      flag = false;
    }
    if (x === 2 && flag) {
      container.classList.add('square2');
    } else if (x === 4 && flag) {
      container.classList.add('square4');
    } else if (x === 6 && flag) {
      container.classList.add('square6');
    } else if (x === 8 && flag) {
      container.classList.add('square8');
    } else if (x === 10 && flag) {
      container.classList.add('square10');
    } else {
      x = 4;
      y = 4;
      container.classList.add('square4');
    }
    for (let i = 0, j = 1; i < x * y; i++) {
      cards[i] = j;
      cards[i + 1] = j;
      j++;
      i++;
    }
    shuffle(cards);
    return {
      x,
      y,
    };
  }

  function cardDisabled() {
    document.querySelectorAll('.card-container').forEach((element) => {
      element.disabled = false;
      if (element.classList.contains('sucsses')) {
        element.disabled = true;
      }
    });
  }

  function closeCard() {
    clearTimeout(delay);
    delay = setTimeout(() => {
      let openCard = document.querySelector('.open');
      openCard.disabled = false;
      openCard.classList.remove('open');
      openCard = document.querySelector('.open');
      openCard.disabled = false;
      openCard.classList.remove('open');
      cardDisabled();
    }, 500);
  }

  function cardClick() {
    this.classList.add('open');
    this.disabled = true;
    pair.push(this.dataset.item);
    if (pair.length > 1) {
      const arr = document.querySelectorAll('.card-container');
      arr.forEach((element) => {
        element.disabled = true;
      });
      if (pair[0] === pair[1]) {
        this.classList.replace('open', 'sucsses');
        document.querySelector('.open').classList.replace('open', 'sucsses');
        pair = [];
        count++;
        cardDisabled();

        if (count === cards.length / 2) {
          document.querySelector('.restart').classList.add('display');
          time.textContent = 'Вы выиграли';
        }
      } else {
        closeCard();
        pair = [];
      }
    }
    if (Number(time.textContent) === 0) {
      document.querySelector('.restart').classList.add('display');
      const allCards = document.querySelectorAll('.card-container');
      for (const card of allCards) {
        card.disabled = true;
      }
      const score = (count / (cards.length / 2)) * 100;
      time.textContent = `Вы проиграли, открыто ${score}% карточек`;
    }

  }

  function createField() {
    time = document.createElement('div');
    time.classList.add('timer');
    for (let i = 0; i < cards.length; i++) {
      cardContainer = document.createElement('button');
      card1 = document.createElement('a');
      cardInner = document.createElement('div');
      cardBack = document.createElement('div');
      cardFront = document.createElement('div');

      cardContainer.classList.add('card-container');
      card1.classList.add('card1');
      cardInner.classList.add('card-inner');
      cardBack.classList.add('card-back');
      cardFront.classList.add('card-front');

      cardContainer.dataset.item = cards[i];
      cardFront.textContent = 'CARD';
      cardBack.textContent = cards[i];
      cardContainer.id = i + 1;
      cardBack.id = 'back' + (i + 1);

      cardInner.append(cardBack, cardFront);
      card1.append(cardInner);
      cardContainer.append(card1);
      container.append(cardContainer);
      cardContainer.addEventListener('click', cardClick);
    }
    container.append(time);
    time.textContent = '60';
  }

  function inputSquare() {
    const textX = document.createElement('div');
    const inputX = document.createElement('input');
    const textY = document.createElement('div');
    const inputY = document.createElement('input');
    const button = document.createElement('button');

    textX.classList.add('text');
    textY.classList.add('text');
    container.classList.add('input__square');
    textX.textContent = 'Введите ширину поля ( допустимые значения 2, 4, 6, 8, 10)';
    textY.textContent = 'Введите высоту поля ( допустимые значения 2, 4, 6, 8, 10)';
    button.classList.add('btn');
    button.textContent = 'Начать игру';

    container.append(textX);
    container.append(inputX);
    container.append(textY);
    container.append(inputY);
    container.append(button);

    function timer() {
      if (time.textContent > 0) {
        time.textContent = Number(time.textContent) - 1;
      } else clearInterval(id);
    }

    function startGame() {
      const x = Number(inputX.value);
      const y = Number(inputY.value);

      createArray(x, y);
      createField();

      container.children[1].remove();
      container.children[1].remove();
      container.children[1].remove();
      container.children[1].remove();
      container.children[1].remove();
      container.classList.remove('input__square');

      clearInterval(id);
      id = setInterval(timer, 1000);
    }

    button.addEventListener('click', startGame);
  }

  inputSquare();


}());
