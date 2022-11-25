function initCarousel() {
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');
  let off = 0;
  let offset = carouselInner.offsetWidth;

  carouselArrowLeft.style.display = "none";

  carouselArrowRight.addEventListener('click', function() {
    off = off - offset;
    if (carouselInner.style.transform == "translateX(-1976px)") {
      carouselArrowRight.style.display = 'none';
    }
    carouselInner.style.transform = "translateX(" + off + "px)";
    carouselArrowLeft.style.display = "";
  })

  carouselArrowLeft.addEventListener('click', function() {
    off = off + offset;
    if (carouselInner.style.transform == "translateX(-988px)") {
      carouselArrowLeft.style.display = 'none';
    }
    carouselInner.style.transform = "translateX(" + off + "px)";
    carouselArrowRight.style.display = "";
  })

}
