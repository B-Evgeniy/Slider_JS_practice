(function (time = 2000) {
  let slides = document.querySelectorAll('.slide');
  let prevButton = document.querySelector('#previous');
  let pauseButton = document.querySelector('#pause');
  let nextButton = document.querySelector('#next');
  let controlBlock = document.querySelector('.controls');
  let indicatorsContainer = document.querySelector('.indicators-container')
  let indicators = document.querySelectorAll('.indicator')
  let carouselWrapper = document.querySelector('#carousel');

  let isPlaying = true;
  let interval = time;
  let timerId = null;
  let currentSlide = 0;

  let swipeStartX = null;
  let swipeEndX = null;

  const SPACE = ' ';
  const LEFT_ARROW = 'ArrowLeft';
  const RIGHT_ARROW = 'ArrowRight';


  function gotoSlide(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (slides.length + n) % slides.length;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  };

  function gotoNext() {
    gotoSlide(currentSlide + 1);

  };

  function gotoPrev() {
    gotoSlide(currentSlide - 1);

  };

  function pause() {
    if (isPlaying == true) {
      isPlaying = !isPlaying;
      pauseButton.innerHTML = 'Play';
      clearInterval(timerId);
    }
  };

  function play() {
    isPlaying = !isPlaying;
    pauseButton.innerHTML = 'Pause';
    timerId = setInterval(gotoNext, interval);
  };

  function next() {
    pause();
    gotoNext();
  };

  function prev() {
    pause();
    gotoPrev();
  };

  function pausePlay() {
    if (isPlaying == true) { pause(); }
    else { play(); }
  };

  function indicating(e) {
    let target = e.target;
    if (target.classList.contains('indicator')) {
      pause();
      gotoSlide(Number(target.getAttribute('data-slide-to')));
    }
  };

  function pressKey(e) {
    let key = e.key;
    if (key === LEFT_ARROW) { prev() };
    if (key === RIGHT_ARROW) { next() };
    if (key === SPACE) { pausePlay() };
  };

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX
  };

  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX
    if ((swipeStartX - swipeEndX) > 100) { next() };
    if ((swipeStartX - swipeEndX) < -100) { prev() };
  };

  const setListeners = function () {
    pauseButton.addEventListener('click', pausePlay);
    prevButton.addEventListener('click', prev);
    nextButton.addEventListener('click', next);
    indicatorsContainer.addEventListener('click', indicating);
    document.addEventListener('keydown', pressKey);
    carouselWrapper.addEventListener('touchstart', swipeStart);
    carouselWrapper.addEventListener('touchend', swipeEnd);
  };

  const init = function () {
    controlBlock.style.display = 'flex';
    indicatorsContainer.style.display = 'flex';
    setListeners();
    timerId = setInterval(gotoNext, interval);
  };

  init();
})();


