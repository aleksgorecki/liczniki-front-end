import { Stack, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';
import Box from '@mui/material/Box';
import userIconPath from '../resources/icons/user-line.svg'
import employeeIconPath from '../resources/icons/tools-line.svg'

export const Navbar = (props) => {

    return (
        <>
            <Box className='menu' sx={{ mb: 8 }}>
                <Link className='menu-button' to='/' style={{padding: 0}}>
                    <Typography variant='h5'>
                        Liczniki
                    </Typography>
                </Link>
                <Stack direction='row'>
                    <NavLink className='menu-button' to='user'>
                    <Stack direction='horizontal'>
                            <img src={userIconPath} fill='white' alt='user'/>
                        </Stack>
                    </NavLink>
                    <NavLink className='menu-button' to='employee'>
                        <Stack direction='horizontal'>
                            <img src={employeeIconPath} fill='white' alt='employee'/>
                        </Stack>
                    </NavLink>
                </Stack>
            </Box>
        </>
    );
};
