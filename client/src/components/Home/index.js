import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useState } from 'react';
import { Select, MenuItem, TextField, Radio, FormControl, InputLabel, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import { Router, Switch, Route } from "react-router-dom";
import history from '../Navigation/history';


//Dev mode
//const serverURL = ""; //enable for dev mode

//Deployment mode instructions
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3004"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";



const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "5vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },
  
});



const MuiSelect = ({ selectedMovie, onChange }) => {

  const [movies, setMovies] = useState([])

  React.useEffect(() => {
    getMovies();
  }, []);
  
  const getMovies = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiGetMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed);
        setMovies(parsed);
      })
  }
  
  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
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

  

  return (
    <FormControl sx ={{ m: 1, width: 300, mt: 3}}>
      <InputLabel id= 'simpleLabel'>Select Movie</InputLabel>
      <Select labelId='simpleLabel' label='Select a Movie' value = {selectedMovie} displayEmpty onChange = {event => onChange(event.target.value)}>
      <MenuItem value = 'Select Movie' disabled >Select Movie</MenuItem>
      {movies.map((movie) => {
        return(
          <MenuItem value = {movie}>{movie.name}</MenuItem>
        )
      })}
    </Select>
    </FormControl>
    
  );
}

const MuiTextField = ({ eneteredTitle, onChange}) => {

  return(
    <TextField
     label ='Enter Review Title'
     value ={eneteredTitle}
     onChange = {event => onChange(event.target.value)}
    />
  )
  
}

const MuiTextFieldMulti = ({ enteredReview, onChange}) => {

  return(
    <TextField
     label ='Review Text'
     multiline
     style={{width: '100%'}}
     value ={enteredReview}
     onChange = {event => onChange(event.target.value)}
    /> 
  )
  
}

const MuiRadioSelect = ({ selectedRating, onChange }) => {
  return ( 
    <div>
      <h5>Select a rating for the movie out of 5</h5>
      <div>
      <span>1</span>
      <Radio
      value='1'
      checked = {selectedRating === '1'}
      color = 'primary'
      onChange = {event => onChange(event.target.value)}
      />
      </div>

      <div>
      <span>2</span>
      <Radio
      value='2'
      checked = {selectedRating === '2'}
      color = 'primary'
      onChange = {event => onChange(event.target.value)}
      />
      </div>

      <div>
      <span>3</span>
      <Radio
      value='3'
      checked = {selectedRating === '3'}
      color = 'primary'
      onChange = {event => onChange(event.target.value)}
      />
      </div>

      <div>
      <span>4</span>
      <Radio
      value='4'
      checked = {selectedRating === '4'}
      color = 'primary'
      onChange = {event => onChange(event.target.value)}
      />
      </div>

      <div>
      <span>5</span>
      <Radio
      value='5'
      checked = {selectedRating === '5'}
      color = 'primary'
      onChange = {event => onChange(event.target.value)}
      />
      </div>    
    </div>
      
  )
}


const Review = () =>  {
  const [selectedMovie, setSelectedMovie] = useState('Select Movie');
  const [eneteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] =useState('');
  const [render, setRender] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error unable to Submit')

  const addReview = (reviewObject) => {
    console.log(reviewObject);
    callApiAddReview(reviewObject).then(res => {
      console.log("callApiAddReview returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("callApiAddReview parsed: ", parsed);
    })
  }

  const callApiAddReview = async (reviewObject) => {
    const url = serverURL + "/api/addReview";
    console.log(url);
    console.log(JSON.stringify(reviewObject))

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewObject)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("movies found : ", body);
    return body;
  }
  


  const submitReview = () => {
    if (selectedMovie.name !== 'Select Movie' && eneteredTitle !== '' && enteredReview !== '' && selectedRating !== ''
    && selectedMovie.name !== 'Please Select a Movie' && eneteredTitle !== 'Please Enter a Title' && enteredReview !== 'Please Enter a Review' && selectedRating !== 'Please Select a Rating'){
      let reviewSubmit = 
      {
        movieName: selectedMovie.name,
        movieID: selectedMovie.id,
        titleOfReview: eneteredTitle,
        reviewText: enteredReview,
        selectedRating: selectedRating
      }
      addReview(reviewSubmit);
      setErrorMessage('Success! Review Submitted')
    } else {
      if (selectedMovie.name === 'Select Movie' || selectedMovie.name === 'Please Select a Movie') {
        setSelectedMovie('Please Select a Movie')
      }

      if(eneteredTitle == '' || eneteredTitle == 'Please Enter a Title') {
        setEnteredTitle('Please Enter a Title')
      }

      if(enteredReview == '' || enteredReview == 'Please Enter a Review') {
        setEnteredReview('Please Enter a Review')
      }

      if(selectedRating == '' || selectedRating == 'Please Select a Rating') {
        setSelectedRating('Please Select a Rating')
      }
      setErrorMessage('Error unable to Submit')

    }
    return(
      setRender(true)
    )
  }
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" onClick={() => history.push('/MyPage')}>Movie Recommendations</Button>
                        <Button color="inherit" onClick={() => history.push('/')}>Landing</Button>
                        <Button color="inherit"onClick={() => history.push('/Search')}>Search</Button>
                    </Toolbar>
                </AppBar>
            </Box>
      
      <Grid 
        container
        direction ='column'
        justifyContent='center'
        alignItems='center'
        > 
        <Grid item xs ={12}>
        <Typography variant="h3">Review Some Movies!</Typography>
        </Grid>

        <Grid item xs ={6}>
          <MuiSelect selectedMovie = {selectedMovie} onChange = {value => setSelectedMovie(value)}/>
        </Grid>

        <Grid item xs ={12}>
          <MuiTextField eneteredTitle= {eneteredTitle} onChange = {value => setEnteredTitle(value)}/>
        </Grid>

        <Grid item xs ={12}>
          <MuiTextFieldMulti enteredReview= {enteredReview} onChange = {value => setEnteredReview(value)}/>
        </Grid>

        <Grid item xs = {12}>
          <MuiRadioSelect selectedRating= {selectedRating} onChange = {value => setSelectedRating(value)} />
        </Grid>

        <Grid item>
            <Button variant='contained' color='primary' onClick={submitReview}>Submit</Button>
        </Grid>

        {render &&
        <><Grid item xs={12}>
            <Typography variant="h6">Movie: {selectedMovie.name}</Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6">Review Title: {eneteredTitle}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6"> Review Text: {enteredReview}</Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6">Review Rating: {selectedRating}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Success or Failure: {errorMessage}</Typography>
          </Grid>
          </>
        }
      </Grid>
    </>
  )
}



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  render (){

    return(
      <Review />
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);