import React, { useState } from 'react'
import AuthContext from './AuthContext'

const AuthProvider = (props) => {
    const [authToken, setauthToken] = useState('');
    if (authToken !== '') {
        localStorage.setItem('AudioAce_Token', authToken);
    }
    return (
        <AuthContext.Provider value={{ authToken, setauthToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
