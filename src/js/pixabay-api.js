import axios from 'axios';
import iziToast from 'izitoast';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49829256-73c1564e94f64863eabbb2525';

let page = 1;
let limit = 15;

export async function getImagesByQuery(query, page = 1, per_page = 15) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page,
        page,
    };

    try {
        const resp = await axios.get(BASE_URL, { params });
        return resp.data;
    } catch (error) {
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
        });
    }
}