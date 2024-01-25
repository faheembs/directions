import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextareaAutosize } from '@mui/material';
import { useState } from 'react';

const RejectionDialog = ({ open, handleClose, rejectHandler }) => {
  const [keyWord, setKeyWord] = useState("")
  const handleOnChange = (e) => {
    const value = e.target.value
    setKeyWord(value)
  }
  const handleSubmit = () => {
    rejectHandler(keyWord);
    handleClose();
  };
  // console.log(keyWord)
  return (

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Λόγος απόρριψης</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Γράψτε λίγα λόγια στον χρήστη, ως προς την απόρριψη της αγγελίας του.
        </DialogContentText>
        <TextareaAutosize
          autoFocus
          minRows={3}
          placeholder="Λίγα λόγια..."
          onChange={(e) => handleOnChange(e)}
          style={{
            width: '100%', resize: 'none', my: 8,
            '& .MuiInputBase-root': {
              '& fieldset': {
                borderColor: '#E3E3E3',


              },
              '&:hover fieldset': {
                borderColor: '#E3E3E3',

              },
              '&.Mui-focused fieldset': {
                border: '1px solid #E3E3E3',
              },
            }
          }
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Αποστολη</Button>
      </DialogActions>
    </Dialog>

  );
};


export default RejectionDialog;
