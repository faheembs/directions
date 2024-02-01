import React from 'react'
import { Box, InputLabel, TextField } from '@mui/material'

const InputProfile = ({ label, disabled, value, onChangeFeild }) => {
    return (
        <Box>
            <InputLabel sx={{ color: 'black', fontSize: 18, fontWeight: 'bold' }} htmlFor="input">
                {label}
            </InputLabel>
            <TextField
                id="input"
                disabled={disabled}
                defaultValue={value}
                fullWidth
                variant="outlined"
                onChange={(e) => onChangeFeild(e)}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& .MuiOutlinedInput-input": {
                            fontSize: "12px",
                            height: "9px",
                            borderColor: "#DBDBDB",
                        },
                    },
                }}
            />
        </Box>
    );
};


export default InputProfile