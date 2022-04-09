import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Sidebars/AdminSidebar";
import { DashboardProvider } from "../contexts/Dashboard";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import useMediaQuery from '@mui/material/useMediaQuery';
import { routesConfig, routesDashboard } from '../config/routes';
import useToken from '../components/Dashboard/useToken';
import { Navigate } from "react-router-dom";
import { assessTokenValidity } from "../helpers/auth";
import WebNotifier from '../components/Notifiers/WebNotifier';

const drawerWidth = 240;

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function InvotoDashboard(props) {
    const [body, setBody] = React.useState(null);
    const { token, setToken } = useToken();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [pageTitle, setPageTitle] = React.useState("");
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    const [notificationSeverity, setNotificiationSeverity] = React.useState("success");
    const [notificationMessage, setNotificationMessage] = React.useState("");
    const [notificationOpen, setNotificationOpen] = React.useState(false);

    const showNotification = (severity, message) => {
        setNotificiationSeverity(severity);
        setNotificationMessage(message);
        setNotificationOpen(true);
    };

    const closeNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotificationOpen(false);
        setNotificiationSeverity("success");
        setNotificationMessage("");
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const contextElements = {
        setPageTitle: setPageTitle,
        userToken: token,
        showNotification: showNotification,
        closeNotification: closeNotification,
    };

    const handleLogout = () => {
        setToken(null);
        setBody(
            <Navigate replace to="/accounts" />
        );
    }

    React.useEffect(() => {
        assessTokenValidity(token).then((isTokenValid) => {
            if (!isTokenValid) {
                setBody(
                    <Navigate replace to="/accounts" />
                );
            }
        });
    }, []);

    return (
        <div>
            <DashboardProvider value={contextElements}>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />
                            <AppBar
                                position="fixed"
                                sx={{
                                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                                    ml: { sm: `${drawerWidth}px` },
                                }}
                            >
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        edge="start"
                                        onClick={handleDrawerToggle}
                                        sx={{ mr: 2, display: { sm: 'none' } }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                                        {pageTitle}
                                    </Typography>

                                    <Box>
                                        <Tooltip title={theme.palette.mode + " mode"}>
                                            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>

                                    <Box>
                                        <Tooltip title="Logout">
                                            <IconButton sx={{ ml: 1 }} onClick={handleLogout} color="inherit">
                                                <LogoutIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Toolbar>
                            </AppBar>

                            <Box
                                component="nav"
                                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                                aria-label="mailbox folders"
                            >
                                <AdminSidebar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} mobileOpen={mobileOpen} rootRoute={routesConfig.roots.dashboard} routes={routesDashboard} />
                            </Box>

                            <Box
                                component="main"
                                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                            >
                                <Toolbar />
                                <Outlet />
                            </Box>

                            <WebNotifier notificationOpen={notificationOpen} autoHideDuration={6000} closeNotification={closeNotification} notificationSeverity={notificationSeverity} notificationMessage={notificationMessage} />
                        </Box>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </DashboardProvider>

            <div>
                {body}
            </div>
        </div>
    );
}

export default InvotoDashboard;
