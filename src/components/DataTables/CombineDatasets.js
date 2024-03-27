import React, { useState, useEffect } from "react";
import { Box, IconButton, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Button, InputAdornment, Typography, CircularProgress, Modal } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CustomModal from "../CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { addPremiumDatasets, getAllUsers } from "../../features/Users/usersAction";
import { createCombineDataset, getAllDatasets } from "../../features/Dataset/DatasetAction";

const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100vw",
};

const modalStyle = {
    display: "flex",
    bgcolor: "white",
    boxShadow: 24,
    p: 2,
    width: "800px",
    // height: "556px",
    height: "70%",
    overflowX: 'auto'
};

const secondModalStyle = {
    bgcolor: "white",
    boxShadow: 24,
    p: 2,
    width: "576px",
    height: "200px",
    borderRadius: "20px",
}

const customStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100vh',
    width: '100vw',
};
const CombineDatasets = ({ combineModal, setCombineModal }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [selectedDatasetIds, setSelectedDatasetIds] = useState([]);
    const dispatch = useDispatch();
    const { allDatasets, combineDatasetLoading } = useSelector((state) => state.dataset);

    const userData = localStorage.getItem('usersInfo');
    const usersData = JSON.parse(userData);

    useEffect(() => {
        dispatch(getAllDatasets())
        setOpen(combineModal)
    }, []);



    const handleClose = () => {
        setOpen(false);
        setCombineModal(false)
    };

    const handleCheckboxChange = (datasetId, checked) => {
        if (checked) {
            setSelectedDatasetIds(prevIds => [...prevIds, datasetId]);
        } else {
            setSelectedDatasetIds(prevIds => prevIds.filter(id => id !== datasetId));
        }
    };

    const handleCombiningDatasets = async () => {
        await dispatch(createCombineDataset({ body: { name: name, dataset1: selectedDatasetIds[0], dataset2: selectedDatasetIds[1] }, userId: usersData?.id }));
        dispatch(getAllDatasets({}));
        handleClose();
    }

    const handleNameChange = (event) => {
        const datasetName = event.target.value;
        setName(datasetName);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <CustomModal open={open} handleClose={handleClose} modalStyle={modalStyle} containerStyle={containerStyle}>
                <Box sx={{ width: '100%', p: 2 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" >Combine Dataset</Typography>
                        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {allDatasets.length < 1 ?
                        <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center' }}>No Datasets are available to combine!</Typography>
                        : <Box>
                            <TextField
                                variant="outlined"
                                placeholder='Title'
                                value={name}
                                onChange={handleNameChange}
                                sx={{
                                    my: 2, width: '100%',
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: '10px',
                                        "& .MuiOutlinedInput-input": {
                                            fontSize: "16px",
                                            height: "15px",
                                            borderColor: "#ececec",
                                        },
                                    },
                                }}
                            />

                            <List sx={{ border: '1px solid #ccc', borderRadius: 4 }}>
                                {allDatasets.map(dataset => (
                                    <ListItem key={dataset._id}>
                                        <ListItemText primary={dataset.label} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                checked={selectedDatasetIds.includes(dataset._id)}

                                                onChange={(event) => handleCheckboxChange(dataset._id, event.target.checked)}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                <Button variant="outlined" sx={{
                                    borderColor: 'black', backgroundColor: 'black', color: 'white', "&:hover": {
                                        color: 'black',
                                        backgroundColor: 'white',
                                        borderColor: 'black'
                                    },
                                    my: 2, px: 2
                                }}
                                    onClick={handleCombiningDatasets}
                                >
                                    Combine Dataset
                                </Button>
                            </Box>

                        </Box>}
                </Box>
                <Modal open={combineDatasetLoading === true} onClose={() => combineDatasetLoading === false} sx={customStyles}>
                    <Box sx={secondModalStyle}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                            <CircularProgress sx={{ color: 'black' }} />
                            <Typography variant="h6" mt={3}>Combining Datasets please wait</Typography>
                        </Box>
                    </Box>
                </Modal>
            </CustomModal>
        </Box>
    );
};

export default CombineDatasets;
