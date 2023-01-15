import {Paper} from '@mui/material';
import { Container } from '@mui/system';
import { userType, getCurrentUser } from '../userType';

export const HouseDetails = () => {


    const dummyHouse = {
        id: 10,
        name: "Dom",
        water: [
            10,
            60,
            80
        ],
        electricity: [
            20,
            30,
            50
        ]
    }


    return(
        <Container maxWidth='lg'>
            <Paper sx={{p: 2}}>
                asdasd
            </Paper>
        </Container>
    )
}