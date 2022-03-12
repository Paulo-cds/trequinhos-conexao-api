import {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import CustomerCard from '../../components/CustomerCard'
import { makeStyles } from '@material-ui/core/styles'
import ReactLoading from 'react-loading'
import {db} from '../../firebase'
import Edit from './Edit'
import {
    useHistory,
    useParams,
  } from 'react-router-dom'
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL, 
  deleteObject,   
  uploadBytesResumable
  } from 'firebase/storage'


const useStyles  = makeStyles((theme)  => ({
    root:{
        flexGrow:1,
    },
    card: {
        padding: theme.spacing(2),        
    },
    items: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    loading: {
        margin: '0 auto',                   
    },
}))


const Products = () => {
    const {prod} = useParams()
    const classes = useStyles()
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState('block')
    const [produtos, setProdutos] = useState([])
    const [prodId, setProdId] = useState([])
    const [images, setImages] = useState([])
    const [searchTipo, setSearchTipo] = useState()
    const [searchCategoria, setSearchCategoria] = useState()
    const [refresh, setRefresh] = useState(false)
    
    
    useEffect(() => {                                 
      fetchProdutos()
      listItem()
    }, [refresh])


    /******Função que faz o Get dos produtos******/ 
    async function fetchProdutos() {                 
      let ref = db.collection(`produtoss`).where('categoria', '==', prod)
      ref.get()        
        .then((snapshot) => {             
          snapshot.forEach((doc) => {                         
            setProducts(prevState => [...prevState, doc.data()])   
            setProdId(prevState => [...prevState, doc.id]) 
            setLoader('none')   
          })                    
        })        
    }

    /******Função que faz o Get das imagens******/
    function listItem() {
      setImages([])
      const listRefix = ''
      const storage = getStorage()
      const listRef = ref(storage, `produtos/${prod}`)
      listAll(listRef)
        .then(res => {                                
          res.prefixes.map((prefix)=>{                  
            const listRefix = ref(storage, prefix._location.path)
            listAll(listRefix)
              .then(res => {                
                res.items.forEach((item) => {                                                            
                  getDownloadURL(item)
                    .then((url) => {                      
                      setImages(prevState => [...prevState, { name: item.parent.name, url: url, referencia: item }])                                                 
                    })                    
                })
              })              
          })                                
        })
        .then(console.log('images ', images))                 
        .catch(err => {
          alert(err.message);
        })
    }

    
    //Função que remove os produtos    
    const handleRemoveProduct = (id, image) => {  
        db.collection(`produtoss`).doc(id).delete()
        .then(() => {
          alert("Excluido com sucesso")          
        })
        .catch((err) => {console.log(err)})
    
    
        /*****Delete storage*****/
        const storage = getStorage()      
        image.map((file)=>{
          const desertRef = ref(storage, file.referencia.fullPath);      
          deleteObject(desertRef)
          .then(() => {   
            //setEditCard(false)     
            setRefresh(!refresh)             
          }).catch((error) => {
            console.log(error)
          });
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

    const filterImages = (prod) => {         
      let filter = []
      filter = (images.filter(image=> image.name === prod.nome))    
      if(filter.length > 0){
        //console.log('filter ', filter)
        return(       
          filter                             
        )    
      }
    }
    

    return(
        <>              
            <div style={{display: loader}} >
                <ReactLoading className={classes.loading} type={'bars'} color= {'black'} height= {'15%'} width= {'40%'}  /* style={{display: loader}} */ />
            </div>
            
            <Grid container className={classes.items}>
            {
                products.map((item, index) => (
                    <Grid item xs={12} md={4} xl={2}>
                        <CustomerCard 
                        id = {prodId[index]}
                        name={item.nome}
                        category={item.category}
                        description={item.descricao}
                        image={filterImages(item)}        
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