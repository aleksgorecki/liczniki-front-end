import {Paper, Box, TextField, Button, Skeleton, Typography} from '@mui/material';
import { Container } from '@mui/system';
import { userType, setCurrentUser } from '../userType';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate, NavLink } from 'react-router-dom';
import { grey } from '@mui/material/colors';



export const Houses = () => {
    
    const [houses, setHouses] = useState([]);
    const [buttonEnabled, setButtonEnabled] = useState(false)
    const [actionsEnabled, setActionsEnabled] = useState(true)
    const [textFieldError, setTextFieldError] = useState(false)
    const [textFieldErrorText, setTextFieldErrorText] = useState(' ')
    const [houseName, setHouseName] = useState(null)
    var previousTableHeight = 0;

    const navigate = useNavigate();


    const config = {
        headers: {
            'content-type': 'application/json',
        }
    };

    useEffect( () => {
        axios
        .get('/api/House/getAllHouses', config)
        .then( (res) => {
            console.log(res.data)
            setHouses(res.data)
        })
        .catch((error) => {
            console.log(error)
    });
    }, [])

    const onTextChanged = (value) => {
        if (!value.match(/^[\p{L}\p{N}]*$/u)) {
            setHouseName(null)
            setButtonEnabled(false);
            setTextFieldError(true);
            setTextFieldErrorText('Nazwa domu może być złożona jedynie ze znaków alfanumerycznych')
        }
        else if (value === "") {
            setHouseName(null)
            setButtonEnabled(false);
            setTextFieldError(true);
            setTextFieldErrorText('Nazwa domu nie może być pusta')
        }
        else {
            setHouseName(value)
            setButtonEnabled(true);
            setTextFieldError(false);
            setTextFieldErrorText('')
        }
    }

    const onClickDelete = (id) => {
        setButtonEnabled(false);
        setActionsEnabled(false);
        console.log(id)
        axios
        .delete(`/api/House/deleteHouse?id=${id}`, {data: {'id': id}, config: config})
        .then( (res) => {
            axios
            .get('/api/House/getAllHouses', config)
            .then( (res1) => {
                setHouses(res1.data)
                setButtonEnabled(true);
                setActionsEnabled(true);
            })
            .catch((error) => {
                console.log(error)
                setButtonEnabled(true);
                setActionsEnabled(true);
        });
        })
        .catch((error) => {
            console.log(error)
            setButtonEnabled(true);
            setActionsEnabled(false);
    });
    }

    const onClickAdd = () => {
        if (houseName == null) {
            return;
        }
        setButtonEnabled(false);
        setActionsEnabled(false);
        axios
        .post(`/api/House/addOrUpdateHouse`, {'name': houseName}, config)
        .then( (res) => {
            axios
            .get('/api/House/getAllHouses', config)
            .then( (res1) => {
                setHouses(res1.data)
                setButtonEnabled(true);
                setActionsEnabled(true);
            })
            .catch((error) => {
                console.log(error)
                setButtonEnabled(true);
                setActionsEnabled(true);
        });
        })
        .catch((error) => {
            console.log(error)
            setButtonEnabled(true);
            setActionsEnabled(true);
    });
    }

    return(
        <Container maxWidth='sm'>
            <Paper sx={{p: 2}}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}>
                    <TextField helperText={textFieldErrorText} error={textFieldError} onChange={(e) => onTextChanged(e.target.value)} id='textFieldAdd' placeholder='Nazwa domu' variant='standard' sx={{
                        flexGrow: 3,
                        m: 1
                }}>
                    </TextField>
                    <Button id='buttonAdd' onClick={onClickAdd} variant='text' disabled={!buttonEnabled} sx={{
                        flexGrow: 2,
                        m: 1 
                }}>
                        Dodaj dom
                    </Button>
                </Box>
            </Paper>
            <Paper sx={{p: 2, mt: 3}}>
                {houses != null && houses.length > 0 ?  (
                    <TableContainer id='tableContainerHouses'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>
                                    Id
                                </TableCell>
                                <TableCell align='center'>
                                    Nazwa
                                </TableCell>
                                <TableCell align='center'>
                                    Dostępne akcje
                                </TableCell>
                            </TableRow>   
                        </TableHead>
                        <TableBody>
                            {houses.map((house) => (
                                <TableRow
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    key={house.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': {backgroundColor: '#faf7f0' }}}>
                                    <TableCell align='center'>
                                        {house.id}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {house.name}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Button disabled={!actionsEnabled} component={NavLink} to={`/house-details/${house.id}`}>
                                            Szczegóły
                                        </Button>
                                        <Button disabled={!actionsEnabled} onClick={() => onClickDelete(house.id)}>
                                            Usuń
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                ) : (
                    <Typography>
                        Brak domów w bazie danych
                    </Typography>
                )}
            </Paper>
        </Container>
    )
}