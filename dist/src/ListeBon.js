import { ThemeProvider } from "@emotion/react"
import theme  from "./theme"
import classes from './App.module.css'
import TableCustom from "./Table/TableCustom"
import TableHeadCustom from "./Table/TableHeadCustom"
import { TableBody,TableRow, TableCell, Button, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { MenuItem, InputLabel } from "@mui/material";
import { useForm } from 'react-hook-form';
import CustomInput from "./util/CustomInput";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Header from "./Components/Header"


const bons = [
  {
    numero : "0001",
    valeur : 3000,
    type : "Bon Achat",
    etat: "Soldé",
    dateExpiration : "/"
  },
  {
    numero : "0002",
    valeur : 300,
    type : "Carte Cadeau",
    etat: "Non-Soldé",
    dateExpiration : "15/11/2022"
  },
  {
    numero : "0003",
    valeur : 20000,
    type : "Bon Achat",
    etat: "Non-Soldé",
    dateExpiration : "/"
  },
  {
    numero : "0004",
    valeur : 500,
    type : "Carte Cadeau",
    etat: "Non-Soldé",
    dateExpiration : "15/11/2022"
  },
  {
    numero : "0006",
    valeur : 1000,
    type : "Bon Achat",
    etat: "Soldé",
    dateExpiration : "/"
  },
  {
    numero : "0007",
    valeur : 300,
    type : "Carte Cadeau",
    etat: "Non-Soldé",
    dateExpiration : "16/11/2022"
  },
]


const ListeBon = ()=> {

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
  
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [typeBon, setTybeBon] = useState("bonAchat");
    const [date, setDate] = useState(null)
    const changeBon = (event, value)=> {
      setTybeBon(value.props.value);
    }
  
    const send = function(data) {
        console.log(data);
        console.log(typeBon);
        //Moment Object
        console.log(date);
    }
  
    const header = [        
      { name: "Numéro du bon", sort: false},
      { name: "Valeur", sort: false},
      { name: "Type", sort: false},
      { name: "Etat", sort: false},
      { name: "Date D'expiration", sort: false},
    ]
  
    const handleChangePage = async (event, newPage) => {
        // let param=readURLObject(searchParams);
        // param["page"] = newPage;
        // setSearchParams(param);
        return;
    };
  
    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <div className={classes.container}>
            <h1 style={{textAlign: "center"}}>Liste des Bons</h1>

            <div className={classes.flexContainer}>
                <Button variant="contained" 
                    size="large"
                    sx={{width: 200}}
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                    >
                    Ajouter
                </Button>
            </div>

            <TableCustom
                tableData={bons}
                totalSize={bons.length}
                page={0}
                handleChangePage={handleChangePage}
                loading={false}
                sx={{
                boxShadow: "#3c40434d 0px 1px 2px 0px,#3c404326 0px 1px 3px 1px"}}
            >
            <TableHeadCustom header={header} />

                <TableBody>
                    {bons.map((bon) => {
                        return (
                        <TableRow
                        key={bon.numero}
                        >
                        <TableCell component="th" scope="row" align="center">
                            {/* Le link marche pas for some reason ? */}
                            {bon.numero}
                        </TableCell>

                        <TableCell component="th" scope="row" align="center">
                            {/* Le link marche pas for some reason ? */}
                            {bon.valeur}
                        </TableCell>
                        <TableCell align="center">
                            {bon.type}</TableCell>
                        <TableCell align="center" style={bon.etat==="Soldé" ? {color: "red"} : {color: "green"} } >
                            {bon.etat}</TableCell>
                        <TableCell align="center" >{bon.dateExpiration}</TableCell>
                    </TableRow>)})}
                </TableBody>
                </TableCustom>

            </div>

            <Modal
            open={openModal}
            onClose={handleClose}
            >
            <Box className={classes.modalBox}>
                <h1>Nouveau Bon</h1>
                <form onSubmit={handleSubmit(send)} className={classes.form}>
                <div style={{width: "75%"}}>
                    <InputLabel htmlFor="input-with-label" sx={{marginBottom: "10px"}}>
                        Sélectionner le type de bon
                    </InputLabel>
                    <TextField
                    select
                    label="Type de bon"
                    value={typeBon}
                    onChange={changeBon}
                    sx={{width: "100%"}}
                    >
                        <MenuItem key={"bonAchat"} value={"bonAchat"}>
                        Bon d'Achat
                        </MenuItem>
                        <MenuItem key={"carteCadeau"} value={"carteCadeau"}>
                        Carte Cadeau
                        </MenuItem>
                    </TextField>
                </div>
                    <CustomInput 
                        control={control} 
                        label={"Numéro du bon"}
                        name={"numeroBon"}
                        error={errors?.numeroBon?.message}
                        sx={{width: "100%"}}
                    />
                    <CustomInput 
                        control={control} 
                        label={"Valeur"}
                        name={"valeur"}
                        error={errors?.valeur?.message}
                        sx={{width: "100%"}}
                        rules={{ 
                            pattern: {value:  /^(0|[1-9]\d*)(\.\d+)?$/, message: 'Veuillez entrer un chiffre seulement'}                                                      
                            ,required: { value: true, message: 'Ce champ est obligatoire'},
                            min: {value: 1,message: 'Le montant doit être supérieur à zéro'},
                        }}
                    />
                    {typeBon==="carteCadeau" && 
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                        label="Date d'Expiration"
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={setDate}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    }

                    <Button color="primary" variant="contained" 
                    size="large" sx={ {marginTop: "20px"}} type="submit"
                    onClick={handleOpen}
                    >
                        Confirmer
                    </Button>
            </form>
            </Box>

            </Modal>
        </ThemeProvider>
        )
  
}

export default ListeBon