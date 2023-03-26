// Тень у шапки сайта при скролле

$(window).scroll(() => {
  var scroll = $(window).scrollTop();
  if (scroll > 0) {
    $("#header").addClass("header__shadow");
  } else {
    $("#header").removeClass("header__shadow");
  }
});

// Константы и переменные

const page = document.querySelector(".page");
const bikesSelect = document.querySelectorAll(".bikes__links");
const bikesSurface = document.querySelectorAll(".bikes__surface-link");
const switcher = document.querySelector(".footer__input_type_switcher");
const selector = document.querySelector(".bikes__select");
const formEmail = document.querySelector("#form-email");
const popupSubmit = document.querySelector("#popup-submit");
const buttonClose = document.querySelector(".popup__button-close");
const slider = document.querySelector(".specification");
const sliderBox = document.querySelector(".specification__box");
const sliderButton = document.querySelectorAll(".specification__button");
const sliderItems = document.querySelectorAll(".specification__item");
const previousSlide = document.querySelector("#slider-previous");
const nextSlide = document.querySelector("#slider-next");
// Слайдер

let offset = 0;

const checkButton = () => {
  previousSlide.disabled = offset <= 0;
  nextSlide.disabled =
    offset >= sliderBox.offsetWidth * (sliderItems.length - 1);
};

const showSlides = (previous, next) => {
  next.addEventListener("click", () => {
    offset += sliderBox.offsetWidth;
    sliderBox.style.left = -offset + "px";
    checkButton();
  });

  previous.addEventListener("click", () => {
    offset -= sliderBox.offsetWidth;
    sliderBox.style.left = -offset + "px";
    checkButton();
  });
};

showSlides(previousSlide, nextSlide);
checkButton();

// Функция переключения слайдов

const switcherSelector = (button, select) => {
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => {
      for (let j = 0; j < select.length; j++) {
        select[j].classList.remove("bikes__links_opened");
        button[j].classList.remove("bikes__surface-link_active");
      }
      button[i].classList.add("bikes__surface-link_active");
      select[i].classList.add("bikes__links_opened");
    });
  }
};

switcherSelector(bikesSurface, bikesSelect);

const selectItem = (selector, select) => {
  selector.addEventListener("change", () => {
    select.forEach((item) => {
      item.classList.remove("bikes__links_opened");
      for (let i = 0; i < selector.length; i++) {
        if (selector.value === select[i].id) {
          select[i].classList.add("bikes__links_opened");
        }
      }
    });
  });
};

selectItem(selector, bikesSelect);

// Открытие и закрытие попапа

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("mousedown", closePopupMousedown);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("mousedown", closePopupMousedown);
};

const closePopupEsc = (e) => {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

const closePopupMousedown = (e) => {
  if (e.target.classList.contains("popup_opened")) {
    closePopup(e.target);
  }
};

switcher.addEventListener("click", () => {
  page.classList.toggle("page_theme_dark");
  sliderButton.forEach((button) => {
    button.classList.toggle("specification_button_theme_dark");
  })
});

buttonClose.addEventListener("click", (e) => {
  e.preventDefault();
  formEmail.reset();
  closePopup(popupSubmit);
});

// Отмена отправки формы

formEmail.addEventListener("submit", (e) => {
  e.preventDefault();
  formEmail.reset();
  openPopup(popupSubmit);
});
