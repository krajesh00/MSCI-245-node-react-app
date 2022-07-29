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
//const serverURL ="";


const Search = (onChange) => {
    const [moviesList, setMoviesList] = useState([])
    const [actorList, setActorList] = useState([])
    const [directorList, setDirectorList] = useState([])
    const [returnedMovies, setReturnedMovies] = useState([])
    const [moviesReviewSearch, setMoviesReviewSearch] = useState([])
    const [reviews, setReviews] = useState([])

    const [selectedMovie, setSelectedMovie] = useState("")
    const [actorName, setActorName] = useState("")
    const [directorName, setDirectorName] = useState("")

    const [render, setRender] = useState(false)

    React.useEffect(() => {
        searchGetMovies();
      }, []);
      
      const searchGetMovies = () => {
        callApiSearchGetMovies()
          .then(res => {
            console.log("callApiSearchGetMovies returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiSearchGetMovies parsed: ", parsed);
            setMoviesList(parsed);
          })
      }
      
      const callApiSearchGetMovies = async () => {
        const url = serverURL + "/api/searchGetMovies";
        console.log(url);
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("movies found : ", body);
        return body;
      }

      React.useEffect(() => {
        searchGetActors();
      }, []);
      
      const searchGetActors = () => {
        callApiSearchGetActors()
          .then(res => {
            console.log("callApiSearchGetMovies returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiSearchGetMovies parsed: ", parsed);
            setActorList(parsed);
          })
      }
      
      const callApiSearchGetActors = async () => {
        const url = serverURL + "/api/searchGetActors";
        console.log(url);
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Actors found : ", body);
        return body;
      }

      React.useEffect(() => {
        searchGetDirectors();
      }, []);
      
      const searchGetDirectors = () => {
        callApiSearchGetDirectors()
          .then(res => {
            console.log("callApiSearchGetMovies returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiSearchGetMovies parsed: ", parsed);
            setDirectorList(parsed);
          })
      }
      
      const callApiSearchGetDirectors = async () => {
        const url = serverURL + "/api/searchGetDirectors";
        console.log(url);
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Directors found : ", body);
        return body;
      }

    const moviesArr = moviesList.map(function(movie) {
        return movie ['name']
    })
    
    const actorsArr = actorList.map(function(actor){
        return actor ['actor_fullName']
    })

    const directorsArr = directorList.map(function(director){
        return director ['director_fullName']
    })
    const submitSearch = () => {
      
      const getSearch = (searchObject) => {
        console.log(searchObject);
        callApiGetSearch(searchObject).then(res => {
          console.log("callApiGetSearch returned: ", res)
          var parsed = JSON.parse(res.express);
          console.log("callApiGetSearch parsed: ", parsed);
          setReturnedMovies(parsed)
          setMoviesReviewSearch(parsed)
        })
      }
      
      console.log(moviesReviewSearch)
    
      const callApiGetSearch = async (searchObject) => {
        const url = serverURL + "/api/getSearch";
        console.log(url);
        console.log(JSON.stringify(searchObject))
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept" : 'application/json'
          },
          body: JSON.stringify(searchObject)
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("movies found : ", body);
        return body;
      }

      let searchSubmit = {
        movieSelection  : selectedMovie,
        actorFullName : actorName,
        directorFullName : directorName
      }
      getSearch(searchSubmit);
      console.log(returnedMovies)
      setRender(true)

      const moviesSelectedArr = moviesReviewSearch.map(function(movie) {
        return movie ['MovieName']
    })

    const getReviews = (MovieReviewArr) => {
      console.log(MovieReviewArr);
      callApiGetReviews(MovieReviewArr).then(res => {
        console.log("callApiGetReviews returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetReviews parsed: ", parsed);
        setReviews(parsed)
      })
    }
    
  
    const callApiGetReviews = async (MovieReviewArr) => {
      const url = serverURL + "/api/getReviews";
      console.log(url);
      console.log(JSON.stringify(MovieReviewArr))
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept" : 'application/json'
        },
        body: JSON.stringify(MovieReviewArr)
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log("movies found : ", body);
      return body;
    }

    getReviews(moviesSelectedArr)
    console.log(reviews)
    }

    return(
        <><Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => history.push('/MyPage')}>Movie Recommendations</Button>
                    <Button color="inherit" onClick={() => history.push('/')}>Landing</Button>
                    <Button color="inherit" onClick={() => history.push('/Home')}>Add a Review</Button>
                </Toolbar>
            </AppBar>
        </Box>
        <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={moviesArr}
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} label = "Movie" />}
                value = {selectedMovie}
                onChange = {(event, newEvent) => { 
                    setSelectedMovie(newEvent)
                }}
                />
         <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={actorsArr}
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} label = "Actor Full Name" />} 
                value = {actorName}
                onChange = {(event, newEvent) => { 
                    setActorName(newEvent)
                }}
                />
        <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={directorsArr}
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} label = "Director Full Name" />} 
                value = {directorName}
                onChange = {(event, newEvent) => { 
                    setDirectorName(newEvent)
                }}
                /> 
        <Button variant='contained' color='primary' onClick={submitSearch}>Submit</Button>
        {render &&
        <>
        <Typography>Movies and Director</Typography>
        {returnedMovies.map((movie)=>{
          return(
          <Typography>Movie: {movie.MovieName}   Director: {movie.Director_fullName}</Typography>
          )
        })}
        </> 
        
        }
        </>
    )
}

export default Search;