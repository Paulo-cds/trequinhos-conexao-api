import {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ModalConfirm from './ModalConfirm'
import clsx from 'clsx'
import Edit from '../pages/Products/Edit'
import prod from '../pages/Products/Products'
import CarouselCard from './carousel';

const token = localStorage.getItem('token')

let editors = 'none'
if(token ===  'true'){
  editors = 'flex'
} else {
  editors = 'none'
}

const useStyles = makeStyles((theme) => ({
  editors:{
    display: editors
  },
  maincard:{
    marginLeft: 15,
    marginRight: 15,
  },
  root: {
    maxWidth: 345,
    margin: 15,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    
  },
  media: {
    height: '100%',
    paddingTop: '80%', // 16:9
    cursor: 'pointer'
  },
    
  avatar: {
    backgroundColor: red[500],
  },
  expand: {
    transform: 'rotate(0deg)',
    
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  description:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const CustomerCard = ({
  id,
  name,
  category,
  description,
  image,
  className,
  onRemoveProduct,
  onEditProduct,
  }) => {
  const [displayCarousel, setDisplayCarousel] = useState(false)
  const [imgCarousel, setImgCarousel] = useState([])
  const classes = useStyles();
  //const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleToggleOpenModal = () => {
    setOpenModal(!openModal)
  } 
  const handleConfirmModal = id => {
    onRemoveProduct(id, image)
    handleToggleOpenModal()
  }
  const handleRemoveProduct = () =>{
    handleToggleOpenModal()
  }
  const handleEditProduct = () =>{
    onEditProduct(id, name, category, description, image)
  }
  const editing = prod === 'admin' ? true : false

  const handleDisplayCarousel = (image) => {    
    setImgCarousel(image)
    window.scroll(0,0)
    setDisplayCarousel(true)    
  }
  

  return (
    <div className={classes.maincard}>
      {
        displayCarousel &&
        <CarouselCard imgCarousel={imgCarousel} setDisplayCarousel={setDisplayCarousel} displayCarousel={displayCarousel} /> 
      }
      <Card className={classNames(className, classes.root)} style={{boxShadow: '0 0 5px grey'}}>
        <CardHeader          
          title={name}          
        />
        { image &&  <CardMedia          
          className={classes.media}
          image={image[0].url}
          onClick={()=>{handleDisplayCarousel(image)}}
        /> }
        <div className={classes.description}>
        <CardContent>
          <Typography className={classes.root}>
            <span>Descrição</span>
          </Typography>
        </CardContent> 
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{description}</Typography>        
        </CardContent>
      </Collapse>
        <CardActions className={classes.editors} disableSpacing>
          <IconButton aria-label="editar cadastro" onClick={handleEditProduct}  >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="deletar cadastro" onClick={handleRemoveProduct}>
            <DeleteIcon />
          </IconButton>          
        </CardActions>        
      </Card>
      <ModalConfirm 
      open={openModal}
      onClose={handleToggleOpenModal}
      onConfirm={() => handleConfirmModal(id)}
      title="Deseja realmente excluir esse produto?"
      message="Ao confirmar não será possível reverter essa operação!"      
      />
    </div>
  );
}

export default CustomerCard
