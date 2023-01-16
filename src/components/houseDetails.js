import {Paper, Typography, Stack} from '@mui/material';
import { Container } from '@mui/system';
import { userType, getCurrentUser } from '../userType';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DatabaseErrorDialog from './databaseErrorDialog';

export const HouseDetails = () => {

    const config = {
        headers: {
            'content-type': 'application/json',
        }
    };

    const params = useParams();
    const houseId = params.id;
    const [houseName, setHouseName] = useState(null);
    const [waterMeter, setWaterMeter] = useState(null);
    const [electricityMeter, setElectricityMeter] = useState(null);
    const [notFound, setNotFound] = useState(false);
    
    useEffect( () => {
        axios
        .get(`/api/House/getHouse?id=${houseId}`, config)
        .then( (res) => {
            if (res.status === 200) {
                setHouseName(res.data.name);
                axios
                .get('/api/House/getAllHouses', config)
                .then( (res1) => {
                    setWaterMeter(res1.data.waterMeter)
                    setElectricityMeter(res1.data.electricityMeter)
                })
                .catch((error) => {
                    console.log(error)
            });
            }
            else {
                setNotFound(true);
            }
        })
        .catch((error) => {
            console.log(error)
    });
    }, [])

    return(
        <Container maxWidth='md'>
            <Paper sx={{p: 2}}>
                {!notFound ? (
                    <Typography variant='h5'>
                        Odczyty dla {houseName} (Id {houseId})
                    </Typography>
                ) : (
                    <Typography variant='h5'>
                        Dom o podanym Id nie istnieje. Wróć na poprzednią stronę i spróbuj ponownie.
                    </Typography>
                )}

            </Paper>
            <Stack direction='row'>
            <Paper>
                aasdasd
            </Paper>
            <Paper>
                asdadas
            </Paper>
            </Stack>
        </Container>
    )
}