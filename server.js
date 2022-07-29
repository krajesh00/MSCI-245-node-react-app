let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM krajesh.movies`;
	console.log(sql);
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {

	let connection = mysql.createConnection(config);
	let reviewSend = req.body
	console.log(reviewSend);

	let sql = `INSERT INTO Review (reviewTitle, reviewContent, reviewScore, Users_userId, movies_id) VALUES (?, ?, ?, ?, ?)`;
	console.log(sql);
	let data = [reviewSend.titleOfReview, reviewSend.reviewText, reviewSend.selectedRating, 1, reviewSend.movieID];
	

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/searchGetMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT name FROM krajesh.movies`;
	console.log(sql);
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});


app.post('/api/searchGetActors', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT concat(first_name, ' ', last_name) AS actor_fullName FROM krajesh.actors;`;
	console.log(sql);
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/searchGetDirectors', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT concat(first_name, ' ', last_name) AS director_fullName FROM krajesh.directors;`;
	console.log(sql);
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getSearch', (req, res) => {

	let connection = mysql.createConnection(config);
	let SubmitSend = req.body
	console.log(SubmitSend);
	if (SubmitSend.movieSelection == null){
		SubmitSend.movieSelection = ''
	}
	if (SubmitSend.actorFullName == null){
		SubmitSend.actorFullName = ''
	}
	if (SubmitSend.directorFullName == null){
		SubmitSend.directorFullName = ''
	}

	let sql = `SELECT  distinct(R.movie_id) as movieID, M.name as MovieName, md.director_id as DirectorID, concat(D.first_name, ' ', D.last_name) as Director_fullName FROM krajesh.actors as A INNER JOIN krajesh.roles as R On A.id = R.actor_id INNER JOIN krajesh.movies as M On M.id = R.movie_id INNER JOIN krajesh.movies_directors as md On md.movie_id = M.id INNER JOIN krajesh.directors as D on D.id = md.director_id WHERE concat(A.first_name, ' ', A.last_name) LIKE ('${SubmitSend["actorFullName"]}%') AND M.name LIKE ('${SubmitSend["movieSelection"]}%') AND  concat(D.first_name, ' ', D.last_name) LIKE ('${SubmitSend["directorFullName"]}%')`;
	console.log(sql);
	let data = []
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getReviews', (req, res) => {

	let connection = mysql.createConnection(config);
	let ReviewGet = req.body
	console.log(ReviewGet);
	

	let sql = `SELECT M.name, COUNT(*), AVG(CAST(R.reviewScore AS DECIMAL(10,2))) AS AvgReviewScore
	FROM krajesh.movies as M
	LEFT JOIN krajesh.Review as R on M.id = R.movies_id
	WHERE M.name IN(${ReviewGet})
	GROUP BY M.name`;
	console.log(sql);
	let data = []
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getGenres', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT distinct(genre) FROM krajesh.movies_genres`;
	console.log(sql);
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMoviesRandom', (req, res) => {

	let connection = mysql.createConnection(config);
	let search = req.body

	let sql = `select distinct(M.name) as MovieName, G.genre from krajesh.movies as M INNER JOIN krajesh.movies_genres as G on M.id = G.movie_id WHERE G.genre = '${search.genreSelected}' ORDER BY rand() LIMIT 3`;
	console.log(sql);
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});




//app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
