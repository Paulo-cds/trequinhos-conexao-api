
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Whats from '../../images/whats.PNG'
import {RubberBand} from 'animate-css-styled-components'
import '../../styles/PageStyle.css'
import NavigationIcon from '@material-ui/icons/Navigation';
import logo from '../../images/logo.PNG'
import { useEffect, useState } from "react"


const useStyles = makeStyles(() => ({
    title: {
        marginBottom: '1rem',
        
    },
    text: {
        
        minHeight: '100vh'
    }, 
    whats:{
        height: '4rem',
        width: '4rem',  
        position: 'fixed',
        bottom: '2rem',
        right: '1rem',
        borderRadius: '100%',
        zIndex: 2,
    },


    head: {        
        width: '100%',        
        display: 'block',
        padding: 0,
        alignItems: 'center',   
        textAlign: 'center',
        
    },    
    logo: {
        width: '17rem',
        margin: '1rem auto 2rem' ,                
    },
    goTop:{        
        position: 'fixed',
        width: '6%',
        bottom: '1%',
        left: '1%',
        zIndex: 99,
        transition: 'all 1s ease',                     
        color: 'black',
        cursor: 'pointer',
        backgroundColor: '#dfe4e6',
        borderRadius: '100%',
        height: '2rem',
        marginLeft: '.5rem'
    }      
}))


const Page = ({title, Component}) => {
    const classes = useStyles()    
    const [navigation, setNavigation] = useState('hidden')        

    var scrollTop = function() {
        window.scrollTo({top: 0,left: 0 , behavior: 'smooth'});
    }


    const handleScroll = () => {
        const position = window.pageYOffset;            
        if(position > 400){
            setNavigation('visible')            
        } else {
            setNavigation('hidden')            
        }
      };

    window.addEventListener("scroll", handleScroll);        

    return(
        <>
            <Typography variant='h3' className = 'text'>
                
                <div className = {classes.head}>
                    <img src={logo} alt='Logo' className = {classes.logo}/>

                </div>

                <div className = {classes.title}>
                    <RubberBand duration='2s' delay='0.5s'>
                        {title}  
                    </RubberBand> 
                                 
                </div>
                <div>
                    <a href="https://bit.ly/3oJJjIE" target="_blank" >
                        <img src={Whats} alt='Logo whatsaap' className = {classes.whats}/>                    
                    </a>
                    <NavigationIcon style={{visibility:navigation}} className={classes.goTop} onClick={scrollTop}/> 
                </div>     
                                       
            </Typography>
            <Component />
        </>
    )
}


export default Page