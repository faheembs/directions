import { Box, FormControl, InputLabel, MenuItem, Select, } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';


const TableSelectFeild = ({ mainLabel, handleChange }) => {
    const [valueChange, setValueChange] = useState(mainLabel)
    const { categoryInfo } = useSelector((state) => state.category);
    const categories = categoryInfo?.categories
    const Κατάσταση = [{ name: 'Εγκρίθηκε', val: "accepted" }, { name: 'Ακυρώθηκε', val: "rejected" }, { name: 'Αναμονή', val: "pending" }]
    const handleValueChange = (name, val, filterOn) => {
        setValueChange(name)
        handleChange(val, filterOn)
    }

    return (
        <Box sx={{ mr: mainLabel === 'Κατηγορία' ? 1 : 4 }}>
            <InputLabel id="select-label" sx={{ color: 'black', fontSize: 20 }}>{mainLabel}</InputLabel>
            <FormControl size="small" sx={{ width: mainLabel === 'Κατάσταση' ? 160 : 250 }} variant="outlined">
                <Select
                    labelId="select-label"
                    id="select"
                    value={valueChange}
                    sx={{
                        '& .MuiSelect-select': {
                            color: 'rgba(0, 0, 0, 0.38)',
                        },
                        width: mainLabel === 'Κατάσταση' ? 150 : 230,
                        height: 34,
                        backgroundColor: '#FBFCFE'
                    }}
                >
                    {mainLabel === 'Κατηγορία' ?
                        categories?.map((category) => (
                            <MenuItem key={category._id} onClick={() => handleValueChange(category.name, category.name, "category")} value={category.name}>{category.name}</MenuItem>
                        ))
                        :
                        Κατάσταση.map((status) => (
                            <MenuItem key={status.name} onClick={() => handleValueChange(status.name, status.val, "status")} value={status.name}>{status.name}</MenuItem>
                        ))


                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default TableSelectFeild