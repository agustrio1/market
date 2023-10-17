import React, { createContext, useContext, useState } from 'react'

const WishlistContext = createContext()

export const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState([])

    const isProductInWishlist = (productId) => {
        return wishlist.some((product) => product.id === productId)
      }

    const addToWishlist = (product) => {
        setWishlist((prevWishlist) => [...prevWishlist, product])
    }

    const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) => 
        prevWishlist.filter((item => item.id !== productId))
        )
    }

    return (
        <WishlistContext.Provider value={{wishlist, isProductInWishlist, addToWishlist, removeFromWishlist }}>
        {children}
      </WishlistContext.Provider>
    )
}

export const useWishlist = () => {
    return useContext(WishlistContext);
  }