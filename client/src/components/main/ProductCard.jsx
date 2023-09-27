import React, {useEffect, useState} from 'react'
import fetchProduct from '../../utils/api'
import { Link } from 'react-router-dom'

const ProductCard = () => {
const [products, setProducts] = useState([])

useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await fetchProduct()
            setProducts(data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    fetchData()
}, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {products.map((product) => (
      <Link
        key={product.id}
        to={`/product/${product.id}`} // Tentukan URL tujuan untuk setiap produk
        className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-gray-800 text-xl font-semibold">
            {product.title}
          </h2>
          <p className="text-gray-600 mt-2">{product.category}</p>
          <p className="text-gray-800 font-bold mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    ))}
  </div>
  )
}

export default ProductCard