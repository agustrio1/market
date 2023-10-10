import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth} from '../firebase' 

export const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => { 
    const [currentUser, setCurrentUser] = useState(null)
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
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          alert("Login gagal: " + error.message);
        }
      }
      

      const logout = async () => {
        try {
          await signOut(auth);
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
