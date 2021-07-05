import {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router';
//import HandleButton from './partials/Login'
import StoreContext from '../components/store/Context';
import {RubberBand} from 'animate-css-styled-components'

import {administ, senha} from '../.env'

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
      margin: '0 auto',
      display: editors,
    },
  }));


  function initialState() {
    return { user: '', password: '' };
  }
  
      

function Admin(){
    const history = useHistory()
    const [values, setValues] = useState(initialState)
    const [error, setError] = useState(null)
    const { setToken } = useContext(StoreContext)
    //const [user, setUser] = useState('')
    //const [password, setPassword] = useState('')
    const classes = useStyles()
    //const [admin, setAdmin] = useState(false)
    
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

        if(user === process.env.administ && password === process.env.senha){
          localStorage.setItem('token', admin)
          window.location.reload()          
          return
        }

        alert('Usuário e/ou senha incorreto(s)')
        setValues(initialState)
        
    }

    

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


