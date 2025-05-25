import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const loaderEl = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');
const loadMoreEl = document.querySelector('.load-more-button');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

export function createGallery(images) {
    const markup = images
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
            `<li class="gallery-item">
      <a href="${largeImageURL}">
        <img
          class="gallery-img"
          src="${webformatURL}"
          alt="${tags}"
        />
      </a>
      <div class="info">
        <p class="info-descr">Likes: ${likes}</p>
        <p class="info-descr">Views: ${views}</p>
        <p class="info-descr">Comments: ${comments}</p>
        <p class="info-descr">Downloads: ${downloads}</p>
      </div>
    </li>`
        ).join(''); 
    
    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}

export function showLoadMoreButton() {
    loadMoreEl.classList.remove('hidden');    
}
export function hideLoadMoreButton() {
    loadMoreEl.classList.add('hidden');
}

