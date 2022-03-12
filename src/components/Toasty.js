import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'

const Toasty = ({open, severity, onClose, text, handle}) => {
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
    handle()
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