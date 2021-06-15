import {useState,
  useRef,
  useEffect,
} from 'react'

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

import {
  useHistory,
} from 'react-router-dom'


import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import StoreIcon from '@material-ui/icons/Store'
import InfoIcon from '@material-ui/icons/Info'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Popper from '@material-ui/core/Popper'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { useLocation } from 'react-router-dom'

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
    links: {
      width: '10%',
      margin: '0',
    },
    divisao:{
      display:'flex',
    }
}))






const Header = () => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const [menuOpen, setMenuOpen] = useState(false)
    const [subMenuOpen, setSubMenuOpen] = useState(false)

    const handleToggleMenu = () => {
      setMenuOpen(!menuOpen)
    }
    
    const handleMenuClick = route => {      
      history.push(route)
      handleToggleMenu()      
    }
    

    const handleToggleSubMenu = (event) => {
      setSubMenuOpen(!subMenuOpen)
    }
   

    const handleClose = (pgr) => {     
      
      if(location.pathname.match('products')){
        handleMenuClick(`${pgr}`)
        window.location.reload()
      } else {
        handleMenuClick(`products/${pgr}`)
      }
           
      setSubMenuOpen(false)
    }
    


    return(
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => handleToggleMenu()}>
              <MenuIcon />
            </IconButton>
            <Typography  className = {classes.title} variant="h6" noWrap>
              Trequinhos
            </Typography>
            <div className = {classes.divisao}>
              <a className = {classes.links} href="https://bit.ly/3oJJjIE" target="_blank" >
                <WhatsAppIcon className = {classes.social}/>
              </a>
              <a className = {classes.links} href="https://www.facebook.com/trequinhosecoisaetal" target="_blank">
                <FacebookIcon  className = {classes.social}/>
              </a>
              <a className = {classes.links} href="https://www.instagram.com/trequinhosecoisaetal/" target="_blank">
                <InstagramIcon  className = {classes.social}/>
              </a>
            </div>
          </Toolbar>
        </AppBar>
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

            <ListItem button onClick={handleToggleSubMenu} aria-controls="simple-menu" aria-haspopup="true"   //{() => handleMenuClick('/products')}
          >
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText >Lista de Produtos</ListItemText>

              <Menu
                id="simple-menu"
                //anchorEl={anchorEl}
                keepMounted
                //open={Boolean(anchorEl)}
                open={subMenuOpen}
              >
                <MenuItem onClick={()=>handleClose('Corpo')} >Para o Corpo</MenuItem>
                <MenuItem onClick={()=>handleClose('Casa')}>Para a Casa</MenuItem>
                <MenuItem onClick={()=>handleClose('Masculino')}>Masculino</MenuItem>
                <MenuItem onClick={()=>handleClose('Resina')}>Resina</MenuItem>
                <MenuItem onClick={()=>handleClose('all')}>Todos os produtos</MenuItem>
              </Menu>
            </ListItem>
            
            <ListItem button onClick={() => handleClose('add')}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText>Cadastro de Produtos</ListItemText>              
            </ListItem>
            
          </List>  
        </Drawer>
      </>
    )
}


export default Header