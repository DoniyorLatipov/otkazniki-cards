class CardsStorageService {
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  isCooldownOver(lastFlipTimeString) {
    if (!lastFlipTimeString) return true;

    const lastFlipTime = new Date(lastFlipTimeString);
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    return now - lastFlipTime >= ONE_DAY;
  }
}

const cardsStorageService = new CardsStorageService();
export default cardsStorageService;
