import axios from 'axios'

const fetchProduct = async () => {
    try {
        const response = await axios.get('http://fakestoreapi.com/products')
        return response.data
    } catch (error) {
        console.error('Error fetching products:', error);
    throw error;
    }
}

export default fetchProduct