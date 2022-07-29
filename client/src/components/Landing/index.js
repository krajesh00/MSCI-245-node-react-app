import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useState } from 'react';
import { Select, MenuItem, TextField, Radio, FormControl, InputLabel, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';

const Landing = () => {
    return (

        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" onClick={() => history.push('/MyPage')}>Movie Recommendations</Button>
                        <Button color="inherit" onClick={() => history.push('/Search')}>Search</Button>
                        <Button color="inherit"onClick={() => history.push('/Reviews')}>Add a Review</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Typography variant="h3" color="inherit" align = 'center' noWrap>
                Welcome to Kishore's Movie Website 
            </Typography>
            <Typography variant="h6" color="inherit" align = 'center' noWrap>
                Feel free to Leave a Review for a Movie or Look into to my Recommendations Page where by entering a genre you can get three movies to watch!
            </Typography>
        </div>
    )
}
export default Landing;