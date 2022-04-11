import React from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ExtractionProgressList from "../../components/Lists/ExtractionProgressList";

class ExtractionsTableRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    render() {
        const { open } = this.state;
        const { tableColumns, extraction } = this.props;

        return (
            <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                                this.setState({
                                    open: !this.state.open,
                                });
                            }}
                        >
                            {
                                open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                            }
                        </IconButton>
                    </TableCell>

                    {tableColumns.map((column) => {
                        const value = extraction[column.id];

                        if (column.id === "imageURL") {
                            return (
                                <TableCell key={column.id} align="center">
                                    {
                                        value && value != "" ?
                                            <Link href={value} underline="none" target="_blank" rel="noreferrer">
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        height: 64,
                                                        width: 64,
                                                        maxHeight: { xs: 24, md: 64 },
                                                        maxWidth: { xs: 24, md: 64 },
                                                    }}
                                                    src={value}
                                                />
                                            </Link>
                                            :
                                            <Chip label="Not Found" color="error" />
                                    }
                                </TableCell>
                            );
                        }
                        else {
                            return (
                                <TableCell key={column.id} align="center">
                                    {
                                        column.format ?
                                            column.format(value)
                                            :
                                            value
                                    }
                                </TableCell>
                            );
                        }
                    })}
                </TableRow>

                {/* Collapsed Row */}
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ marginLeft: 2, marginTop: 3, marginBottom: 3, flexGrow: 1 }}>
                                {/* Expanded Content Goes here. */}
                                <Typography variant="h5" gutterBottom component="div" className="py-2">
                                    Extraction #{extraction.id}
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={5}>
                                        <Typography variant="h6" gutterBottom component="div" className="pb-2">
                                            Invoice Image
                                        </Typography>
                                        {
                                            extraction.imageURL && extraction.imageURL != "" ?
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        height: 500,
                                                        width: 300,
                                                        maxHeight: { xs: 200, md: 500 },
                                                        maxWidth: { xs: 100, md: 300 },
                                                    }}
                                                    src={extraction.imageURL}
                                                />
                                                :
                                                <Chip label="Not Found" color="error" />
                                        }
                                    </Grid>

                                    <Grid item xs={7} style={{ maxHeight: "600px" }} className="overflow-auto">
                                        <Typography variant="h6" gutterBottom component="div" className="pb-2">
                                            Extraction Outputs
                                        </Typography>

                                        <ExtractionProgressList sx={{ mt: 1 }} itemsList={extraction.outputs} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }

}

export default ExtractionsTableRow;
