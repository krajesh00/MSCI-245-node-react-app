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
import Autocomplete from '@material-ui/lab/Autocomplete';
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3004"; //enable for dev mode

const MyPage = () => {
    const [genreList, setGenreList] = useState([])
    const [randomMovies, setRandomMovies] = useState([])

    const [selectedGenre, setSelectedGenre] = useState("")

    const [render, setRender] = useState(false)

    const genresArr = genreList.map(function(genre) {
        return genre ['genre']
    })
    
    React.useEffect(() => {
        getGenres();
      }, []);

    const getGenres = () => {
        callApiGetGenres()
          .then(res => {
            console.log("callApiGetMovies returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiGetMovies parsed: ", parsed);
            setGenreList(parsed);
          })
      }
      
      const callApiGetGenres = async () => {
        const url = serverURL + "/api/getGenres";
        console.log(url);
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("genres found : ", body);
        return body;
      }

      const submitSearch = () => {
        let searchSubmit = {
            genreSelected: selectedGenre
          }

          
    const getMoviesRandom = (genreObject) => {
        callApiGetMoviesRandom(genreObject)
          .then(res => {
            console.log("callApiGetMovies returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiGetMovies parsed: ", parsed);
            setRandomMovies(parsed);
          })
      }
      
      const callApiGetMoviesRandom = async (genreObject) => {
        const url = serverURL + "/api/getMoviesRandom";
        console.log(url);
        console.log(JSON.stringify(genreObject))
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept" : 'application/json'
          },
          body: JSON.stringify(genreObject)
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("movies found : ", body);
        return body;
      }

      getMoviesRandom(searchSubmit)
      setRender(true)
      

      }
    
    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" onClick={() => history.push('/')}>Landing</Button>
                        <Button color="inherit" onClick={() => history.push('/Search')}>Search</Button>
                        <Button color="inherit"onClick={() => history.push('/Home')}>Add a Review</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={genresArr}
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} label = "Select A Genre" />} 
                value = {selectedGenre}
                onChange = {(event, newEvent) => { 
                    setSelectedGenre(newEvent)
                }}
                />
            <Button variant='contained' color='primary' onClick={submitSearch}>Submit</Button>
            {render &&
            <>
            <Typography>Recommended Movies</Typography>
            {randomMovies.map((movie)=>{
            return(
                <Typography>Movie: {movie.MovieName}</Typography>
            )
            })}
            </>
            }
            </>
        
    )


}

export default MyPage;