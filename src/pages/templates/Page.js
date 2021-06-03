
import Typography from '@material-ui/core/Typography'
import teal from '@material-ui/core/colors/teal'

import { makeStyles } from '@material-ui/core/styles'




const useStyles = makeStyles(() => ({
    container: {
        padding: '15px 0',
        backgroundColor: teal[400],
    }
}))


const Page = ({title, Component}) => {
    const classes = useStyles()
    return(
        <>
            <Typography variant='h3'>
                {title}
            </Typography>
            <Component />
        </>
    )
}


export default Page