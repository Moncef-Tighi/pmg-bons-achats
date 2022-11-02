import { ThemeProvider } from "@emotion/react"
import theme  from "./theme"
import classes from './App.module.css'
import TableCustom from "./Table/TableCustom"
import TableHeadCustom from "./Table/TableHeadCustom"
import { TableBody,TableRow, TableCell, Link } from "@mui/material"

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

const App = function() {

  const header = [        
    { name: "Numéro du bon", sort: false},
    { name: "Valeur", sort: false},
    { name: "Type", sort: false},
    { name: "Etat", sort: false},
    { name: "Date D'expiration", sort: false},
  ]
  //const {url, handleChangePage,sortHandeler} = useTable(props.query);

  const handleChangePage = async (event, newPage) => {
      // let param=readURLObject(searchParams);
      // param["page"] = newPage;
      // setSearchParams(param);
      return;
  };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.container}>
              <h1>Liste des Bons d'achats</h1>

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
        </ThemeProvider>
        )
}

export default App