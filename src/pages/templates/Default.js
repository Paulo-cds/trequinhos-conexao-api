import Header from '../partials/Header'
import Container from '@material-ui/core/Container'

import teal from '@material-ui/core/colors/teal'

import { makeStyles } from '@material-ui/core/styles'




const useStyles = makeStyles(() => ({
    container: {
        padding: '15px 0',
        backgroundColor: teal[400],
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
        </>
    )
}


export default Default