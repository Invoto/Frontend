import React from "react";
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import ExtractionsTableRow from "./ExtractionTableRow";
import TableRow from "@mui/material/TableRow";
import { DateTime } from "luxon";

const extractionTableColumns = [
    { id: "id", label: "ID", minWidth: 80 },
    { id: "imageURL", label: "Image", minWidth: 150 },
    { id: "jobStatus", label: "Status", minWidth: 170 },
    {
        id: "createdAt",
        label: "Date/Time",
        minWidth: 170,
        format: (dateString) => {
            return DateTime.fromISO(dateString).toFormat("yyyy-MMM-dd hh:mm:ssa ZZZZ");
        },
    },
];

class ExtractionsTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: this.props.rowsPerPage,
        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    handleChangePage(event, newPage) {
        this.setState({
            page: newPage,
        });
    }

    handleChangeRowsPerPage(event) {
        this.setState({
            rowsPerPage: +event.target.value,
            page: 0,
        });
    }

    render() {
        return (
            <Paper sx={{ width: "100%" }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {/* First column for dropdown icon */}
                                <TableCell />

                                {extractionTableColumns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.props.extractions
                                .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                                .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                .map((extraction) => {
                                    return (
                                        <ExtractionsTableRow key={extraction.id} tableColumns={extractionTableColumns} extraction={extraction} />
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={this.props.extractions.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }

}

export default ExtractionsTable;
