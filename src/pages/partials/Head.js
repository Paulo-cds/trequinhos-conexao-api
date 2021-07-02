import logo from '../../images/logo.PNG'

import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(() => ({
    head: {
        background: 'rgb(30,5,70)',
        background: 'linear-gradient(180deg, rgba(30,5,70,1) 0%, rgba(140,46,121,1) 35%, rgba(223,228,230,1) 100%)',
        width: '100%',
        height: '50vh',
        display: 'block',
        padding: 0,
        alignItems: 'center',   
        textAlign: 'center',
        
    },    
    logo: {
        width: '14rem',
        margin: '2rem auto' ,        
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