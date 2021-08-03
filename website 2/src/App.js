import './App.css';
import React from 'react';
import { AppBar, Container, Link, makeStyles, Toolbar, Typography, Button, createTheme, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AlbumOverview } from "./components/AlbumOverview";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import * as faIcons from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { ListItemLink } from './components/ListItemLink';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AlbumCard } from './components/AlbumCard';
import { useEffect } from 'react';
import { Homepage } from './components/Homepage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00796b',
            contrastText: '#fff',
        },
        secondary: {
            main: '#2962ff',
            contrastText: '#fff',
        },
    },
});

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar
}));



function App() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        menu: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    useEffect(() => {
        
    });

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <AppBar position={"sticky"}>
                    <Toolbar>
                        <Typography variant="h6">
                            <React.Fragment key={'menu'}>
                                <Button variant="contained" color="primary" onClick={toggleDrawer('menu', true)}>Menu</Button>
                                <Drawer anchor={'left'} open={state.menu} onClose={toggleDrawer('menu', false)}>
                                    <Router>
                                        <div
                                            className={clsx(classes.list)}
                                            role="presentation"
                                            onClick={toggleDrawer('menu', false)}
                                            onKeyDown={toggleDrawer('menu', false)}
                                        >
                                            <Button onClick={toggleDrawer('menu', false)}>X</Button>
                                            <List>
                                                <ListItemLink icon={<FontAwesomeIcon icon={faIcons.faList}/>}  to={'/lists/'} key={'lists'} primary={'Lists'}/>
                                                <ListItemLink icon={<FontAwesomeIcon icon={faIcons.faPlusCircle}/>}  to={'/lists/create/'} key={'create-list'} primary={'Create new List'}/>
                                                <ListItemLink icon={<FontAwesomeIcon icon={faIcons.faShareSquare} />} to={'/shared/'} key={'shared'} primary={'Shared'} />
                                                <ListItemLink icon={<FontAwesomeIcon icon={faIcons.faShareAlt} />} to={'/shared-with-me/'} key={'shared-with-me'}  primary={'Shared with me'} />
                                            </List>
                                            <Divider />
                                            <List>
                                                <ListItemLink icon={<FontAwesomeIcon icon={faIcons.faSignInAlt} />} to={'/login/'} key={'login'} primary={'Login'} />
                                                <ListItemLink icon={<FontAwesomeIcon icon={faIcons.faSignOutAlt} />} to={'/logout/'} key={'logout'} primary={'Logout'} />
                                                <ListItemLink icon={<FontAwesomeIcon icon={faIcons.faPlusSquare} />} to={'/register/'} key={'register'} primary={'Register'} />
                                                <ListItemLink icon={<FontAwesomeIcon icon={faIcons.faCog} />} to={'/account/'} key={'account'} primary={'Account'} />
                                            </List>
                                        </div>
                                    </Router>
                                </Drawer>
                            </React.Fragment>
                            <Link href="/" color="inherit" style={{ paddingLeft: '12px' }}>TwoDo</Link>
                        </Typography>

                        <Typography variant="h6" style={{marginLeft: 'auto'}}>
                            <Button variant={"contained"} color="default" href={"/login/"}>Login</Button>
                            <Button variant={"contained"} color="secondary" href={"/register/"}>Register</Button>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <div className={classes.toolbar} />
                    <Container>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path={"/"}>
                                    <Homepage />
                                </Route>
                                <AuthenticatedRoute authed={true} path={"/logout/"} component={AlbumCard} />
                                <Route path={"*"}>
                                    <Redirect to={"/"}/>
                                </Route>
                            </Switch>
                        </BrowserRouter>
                    </Container>
                </main>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
