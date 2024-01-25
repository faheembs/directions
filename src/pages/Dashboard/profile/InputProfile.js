import React from 'react'
import { Box, InputLabel, TextField } from '@mui/material'

const InputProfile = ({ placeholder, label, disabled, value, onChangeFeild }) => {
    return (
        <Box>
            <InputLabel sx={{ color: '#9E9E9E', fontSize: 18 }} htmlFor="input">{label}</InputLabel>
            <TextField
                id="input"
                disabled={disabled}
                placeholder={placeholder}
                defaultValue={value}
                variant="outlined"
                onChange={(e) => onChangeFeild(e)}
                sx={{
                    backgroundColor: '#EDEDED', mt: 2, mb: 4,
                    "& .MuiOutlinedInput-root": {
                        "& .MuiOutlinedInput-input": {
                            fontSize: "12px",
                            height: "9px",
                            minWidth: '350px',
                            borderColor: "#DBDBDB",
                        },

                    }
                }}
            />
        </Box>
    )
}

export default InputProfile