import { makeStyles } from '@material-ui/core/styles'



const useStyles = makeStyles (() => ({
    foot:{
        width: '100%',
        height: '50px',
        margin: '0',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',        
    },
    texto:{        
        margin: '1% auto 0 auto',
        color: 'white',
        textDecoration: 'none',
        alignItems: 'center',
        position:'absolute',
        
    }
}))



const Footer = () => {
    const classes = useStyles()
    return(
        <footer className={classes.foot}>
            <a className={classes.texto} href='https://www.instagram.com/webdeveloper.paulorpd/' target='blank'>Desenvolvido por  @webdeveloper.paulorpd</a>              
        </footer>
    )
}

export default Footer