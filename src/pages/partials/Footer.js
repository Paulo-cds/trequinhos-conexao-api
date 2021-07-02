import { makeStyles } from '@material-ui/core/styles'
import NavigationIcon from '@material-ui/icons/Navigation';



const useStyles = makeStyles (() => ({
    foot:{
        width: '100%',
        height: '50px',
        margin: '0',
        backgroundColor: 'black',
        color: '#dfe4e6',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto:{        
        tedxtAlign: 'center',
        color: '#dfe4e6',
        textDecoration: 'none',
        //position: 'relative',
    },
    goTop:{
       marginLeft:'1rem',
       position: 'absolute',
       left: '1rem',
       
        color: 'white',
        cursor: 'pointer'
       
    },
}))

var scrollTop = function() {
    window.scrollTo({top: 0,left: 0 , behavior: 'smooth'});
}



const Footer = () => {
    const classes = useStyles()
    return(
        <footer className={classes.foot}>            
            <NavigationIcon className={classes.goTop} onClick={scrollTop}/>    
            
            <a className={classes.texto} 
                href='https://www.instagram.com/webdeveloper.paulorpd/' 
                target='blank'>
                Desenvolvido por  @webdeveloper.paulorpd
            </a>  

            
        </footer>
    )
}

export default Footer