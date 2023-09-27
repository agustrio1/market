import axios from "axios";

const fetchProduct = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default fetchProduct;
