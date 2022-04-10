import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { yellow } from '@mui/material/colors';

class ExtractionResultsList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Results of the Extraction</DialogTitle>

                <DialogContent>
                    <List sx={{ pt: 0 }}>
                        {
                            Object.entries(this.props.results).map(([key, value]) => {
                                if (key === "status" || key === "output_type") {
                                    return <div key={key}></div>;
                                }
                                else {
                                    return (
                                        <ListItem key={key}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: "background.paper", color: yellow[600] }}>
                                                    <LightbulbIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={key} secondary={value} />
                                        </ListItem>
                                    );
                                }
                            })
                        }
                    </List>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.close}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ExtractionResultsList;
