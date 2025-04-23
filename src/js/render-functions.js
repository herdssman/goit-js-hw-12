import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const box = new SimpleLightbox('.gallery a');

const gallery = document.querySelector('.gallery');

export function clearGallery() {
    gallery.innerHTML = '';
}

export function createGallery(images) {

    const markup = images.map((image) => {
        return `<li class="g-item">
        <a href="${image.largeImageURL}"><img class="g-img" src="${image.webformatURL}" alt="${image.tags}"></a>
        <ul class="g-list">
        <li class="g-list-item"><span class="text">Likes</span> <span class="num">${image.likes}</span></li>
        <li class="g-list-item"><span class="text">Views</span> <span class="num">${image.views}</span></li>
        <li class="g-list-item"><span class="text">Comments</span> <span class="num">${image.comments}</span></li>
        <li class="g-list-item"><span class="text">Downloads</span> <span class="num">${image.downloads}</span></li>
        </ul>
        </li>`
    }).join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    box.refresh();
    
}