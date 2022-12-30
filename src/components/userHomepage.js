import {Stack, Button, Icon, SvgIcon, Typography, Paper, Divider} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom'
import userIconPath from '../resources/icons/user-line.svg'
import employeeIconPath from '../resources/icons/tools-line.svg'
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
                    <Button sx={{mt: 2}} component={NavLink} to='house' variant='contained' size='large' startIcon={<img src={userIconPath}  fill='white' alt='user'/>}>
                        Odczyty domu
                    </Button>
                    <Button sx={{mt: 2}} onClick={exitOnClick} variant='outlined' size='large' startIcon={<img src={employeeIconPath} alt='employee'/>}>
                        Wyjście
                    </Button>
                </Stack>
            </Paper>
        </Container>
    )
}