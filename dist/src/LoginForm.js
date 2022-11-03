import classes from "./LoginForm.module.css";
import {InputLabel, OutlinedInput, InputAdornment,IconButton, Button, ThemeProvider} from '@mui/material';
import {Visibility, VisibilityOff, AccountCircle} from '@mui/icons-material'
import { useState, useContext } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import AuthContext from './state/AuthContext';
import { URL_API } from "./index.js";
import theme from "./theme";

const LoginForm = function() {
    const [showPassword, setPasswordVisibility]=useState(false);
    const [error, setError] = useState("");
    const authContext = useContext(AuthContext);
    const navigate= useNavigate();

    const handleClickShowPassword = () => {
        setPasswordVisibility(!showPassword);
      };
    
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    const login = async (event)=> {
        event.preventDefault();
        const {password, email}= event.currentTarget.elements

        if(password.value.trim()==="" || email.value.trim()==="") return setError("L'email et le mot de passe ne peuvent pas être vide");

        try {
            const response = await axios.post(`${URL_API}/login`, {
                email: email.value,
                password: password.value
            })
            console.log(response);
            setError("");
            console.log(authContext)
            authContext.login(response.data.token, response.data.employe);
            navigate("/liste");
        } catch(error) {
            console.log(error);
            if (error.response) {
                if (error.response.status===401) return setError(error.response.data.message);
                return setError("Le serveur n'est pas accessible. Veuillez réessayer plus tard");
            } else {
                return setError("Impossible de se connecter : Une erreur inconnue a eu lieu");
            }
        }

    }
    

    return (
        <ThemeProvider theme={theme} >
        <main className={classes.wrapper}>
            <div className={classes.positionning}>
                <img src="logo-pmg.png" alt="logo"></img>
                <h1>S'identifier</h1>
                {error ? <h3>{error}</h3> : ""}
                <form onSubmit={login}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                    id="email"
                    fullWidth={true}
                    placeholder="a.nom@pmg.dz"
                    endAdornment={<InputAdornment position="end"> <AccountCircle /></InputAdornment>}
                    />

                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
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
            
                    <Button color="primary" variant="contained" 
                    size="large" sx={ {marginTop: "40px"}} type="submit"
                    >
                        Confirmer</Button>
                </form>


            </div> 
        </main>
        </ThemeProvider>
        )
}

export default LoginForm