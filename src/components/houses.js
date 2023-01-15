import {Paper} from '@mui/material';
import { Container } from '@mui/system';
import { userType, setCurrentUser } from '../userType';

export const Houses = () => {
    
    const exitOnClick = () => {
        setCurrentUser(userType.none)
        window.location.reload()
    }

    return(
        <Container maxWidth='sm'>
            <Paper sx={{p: 2}}>
                asdads
            </Paper>
        </Container>
    )
}