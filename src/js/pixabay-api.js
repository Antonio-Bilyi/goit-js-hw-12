import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50309371-d07515f8c9a862bfe72f170ff';
export const PAGE_SIZE = 15;

export async function getImagesByQuery(query, page) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                page,
                per_page: PAGE_SIZE,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
