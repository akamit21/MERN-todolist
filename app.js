var express = require('express');
var app = express();
var mysql = require('mysql');

/**
 * [getMySQLConnection description]
 * @return {[type]} [description]
 */
function getMySQLConnection() {
	return mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'node_basic_pug'
	});
}

/**
 * Use pug as templating engine. Pug is renamed jade.
 */
app.set('view engine', 'pug');

///
/// HTTP Method	: GET
/// Endpoint 	: /person
/// 
/// To get collection of person saved in MySQL database.
///
app.get('/person', function(req, res) {
	var personList = [];

	// Connect to MySQL database.
	var connection = getMySQLConnection();
	connection.connect();

	// Do the query to get data.
	connection.query('SELECT * FROM test', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var person = {
		  			'name':rows[i].name,
		  			'address':rows[i].address,
		  			'phone':rows[i].phone,
		  			'id':rows[i].id
		  		}
		  		// Add object into array
		  		personList.push(person);
	  	}

	  	// Render index.pug page using array 
	  	res.render('index', {"personList": personList});
	  	}
	});

	// Close the MySQL connection
	connection.end();
	
});

///
/// HTTP Method	: GET
/// Endpoint	: /person/:id
/// 
/// To get specific data of person based on their identifier.
///
app.get('/person/:id', function(req, res) {
	// Connect to MySQL database.
	var connection = getMySQLConnection();
	connection.connect();

	// Do the query to get data.
	connection.query('SELECT * FROM test WHERE id = ' + req.params.id, function(err, rows, fields) {
		var person;

	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Check if the result is found or not
	  		if(rows.length==1) {
	  			// Create the object to save the data.
	  			var person = {
		  			'name':rows[0].name,
		  			'address':rows[0].address,
		  			'phone':rows[0].phone,
		  			'id':rows[0].id
		  		}
		  		// render the details.plug page.
		  		res.render('details', {"person": person});
	  		} else {
	  			// render not found page
	  			res.status(404).json({"status_code":404, "status_message": "Not found"});
	  		}
	  	}
	});

	// Close MySQL connection
	connection.end();
});

/**
 * Start the app on port 3000
 * List/Index : http://localhost:3000/person
 * Details 	  : http://localhost:3000/person/2
 */
app.listen(3000, function () {
    console.log('Listening on port', 3000);
});