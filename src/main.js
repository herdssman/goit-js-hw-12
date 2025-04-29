import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery } from "./js/render-functions.js";
import { clearGallery } from "./js/render-functions.js";

const form = document.querySelector('.form');
const input = document.querySelector('input');
const loader = document.querySelector('.loader');
const btn = document.querySelector('.btn')

let page = 1;
const limit = 15;
let query = '';

function showLoader() {
    loader.style.display = 'flex';
}
function hideLoader() {
    loader.style.display = 'none';
}

function showLoadMoreButton() {
    btn.style.display = 'block';
}

function hideLoadMoreButton() {
    btn.style.display = 'none';
}

function insertEndMessage() {
  const messageHTML = `<p class="end-message">We're sorry, but you've reached the end of search results.</p>`;
  document.querySelector('.gallery').insertAdjacentHTML('afterend', messageHTML);
}

function removeEndMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) endMessage.remove();
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    showLoader();

    query = input.value.trim();
    page = 1;

    removeEndMessage();

    if (!query) {
        iziToast.warning({
            message: 'Please, enter a search query',
            color: 'yellow',
            position: 'topRight',
        })
        hideLoader();
        clearGallery();
        hideLoadMoreButton();
        return;
    }

    try {
        const data = await getImagesByQuery(query, page, limit);

        if (data.hits.length === 0) {
            iziToast.warning({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                color: 'yellow',
                position: 'topRight',
            })
            return;
        }

        clearGallery();
        createGallery(data.hits);
        showLoadMoreButton();

        if (data.hits.length < limit) {
            hideLoadMoreButton();
            insertEndMessage();
        }
        
    } catch (error) {
        iziToast.error({
            message: 'Something went wrong :(',
            position: 'topRight',
        })
    } finally {
        hideLoader();
    }
});


btn.addEventListener('click', async (event) => {
    event.preventDefault();

    page += 1;

    try {
        const data = await getImagesByQuery(query, page, limit);

        createGallery(data.hits);

        const { height: cardHeight } = document
            .querySelector('.gallery li')
            .getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });

        if (page * limit >= data.totalHits) {
            hideLoadMoreButton();

            if (!document.querySelector('.end-message')) {
                insertEndMessage();
            }
        }

    } catch (error) {
        iziToast.error({
            message: 'Failed to load more images.',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }



});