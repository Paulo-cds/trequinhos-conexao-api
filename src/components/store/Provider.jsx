import React from 'react'
import Context from './Context'
import useStorage from '../../pages/partials/useStorage'




const StoreProvider = ({children}) => {
    const [token, setToken] = useStorage('token')

    
    return(
        <Context.Provider
            value={{
                token,
                setToken,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default StoreProvider

