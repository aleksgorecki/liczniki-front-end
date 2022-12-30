import { Stack, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';
import Box from '@mui/material/Box';
import userIconPath from '../resources/icons/user-line.svg'
import employeeIconPath from '../resources/icons/tools-line.svg'
import { userType, setCurrentUser, getCurrentUser } from '../userType';

export const Navbar = (props) => {

    const clientOnClick = () => {
        setCurrentUser(userType.client)
        window.location.reload()
    }
    
    const employeeOnClick = () => {
        setCurrentUser(userType.employee)
        window.location.reload()
    }

    return (
        <>
            <Box className='menu' sx={{ mb: 8 }}>
                <Link className='menu-button' to='/' style={{padding: 0}}>
                    <Typography variant='h5'>
                        Liczniki
                    </Typography>
                </Link>
                <Stack direction='row'>
                    <NavLink className='menu-button' to='/' onClick={clientOnClick}>
                        <Stack direction='horizontal'>
                            <img src={userIconPath} fill='white' alt='user'/>
                        </Stack>
                    </NavLink>
                    <NavLink className='menu-button' to='/' onClick={employeeOnClick}>
                        <Stack direction='horizontal'>
                            <img src={employeeIconPath} fill='white' alt='employee'/>
                        </Stack>
                    </NavLink>
                </Stack>
            </Box>
        </>
    );
};
