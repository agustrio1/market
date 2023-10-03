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

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout }}>
            {children} 
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
