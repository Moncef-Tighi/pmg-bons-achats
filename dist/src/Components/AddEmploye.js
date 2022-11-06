import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import classes from './AddEmploye.module.css'
import { OutlinedInput, IconButton, InputAdornment, InputLabel, Button } from '@mui/material';
import { useState } from 'react';
import {Visibility, VisibilityOff} from '@mui/icons-material'
import { NativeSelect } from "@mui/material";
import { URL_API } from '../index.js';
import { useContext } from "react"
import AuthContext from "../state/AuthContext"
import axios from 'axios';
import OldNotification from './OldNotification';

const AddEmployes = function({open, onClose}) {
    const [showPassword, setPasswordVisibility]=useState(false);
    const authContext = useContext(AuthContext);
    const [openNotif, setNotif] = useState("");
    const [error, setError] = useState("");

    const closeNotif = (event, reason) => {
        setNotif("");
        setError("");
    };
  

    const createEmploye =async  function(event) {
        event.preventDefault();

        const {email ,password, permission}= event.currentTarget.elements
        try {
            const response = await axios.post(`${URL_API}/login/inscription`, {
                email: email.value,
                admin: permission.value==="admin",
                password: password.value
            }, {
                headers : {
                    "Authorization" : `Bearer ${authContext.token}`
                }
            })

            onClose();
            setNotif("Le nouvel employé a bien été créé");
        } catch(error) {
            console.log(error);
            console.log(error.code);
            if (error.code==="ERR_BAD_REQUEST") return setError("Impossible de créer cet utilisateur");
            if (error.code==="ERR_NETWORK") return setError("Erreur de connexion : Le serveur n'est pas accessible");
            if (error.response.data?.message.startsWith("La création a échouée")) return setError("L'utilisateur ou l'email fournit existe déjà");
        }
    }



    const handleClickShowPassword = () => {
        setPasswordVisibility(!showPassword);
      };
    
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };  

    return (
        <>
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box className={classes.modal}>
                    <h1>Ajouter un Employé</h1>
                    <form onSubmit={createEmploye}> 
                        <InputLabel htmlFor="email">E-Mail</InputLabel>
                        <OutlinedInput id='email' color='primary' size='small' fullWidth={true} required/>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                        size='small'
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth={true}
                        endAdornment={<InputAdornment position="end">
                        
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>}
                        />
                        <InputLabel htmlFor="poste">Poste</InputLabel>
                        <NativeSelect variant='outlined' id='poste'
                            color='primary' sx={{marginTop : "15px"}}
                            defaultValue={"modification"}
                            inputProps={{name: 'permission',id: 'permission',}}
                            >
                                <option value={"employe"}>Employé</option>
                                <option value={"admin"}>Admin</option>
                        </NativeSelect>




                    <div className={classes.flex}>
                    <Button variant="contained" color='grey'
                    size="large" onClick={onClose} sx={{marginRight: "10px"}}>
                    Annuler</Button>

                    <Button color="primary" variant="contained" fullWidth={true}
                    size="large" type="submit">
                    Confirmer</Button>


                    </div>
                </form>

            </Box>
        </Modal>

        <OldNotification closeNotif={closeNotif} message={error} status="error"  />
        <OldNotification closeNotif={closeNotif} message={openNotif} status="success"  />
        </>
        )
}

export default AddEmployes