import {Button, Paper, TextField, Box, FormHelperText} from '@mui/material';
import { Container } from '@mui/system';
import { useState, useRef } from 'react';

export const FindHouse = () => {

    const [houseId, setHouseId] = useState(null);
    const [buttonEnabled, setButtonEnabled] = useState(false)
    const [textFieldError, setTextFieldError] = useState(false)
    const [textFieldErrorText, setTextFieldErrorText] = useState('')


    const findOnClick = () => {
        console.log(houseId)
    }

    const onTextChanged = (value) => {
        const buttonFind = document.getElementById('buttonFind');
        const textFieldId = document.getElementById('textFieldId');
        console.log(buttonFind.disabled)
        if (value === '') {
            setHouseId(null)
            setButtonEnabled(false);
            setTextFieldError(true);
            setTextFieldErrorText("Id domu nie może być puste");
        }
        else if (isNaN(value)) {
            setHouseId(null)
            setButtonEnabled(false);
            setTextFieldError(true);
            setTextFieldErrorText("Id domu musi być liczbą całkowitą");
        }
        else {
            setHouseId(value);
            buttonFind.disabled = false
            setButtonEnabled(true);
            setTextFieldError(false);
            setTextFieldErrorText('');
        }
        
    }

    return(
        <Container maxWidth='sm'>
            <Paper sx={{p: 1}}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}>
                    <TextField helperText={textFieldErrorText} error={textFieldError} onChange={(value) => onTextChanged(value.target.value)} id='textFieldId' placeholder='Id domu' variant="outlined" sx={{
                        flexGrow: 3,
                        m: 1
                }}>
                    </TextField>
                    <Button id='buttonFind' variant='text' disabled={!buttonEnabled} onClick={findOnClick} sx={{
                        flexGrow: 2,
                        m: 1 
                }}>
                        Znajdź dom
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}