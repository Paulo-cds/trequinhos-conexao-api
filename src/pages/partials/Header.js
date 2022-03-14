import {useEffect, useState} from 'react'

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,    
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import StoreIcon from '@material-ui/icons/Store'
import InfoIcon from '@material-ui/icons/Info'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { useLocation } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
import Insta from '../../images/instagram.png'
import Face from '../../images/facebook.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {db} from '../../firebase'


const drawerWidth = 200

const token = localStorage.getItem('token')

let editors = 'none'
if(token === 'true'){
  editors = 'flex' 
} else {
  editors = 'none'
}

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
    social: {
      margin: '0 -5%',
      width: '100%',
      padding: '0',
      color: 'white',
    },
    insta: {
      width: '2rem',      
      position: 'absolute',
      right: '0.2rem',
      margin: '0 0.2rem',
      color: 'white',
    },
    face: {
      width: '2rem',      
      position: 'absolute',
      right: '3rem',
      margin: '0 0.2rem'
    },
    divisao:{
      display:'flex',
      
    },
    drawerPaper: {
      height: 'fit-content',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: (0, 1),
      justifyContent: 'flex-end',
      width: 'fit-content',
    },
    drawer: {
      width: drawerWidth,
      height: 'fit-content',
      position: 'relative',
      left: 30,    
    },
    root: {
      flexGrow: 1,      
    },
    cad: {
      display: editors,
    },
}))



const Header = () => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const [subMenuOpen, setSubMenuOpen] = useState(false)  
    const [categorys, setCategorys] = useState([])
    
    useEffect(() => {                 
      let ref = db.collection(`categorias`)
      ref.get()        
        .then((snapshot) => {             
          snapshot.forEach((doc) => {                         
            setCategorys(prevState => [...prevState, doc.data()])                         
          })                    
        })                
    },[])

    const handleToggleMenu = () => {
      setMenuOpen(!menuOpen)
      if (subMenuOpen){
        setSubMenuOpen(!subMenuOpen)
      }
    }

    const handleSubMenu = () => {
      setSubMenuOpen(!subMenuOpen)   
      setOpen(!open)   
    }
    
    const handleMenuClick = route => {      
      history.push(route)
      handleToggleMenu()  
           
    }
    
    const handleClose = (pgr) => {     
      
      if(location.pathname.match('/products')){
        handleMenuClick(`${pgr.toLowerCase()}`)
        window.location.reload()
      } else {
        handleMenuClick(`/products/${pgr.toLowerCase()}`)
      }
           
      
    }

    const handleExit = () => {
      const admin = false
      localStorage.setItem('token', admin)
      window.location.reload()
      handleToggleMenu()
         
    }
    
    const [open, setOpen] = useState(true)


    return(
      <>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => handleToggleMenu()}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>                
              </Typography>               
                <a className = {classes.face} href="https://www.facebook.com/trequinhosecoisaetal" target="_blank">
                  <img src={Face} alt={'Facebook'}  className = {classes.social}/>
                </a>
                <a className = {classes.insta} href="https://www.instagram.com/trequinhosecoisaetal/" target="_blank">
                  <img src={Insta} alt={'Instagram'} className = {classes.social}/>
                </a>
              {/* </div>  */}
            </Toolbar>
          </AppBar>
        </div>        
        <Drawer open={menuOpen} onClose={() => handleToggleMenu()}>
          <List>
            <ListItem button onClick={() => handleMenuClick('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('/about')}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText>Sobre</ListItemText>
            </ListItem>
            <ListItem button 
            onClick={() => handleSubMenu()}             
            >
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText >Lista de Produtos</ListItemText>              
            </ListItem>
              <Collapse                
                keepMounted
                in={subMenuOpen}                
                className={classes.drawer}                
              >
                <List component="div" disablePadding>                   
                  {
                    categorys.length > 0 && 
                    categorys.map((category, index) => (
                      <>
                      <ListItem key={index} button onClick={()=>handleClose(`${category.categoria}`)} >
                        <ListItemText>{category.categoria.charAt(0).toUpperCase() + category.categoria.slice(1)} </ListItemText>                   
                      </ListItem>
                      </>
                    ))
                  }                                
                  {/* <ListItem button onClick={()=>handleClose('corpo')} >
                    <ListItemText>Para o Corpo </ListItemText>                   
                  </ListItem>
                  <ListItem button onClick={()=>handleClose('rosto')} >
                    <ListItemText>Para o Rosto </ListItemText>                   
                  </ListItem>
                  <ListItem button onClick={()=>handleClose('casa')}>
                  <ListItemText>Para a Casa</ListItemText>
                  </ListItem>
                  <ListItem button onClick={()=>handleClose('masculino')}>
                    <ListItemText>Masculino</ListItemText>
                  </ListItem>
                  <ListItem button onClick={()=>handleClose('resina')}>
                    <ListItemText>Resina</ListItemText>
                  </ListItem> */}
                </List>
              </Collapse>                        
            <ListItem className={classes.cad} button onClick={() => handleClose('add')}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText >Cadastro de Produtos</ListItemText>              
            </ListItem>
            <ListItem className={classes.cad} button onClick={() => handleExit()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText >Sair</ListItemText>              
            </ListItem>            
          </List>  
        </Drawer>
      </>
    )
}


export default Header