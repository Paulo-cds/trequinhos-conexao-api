import {createContext} from 'react'



const StoreContext = createContext({
    token: false,
    setToken: () => {},
})

export default StoreContext