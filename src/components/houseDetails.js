import {Paper, Typography, Stack, Button, Box, TextField, Select, MenuItem} from '@mui/material';
import { Container } from '@mui/system';
import { userType, getCurrentUser, setCurrentUser } from '../userType';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DatabaseErrorDialog from './databaseErrorDialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const HouseDetails = () => {

    const config = {
        headers: {
            'content-type': 'application/json',
        }
    };

    const params = useParams();
    const houseId = params.id;
    const [houseName, setHouseName] = useState(null);
    const [waterMeter, setWaterMeter] = useState([]);
    const [electricityMeter, setElectricityMeter] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [actionsEnabled, setActionsEnabled] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [textFieldError, setTextFieldError] = useState(false)
    const [textFieldErrorText, setTextFieldErrorText] = useState(' ')
    const [editId, setEditId] = useState(null);
    const [currentMeterType, setCurrentMeterType] = useState('water');
    const [meterValue, setMeterValue] = useState('');

    const getHouseDetails = () => {
        axios
        .get(`/api/House/getHouse?id=${houseId}`, config)
        .then( (res) => {
            if (res.status === 200) {
                setHouseName(res.data.name);
                axios
                .get(`/api/Meter/getMeterValuesForHouse?id=${houseId}`, config)
                .then( (res1) => {
                    setWaterMeter(res1.data.waterMeter)
                    setElectricityMeter(res1.data.electricityMeter)
                    setActionsEnabled(true);
                })
                .catch((error) => {
                    console.log(error)
                    setActionsEnabled(true);
                    setOpen(true)
            });
            }
            else {
                setNotFound(true);
            }
        })
        .catch((error) => {
            console.log(error)
            setActionsEnabled(true);
            setButtonEnabled(true);
        })};


    useEffect( () => {
        getHouseDetails();
    }, []);

    const onTextChanged = (value) => {
        if (!Number.isInteger(Number(value))) {
            setMeterValue(value)
            setButtonEnabled(false);
            setTextFieldError(true);
            setTextFieldErrorText('Wartość odczytu musi być liczbą całkowitą')
        }
        else if (value.trim() === '') {
            setMeterValue(value)
            setButtonEnabled(false);
            setTextFieldError(true);
            setTextFieldErrorText('Wartość odczytu nie może być pusta')
        }
        else if (Number(value) > 100 || Number(value) < 0) {
            setMeterValue(value)
            setButtonEnabled(false);
            setTextFieldError(true);
            setTextFieldErrorText('Wartość musi znajdować się w zakresie [0, 100]')
        }
        else {
            setMeterValue(value.trim())
            setButtonEnabled(true);
            setTextFieldError(false);
            setTextFieldErrorText(' ')
        }
    }

    const onClickDelete = (id, meterType) => {
        setCurrentMeterType(meterType);

        const previousButtonState = buttonEnabled
        setButtonEnabled(false);
        setActionsEnabled(false);


        console.log(currentMeterType)

        var endpoint;

        if (meterType === 'water') {
            endpoint = `/api/Meter/deleteWaterMeterValue?id=${id}`
        }
        else {
            endpoint = `/api/Meter/deleteElectricityMeterValue?id=${id}`
        }

        axios
        .delete(endpoint, {data: {'id': id}, config: config})
        .then( (res) => {
            axios
                .get(`/api/Meter/getMeterValuesForHouse?id=${houseId}`, config)
                .then( (res1) => {
                    setWaterMeter(res1.data.waterMeter)
                    setElectricityMeter(res1.data.electricityMeter)
                    setActionsEnabled(true);
                })
                .catch((error) => {
                    console.log(error)
                    setActionsEnabled(true);
                    setOpen(true)
            });
        })
        .catch((error) => {
            console.log(error)
            setActionsEnabled(true);
            setOpen(true)
    });
    setButtonEnabled(previousButtonState)
    }

    const onClickAdd = () => {
        if (meterValue == null) {
            return;
        }

        var endpoint;

        if (currentMeterType === 'water') {
            endpoint = `/api/Meter/addOrUpdateWaterMeterValue`
        }
        else {
            endpoint = `/api/Meter/addOrUpdateElectricityMeterValue`
        }

        console.log(endpoint)

        if (!isEditing) {
            setButtonEnabled(false);
            setActionsEnabled(false);
            axios
            .post(endpoint, {value: Number(meterValue), houseId: Number(houseId)}, config)
            .then( (res) => {
                axios
                .get(`/api/Meter/getMeterValuesForHouse?id=${houseId}`, config)
                .then( (res1) => {
                    setWaterMeter(res1.data.waterMeter)
                    setElectricityMeter(res1.data.electricityMeter)
                    setActionsEnabled(true);
                })
                .catch((error) => {
                    console.log(error)
                    setButtonEnabled(true);
                    setActionsEnabled(true);
                    setOpen(true)
            });
            })
            .catch((error) => {
                console.log(error)
                setButtonEnabled(false);
                setActionsEnabled(true);
                setOpen(true)
        });
        setButtonEnabled(false);
        setMeterValue('');
        }
        else {
            setButtonEnabled(false);
            setActionsEnabled(false);
            axios
            .post(endpoint, {id: Number(editId), value: Number(meterValue), houseId: Number(houseId)}, config)
            .then( (res) => {
                axios
                .get(`/api/Meter/getMeterValuesForHouse?id=${houseId}`, config)
                .then( (res1) => {
                    setWaterMeter(res1.data.waterMeter)
                    setElectricityMeter(res1.data.electricityMeter)
                    setActionsEnabled(true);
                })
                .catch((error) => {
                    console.log(error)
                    setActionsEnabled(true);
                    setOpen(true)
            });
            })
            .catch((error) => {
                console.log(error)
                setActionsEnabled(true);
                setOpen(true)
        });
        setIsEditing(false);
        setButtonEnabled(false);
        setMeterValue('');
        } 
    }
    
    const onClickEdit = (id, value, meterType) => {
        setCurrentMeterType(meterType);
        setEditId(id);
        setMeterValue(value);
        setIsEditing(true);
    }

    const onClickCancelEdit = () => {
        setIsEditing(false);
        setButtonEnabled(false);
        setMeterValue('');
    }


    const MeterTable = (props) => {

        const meterType = props.meterType;

        return (
            <TableContainer id='tableContainerHouses'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>
                                    Id
                                </TableCell>
                                <TableCell align='center'>
                                    Wartość
                                </TableCell>
                                <TableCell align='center'>
                                    Dostępne akcje
                                </TableCell>
                            </TableRow>   
                        </TableHead>
                        <TableBody>
                            {props.readings.map((reading => (
                                <TableRow
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    key={reading.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                                    <TableCell align='center'>
                                        {reading.id}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {reading.value}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Button align='center' disabled={!actionsEnabled} variant='text' onClick={() => onClickEdit(reading.id, reading.value, meterType)} sx={{m: 0.5}}>
                                            Edytuj
                                        </Button>
                                        <Button color='secondary' align='center' variant='text' disabled={!actionsEnabled} onClick={() => onClickDelete(reading.id, meterType)} sx={{m: 0.5}}>
                                            Usuń
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
        )
    }


    return(
        <Container maxWidth='md' sx={{ mb: 8 }}>
            {!notFound ? (
                <>
                    <Paper sx={{p: 2}}>
                        <Typography variant='h5'>
                            Odczyty dla {houseName} (Id {houseId})
                        </Typography>
                    </Paper>
                    <Paper sx={{p: 2, mt: 3}}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            }}>
                                <TextField value={meterValue} helperText={textFieldErrorText} error={textFieldError} onChange={(e) => onTextChanged(e.target.value)} placeholder='Odczyt licznika' variant='standard' sx={{
                                    flexGrow: 3,
                                    m: 1
                                }}>
                                </TextField>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currentMeterType}
                                    label="Age"
                                    onChange={(e) => setCurrentMeterType(e.target.value)}
                                    disabled={isEditing}
                                    sx={{
                                        flexGrow: 1,
                                        m: 1
                                    }}
                                >
                                    <MenuItem value={'water'}>Woda</MenuItem>
                                    <MenuItem value={'electricity'}>Prąd</MenuItem>
                                </Select>
                                <Button id='buttonAdd' variant='outlined' onClick={onClickAdd} disabled={!buttonEnabled} sx={{
                                    flexGrow: 2,
                                    m: 1 
                                }}>
                                    {!isEditing ? 'Dodaj odczyt' : 'Zapisz zmiany'}
                                </Button>
                                {isEditing ? (
                                    <Button color='secondary' variant='outlined' onClick={onClickCancelEdit} sx={{
                                        flexGrow: 2,
                                        m: 1 
                                    }}>
                                        Anuluj edycję
                                    </Button>
                                ) : (
                                    null
                                )}
                        </Box>
                    </Paper>
                    <Stack direction='row' justifyContent='center' sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                    }}>
                        <Paper sx={{p: 2, mt: 3, mr: 1.5, flexGrow: 1}}>
                            <Typography variant='h6'>
                                Woda
                            </Typography>
                            <MeterTable readings={waterMeter} meterType='water' sx={{mt: 1}}/>
                        </Paper>
                        <Paper sx={{p: 2, mt: 3, ml: 1.5, flexGrow: 1}}>
                            <Typography variant='h6'>
                                Prąd
                            </Typography>
                            <MeterTable readings={electricityMeter} meterType='electricity' sx={{mt: 1}}/>
                        </Paper>
                    </Stack>
                </>
                ) : (
                    <Paper>
                        <Typography variant='h5'>
                            Dom o podanym Id nie istnieje. Wróć na poprzednią stronę i spróbuj ponownie.
                        </Typography>
                    </Paper>
                )}
            <DatabaseErrorDialog isOpen={open} handleClose={() => setOpen(false)} />
        </Container>
    )
}