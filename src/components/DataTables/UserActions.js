import React, { useState, useEffect } from "react";
import { Box, IconButton, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Button, InputAdornment, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CustomModal from "../CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { addPremiumDatasets, getAllUsers } from "../../features/Users/usersAction";

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
    height: "556px",
};

const UserActions = ({ selectedUserId, premiumDatasets }) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDatasets, setFilteredDatasets] = useState([]);
    const [selectedDatasetIds, setSelectedDatasetIds] = useState([]);
    const [noResults, setNoResults] = useState(false); // State to track if no results found
    const dispatch = useDispatch();
    const { allDatasets } = useSelector((state) => state.dataset);

    useEffect(() => {
        if (allDatasets) {
            const filtered = allDatasets.filter(dataset => dataset.isPremium);
            setFilteredDatasets(filtered);
        }
    }, [allDatasets]);

    useEffect(() => {
        if (premiumDatasets) {
            setSelectedDatasetIds(premiumDatasets.map(dataset => dataset._id));
        }
    }, [premiumDatasets]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckboxChange = (datasetId, checked) => {
        if (checked) {
            setSelectedDatasetIds(prevIds => [...prevIds, datasetId]);
        } else {
            setSelectedDatasetIds(prevIds => prevIds.filter(id => id !== datasetId));
        }
    };

    const handleAddingDatasets = async () => {
        await dispatch(addPremiumDatasets({ userId: selectedUserId, datasetIds: selectedDatasetIds }));
        dispatch(getAllUsers({}));
        handleClose();
    }

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setFilteredDatasets(allDatasets.filter(dataset => dataset.isPremium));
            setNoResults(false);
            return;
        }

        const filtered = allDatasets.filter(dataset => dataset.isPremium && dataset.label.toLowerCase().includes(term.toLowerCase()));
        setFilteredDatasets(filtered);
        setNoResults(filtered.length === 0); // Update noResults state based on filtered array length
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <IconButton

                onClick={handleOpen}
                sx={{ mr: 2 }}
            >
                <EditIcon sx={{ color: 'black' }} />
            </IconButton>
            <CustomModal open={open} handleClose={handleClose} modalStyle={modalStyle} containerStyle={containerStyle}>
                <Box sx={{ width: '100%', p: 2 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" >Assign Premium Dataset</Typography>
                        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {filteredDatasets?.length < 1 ?
                        <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>No Datasets are available to combine!</Typography>
                        :
                        <Box>
                            <TextField
                                variant="outlined"
                                placeholder='Search'
                                value={searchTerm}
                                onChange={handleSearchChange}
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {noResults ? (

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '250px' }}>
                                    <SearchOffIcon sx={{ fontSize: '58px' }} />
                                    <Typography variant="body1" align="center">No results found for "{searchTerm}"</Typography>
                                </Box>

                            ) : (
                                <List sx={{ border: '1px solid #ccc', borderRadius: 4 }}>
                                    {filteredDatasets.map(dataset => (
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
                            )}
                            {noResults ? null : <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                <Button variant="outlined" sx={{
                                    borderColor: 'black', backgroundColor: 'black', color: 'white', "&:hover": {
                                        color: 'black',
                                        backgroundColor: 'white',
                                        borderColor: 'black'
                                    },
                                    my: 2, px: 2
                                }}
                                    onClick={handleAddingDatasets}
                                >
                                    Save
                                </Button>
                            </Box>}
                        </Box>
                    }
                </Box>
            </CustomModal>
        </Box>
    );
};

export default UserActions;
