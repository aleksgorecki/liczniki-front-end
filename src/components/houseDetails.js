import {Paper} from '@mui/material';
import { Container } from '@mui/system';
import { userType, getCurrentUser } from '../userType';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const HouseDetails = () => {

    const houseNotFoundMessage = "Dom o podanym Id nie istnieje. Wróć na poprzednią stronę i spróbuj ponownie."
    const params = useParams();
    const houseId = params.id;
    
    useEffect( () => {

    }, [])

    return(
        <Container maxWidth='md'>
            <Paper sx={{p: 2}}>
                asdasd
            </Paper>
        </Container>
    )
}