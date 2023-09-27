import axios from 'axios'

const fetchProductCategory = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};


export default fetchProductCategory