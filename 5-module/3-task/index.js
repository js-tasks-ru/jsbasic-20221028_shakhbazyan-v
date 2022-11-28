function initCarousel() {
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');
  let off = 0;
  let offset = carouselInner.offsetWidth;
  let slideNumber = 1;
  let slidesAmount = 4;

  carouselArrowLeft.style.display = "none";

  carouselArrowRight.addEventListener('click', function() {
    slideNumber++;
    off = off - offset;
    if (slideNumber === slidesAmount) {
      carouselArrowRight.style.display = 'none';
    }
    carouselInner.style.transform = "translateX(" + off + "px)";
    carouselArrowLeft.style.display = "";
  })

  carouselArrowLeft.addEventListener('click', function() {
    slideNumber--;
    off = off + offset;
    if (slideNumber === 1) {
      carouselArrowLeft.style.display = 'none';
    }
    carouselInner.style.transform = "translateX(" + off + "px)";
    carouselArrowRight.style.display = "";
  })

}
