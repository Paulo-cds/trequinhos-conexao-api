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

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames'

import ModalConfirm from './ModalConfirm'



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 15,
  },
  media: {
    height: '100%',
    paddingTop: '80%', // 16:9
  },
  
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CustomerCard = ({
    id,
    name,
    category,
    description,
    urlImage,
    className,
    onRemoveProduct,
    }) => {


  const classes = useStyles();
  //const [expanded, setExpanded] = useState(false);

  const [openModal, setOpenModal] = useState(false)

  const handleToggleOpenModal = () => {
    setOpenModal(!openModal)
  }

 

  const handleConfirmModal = id => {
    onRemoveProduct(id)
    handleToggleOpenModal()
  }

  const handleRemoveCustomer = () =>{
    handleToggleOpenModal()
  }

  return (
    <>
      <Card className={classNames(className, classes.root)}>
        <CardHeader
          
          title={name}
          
        />
        <CardMedia
          
          className={classes.media}
          image={urlImage}
          
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="editar cadastro">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="deletar cadastro" onClick={handleRemoveCustomer}>
            <DeleteIcon />
          </IconButton>
          
        </CardActions>
        
      </Card>
      <ModalConfirm 
      open={openModal}
      onClose={handleToggleOpenModal}
      onConfirm={() => handleConfirmModal(id)}
      title="Deseja realmente excluir esse produto?"
      message="Ao comfirmar não será possível reverter essa operação!"      
      />
    </>
  );
}

export default CustomerCard
