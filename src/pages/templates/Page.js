
import Typography from '@material-ui/core/Typography'
import teal from '@material-ui/core/colors/teal'

import { makeStyles } from '@material-ui/core/styles'
import Whats from '../../images/whats.PNG'

import {RubberBand} from 'animate-css-styled-components'




const useStyles = makeStyles(() => ({
    title: {
        marginBottom: '1rem',
    },
    text: {
        textAlign: 'center',
        margin: '-7rem 0 7rem',
        //minHeight: '50vh'
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
   
   
}))


const Page = ({title, Component}) => {
    const classes = useStyles()
    return(
        <>
            <Typography variant='h3' className = {classes.text}>
                <div className = {classes.title}>
                <RubberBand duration='2s' delay='0.5s'>
                    {title}  
                </RubberBand> 
                                 
                </div>
                <div>
                <a href="https://bit.ly/3oJJjIE" target="_blank" >
                    <img src={Whats} alt='Logo whatsaap' className = {classes.whats}/>                    
                </a>
                </div>                            
            </Typography>
            <Component />
        </>
    )
}


export default Page