import { Button, Dialog, DialogActions, DialogTitle, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getItembyUserId, updateDeliverable } from '../../features/items/itemActions';
import { toast } from 'react-toastify';
import hand from "../../assets/hand.png"
import { Box } from '@mui/system';
const data = localStorage.getItem("userId")
const uid = JSON.parse(data)
console.log("uid", uid)

const UpdateButton = ({ isDeliverable, userId, status }) => {
    const [open, setOpen] = useState(false);
    const [openDeletion, setOpenDeletion] = useState(false);
    const dispatch = useDispatch()
    const { itembyUserId } = useSelector((state) => state.item);
    console.log('itembyUserId:', itembyUserId);
    // {itembyUserId && itembyUserId.some(item => item.status !== 'accepted')}
    const handleYes = async () => {
        setOpen(true);
        // await dispatch(deactivateUser());
        // toast.success("Η διαγραφή ήταν επιτυχής");
        // navigate("/");
    };
    console.log("status", status)
    const handleNo = () => {
        setOpen(false);
    };

    const handleDeletionYes = () => {
        setOpenDeletion(true)
    }
    const handleDeletionNo = () => {
        setOpenDeletion(false)
    }

    const handleDeliverableItemClick = async (userId) => {
        console.log("user ID", userId);
        const response = await dispatch(updateDeliverable({ userId: userId, uid: uid }));
        // console.log(response)
        dispatch(getItembyUserId({ userId: uid }));
        if (response) {
            toast.success('Η κατάσταση της αγγελίας ενημερώθηκε.');
        } else {
            return null;
        }
        setOpen(false);
    }
    const handleCancellationClick = async () => {
        try {
            // Replace '123456' with the actual ID of the item you want to delete
            const itemId = '13';
            const token = localStorage.getItem('token');

            const response = await fetch(`/user/delete-item/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Replace with the actual JWT token
                },
            });

            if (response.ok) {
                // Item deleted successfully
                toast.success('Item deleted successfully');
            } else {
                // Error deleting the item
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message}`);
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error:', error);
            toast.success('Η αγγελία σας θα διαγραφεί εντός 24 ωρών');
        } finally {
            console.log('happened');
            setOpenDeletion(false);
        }
    };
    console.log('isDeliverable:', isDeliverable);


    return (
        <>
            <Dialog open={isDeliverable ? open : openDeletion}>
                <Paper sx={{ height: 150, width: 400, pt: 2 }}>
                    <DialogTitle sx={{ textAlign: "center" }}>
                        {isDeliverable ? 'Είστε σίγουροι ότι παραδώσατε το αντικείμενο;' : 'Είστε σίγουροι ότι θέλετε να διαγράψετε την αγγελία σας;'}
                    </DialogTitle>
                    <DialogActions
                        sx={{ display: "flex", justifyContent: "space-evenly" }}
                    >
                        <Button
                            variant="contained"
                            sx={{ textTransform: "none" }}
                            onClick={isDeliverable ? () => handleDeliverableItemClick(userId) : () => handleCancellationClick(userId)}
                        >
                            Ναι
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ textTransform: "none" }}
                            onClick={isDeliverable ? handleNo : handleDeletionNo}
                        >
                            Όχι
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
            {isDeliverable ?
                <Button disabled={status === "rejected" || status === 'pending'} variant={status == "rejected" || status === "pending" ? "contained" : 'outlined'} sx={{ textTransform: 'none' }} onClick={handleYes} >
                    <Box component='img' sx={{ mr: 1 }} src={hand} alt='hand' height={30} width={35} /><span style={{ color: 'black' }}> ΠΑΡΑΔΟΘΗΚΕ </span>
                </Button>
                :
                <Button sx={{ py: '9px', ml: 1 }} variant='outlined' onClick={handleDeletionYes}>
                    <CancelIcon sx={{ color: 'red' }} /><span style={{ color: 'red' }}> ΔΙΑΓΡΑΦΗ ΑΓΓΕΛΙΑΣ </span>
                </Button>
            }

        </>
    )
}

export default UpdateButton