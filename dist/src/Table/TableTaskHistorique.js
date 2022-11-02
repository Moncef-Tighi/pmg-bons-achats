import TableCustom from "./TableCustom"
import TableHeadCustom from "./TableHeadCustom"
import { TableBody,TableRow, TableCell, Link } from "@mui/material"

const TableTaskHistorique = ({tasks, magasin, frequence})=> {

    const header = [        
        { name: "Date", sort: false},
        { name: "Terminés", sort: false},
        { name: "Echoués", sort: false},
        { name: "En cours", sort: false},
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
                key={task.date}
                >
                <TableCell component="th" scope="row" align="center">
                    {/* Le link marche pas for some reason ? */}
                <Link to={`/gestion_task/liste/${magasin}/${frequence}/${task.date}`}>
                    {task.date}</Link>
                </TableCell>
                <TableCell align="center">
                    {task.termine}</TableCell>
                <TableCell align="center" style={task.echoue>0 ? {color: "red"} : {color: "green"} } >
                    {task.echoue}</TableCell>
                <TableCell align="center" >{task.enAttente}</TableCell>
            </TableRow>)})}
        </TableBody>
        </TableCustom>

    )

}


export default TableTaskHistorique