import {Stack, Button, Icon, SvgIcon, Typography, Paper, Divider} from '@mui/material';
import {NavLink} from 'react-router-dom'
import userIconPath from '../resources/icons/user-line.svg'
import employeeIconPath from '../resources/icons/tools-line.svg'
import { Container } from '@mui/system';


export const Homepage = () => {

    return(
        <Container maxWidth='sm'>
            <Paper sx={{p: 2}}>
                <Stack>
                    <Typography variant='h5'>
                        Kto używa aplikacji?
                    </Typography>
                    <Divider sx={{mt: 2}} />
                    <Button sx={{mt: 2}} component={NavLink} to='user' variant='contained' size='large' startIcon={<img src={userIconPath}  fill='white' alt='user'/>}>
                        Klient
                    </Button>
                    <Button sx={{mt: 2}} component={NavLink} to='employee' variant='contained' size='large' startIcon={<img src={employeeIconPath} alt='employee'/>}>
                        Pracownik
                    </Button>
                </Stack>
            </Paper>
        </Container>
    )
}