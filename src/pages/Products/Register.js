import {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import {db} from '../../firebase'
import Toasty from '../../components/Toasty'
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
    addCat:{
        position: 'absolute',
        zIndex: 99,
        top: 0,
        left:0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    close:{
        position:'relative',
        top:'5px',
        width: 20,
        height: 20,
        textAlign: 'center',
        right:'-70px',
        backgroundColor:'white',
        cursor: 'pointer',
        borderRadius: '100%',
        padding: 2
    },
    formAdd:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {     
        margin: theme.spacing(3),      
    },
    buttonProgress: {        
        position: 'absolute',        
        marginTop: 5,
        marginLeft: -70,              
    },
    selec:{
        minWidth: 120,
    },
  }));


const Register = () => {
    const classes = useStyles()
    const [imageUpload, setImageUpload] = useState([])
    const [uploadProgress, setUploadProgress] = useState()
    const [categorys, setCategorys] = useState([])
    const [addCat, setAddCat] = useState(false)
    const [newCategory, setNewCategory] = useState()

    useEffect(() => {                 
        let ref = db.collection(`categorias`)
        ref.get()        
          .then((snapshot) => {             
            snapshot.forEach((doc) => {                         
              setCategorys(prevState => [...prevState, doc.data()])   
              console.log(doc.data())              
            })                    
          }) 
          .then(console.log(categorys))               
    },[])

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

    const [openToasty, setOpenToasty] = useState(false)
    const [progressLoading, setprogressLoading] = useState(false)    
    const timer = useRef()
    const [cat, setCat] = useState('')
    const handleInputChange = (e) => {
        const {name, value} = e.target

        setForm({
            ...form,
            [name]: {
                value,
            },
        })
    }

    const handleChange = (event) => {
        setCat(event.target.value);
      };

    const handleRegisterButton = () => {                
        if (!progressLoading) {            
            setprogressLoading(true);
            timer.current = window.setTimeout(() => {                
                setprogressLoading(false)                        
                let hasError = false
                let newFormState = {
                    ...form,
                }

                if(!form.name.value){
                    hasError = true

                    newFormState.name = {
                        value: form.name.value,
                        error: true,
                        helperText: 'Digite o nome corretamente'
                    }
                }
                
                if(!form.category.value){
                    hasError = true
                    newFormState.category = {                
                        error: true,
                        helperText: 'Digite a categoria corretamente'
                    }
                }

                if(!form.description.value){
                    hasError = true
                    newFormState.description = {
                        value: form.description.value,
                        error: true,
                        helperText: 'Digite a descrição corretamente'
                    }
                }
                
                if(hasError) {
                    setForm(newFormState)
                } else{
                    
                    /******Função que adiciona no firestore******/            
                    db.collection(`produtoss`).add(
                    {        
                        nome: form.name.value,
                        descricao: form.description.value,
                        categoria: form.category.value        
                    }
                    ).then(() => {
                    //alert("Incluido com sucesso")
                    //window.location.reload()
                    })
                    .catch((err) => {console.log(err)})            



                    /***função de  upload de imagens*******/            
                    const storage = getStorage();
                    //addProp()
                    
                    const formData = new FormData()
                    imageUpload.forEach(file => {
                        const storageRef = ref(storage, `produtos/${form.category.value}/${form.name.value}/` + file.name); 
                        const uploadTask = uploadBytesResumable(storageRef, file);
                        
                        uploadTask.on('state_changed',
                            (snapshot) => {          
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setUploadProgress(progress)
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
                                setUploadProgress()
                            });
                            }
                        )
                    })
                    setOpenToasty(true)            
                    //window.location.reload()
                }
            }, 4000)
        }

    }

    /***adiciona categoria******/
    const addCategory = (e) => {
        e.preventDefault()
        db.collection(`categorias`).add(
                {categoria:newCategory.toLowerCase()}
            ).then(() => {
                alert("Adicionado com sucesso")
                window.location.reload()
            })
            .catch((err) => {console.log(err)})  
    }

    /****upload imagem******/

  const handleRemoveFile = fileName => {
    const newFileState = imageUpload.filter(file => file.name !== fileName)
    setImageUpload(newFileState)
  }

  /*****novo upload *******/
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
        ...newFiles
      ])
    }
  })

  const handleAdd = () => {
    window.scroll(0,0)
    setAddCat(true)
  }

    return(
        <>
        <div className={classes.wrapper}>
            <TextField error={form.name.error} helperText={form.name.error ? form.name.helperText : ''} id="standard-basic" label="Nome" name='name' value={form.name.value} onChange={handleInputChange}/>     
        </div>
        {
            addCat &&
            <div className={classes.addCat}>
                <p className={classes.close} onClick={()=>setAddCat(false)}>X</p>
              <form className={classes.formAdd} onSubmit={(e)=>addCategory(e)}>
                <input onChange={(e)=>setNewCategory(e.target.value)}  />
                <button style={{marginTop:15, cursor:'pointer'}} type='submit'>Adicionar</button>
              </form>
            </div>
        }
        <div className={classes.wrapper}>            
            <InputLabel> Categoria </InputLabel>
            <Select
                className={classes.selec}
                labelId="demo-simple-select-label"                
                //value={cat}
                //onChange={handleChange}   
                value={form.category.value}
                onChange={handleInputChange}             
                error={form.category.error} 
                //helperText={form.category.error ? form.category.helperText : ''} 
                id="standard-basic" 
                label="Categoria" 
                name='category'
            >
                {
                    categorys.length > 0 &&
                    categorys.map((category, index) => (
                        <MenuItem key={index} value={category.categoria}>{category.categoria}</MenuItem>
                    ))
                }
                <MenuItem onClick={()=>handleAdd()}>Adicionar categoria</MenuItem>
                {/* <MenuItem value={'corpo'}>Corpo</MenuItem>
                <MenuItem value={'rosto'}>Rosto</MenuItem>
                <MenuItem value={'casa'}>Casa</MenuItem>
                <MenuItem value={'masculino'}>Masculino</MenuItem>
                <MenuItem value={'resina'}>Resina</MenuItem> */}
            </Select>
        </div>
        <div className={classes.wrapper}>
            <TextField error={form.description.error} helperText={form.description.error ? form.description.helperText : ''} id="standard-basic" label="Descrição" name='description' value={form.description.value} onChange={handleInputChange}/>     
        </div>        
        <div className='thumbsContainer'>
            <div className='dropzone' {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                Clique para adicionar ou arraste a imagem aqui.
              </p>
            </div>
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
                <Button variant="contained" color="primary" onClick={handleRegisterButton} disabled={progressLoading}>
                    Cadastrar
                </Button>
                {progressLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        <Toasty open={openToasty} severity='success' text='Cadastro realizado com sucesso!' onClose={() => setOpenToasty(false)} handle={()=>window.location.reload()}/>
        </>
    )
}


export default Register