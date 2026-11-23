// Expire dated notices at the restaurant's midnight, including for visitors traveling.
const restaurantDate = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit'
});
function updateNotices() {
  const today = restaurantDate.format(new Date());
  document.querySelectorAll('[data-hide-after]').forEach(notice => {
    notice.hidden = today >= notice.dataset.hideAfter;
  });
}
updateNotices();
document.querySelector('#year').textContent = String(new Date().getFullYear());
window.addEventListener('pageshow', updateNotices);
document.addEventListener('visibilitychange', updateNotices);

const nav = document.querySelector('.nav');
const toggle = nav.querySelector('.nav-toggle');
toggle.hidden = false;
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
}
toggle.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true'));
});
document.addEventListener('click', event => {
  if (!nav.contains(event.target) || event.target.closest('a')) closeMenu();
});
document.addEventListener('focusin', event => {
  if (!nav.contains(event.target)) closeMenu();
});
nav.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
window.matchMedia('(max-width: 54rem)').addEventListener('change', closeMenu);

const track = document.querySelector('.gallery-track');
const photos = [...track.querySelectorAll('.gallery-item')];
const previous = document.querySelector('#gallery-prev');
const next = document.querySelector('#gallery-next');
document.querySelector('.gallery-controls').hidden = false;

function updateGalleryButtons() {
  previous.disabled = track.scrollLeft <= 1;
  next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
}
function scrollGallery(direction) {
  const step = photos[1].offsetLeft - photos[0].offsetLeft;
  track.scrollBy({ left: direction * step });
}
previous.addEventListener('click', () => scrollGallery(-1));
next.addEventListener('click', () => scrollGallery(1));
track.addEventListener('scroll', updateGalleryButtons, { passive: true });
new ResizeObserver(updateGalleryButtons).observe(track);
updateGalleryButtons();

const viewer = document.querySelector('.viewer');
const largePhoto = document.querySelector('#photo-large');
const caption = document.querySelector('#photo-caption');
const photoStatus = document.querySelector('#photo-status');
let currentPhoto = 0;
let opener;

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const item = photos[currentPhoto];
  const photo = item.querySelector('img');
  largePhoto.src = item.href;
  largePhoto.alt = photo.alt;
  caption.textContent = item.querySelector('span').textContent;
  photoStatus.textContent = 'Photo ' + (currentPhoto + 1) + ' of ' + photos.length;
}

// Each thumbnail is also a direct link to its photo when a dialog is unavailable.
if (typeof viewer.showModal === 'function') {
  photos.forEach((item, index) => {
    item.setAttribute('aria-haspopup', 'dialog');
    item.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = item;
      showPhoto(index);
      viewer.showModal();
    });
  });
  document.querySelector('#photo-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
  document.querySelector('#photo-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
  document.querySelector('#photo-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => opener?.focus({ preventScroll: true }));
}
