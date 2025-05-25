import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {
    createGallery, clearGallery, showLoader,
    hideLoader, showLoadMoreButton, hideLoadMoreButton,
} from "./js/render-functions";
import { getImagesByQuery, PAGE_SIZE } from "./js/pixabay-api";

const formEl = document.querySelector('.form');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreEl = document.querySelector('.load-more-button');

let query;
let page = 1;
let maxPage = 0;

function scrollNextImages() {
    const firstImage = document.querySelector('.gallery-item');

    if (!firstImage) return;

    const imageHeight = firstImage.getBoundingClientRect().height;

    window.scrollBy({
        top: imageHeight * 2,
        behavior: "smooth",
    })

}

formEl.addEventListener('submit', async e => {
    e.preventDefault();

    clearGallery();

    query = e.target.elements['search-text'].value.trim();
    page = 1;

    if (query === '') {
        iziToast.warning({
          title: 'Attentione',
          message: 'The field cannot be empty!',
          position: 'topRight'
        });
        return;
    }

    showLoader();

    try {
        const res = await getImagesByQuery(query, page);
        const images = res.hits;

        if (images.length === 0) {
            iziToast.warning({
                title: 'Sorry',
                message: 'There are no images matching your search query. Please try again!',
                position: 'topRight',
                timeout: 3000,
            });

            hideLoadMoreButton();

            return;
        }

        createGallery(images);

        maxPage = Math.ceil(res.totalHits / PAGE_SIZE);
      
        if (page < maxPage) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();

            iziToast.warning({
                title: 'Sorry',
                message: 'We are sorry, but you have reached the end of search results',
                position: 'topRight',
                timeout: 3000,
            });
        }
   } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            position: 'topRight',
        });
        console.error(error);
    } finally {
        hideLoader();

        e.target.reset();
    }
});

loadMoreEl.addEventListener('click', async e => {
    page += 1;

    showLoader();

    try {
        const res = await getImagesByQuery(query, page);
        const images = res.hits;

        createGallery(images);

        scrollNextImages();
    
        if (page < maxPage) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();

            iziToast.warning({
                title: 'Sorry',
                message: 'We are sorry, but you have reached the end of search results',
                position: 'topRight',
                timeout: 3000,
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            position: 'topRight',
        });
        console.error(error);
    } finally {
        hideLoader();
    }
});