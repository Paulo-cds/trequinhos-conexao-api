import Header from '../partials/Header'
import Container from '@material-ui/core/Container'
import Footer from '../partials/Footer'
import teal from '@material-ui/core/colors/teal'

import { makeStyles } from '@material-ui/core/styles'




const useStyles = makeStyles(() => ({
    container: {
        padding: '15px 20px',
        backgroundColor: teal[400],
        minHeight: '100vh',
    }
}))


const Default = ({children}) => {
    const classes = useStyles()
    return(
        <>
            <Header/>
            <Container className={classes.container}>
                {children}
            </Container>
            <Footer/>
        </>
    )
}


export default Default