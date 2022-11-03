import LogoutIcon from '@mui/icons-material/Logout';
import classes from './Header.module.css';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Tooltip } from '@mui/material';

const Header = function() {
    const navigate= useNavigate();

    const logoutHandeler = function() {
        navigate('/');
    };

    return (<>
        <header>
            <div>
                <img className={classes.icon} src="small-logo-pmg.png" alt="small-logo"></img>
            </div>

            <div>

            <Tooltip title="Déconnexion" arrow>
                <IconButton onClick={logoutHandeler}><LogoutIcon sx={{fontSize: '1.3em', color: "black"}}/></IconButton>
            </Tooltip>
            </div>
        </header>
        </>
    )
}

export default Header