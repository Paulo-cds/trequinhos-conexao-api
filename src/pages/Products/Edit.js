import {useState, useRef, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useParams, useHistory} from 'react-router-dom'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Toasty from '../../components/Toasty'
import {db} from '../../firebase'
import './styleEdit.scss'
import { useDropzone } from 'react-dropzone'
import { BiTrash } from "react-icons/bi"
import {
    getStorage,
    ref,
    listAll,
    getDownloadURL,
    deleteObject,
    uploadBytesResumable
  } from 'firebase/storage'

const useStyles = makeStyles((theme) => ({
    wrapper: {     
        margin: theme.spacing(3),      
    },
    buttonProgress: {        
        position: 'absolute',        
        marginTop: 5,
        marginLeft: -70,              
    },
  }));


const Edit = () => {
    const {id} = useParams()
    const history = useHistory()        
    const [cat, setCat] = useState('')
    const classes = useStyles()
    const [imageUpload, setImageUpload] = useState([]) 
    const [imageDefault, setImageDefault] = useState([])    
    const [nameProduct, setNameProduct] = useState()
    const [categoryProduct, setCategoryProduct] = useState()

    const [form, setForm] = useState({
        name:{
            value:'',
            error: false,
        },
        category:{
            value:'',
            error: false,
        },
        description:{
            value:'',
            error: false,
        },
        urlImage:{
            value:'',
            error: false,
        },
    })

    useEffect(() => {        
        /******Função que faz o Get dos produtos******/                         
        let ref = db.collection(`produtoss`).doc(id)
        ref.get()                    
            .then((doc) => {          
                let newProducts = doc.data()                          
                setForm({
                  name: newProducts.nome,
                  description: newProducts.descricao,
                  category: newProducts.categoria      
                })
                setNameProduct(newProducts.nome)
                setCategoryProduct(newProducts.categoria)
                listItem(newProducts.nome, newProducts.categoria)               
              })         
    }, [])          
    const [openToasty, setOpenToasty] = useState(false)    
    const [progressLoading, setprogressLoading] = useState(false)    
    const timer = useRef()
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: 
                value,            
        })
    }
    
    const handleRegisterButton = () => {
        if (!progressLoading) {            
            setprogressLoading(true);
            timer.current = window.setTimeout(() => {                
              setprogressLoading(false)    
                let hasError = false
                let newFormState = {
                    ...form,
                }                
                if(!form.name){
                    hasError = true
                    newFormState.name = {                        
                        error: true,
                        helperText: 'Digite o nome corretamente'
                    }
                }
                if(!form.category){
                    hasError = true
                    newFormState.category = {                      
                        error: true,
                        helperText: 'Digite a categoria corretamente'
                    }
                }
                if(!form.description){
                    hasError = true
                    newFormState.description = {                        
                        error: true,
                        helperText: 'Digite a descrição corretamente'
                    }
                }               
                if(hasError) {
                    setForm(newFormState)
                } else{                                            
                    handleEdit()
                }                    
            }, 3000)                
        }  
                     
    }

     /****função de edição das imagens******/
     const handleEdit = () => {        
        const storage = getStorage();
        addProp()        
        const formData = new FormData()
        if(imageUpload. length > 0){
          imageUpload.forEach(file =>{
            const storageRef = ref(storage, `produtos/${categoryProduct}/${nameProduct}/` + file.name); 
            const uploadTask = uploadBytesResumable(storageRef, file);              
            uploadTask.on('state_changed',
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;                
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              },
              (error) => {                
                switch (error.code) {
                  case 'storage/unauthorized':                   
                    break;
                  case 'storage/canceled':                    
                    break;  
                  case 'storage/unknown':                    
                    break;
                }
              },
              () => {                
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {                
                })                
              }
            )
          })
        }   
      }  
  
      /******Função que edita no firestore******/
      const addProp = async () => {                      
        await db.collection(`produtoss`).doc(id).update(      
          {
            nome: form.name,
            descricao: form.description,
            categoria: form.category
          }
        ).then(() => {
            setOpenToasty(true)     
        })
        .catch((err) => {console.log(err)})
      } 

      /*****upload imagem*******/
    const { getRootProps, getInputProps } = useDropzone({
        accepted: 'images/*',
        onDrop: (acceptedFile) => {
        const newFiles = acceptedFile.map(file => {        
            return Object.assign(file, {
            preview: URL.createObjectURL(file)
            })        
        })
        setImageUpload([
            ...imageUpload,
            ...newFiles,               
        ])
        }
    })

    const handleRemoveFile = fileName => {
        const newFileState = imageUpload.filter(file => file.name !== fileName)
        setImageUpload(newFileState)
      }
    
      const handleDelete = (image) => {
        const storage = getStorage()
    
        // Create a reference to the file to delete
        const desertRef = ref(storage, `${image}`);
    
        // Delete the file
        deleteObject(desertRef).then(() => {       
          listItem()    
        }).catch((error) => {
          console.log(error)
        });
      }
    
      const listItem = (name, category) => {
        console.log('name ', nameProduct)
        setImageDefault([])    
        const storage = getStorage()
        const listRef = ref(storage, nameProduct ? 
          `produtos/${categoryProduct}/${nameProduct}` : 
          `produtos/${category}/${name}`)
    
        listAll(listRef)
          .then(res => {
            res.items.forEach((item) => {
              getDownloadURL(item)
                .then((url) => {
                  setImageDefault(prevState => [...prevState, { url: url, referencia: item }])
                })
            })
          })
          .then('default ',imageDefault)
          .catch(err => {
            alert(err.message);
          })
      }

         

    return(
        <>
            <div className={classes.wrapper}>
                <TextField 
                    error={form.name.error} 
                    helperText={form.name.error ? form.name.helperText : ''} 
                    id="standard-basic" 
                    label="Nome"
                    name='name' 
                    value={form.name.value} 
                    defaultValue={form.name.value}
                    onChange={()=>{alert('Não é possível alterar o nome!')}}
                />     
            </div>

            <div className={classes.wrapper}>
            <InputLabel> Categoria </InputLabel>
            <Select
                className={classes.selec}
                labelId="demo-simple-select-label"                
                value={cat}
                onChange={handleInputChange}
                error={form.category.error}                 
                id="standard-basic" 
                label="Categoria"
                name='category'
            >
                <MenuItem value={'corpo'}>Corpo</MenuItem>
                <MenuItem value={'rosto'}>Rosto</MenuItem>
                <MenuItem value={'casa'}>Casa</MenuItem>
                <MenuItem value={'masculino'}>Masculino</MenuItem>
                <MenuItem value={'resina'}>Resina</MenuItem>
            </Select> 
            </div>

            <div className={classes.wrapper}>
                <TextField 
                error={form.description.error} 
                helperText={form.description.error ? form.description.helperText : ''} 
                id="standard-basic" 
                label="Descrição"
                name='description' 
                defaultValue={form.description.value}
                value={form.description.value} 
                onChange={handleInputChange}
                />     
            </div>            

            <div className='thumbsContainer'>
                <div className='dropzone' {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                    Para adicionar novas imagens clique aqui ou arraste a imagem.
                </p>
                </div>
                {
                    imageUpload.length === 0 && imageDefault &&
                    imageDefault.map(file => (
                        <div
                        key={file.name}
                        className='thumb'
                        style={{ backgroundImage: `url(${file.url})` }}
                        >
                        <div className='mask' >
                            <BiTrash className='maskTrash' color='white' size='2em' onClick={() => handleDelete(file.referencia)} />
                        </div>
                        </div>
                    ))
                }
                {
                    imageUpload &&
                    imageUpload.map(file => (
                        <div
                        key={file.name}
                        className='thumb'
                        style={{ backgroundImage: `url(${file.preview})` }}
                        >
                        <div className='mask' >
                            <BiTrash className='maskTrash' color='white' size='2em' onClick={() => handleRemoveFile(file.name)} />
                        </div>
                        </div>
                    ))
                }
            </div>

            <div className={classes.wrapper}>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleRegisterButton} 
                    disabled={progressLoading}>
                        Alterar
                    </Button>
                    {progressLoading && <CircularProgress 
                    size={24} 
                    className={classes.buttonProgress} 
                    />}
            </div>

            <Toasty 
            open={openToasty} 
            severity='success' 
            text='Produto alterado com sucesso!' 
            onClose={() => setOpenToasty(false)}  
            handle={()=>window.history.back()}          
            />
        
        </>
    )
}


export default Edit