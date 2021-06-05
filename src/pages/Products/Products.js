import {useState, useEffect} from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import CustomerCard from '../../components/CustomerCard'
import { makeStyles } from '@material-ui/core/styles'



const useStyles  = makeStyles((theme)  => ({
    root:{
        flexGrow:1,
    },
    card: {
        padding: theme.spacing(2),
        
    }
}))


const Products = () => {
    const classes = useStyles()

    const [products, setProducts] = useState([])

    console.log(products)


    //função que faz o get dos produtos
    useEffect(() => {
        axios.get ('http://localhost:8080/api/products')
        .then(response => {
            const data = response.data


            setProducts(data)
        })
    }, [])

    //Função que remove os produtos
    const handleRemoveProduct = id => {
        axios.delete(`http://localhost:8080/api/products/${id}`)
         .then(response => {
             
            axios.get ('http://localhost:8080/api/products')
             .then(response => {
            const data = response.data


            setProducts(data)
        })
        
         })
    }

    return(
        <>                                 

            <Grid container>
                {
                    products.map(item => (
                        <Grid item xs={12} md={4} xl={2}>
                            <CustomerCard 
                            id = {item._id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            urlImage={item.urlImage}        
                            className= {classes.card}   
                            onRemoveProduct={handleRemoveProduct}             
                    />
                        </Grid>
                    ))
                }
           </Grid>
        </>
    )
}


export default Products