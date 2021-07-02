import Header from '../partials/Header'
import Head from '../partials/Head'
import Container from '@material-ui/core/Container'
import Footer from '../partials/Footer'
import teal from '@material-ui/core/colors/teal'

import { makeStyles } from '@material-ui/core/styles'




const useStyles = makeStyles(() => ({
    container: {
        padding: '15px 20px 6rem',
        backgroundColor: '#dfe4e6',
        minHeight: '50vh',       
    },
    body: {
        //height: '50vh',
        //height: 'fit-content',
    }
}))


const Default = ({children}) => {
    const classes = useStyles()
    return(
        <div className={classes.body}>
            <Header/>
            <Head/>
            <Container className={classes.container}>
                {children}
            </Container>
            <Footer/>
        </div>
    )
}


export default Default