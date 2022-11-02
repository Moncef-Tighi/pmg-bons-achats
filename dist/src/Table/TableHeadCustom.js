import { TableSortLabel,TableCell, TableHead, TableRow } from "@mui/material";

const TableHeadCustom = function(props) {
    
    return (
        <TableHead color='secondary'>
        <TableRow>
            {props.header.map(head => {
                if (!head.sort) {
                    return <TableCell align="center" key={head.name}>{head.name}</TableCell>
                }
                return (
                    <TableCell  align="center" key={head.name}
                        // sortDirection={sort?.startsWith("+") ? "asc" : "desc"}
                        >
                        <TableSortLabel
                            // active={sort?.slice(1)===head.trueName}
                            // direction={sort?.startsWith("+") ? "asc" : "desc"}
                            onClick={(event)=> props.sortHandeler(event, head.trueName)}
                            >
                            {head.name}
                        </TableSortLabel>
                    </TableCell>
                )
            })}
        </TableRow>
    </TableHead>
    )
}

export default TableHeadCustom