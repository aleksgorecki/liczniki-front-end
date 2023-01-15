import {Stack, Button, Typography, Paper, Divider} from '@mui/material';
import {NavLink} from 'react-router-dom'
import houseIconPath from '../resources/icons/home-2-line.svg'
import { Container } from '@mui/system';
import { userType, setCurrentUser } from '../userType';

export const UserHomepage = () => {

    const exitOnClick = () => {
        setCurrentUser(userType.none)
        window.location.reload()
    }

    return(
        <Container maxWidth='sm'>
            <Paper sx={{p: 2}}>
                <Stack>
                    <Typography variant='h5'>
                        Panel klienta
                    </Typography>
                    <Divider sx={{mt: 2}} />
                    <Button sx={{mt: 2}} component={NavLink} to='find-house' variant='contained' size='large' startIcon={<img src={houseIconPath}  fill='white' alt='user'/>}>
                        Szczegóły domu
                    </Button>
                    <Button sx={{mt: 2}} onClick={exitOnClick} variant='outlined' size='large'>
                        Wyjście
                    </Button>
                </Stack>
            </Paper>
        </Container>
    )
}