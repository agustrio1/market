import React, { Fragment, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { wishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser);
          localStorage.setItem("user", JSON.stringify(authUser));
        } else {
          setUser(null);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("user");
      localStorage.removeItem("wishlist");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
          </div>
          <div className="p-6 bg-white border-b border-gray-200">
            {user ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={`${user.displayName}'s profile`}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4a4 4 0 110 8 4 4 0 010-8z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 10v2a7 7 0 01-14 0v-2m14 0a7 7 0 00-14 0m14 0c0 3.87-3.13 7-7 7s-7-3.13-7-7m14 0a7 7 0 0114 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="text-lg font-semibold">
                    {user.displayName || user.email}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                  Logout
                </button>
                <h3 className="text-xl text-center font-semibold text-gray-800 mt-10 mb-4">
                  Wishlist
                </h3>
                {wishlist.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-3">
                    {wishlist.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 mx-auto">
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.title}
                            loading="lazy"
                            className="w-40 h-40 rounded-full"
                          />
                        </Link>
                        <div className="p-4">
                          <h2 className="text-gray-800 text-md font-semibold">
                            {product.title}
                          </h2>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-red-500 cursor-pointer">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  Please log in to view your profile.
                </p>
                <Link
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm"
                  to={"/login"}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
