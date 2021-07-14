import logo from '../../images/logo.PNG'

import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(() => ({
    head: {
        
        width: '100%',
        height: '50vh',
        display: 'block',
        padding: 0,
        alignItems: 'center',   
        textAlign: 'center',
        
    },    
    logo: {
        width: '17rem',
        margin: '1rem auto 2rem' ,        
        /* borderRadius: '100%',
        boxShadow: '2px 2px 3px white', */
    }

}))

const Head = () => {
    const classes = useStyles()

    return(
        <div className = {classes.head}>
            <img src={logo} alt='Logo' className = {classes.logo}/>

        </div>
    )
}


export default Head