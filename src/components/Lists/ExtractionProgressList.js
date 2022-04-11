import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { deepOrange, green } from '@mui/material/colors';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CircularProgress from '@mui/material/CircularProgress';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ExtractionResultsList from "./ExtractionResultsList";

class ExtractionProgressList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isResultsDialogOpen: false,
            resultsDialogResults: {},
        };

        this.handleListItemClick = this.handleListItemClick.bind(this);
    }

    handleListItemClick(item) {
        if (item.output_type === "result") {
            this.setState({
                resultsDialogResults: item,
            }, () => {
                this.setState({
                    isResultsDialogOpen: true,
                });
            });
        }
    }

    render() {
        return (
            <div>
                <List sx={{ ...{ width: '100%', bgcolor: 'background.paper' }, ...this.props.sx }}>
                    {
                        this.props.itemsList.map((item, idx) => {
                            return (
                                <ListItem alignItems="flex-start" key={idx}>
                                    <ListItemButton onClick={() => { this.handleListItemClick(item); }}>
                                        <ListItemAvatar>
                                            {
                                                item.output_type == "job_created" ?
                                                    <Avatar sx={{ bgcolor: green[500] }} >
                                                        <CloudDoneIcon />
                                                    </Avatar>
                                                    : (item.output_type == "progress_update" && idx === 0) ?
                                                        <Avatar sx={{ bgcolor: 'background.paper' }}>
                                                            <CircularProgress color="success" />
                                                        </Avatar>
                                                        : item.output_type == "progress_update" ?
                                                            <Avatar sx={{ bgcolor: "secondary.main" }}>
                                                                <CloudDoneIcon />
                                                            </Avatar>
                                                            : item.output_type == "result" ?
                                                                <Avatar sx={{ bgcolor: green[500] }} >
                                                                    <AssignmentIcon />
                                                                </Avatar>
                                                                :
                                                                <Avatar sx={{ bgcolor: deepOrange[500] }} >
                                                                    <AssignmentLateIcon />
                                                                </Avatar>
                                            }
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={
                                                item.output_type == "job_created" ?
                                                    "Job Accepted & Created"
                                                    : item.output_type == "progress_update" ?
                                                        "Progress Update"
                                                        : item.output_type == "result" ?
                                                            "Result"
                                                            :
                                                            "Information"
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {
                                                            item.output_type == "job_created" ?
                                                                "Successful creation of the job."
                                                                : item.output_type == "result" ?
                                                                    "Click here to view results"
                                                                    :
                                                                    item.message
                                                        }
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>

                <ExtractionResultsList open={this.state.isResultsDialogOpen} results={this.state.resultsDialogResults} close={() => {
                    this.setState({
                        isResultsDialogOpen: false,
                        resultsDialogResults: {},
                    });
                }}></ExtractionResultsList>
            </div>
        );
    }

}

export default ExtractionProgressList;
