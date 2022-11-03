import React from "react"
import { useState } from "react";

//Empty context 

// const AuthContext= React.createContext({
//     //On initialise avec des data par défaut pour avoir une meilleure autocomplétion
//     token : '',
//     isLoggedIn : '',
//     login : (token) => {}, 
//     logout : ()=> {},
//     permission : []
// })

// const AuthContextProvider = (props) => {
//     //C'est ce component qui gère la state     


        // const contextValue = objet avec les values du context
//     //Normalement faut wrap avec ce component, mais on a créé notre propre version du template.
//     return <AuthContext.Provider VALUE={contextValue}>{props.children}</AuthContext.Provider>
// }

const emptyEmploye= {
    email : "",
    admin: false,
} 

const AuthContext= React.createContext({
    //On initialise avec des data par défaut pour avoir une meilleure autocomplétion, techniquement c'est pas obligé
    token : '',
    employe: emptyEmploye ,
    isLoggedIn : '',
    login : (token) => {},
    checkLogin: ()=>{},
    logout : ()=> {},
})
export const AuthContextProvider = (props) => {
    //C'est ce component qui gère la state     

    const [token, setToken] = useState(null);
    const [employe, setEmploye] = useState(emptyEmploye);
    const [isLoggedIn, setLogin]= useState(null);
    
    const setInfoToConText = function(token, employe) {
        setToken(token);
        setEmploye(employe);
        setLogin(true);
    }

    const loginHandeler = (token, employe)=> {
        localStorage.setItem('token', token);
        localStorage.setItem('employe', JSON.stringify(employe));
        setInfoToConText(token, employe);
    } 

    const logoutHandeler = () => {

        setToken(null);
        setEmploye(null);
        localStorage.removeItem("token");
        localStorage.removeItem("employe");
        setLogin(false);
    } 

    const checkLogin = () => {
        if (isLoggedIn) return true
        const token = localStorage.getItem('token');
        const employe = JSON.parse(localStorage.getItem('employe'));
        if (!token) return false;
        setInfoToConText(token, employe);
        setLogin(true);
        return true;
    }

    const contextValue = {
        token,
        employe,
        isLoggedIn,
        login : loginHandeler,
        logout : logoutHandeler,
        checkLogin,
    }

    //Normalement faut wrap avec ce component, mais on a créé notre propre version du template.
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}


//On export le Provider pour l'utiliser une fois pour wrap l'app. On export le Context par défaut pour l'utiliser
//Autant de fois qu'on a besoin du context. Pour cela on utilise useContext et on lui passe le context en param
export default AuthContext