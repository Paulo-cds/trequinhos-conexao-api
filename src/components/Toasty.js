import useState from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import MuiAlert from '@material-ui/lab/Alert'

const Toasty = ({open, severity, onClose, text}) => {
  


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}                
        >            
             <MuiAlert elevation={6} variant="filled" severity={severity}>
                 {text}
            </MuiAlert>
                  
      </Snackbar>
    
  );
}


export default Toasty