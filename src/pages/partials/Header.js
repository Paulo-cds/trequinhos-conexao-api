import {useState} from 'react'

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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    }
}))






const Header = () => {
    const classes = useStyles()
    const history = useHistory()

    const [menuOpen, setMenuOpen] = useState(false)

    const handleToggleMenu = () => {
      setMenuOpen(!menuOpen)
    }
    
    const handleMenuClick = route => {
      history.push(route)
      handleToggleMenu()
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
            <div >
              <div >
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                
                inputProps={{ 'aria-label': 'search' }}
              />
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

            <ListItem button onClick={() => handleMenuClick('/products')}>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText>Lista de Produtos</ListItemText>
            </ListItem>
            
            <ListItem button onClick={() => handleMenuClick('products/add')}>
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