import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
//import tileData from './tileData';
import StoreProvider from '../components/store/Provider'



import image1 from '../images/imagem1.jpg'
import image2 from '../images/imagem2.jpg'
import image3 from '../images/imagem3.jpg'
import image4 from '../images/imagem4.jpg'
import image5 from '../images/imagem5.jpg'
import image6 from '../images/imagem6.jpg'
import image7 from '../images/imagem7.jpg'
import image8 from '../images/imagem8.jpg'
import image9 from '../images/imagem9.jpg'
import image10 from '../images/imagem10.jpg'

import {FadeInUpBig} from 'animate-css-styled-components'
import { BorderBottomOutlined } from '@material-ui/icons';
import '../styles/HomeStyle.css'


const tileData = [
    {
        img: image1,
    },
    {
        img: image2,
    },
    {
        img: image3,
    },
    {
        img: image4,
    },
    {
        img: image5,
    },
    {
        img: image6,
    },
    {
        img: image7,
    },
    {
        img: image8,
    },
    {
        img: image9,
    },
    {
        img: image10,
    },
]




const useStyles = makeStyles((theme) => ({
  title:{
    margin:'5rem auto',
    textAlign: 'center',
    maxWidth: '70%',
  },
  root: {
    
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '80%',    
    
    textAlign: 'center',
    margin: '3rem auto 0',    
    //marginTop: 150,
    //backgroundColor: theme.palette.background.paper,
  },
  
  
}));





function Home () {

  const token = localStorage.getItem('token')
  console.log(`Token - ${token}`)

    const classes = useStyles();  


  //animação texto
    

  return (
    <>
      
      <div className={classes.root}>
        <FadeInUpBig duration='2.5s' delay='0.1s'>
          <p className='textp'>
          Aqui você acontra cosméticos artesanais desde sabonetes e desodorantes até cremes esfoliantes, e também produtos feitos em resina como Bijuterias, Incensários, Luminárias e muito mais!
          <p>
          Venha conhecer todos os nossos produtos e entre em contato para fazer seu pedido.
          </p>       
          </p>   
          
        </FadeInUpBig>                          
      </div>
     
    </>
  )
}


export default Home