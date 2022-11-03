import {Snackbar, Alert} from "@mui/material";
import { useEffect, useState } from "react";

function Notification({message, status="error"}) {
    const [open, setOpen] = useState(false);
    const closeNotif = (event, reason) => {
        setOpen(false);
    };
    useEffect(()=> {
        if(message!=="") setOpen(true);
    }, [message])

    return (<>             
        <Snackbar open={open} autoHideDuration={4000} onClose={closeNotif}>
            <Alert onClose={closeNotif} severity={status} sx={{width: '100%'}}>{message}</Alert>
        </Snackbar></>
    );
}

export default Notification