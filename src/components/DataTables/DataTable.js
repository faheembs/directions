import React, { useState, useRef, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Modal,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import { userColumns, datasetColumns } from './Data';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { createDataset, getAllDatasets, getDatasetsByUserId } from '../../features/Dataset/DatasetAction';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../features/Users/usersAction';
import CombineDatasets from './CombineDatasets';
import { io } from 'socket.io-client';
import { socketBaseURL } from '../../constants/baseURL';



const modalStyles = {
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    width: 700,
    height: "89%",
    overflowX: "auto"
};

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

export const DataTable = () => {

    const [sortModel, setSortModel] = useState([{ field: 'id', sort: 'desc' }]);
    const location = useLocation();
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: false,
    });
    const [dataFile, setDataFile] = useState(null);
    const [configFile, setConfigFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedDataFiles, setUploadedDataFiles] = useState([]);
    const [uploadedConfigFiles, setUploadedConfigFiles] = useState([]);
    const [uploadedImageFiles, setUploadedImageFiles] = useState([]);
    const [combineModal, setCombineModal] = useState(false)
    const fileInputRefs = {
        dataFile: useRef(null),
        configFile: useRef(null),
        imageFile: useRef(null),
    };
    const [searchQuery, setSearchQuery] = useState('');
    // const [filteredRows, setFilteredRows] = useState([]);

    // const handleSearchInputChange = (e) => {
    //     setSearchQuery(e.target.value);
    //     filterRows(e.target.value);
    // };

    // // Function to filter rows based on search query
    // const filterRows = (query) => {
    //     if (query.trim() === '') {
    //         setFilteredRows([]);
    //         return;
    //     }

    //     const filtered = customRows.filter(row =>
    //         row.firstname.toLowerCase().includes(query.toLowerCase()) ||
    //         row.lastname.toLowerCase().includes(query.toLowerCase()) ||
    //         row.email.toLowerCase().includes(query.toLowerCase())
    //     );
    //     setFilteredRows(filtered);
    // };

    // Use filteredRows if searchQuery is not empty, otherwise use customRows
    // const rowsToDisplay = searchQuery.trim() !== '' ? filteredRows : customRows;

    const dispatch = useDispatch()
    const datasetRoute = location.pathname === '/dashboard/datasets' || location.pathname === '/dashboard';
    const userRoute = location.pathname === '/dashboard/users';

    const user = localStorage.getItem('usersInfo')
    const users = JSON.parse(user)
    const navigate = useNavigate()


    useEffect(() => {
        const userData = localStorage.getItem('usersInfo');
        const usersData = JSON.parse(userData);
        const userToken = localStorage.getItem('userToken');
        if (userToken && usersData?.role === 'admin') {
            dispatch(getAllDatasets({}));
            dispatch(getAllUsers({}));
        } else {
            dispatch(getDatasetsByUserId({ userId: usersData?._id }));
        }
        const user = localStorage.getItem('usersInfo')

        const users = JSON.parse(user)
        const socket = io(socketBaseURL);
        socket.on("message", (message) => {
            console.log("Received message from server:", message);


        });

        socket.emit("login", users?._id);
        dispatch(getAllUsers({}));
        const handleDisconnect = () => {
            socket.emit('disconnectRequest', users?._id);
            socket.disconnect();
        };

        window.addEventListener('beforeunload', handleDisconnect);

        return () => {
            window.removeEventListener('beforeunload', handleDisconnect);
        };
    }, []);


    const { allDatasets, datasetById, loading } = useSelector((state) => state.dataset)
    const { allUsers, isLoading } = useSelector((state) => state.users)


    const handleCombineOpenModal = () => {
        setCombineModal(true)
    }
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (fileType, e) => {
        const file = e.target.files[0];
        const fileName = file.name;

        switch (fileType) {
            case 'dataFile':
                setDataFile(file);
                setUploadedDataFiles([...uploadedDataFiles, { file, fileName }]);
                break;
            case 'configFile':
                setConfigFile(file);
                setUploadedConfigFiles([...uploadedConfigFiles, { file, fileName }]);
                break;
            case 'imageFile':
                setImageFile(file);
                setUploadedImageFiles([...uploadedImageFiles, { file, fileName }]);
                break;
            default:
                break;
        }
    };

    const handleFileButtonClick = (fileType) => {
        fileInputRefs[fileType].current.click();
    };

    const handleDeleteFile = (fileType, index) => {
        switch (fileType) {
            case 'dataFile':
                const updatedDataFiles = [...uploadedDataFiles];
                updatedDataFiles.splice(index, 1);
                setUploadedDataFiles(updatedDataFiles);
                break;
            case 'configFile':
                const updatedConfigFiles = [...uploadedConfigFiles];
                updatedConfigFiles.splice(index, 1);
                setUploadedConfigFiles(updatedConfigFiles);
                break;
            case 'imageFile':
                const updatedImageFiles = [...uploadedImageFiles];
                updatedImageFiles.splice(index, 1);
                setUploadedImageFiles(updatedImageFiles);
                break;
            default:
                break;
        }
    };
    const datasets = users?.role === "admin" ? allDatasets : datasetById;
    // console.log('datasets', datasets)
    const datasetRows = datasets ? datasets.filter((dataset) => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        return (
            (dataset.label && dataset?.label.toLowerCase().includes(lowerCaseSearchQuery))
        );
    }).map((dataset) => {
        const formattedDate = new Date(dataset.createdAt).toLocaleDateString('en-GB');
        return {
            id: dataset?._id,
            name: dataset?.label,
            isCombined: dataset?.combinedDataset,
            createdAt: formattedDate,
            addedBy: dataset?.addedBy?.firstName + ' ' + dataset?.addedBy?.lastName,
            ownerEmail: dataset?.addedBy?.email,
            status: dataset?.isPremium
        };
    }) : [];
    // console.log("data set row", datasetRows.length)

    const userRows = Array.isArray(allUsers) && searchQuery !== '' ? allUsers.filter((user) => {
        const lowerCaseSearchQuery = searchQuery

        return (
            (user.firstName && user.firstName.toLowerCase().includes(lowerCaseSearchQuery)) ||
            (user.lastName && user.lastName.toLowerCase().includes(lowerCaseSearchQuery))
            // (user.email && user.email.toLowerCase().includes(lowerCaseSearchQuery))

        );

    }).map((user) => {
        const formattedDate = new Date(user.createdAt).toLocaleDateString('en-GB');

        return {
            id: user?._id,
            createdAt: formattedDate,
            firstname: user?.firstName,
            lastname: user?.lastName,
            email: user?.email,
            premiumDatasets: user?.premiumDatasets,
            online: user?.online,
            combineDatasetPermission: user?.allowCombineDatasets,
            exportPermission: user?.allowExportData
        };
    })
        : Array.isArray(allUsers) ? allUsers.map((user) => {
            const formattedDate = new Date(user?.createdAt).toLocaleDateString('en-GB');

            return {
                id: user?._id,
                createdAt: formattedDate,
                firstname: user?.firstName,
                lastname: user?.lastName,
                email: user?.email,
                premiumDatasets: user?.premiumDatasets,
                online: user?.online,
                combineDatasetPermission: user?.allowCombineDatasets,
                exportPermission: user?.allowExportData
            };
        }) : []
    console.log('userRows', userRows)
    const customRows = userRoute ? userRows : datasetRows;
    const customColumns = userRoute ? userColumns : datasetColumns;

    const handleFormSubmit = async () => {
        const userData = localStorage.getItem('usersInfo');
        const usersData = JSON.parse(userData);
        const formDataToSend = {
            label: formData.title,
            queryType: "sample",
            description: formData.description,
            detail: "Details for Dataset",
            size: 1023,
            visible: true,
            isPremium: formData.status,
            dataFile,
            configFile,
            imageFile,
            userId: users._id
        };


        handleCloseModal();
        await dispatch(createDataset(formDataToSend));

        setUploadedDataFiles([]);
        setUploadedConfigFiles([]);
        setUploadedImageFiles([]);
        dispatch(getAllDatasets({}))
        dispatch(getDatasetsByUserId({ userId: usersData?._id }));
    };
    // const handleFilterModelChange = (filterModel) => {
    //     const searchQuery = filterModel.items[0]?.value || '';
    //     setSearchQuery(searchQuery);
    // };

    console.log(searchQuery)
    // const filteredRows = datasetRoute ? customRows.filter(row =>
    //     (row.firstname && row.firstname.toLowerCase().includes(searchQuery.toLowerCase()))
    // ) : customRows;
    return (
        <>
            {userRoute && <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            // sx={{ mb: 2 }}
            />}
            {datasetRoute ? (
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    // sx={{ mb: 2 }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            borderRadius: 1,
                            textTransform: 'none',
                        }}
                    >
                        {/* <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderRadius: 1,
                        textTransform: 'none',
                    }}> */}
                        <Button
                            variant="outlined"
                            disabled={!users?.allowCombineDatasets}
                            sx={{
                                borderColor: 'black',
                                backgroundColor: 'white',
                                mr: 2,
                                color: 'black',
                                '&:hover': {
                                    color: 'white',
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                },
                            }}
                            onClick={handleCombineOpenModal}
                        >
                            Combine Dataset
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: 'black',
                                backgroundColor: 'black',
                                color: 'white',
                                '&:hover': {
                                    color: 'black',
                                    backgroundColor: 'white',
                                    borderColor: 'black',
                                },
                            }}
                            onClick={handleOpenModal}
                        >
                            Add Dataset
                        </Button>
                        {/* </Box> */}
                    </Box>
                </Box>
            ) : null}
            {loading == true || isLoading == true ?
                <Box sx={{ display: 'flex', width: "100%", height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: "11px", left: 0 }}>
                    <CircularProgress sx={{ ml: '250px', color: 'black' }} />
                </Box>
                //: datasetRoute && datasetRows.length < 1 ?
                //  <Box>
                //   <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center' }} >No Datasets available!</Typography>
                // </Box>

                : <Box
                    sx={{
                        '& .MuiDataGrid-root': {
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 500,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#F1F4F8',
                            borderRadius: '12px 12px 0 0',

                        },
                        '& .super-app-theme--cell': {
                            fontSize: 14,
                            fontWeight: 500,
                        },
                        '& .custom-header': {
                            display: 'flex',
                            justifyContent: 'center',
                            // ml: 1
                        },
                        '& .super-app-theme-cell': {
                            fontSize: 14,
                            color: 'black',
                        },
                        '& .super-app-theme--cell-date': {
                            fontWeight: 500,
                        },
                        // overflowX: 'hidden',
                    }}
                >
                    <DataGrid
                        sx={{ mt: 4, mb: 4 }}
                        rows={customRows}
                        columns={customColumns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 8, page: 0 },
                            },
                        }}

                        hideFooterSelectedRowCount

                    />
                </Box>}
            <Modal open={isModalOpen} onClose={handleCloseModal} sx={customStyles}>
                <Box sx={modalStyles}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" fontWeight={700}>Add Dataset</Typography>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    sx={{ my: 1, display: 'flex', flexDirection: 'row', fontWeight: 600, fontSize: 18 }}
                                >
                                    Title <Typography variant='body1' sx={{ color: 'red', fontWeight: 'bold', fontSize: 22 }} >*</Typography>
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder='Title'
                                    size="small"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <Typography
                                        variant="body1"
                                        sx={{ my: 1, display: 'flex', flexDirection: 'row', fontWeight: 600, fontSize: 18 }}
                                    >
                                        Dataset Type <Typography variant='body1' sx={{ color: 'red', fontWeight: 'bold', fontSize: 22 }} >*</Typography>
                                    </Typography>
                                    <Select
                                        labelId="status-label"
                                        name="status"
                                        size="small"
                                        value={formData.status}
                                        onChange={handleFormChange}
                                    >
                                        <MenuItem value={false}>Free</MenuItem>
                                        <MenuItem value={true}>Premium</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Typography
                            variant="body1"
                            sx={{ my: 1, fontWeight: 600, fontSize: 18 }}
                        >
                            Description
                        </Typography>
                        <TextareaAutosize
                            minRows={6}
                            placeholder="Enter description"
                            style={{
                                width: '97.5%',
                                padding: '8px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    sx={{ mt: 1, display: 'flex', flexDirection: 'row', fontWeight: 600, fontSize: 18 }}
                                >
                                    Upload Data file <Typography variant='body1' sx={{ color: 'red', fontWeight: 'bold', fontSize: 22 }} >*</Typography>
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            border: '1px dashed black',
                                            width: 400,
                                            borderRadius: 2,
                                            padding: '20px 0px ',
                                        }}
                                    >
                                        {uploadedDataFiles.length === 0 ? (
                                            <>
                                                <IconButton
                                                    onClick={() => handleFileButtonClick('dataFile')}
                                                    sx={{ mb: '2px', color: 'black' }}
                                                >
                                                    <CloudUploadIcon />
                                                </IconButton>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    sx={{ color: 'black' }}
                                                >
                                                    Upload Data file
                                                </Typography>
                                                <input
                                                    type="file"
                                                    accept="*"
                                                    onChange={(e) => handleFileChange('dataFile', e)}
                                                    style={{ display: 'none' }}
                                                    ref={fileInputRefs.dataFile}
                                                />
                                            </>
                                        ) : (
                                            uploadedDataFiles.length > 0 && (
                                                <Box sx={{ mt: 2 }}>
                                                    {/* <Typography variant="body1">Uploaded Files:</Typography> */}
                                                    {uploadedDataFiles.map((file, index) => (
                                                        <Box key={index} sx={{ mt: 1, display: 'flex', alignItems: 'center', backgroundColor: '#ccc', borderRadius: 2, px: 2 }}>
                                                            <Typography variant="body1">{file.fileName}</Typography>
                                                            <IconButton
                                                                onClick={() => handleDeleteFile('dataFile', index)}
                                                                sx={{ marginLeft: 1 }}
                                                            >
                                                                <CloseIcon sx={{ fontSize: 16, color: 'red' }} />
                                                            </IconButton>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                </Box>
                                <Box >
                                    <Typography variant='subtitle2' sx={{ color: 'grey', mt: '2px' }}>  Supported formats:  CSV, Json, GeoJSON, and Excel </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    sx={{ mt: 1, display: 'flex', flexDirection: 'row', fontWeight: 600, fontSize: 18 }}
                                >
                                    Upload Config file<Typography variant='body1' sx={{ color: 'transparent', fontWeight: 'bold', fontSize: 22 }} >*</Typography>
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            border: '1px dashed black',
                                            width: 400,
                                            borderRadius: 2,
                                            padding: '20px 0px ',
                                        }}
                                    >
                                        {uploadedConfigFiles.length === 0 ? (
                                            <>
                                                <IconButton
                                                    onClick={() => handleFileButtonClick('configFile')}
                                                    sx={{ mb: '2px', color: 'black' }}
                                                >
                                                    <CloudUploadIcon />
                                                </IconButton>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    sx={{ color: 'black' }}
                                                >
                                                    Upload Config File
                                                </Typography>
                                                <input
                                                    type="file"
                                                    accept="*"
                                                    onChange={(e) => handleFileChange('configFile', e)}
                                                    style={{ display: 'none' }}
                                                    ref={fileInputRefs.configFile}
                                                />
                                            </>
                                        ) : (
                                            uploadedConfigFiles.length > 0 && (
                                                <Box sx={{ mt: 2, fontWeight: 600, fontSize: 18 }}>
                                                    {/* <Typography variant="body1">Uploaded Files:</Typography> */}
                                                    {uploadedConfigFiles.map((file, index) => (
                                                        <Box key={index} sx={{ mt: 1, display: 'flex', alignItems: 'center', backgroundColor: '#ccc', borderRadius: 2, px: 2 }}>
                                                            <Typography variant="body1">{file.fileName}</Typography>
                                                            <IconButton
                                                                onClick={() => handleDeleteFile('configFile', index)}
                                                                sx={{ marginLeft: 1 }}
                                                            >
                                                                <CloseIcon sx={{ fontSize: 16, color: 'red' }} />
                                                            </IconButton>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                </Box>
                                <Box >
                                    <Typography variant='subtitle2' sx={{ color: 'grey', mt: '2px', textAlign: 'right' }}>  Supported formats: Json </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    sx={{ mt: 1, display: 'flex', flexDirection: 'row', fontWeight: 600, fontSize: 18 }}
                                >
                                    Upload Image <Typography variant='body1' sx={{ color: 'red', fontWeight: 'bold', fontSize: 22 }} >*</Typography>
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            border: '1px dashed black',
                                            width: '100%',
                                            borderRadius: 2,
                                            padding: '20px 0px ',
                                        }}
                                    >
                                        {uploadedImageFiles.length === 0 ? (
                                            <>
                                                <IconButton
                                                    onClick={() => handleFileButtonClick('imageFile')}
                                                    sx={{ mb: '2px', color: 'black' }}
                                                >
                                                    <CloudUploadIcon sx={{ color: 'black' }} />
                                                </IconButton>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    sx={{ color: 'black' }}
                                                >
                                                    Upload Image
                                                </Typography>
                                                <input
                                                    type="file"
                                                    accept="*"
                                                    onChange={(e) => handleFileChange('imageFile', e)}
                                                    style={{ display: 'none' }}
                                                    ref={fileInputRefs.imageFile}
                                                />
                                            </>
                                        ) : (
                                            uploadedImageFiles.length > 0 && (
                                                <Box sx={{ mt: 2 }}>
                                                    {/* <Typography variant="body1">Uploaded Files:</Typography> */}
                                                    {uploadedImageFiles.map((file, index) => (
                                                        <Box key={index} sx={{ mt: 1, display: 'flex', alignItems: 'center', backgroundColor: '#ccc', borderRadius: 2, px: 2 }}>
                                                            <Typography variant="body1">{file.fileName}</Typography>
                                                            <IconButton
                                                                onClick={() => handleDeleteFile('imageFile', index)}
                                                                sx={{ marginLeft: 1 }}
                                                            >
                                                                <CloseIcon sx={{ fontSize: 16, color: 'red' }} />
                                                            </IconButton>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                </Box>
                                <Box >
                                    <Typography variant='subtitle2' sx={{ color: 'grey', mt: '2px' }}>  Supported formats: Png, Jpg, Jpeg </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }} >
                            <Button variant="outlined" sx={{
                                px: 2, mr: 1, borderColor: 'black', backgroundColor: 'white', color: 'black', "&:hover": {
                                    color: 'white',
                                    backgroundColor: 'black',
                                    borderColor: 'white'
                                },
                            }}
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </Button>
                            <Button variant="outlined" sx={{
                                px: 2, borderColor: 'black', backgroundColor: 'black', color: 'white', "&:hover": {
                                    color: 'black',
                                    backgroundColor: 'white',
                                    borderColor: 'black'
                                },
                            }} onClick={handleFormSubmit}>
                                Submit
                            </Button>

                        </Box>
                    </Box>
                </Box>
            </Modal>

            {combineModal && <CombineDatasets combineModal={combineModal} setCombineModal={setCombineModal} />}
        </>
    );
};

export default DataTable;
