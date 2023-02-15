// Тень у шапки сайта при скролле

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll > 0) {
    $("#header").addClass("header__shadow");
  } else {
    $("#header").removeClass("header__shadow");
  }
});

// Константы и переменные
const bikesSelect = document.querySelectorAll(".bikes__links");
const bikesSurface = document.querySelectorAll(".bikes__surface-link");
const switcher = document.querySelectorAll(".theme-switcher");
const selector = document.querySelector(".bikes__select");
const formInput = document.querySelector(".form__input");
const formButton = document.querySelector(".form__button");
const formEmail = document.querySelector(".footer__input_type_email");
const popupSubmit = document.querySelector("#popup-submit");
const buttonClose = document.querySelector(".popup__button-close");
const slider = document.querySelector(".specification");
const sliderBox = document.querySelector(".specification__box");
const sliderItems = document.querySelectorAll(".specification__item");
const previousSlide = document.querySelector("#slider-previous");
const nextSlide = document.querySelector("#slider-next");

// Слайдер

let offset = 0;

function checkButton() {
  previousSlide.disabled = offset <= 0;
  nextSlide.disabled =
    offset >= sliderBox.offsetWidth * (sliderItems.length - 1);
}

function showSlides(previous, next) {
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
}

showSlides(previousSlide, nextSlide);
checkButton();

// Функция переключения слайдов
function switcherSelector(button, select) {
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function () {
      for (let j = 0; j < select.length; j++) {
        select[j].classList.remove("bikes__links_opened");
        button[j].classList.remove("bikes__surface-link_active");
      }
      button[i].classList.add("bikes__surface-link_active");
      select[i].classList.add("bikes__links_opened");
    });
  }
}

switcherSelector(bikesSurface, bikesSelect);

function selectItem(selector, select) {
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
}

selectItem(selector, bikesSelect);

// Открытие и закрытие попапа

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("mousedown", closePopupMousedown);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("mousedown", closePopupMousedown);
}

function closePopupEsc(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopupMousedown(e) {
  if (e.target.classList.contains("popup_opened")) {
    closePopup(e.target);
  }
}

buttonClose.addEventListener("click", function (e) {
  e.preventDefault();
  formEmail.value = "";
  closePopup(popupSubmit);
});

// Отмена отправки формы

form.addEventListener("submit", function (e) {
  e.preventDefault();
  formEmail.value = "";
  openPopup(popupSubmit);
});
