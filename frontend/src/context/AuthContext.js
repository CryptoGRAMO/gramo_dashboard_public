import React, { useEffect, useState } from "react";
import axios from 'axios'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) =>{
    const [isAuthEnticated, setIsAuthEnticated] = useState(false); 
    const [loginError, setLoginError] = useState(''); 
    const [signUpError, setsignUpError] = useState(''); 
    const [user, setUser] = useState([]); 
    const slugsToExcludeLayout = ["/login/","/signup/","/login","/signup","/reset_password/","/reset_password"]
    const [balance, setBalance] = useState(null); 
    const [envVariables, setEnvVariables] = useState(null); 


    const checkAuthenticated = async () => {
        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            } 
    
            const body = JSON.stringify({ token: localStorage.getItem('access') });
    
            try {
                const res = await axios.post('/auth/jwt/verify/', body, config)

                
                if(res.status == 200){
                    console.log("it is")
                    setIsAuthEnticated(true)
                    getUser()

                    getBalance()
                } else {
                    setIsAuthEnticated(false)
                }
        
            } catch (error) {
                setIsAuthEnticated(false)
                console.log(error.message)
                if(error.response.status == 401){
                    logout()
                }
            }
        } else {
            setIsAuthEnticated(false)
        }
    }

    const getBalance = async () =>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "JWT "+localStorage.getItem('access')
            }
        } 

        try {
            const res = await axios.get('/api/wallets', config)
            
            if(res.status == 200){
                console.log(res.data)
                setBalance(res.data)
            } 
    
        } catch (error) {
            console.log(error)
        }
    } 

    const getUser = async () => {
        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': "JWT "+localStorage.getItem('access')
                }
            } 
    
            try {
                const res = await axios.get('/auth/users/me/', config)
                
                if(res.status == 200){
                    // console.log(res)
                    setUser(res.data)
                } 
        
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("error")
        }
    }

    const login = async (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({ email, password });
    
        try {
            const res = await axios.post('/auth/jwt/create/', body, config)

            console.log(localStorage.getItem('urlrequested'))

            if(localStorage.getItem('urlrequested')){
                window.location.replace(`/${localStorage.getItem('urlrequested')}`)
            }

            localStorage.setItem('access', res.data.access);
            setIsAuthEnticated(true)
    
            // window.location.replace('/')
        } catch (error) {
            console.log(error)
            setLoginError('Error al entrar')
        }
    }

    const signup = async (name, email, password, re_password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({ name, email, password, re_password });
    
        try {
            const res = await axios.post('/auth/users/', body, config)
    

        } catch (error) {
            setsignUpError('Error creando user')
        }
    }

    const resetPassword = async ( email) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({ email});
    
        try {
            const res = await axios.post('/auth/users/reset_password/', body, config)
    

        } catch (error) {
            console.log('Error reset password')
        }
    }

    const logout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setIsAuthEnticated(false)
        window.location.replace('/login')
    }

    const activateUser = async (uid, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({ uid, token });
    
        try {
            const res = await axios.post('/auth/users/activation/', body, config)

        } catch (error) {
            console.log(error)
            setLoginError('Error al activar')
        }
    }

    const passwordResetConfirm = async (uid, token, new_password, re_new_password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({ uid, token, new_password, re_new_password });
    
        try {
            const res = await axios.post('/auth/users/reset_password_confirm/', body, config)

        } catch (error) {
            console.log(error)
            setLoginError('Error al activar')
        }
    }

    const getEnv = async () =>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "JWT "+localStorage.getItem('access')
            }
        } 

        try {
            const res = await axios.get('/api/envVariable', config)
            
            if(res.status == 200){
             
                setEnvVariables(res.data)
            } 
    
        } catch (error) {
            console.log(error)
        }
    } 

    const reqCheckEmail = async (email) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 

        const body = JSON.stringify({ email });

        try {
            const res = await axios.post('/api/checkemail', body, config)
            
            return res.data

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        checkAuthenticated()
        getEnv()
    },[])

    return (
        <AuthContext.Provider value={
            { 
                isAuthEnticated, 
                loginError, 
                login, 
                logout, 
                signUpError, 
                slugsToExcludeLayout, 
                signup, 
                activateUser, 
                user, 
                resetPassword,
                passwordResetConfirm,
                balance,
                getUser,
                getBalance,
                envVariables,
                reqCheckEmail
            }}>
            {children}
        </AuthContext.Provider>
    )
}