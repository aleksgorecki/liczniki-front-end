import { Stack, Typography } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../App.css';
import Box from '@mui/material/Box';
import userIconPath from '../resources/icons/user-line.svg'
import employeeIconPath from '../resources/icons/tools-line.svg'
import { userType, setCurrentUser, getCurrentUser } from '../userType';
import { useEffect } from 'react';

export const Navbar = (props) => {

    const navigate = useNavigate();

    const clientOnClick = () => {
        setCurrentUser(userType.client)
        setTimeout(() => {
            navigate(0)
          }, "300")
    }
    
    const employeeOnClick = () => {
        setCurrentUser(userType.employee)
        setTimeout(() => {
            navigate(0)
          }, "300")
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
                        <Stack direction='row'>
                            <img src={userIconPath} fill='white' alt='user'/>
                        </Stack>
                    </NavLink>
                    <NavLink className='menu-button' to='/' onClick={employeeOnClick}>
                        <Stack direction='row'>
                            <img src={employeeIconPath} fill='white' alt='employee'/>
                        </Stack>
                    </NavLink>
                </Stack>
            </Box>
        </>
    );
};
