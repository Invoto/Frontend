import React from 'react';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Sidebars/AdminSidebar";
import { DashboardProvider } from "../contexts/Dashboard";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useMediaQuery from '@mui/material/useMediaQuery';
import { routesConfig, routesDashboard } from '../config/routes';

const drawerWidth = 240;

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function InvotoDashboard(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [pageTitle, setPageTitle] = React.useState("");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const contextElements = {
        setPageTitle: setPageTitle,
    };

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

    return (
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
                                    {theme.palette.mode} mode
                                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                    </IconButton>
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
                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </DashboardProvider>
    );
}

export default InvotoDashboard;
