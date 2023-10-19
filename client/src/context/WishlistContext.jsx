import React, { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
      const storedWishlist = localStorage.getItem('wishlist')
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist))
      }
    }, [])

    const isProductInWishlist = (productId) => {
        return wishlist.some((product) => product.id === productId)
      }

    const addToWishlist = (product) => {
      setWishlist((prevWishlist) => {
        const newWishlist = [...prevWishlist, product]
        localStorage.setItem('wishlist', JSON.stringify(newWishlist))
        return newWishlist
      })
    }

    const removeFromWishlist = (productId) => {
      setWishlist((prevWishlist) => {
        const newWishlist = prevWishlist.filter((item) => item.id !== productId)
        localStorage.setItem('wishlist', JSON.stringify(newWishlist))
        return newWishlist
      })
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