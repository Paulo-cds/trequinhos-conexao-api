import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {RubberBand} from 'animate-css-styled-components'
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth'


const token = localStorage.getItem('token')

let editors, title = ''
if(token === 'true'){
  editors = 'none' 
  title = 'block'
} else {
  editors = 'block'
  title = 'none'
}



const useStyles = makeStyles((theme) => ({
    title:{
      display: title,
      margin: '10rem auto',
      fontSize: '3rem',
      textAlign: 'center',
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',        
      },
      marginLeft: 30,
      display: editors,
    },
  }));


  function initialState() {
    return { user: '', password: '' };
  }
  
      

function Admin(){    
    const [values, setValues] = useState(initialState)    
    const classes = useStyles()    
    let auth = getAuth()
    

    
    const [form, setForm] = useState ({
      user:{
          value: '',
          error: false,
      },
      password:{
          value:'',
          error: false,
      },
  })

    const onChange = (e) => {
      const {name, value} = e.target

        setForm({
            ...form,
            [name]: {
                value,
            },
        })
      }

    
    
    const onSubmit = (event, user, password) => {
        event.preventDefault()   
        user = form.user.value
        password = form.password.value                     
        const admin = true

        if(user === process.env.REACT_APP_ADMINIST && password === process.env.REACT_APP_SENHA){
          localStorage.setItem('token', admin)

          signInWithEmailAndPassword(auth, process.env.REACT_APP_EMAIL, process.env.REACT_APP_SENHA)
            .then((userCredential) => {
              console.log('LOGADO!', userCredential)
              window.location.reload()  
            })
            .catch(error => {
              console.log(error)
            })
                  
          return
        } 
        alert('Usuário e/ou senha incorreto(s)')
        setValues(initialState)        
    }

    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };

    

    return(        
      <>
        <RubberBand >
          <h2 className={classes.title}> BEM-VINDO </h2>
        </RubberBand>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
            <div>
                <TextField
                id="standard-multiline-flexible"
                label="Nome"
                multiline
                rowsMax={4}
                value={form.user.value}
                onChange={onChange}
                name='user'
                />
            </div>
            <div>
                <TextField
                    id="standard-multiline-flexible"
                    label="Senha"                
                    type='password'
                    htmlFor="standard-adornment-password"
                    multiline
                    rowsMax={4}
                    value={form.password.value}
                    onChange={onChange}
                    name="password"
                />
            </div>
            <Button type='submit' variant="contained" color="primary">
                Acessar
            </Button>
        </form>
      </>
    )
}

export default Admin


