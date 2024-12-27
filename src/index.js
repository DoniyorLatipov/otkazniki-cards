import cardsStorageService from './storageService.js';

// local storage service
const STORAGE_KEYS = {
  FLIPPED_CARDS: 'flippedCards',
  LAST_FLIP_TIME: 'lastFlipTime',
};

const getFlippedCardsId = () => cardsStorageService.get(STORAGE_KEYS.FLIPPED_CARDS) || [];

const saveFlippedCardsId = (data) => {
  cardsStorageService.set(STORAGE_KEYS.FLIPPED_CARDS, data);
};

const getLastFlipTime = () => cardsStorageService.get(STORAGE_KEYS.LAST_FLIP_TIME);

const saveLastFlipTime = (data) => cardsStorageService.set(STORAGE_KEYS.LAST_FLIP_TIME, data);

// init
const flippedCardsId = getFlippedCardsId();
flippedCardsId.forEach((cardId) => {
  const cardEl = document.querySelector(`.cards-table__flip-card[data-id="${cardId}"]`);
  if (cardEl) cardEl.classList.add('flipped');
});

const popUpContainer = document.getElementById('popUpContainer');
const popUpTimer = document.getElementById('popUpTimer');
const popUpButton = document.getElementById('popUpButton');

popUpButton.addEventListener('click', () => {
  popUpContainer.classList.remove('active');
});

// eventListener
const cardsContainer = document.getElementById('cardsTable');
cardsContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('cards-table__flip-card-illustration')) return;
  const cardEl = e.target.closest('.cards-table__flip-card');

  if (cardEl.classList.contains('flipped')) return;

  const lastFlipTime = getLastFlipTime();
  if (!cardsStorageService.isCooldownOver(lastFlipTime)) {
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();
    const hoursUntilNextCLick = 25 - Math.ceil((now - lastFlipTime) / ONE_HOUR);

    popUpTimer.textContent = hoursUntilNextCLick;
    popUpContainer.classList.add('active');
    return;
  }

  const flippedCardsId = getFlippedCardsId();
  const id = cardEl.dataset.id;
  const now = Date.now();

  saveLastFlipTime(now);
  saveFlippedCardsId([...flippedCardsId, id]);
  cardEl.classList.add('flipped');
});
