import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => { 
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("currentUser");
        return savedUser ? JSON.parse(savedUser) : null;
      });
    const auth = getAuth()

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })

        return () => unSubscribe()
    }, [auth])

    const register = async (email, password) => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
          alert("Registrasi gagal: " + error.message);
        }
      }
      
      const login = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          setCurrentUser(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
        } catch (error) {
          alert("Login gagal: " + error.message);
        }
      }
      

      const logout = async () => {
        try {
          await signOut(auth);
          setCurrentUser(null);
    
          localStorage.removeItem("currentUser");
    
          alert("Anda telah logout.");
        } catch (error) {
          alert("Logout gagal: " + error.message);
        }
      }
      

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout }}>
            {children} 
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
