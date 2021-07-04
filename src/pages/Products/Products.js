import {useState, useEffect} from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import CustomerCard from '../../components/CustomerCard'
import { makeStyles } from '@material-ui/core/styles'
//import {Name, Password} from '../Admin'

import Edit from './Edit'
import {
    useHistory,
    useParams,
  } from 'react-router-dom'

const useStyles  = makeStyles((theme)  => ({
    root:{
        flexGrow:1,
    },
    card: {
        padding: theme.spacing(2),        
    },
    items: {
        alignContent: 'center',
    }
}))


const Products = () => {
    const {prod} = useParams()
    const classes = useStyles()

    const [products, setProducts] = useState([])
    
    console.log(prod)
    //Tentar colocar /antes do caminho pra selecionar o tipo de produto que quer
    //função que faz o get dos produtos
    useEffect(() => {
        axios.get ('https://api-trequinhos.herokuapp.com/')/* ('http://localhost:8080/api/products') */
        .then(response => {
            const data = response.data
            if(prod==='all' || prod ==='admin'){
                setProducts(data)
            } else {
                
                const dados = data.filter(datas=>datas.category===prod)
                
                setProducts(dados)
            }
        })

        

    }, [])

    //Função que remove os produtos

    
    const handleRemoveProduct = id => {
        axios.delete (`https://api-trequinhos.herokuapp.com/${id}`)   /* (`http://localhost:8080/api/products/${id}`) */
         .then(response => {
             
            axios.get ('https://api-trequinhos.herokuapp.com/')/* ('http://localhost:8080/api/products') */
             .then(response => {
            const data = response.data


            setProducts(data)
        })
        
         })
    }


    //Função que editar os produtos
    const history = useHistory()

    const handleMenuClick = (route) => {
        history.push(route)        
      }


    const handleEditProduct = (id) => {
        

        handleMenuClick(`edit/${id}`)
       
    }
   
   //console.log(`usuario esta - ${Name} - password ${Password}`)

    return(
        <>                                 
            <Grid container className={classes.items}>
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
                        onEditProduct={handleEditProduct}            
                />
                    </Grid>
                ))
            }
            </Grid>
        
        </>
    )
}


export default Products