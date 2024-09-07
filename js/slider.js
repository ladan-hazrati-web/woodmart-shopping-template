const sliderHeader = new Swiper("#sliderHeader", {
  // Optional parameters
  loop: true,
  effect: "fade",
  speed: 200,
  autoplay: {
    delay: 10000,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slider1 = new Swiper("#slider1", {
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 2,
  slidesPerGroup: 2,
  breakpoints: {
    960: {
      slidesPerView: 3,
    },
  },
});
const slider2 = new Swiper("#slider2", {
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 2,
  slidesPerGroup: 2,
  breakpoints: {
    960: {
      slidesPerView: 3,
    },
  },
});

const slider4 = new Swiper("#slider4", {
  // Optional parameters
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  breakpoints: {
    800: {
      slidesPerView: 4,
      spaceBetween: 30,
      slidesPerGroup: 4,
    },
  },
});
