import LogoutIcon from '@mui/icons-material/Logout';
import classes from './Header.module.css';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import AddEmployes from './AddEmploye';
import { useContext } from "react"
import AuthContext from "../state/AuthContext"


const Header = function() {
    const navigate= useNavigate();
    const [openModal, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const authContext = useContext(AuthContext);
    console.log(authContext);
    const logoutHandeler = function() {
        navigate('/');
    };

    return (<>
        <header>
            <div>
                <img className={classes.icon} src="logo-pmg.png" alt="small-logo"></img>
            </div>

            <div>
            {authContext.employe.admin===1 && 
                <Tooltip title="Créer un employé" arrow>
                    <IconButton onClick={handleOpen}><LogoutIcon sx={{fontSize: '1.3em', color: "black"}}/></IconButton>
                </Tooltip>
            }
            <Tooltip title="Déconnexion" arrow>
                <IconButton onClick={logoutHandeler}><LogoutIcon sx={{fontSize: '1.3em', color: "black"}}/></IconButton>
            </Tooltip>
            </div>
            <AddEmployes open={openModal} onClose={handleClose} />
        </header>
        </>
    )
}

export default Header