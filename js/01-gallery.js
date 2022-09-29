import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

// Виконуй це завдання у файлах 01-gallery.html
// і 01 - gallery.js.Розбий його на декілька підзавдань:

// Створення і рендер розмітки на підставі масиву даних
// galleryItems і наданого шаблону елемента галереї.
// Реалізація делегування на div.gallery і отримання
// url великого зображення.
// Підключення скрипту і стилів бібліотеки модального
// вікна basicLightbox.Використовуй CDN сервіс jsdelivr
// і додай у проект посилання на мініфіковані(.min)
// файли бібліотеки.
// Відкриття модального вікна по кліку на елементі
// галереї.Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> в модальному
// вікні перед відкриттям.Використовуй готову розмітку
// модального вікна із зображенням з прикладів
// бібліотеки basicLightbox.

const galleryEl = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" /></a></div>`
  )
  .join('');

galleryEl.innerHTML = markup;

galleryEl.addEventListener('click', onImgClick);

function onImgClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  const urlOfModalElem = event.target.dataset.source;
  const altOfModalElem = event.target.alt;

  addModal(urlOfModalElem, altOfModalElem);
  closeModalByEsc();
}

function addModal(source, alt) {
  const instance = basicLightbox.create(`
      <img src="${source}" alt="${alt}" width="800" height="600">
`);
  instance.show();
}

function closeModalByEsc() {
  const basicLightboxEl = document.querySelector('div.basicLightbox ');

  document.addEventListener('keydown', onModalClose);

  function onModalClose(event) {
    if (event.key !== 'Escape') {
      return;
    }
    basicLightboxEl.remove();
    document.removeEventListener('keydown', onModalClose);
  }
}
