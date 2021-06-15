import {useState, useRef} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import Toasty from '../../components/Toasty'


const useStyles = makeStyles((theme) => ({
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

        if(!cat){
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

        if(!form.urlImage.value){
            hasError = true

            newFormState.urlImage = {
                value: form.urlImage.value,
                error: true,
                helperText: 'Digite a url corretamente'
            }
        }

        if(hasError) {
            setForm(newFormState)
        } else{

        axios.post('http://localhost:8080/api/products',{
            name: form.name.value,
            category: cat,
            description: form.description.value,
            urlImage: form.urlImage.value,
        }).then((response) => {
            setOpenToasty(true)            
            //window.location.reload()
        })
        }
            }, 4000)
        }

    }

    return(
        <>
        <div className={classes.wrapper}>
            <TextField error={form.name.error} helperText={form.name.error ? form.name.helperText : ''} id="standard-basic" label="Nome" name='name' value={form.name.value} onChange={handleInputChange}/>     
        </div>
        <div className={classes.wrapper}>
            
            <InputLabel> Categoria </InputLabel>
            <Select
                className={classes.selec}
                labelId="demo-simple-select-label"                
                value={cat}
                onChange={handleChange}

                error={form.category.error} 
                //helperText={form.category.error ? form.category.helperText : ''} 
                id="standard-basic" 
                label="Categoria" 
                name='category'
            >
                <MenuItem value={'Corpo'}>Corpo</MenuItem>
                <MenuItem value={'Casa'}>Casa</MenuItem>
                <MenuItem value={'Masculino'}>Masculino</MenuItem>
                <MenuItem value={'Resina'}>Resina</MenuItem>
            </Select>


        </div>
        <div className={classes.wrapper}>
            <TextField error={form.description.error} helperText={form.description.error ? form.description.helperText : ''} id="standard-basic" label="Descrição" name='description' value={form.description.value} onChange={handleInputChange}/>     
        </div>
        <div className={classes.wrapper}>
            <TextField error={form.urlImage.error} helperText={form.urlImage.error ? form.urlImage.helperText : ''} id="standard-basic" label="Url da imagem" name='urlImage' value={form.urlImage.value} onChange={handleInputChange}/>     
        </div>
        <div className={classes.wrapper}>
                <Button variant="contained" color="primary" onClick={handleRegisterButton} disabled={progressLoading}>
                    Cadastrar
                </Button>
                {progressLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        <Toasty open={openToasty} severity='success' text='Cadastro realizado com sucesso!' onClose={() => setOpenToasty(false)}/>
        </>
    )
}


export default Register