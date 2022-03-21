import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom'

class AdminSidebar extends React.Component {

    render() {
        const { window, handleDrawerToggle, drawerWidth, mobileOpen, rootRoute, routes } = this.props;

        const container = window !== undefined ? () => window().document.body : undefined;

        const drawer = (
            <div>
                <Toolbar />
                <Divider />
                <List>
                    {
                        routes.map((entry, idx) => {
                            return (
                                <Link color="primary" underline="none" to={rootRoute + entry.path} key={idx}>
                                    <ListItem button>
                                        <ListItemIcon><entry.icon /></ListItemIcon>
                                        <ListItemText primary={entry.name} />
                                    </ListItem>
                                </Link>
                            );
                        })
                    }
                </List>
            </div>
        );

        return (
            <>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer><Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </>
        );
    }

}

export default AdminSidebar;
