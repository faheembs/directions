import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CardMedia, Modal, Typography } from '@mui/material';
import { userColumns, userRows, datasetColumns, datasetRows } from './Data';
import { useLocation } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const modalStyles = {
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    width: 700,
    height: 656,
};

const customStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100vw",
};
export const DataTable = () => {
    const [sortModel, setSortModel] = useState([{ field: 'id', sort: 'desc' }]);
    const location = useLocation()
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'free',
        file: null,
    });
    const [fileInput, setFileInput] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const datasetRoute = location.pathname === '/dashboard/datasets'
    const userRoute = location.pathname === '/dashboard/users'


    const customRows = userRoute ? userRows : datasetRows;
    const customColumns = userRoute ? userColumns : datasetColumns;

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, file });
        setUploadedFiles([...uploadedFiles, file]);
    };
    const handleFileButtonClick = () => {
        fileInput.click();
    };
    const handleFormSubmit = () => {
        console.log('Form submitted:', formData);
        handleCloseModal();
        setUploadedFiles([]);
    };
    return (
        <>
            {datasetRoute ? <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderRadius: 1, textTransform: 'none' }}>
                <Button variant='contained' onClick={handleOpenModal}  >Add Dataset</Button>
            </Box> : null}
            <Box
                sx={{

                    "& .MuiDataGrid-root": {
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 500
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#F1F4F8",
                        borderRadius: '12px 12px 0 0',

                    },
                    '& .super-app-theme--cell': {
                        fontSize: 14,
                        fontWeight: 500

                    },
                    '& .super-app-theme-cell': {
                        fontSize: 14,
                        color: '#0380FF'
                    },
                    '& .super-app-theme--cell-date': {
                        fontWeight: 500
                    },
                    overflowX: 'hidden'
                }}
            >

                <DataGrid
                    sx={{ backgroundColor: '#FBFCFE', mt: 4, overflowyY: 'hidden', }}
                    rows={customRows}
                    columns={customColumns}
                    // rowHeight={55}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 20, page: 0 },
                        },
                    }}
                    // sortModel={sortModel}
                    // onSortModelChange={handleSortModelChange}
                    // pagination
                    // pageSizeOptions={[2, 10, 25]}
                    // pageSize={3}
                    // hideFooterPagination
                    hideFooterSelectedRowCount
                    checkboxSelection
                // columnBuffer={12}
                />
            </Box>
            {/* Modal for adding a dataset */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                sx={customStyles}
            >
                <Box sx={modalStyles}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                            onClick={handleCloseModal}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <Typography sx={{ my: 1 }} variant='body1' >Title</Typography>
                        <TextField

                            variant="outlined"
                            fullWidth
                            size='small'
                            name="title"
                            value={formData.title}
                            onChange={handleFormChange}
                        />
                        <Typography sx={{ my: 1 }} variant='body1' >Description</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            size='small'
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                        />
                        <FormControl fullWidth variant="outlined">
                            <Typography sx={{ my: 1 }} variant='body1' >Data Set Type</Typography>
                            <Select
                                labelId="status-label"
                                name="status"
                                size='small'
                                value={formData.status}
                                onChange={handleFormChange}
                            >
                                <MenuItem value="free">Free</MenuItem>
                                <MenuItem value="premium">Premium</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant='body1' sx={{ mt: 1 }}>Upload Dataset File</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    borderRadius: 4,
                                    backgroundColor: '#ccc',
                                    mt: 2,
                                    width: 400
                                }}
                            >
                                <IconButton
                                    color="primary"
                                    onClick={handleFileButtonClick}
                                    sx={{ mb: 1 }}
                                >
                                    <CloudUploadIcon />
                                </IconButton>
                                <Typography variant="body2" fontWeight='bold' sx={{ color: "#0380FF" }}>
                                    Upload File
                                </Typography>
                                <input
                                    type="file"
                                    accept="*"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                    ref={(input) => setFileInput(input)}
                                />
                                {uploadedFiles.length > 0 && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body1">Uploaded Files:</Typography>
                                        {uploadedFiles.map((file, index) => (
                                            <Card key={index} sx={{ mt: 1 }}>
                                                <CardMedia
                                                    component="img"
                                                    height="100"
                                                    image={URL.createObjectURL(file)}
                                                    alt={`Uploaded File ${index + 1}`}
                                                />
                                            </Card>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }} >
                            <Button variant="contained" sx={{ borderRadius: 8, width: 250, mt: 2 }} onClick={handleFormSubmit}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
export default DataTable;