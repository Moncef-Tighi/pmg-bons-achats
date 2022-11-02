import TableCustom from "./TableCustom"
import TableHeadCustom from "./TableHeadCustom"
import { TableBody,TableRow, TableCell } from "@mui/material"


const TableListeTasks = ({tasks}) => {

  if (!tasks) {
    return (<div><h3>Aucune donnée trouvée</h3></div>)
  }

  const header = [        
    { name: "Description Task", sort: false},
    { name: "Date ajout", sort: false},
    { name: "Nombre Magasins", sort: false},
    { name: "Actions", sort: false},
  ]
  //const {url, handleChangePage,sortHandeler} = useTable(props.query);

  const handleChangePage = async (event, newPage) => {
      // let param=readURLObject(searchParams);
      // param["page"] = newPage;
      // setSearchParams(param);
      return;
  };

  return (
      <TableCustom
      tableData={tasks}
      totalSize={tasks.length}
      page={0}
      handleChangePage={handleChangePage}
      loading={false}
      sx={{
      boxShadow: "#3c40434d 0px 1px 2px 0px,#3c404326 0px 1px 3px 1px"}}
  >
    <TableHeadCustom header={header} />
      <TableBody>
        {tasks.map((task) => {
          return (
          <TableRow
          key={task.description}
          >
            <TableCell component="th" scope="row" align="left">
              {task.description}
            </TableCell>
            <TableCell align="center">
                {task.dateAjout}</TableCell>
            <TableCell component="th" scope="row" align="center">
              {task.magasin}
            </TableCell>
            <TableCell align="center" ><a>Modifier</a><br/>
              <a>Supprimer</a></TableCell>
          </TableRow>)})}
      </TableBody>
    </TableCustom>
    )
}

export default TableListeTasks