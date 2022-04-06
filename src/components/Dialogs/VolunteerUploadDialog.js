import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { red, green, blue } from '@mui/material/colors';

class VolunteerUploadDialog extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Volunteer Image Submission</DialogTitle>

                <DialogContent>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                {
                                    this.props.uploadingState === "uploading" ?
                                        <Avatar sx={{ bgcolor: 'background.paper' }}>
                                            <CircularProgress color="success" />
                                        </Avatar>
                                        : this.props.uploadingState === "success" ?
                                            <Avatar sx={{ bgcolor: green[500] }}>
                                                <CloudDoneIcon />
                                            </Avatar>
                                            : this.props.uploadingState === "failed" ?
                                                <Avatar sx={{ bgcolor: red[500] }}>
                                                    <FmdBadIcon />
                                                </Avatar>
                                                :
                                                <Avatar sx={{ bgcolor: blue[500] }}>
                                                    <NotListedLocationIcon />
                                                </Avatar>

                                }
                            </ListItemAvatar>
                            <ListItemText primary={this.props.statusTitle} secondary={this.props.statusDesc} />
                        </ListItem>
                    </List>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.close}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default VolunteerUploadDialog;
