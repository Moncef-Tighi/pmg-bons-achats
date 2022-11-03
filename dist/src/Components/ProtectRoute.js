// import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useRef} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../state/AuthContext";

const ProtectRoute = function(props) {
    const navigate = useNavigate();
    const firstRender= useRef(true);
    const authContext= useContext(AuthContext);
    useEffect( ()=> {

        if (firstRender.current) firstRender.current = false; 
        else {
            if (!props.login) {
                authContext.logout();
                navigate("/connexion");
            }
        } 
    }, [props.login])

    return (
        <><Outlet/></>
    )

}

export default ProtectRoute;