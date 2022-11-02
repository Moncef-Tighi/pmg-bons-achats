import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const TableRapportTache = (props) => {

    
    if (!props.data) {
      return (<div><h3>Aucune donnée trouvée</h3></div>)
    }
    
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Type de Tâche</TableCell>
              <TableCell align="middle">Terminées</TableCell>
              <TableCell align="middle">En attente</TableCell>
              <TableCell align="middle">Echouées</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                key={row.frequence}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align='left'>
                  <a href={`/gestion_task/liste/${props.magasin}/${row.frequence}`}>{row.frequence} </a>
                </TableCell>
                <TableCell align="middle">{row.termine}</TableCell>
                <TableCell align="middle">{row.enAttente}</TableCell>
                <TableCell align="middle">{row.echoue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
    )
}

export default TableRapportTache