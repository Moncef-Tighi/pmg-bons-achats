import AuthContext from "./state/AuthContext";
import { useContext, useEffect } from "react";
import React from 'react';

import {Route, Routes, useNavigate} from 'react-router-dom'
import LoginForm from './LoginForm';
import ProtectRoute from './Components/ProtectRoute';
import ListeBon from "./ListeBon";


const App = function() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
      const check = authContext.checkLogin();
      if (check===false) navigate("/connexion");
  }, [authContext]  )
  const login = authContext.isLoggedIn;

  return (    
  <Routes>
    <Route path='' element={<LoginForm />} />
    <Route path='connexion' element={<LoginForm />} />
    <Route element={<ProtectRoute login={login}/>}>
        <Route path='/liste' element={<ListeBon/>} />
    </Route>

    <Route path='*' element={<div>ERREUR 404</div>}/>
  </Routes>

  )

}

export default App