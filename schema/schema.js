const mysql = require('mysql');

const db_connection = mysql.createConnection({
    host: "localhost",
    user: "enigma",
    password: "",
    database: "book_exchange"
  });

db_connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");

  db_connection.query(
    "CREATE TABLE IF NOT EXISTS Users (name VARCHAR(50) NOT NULL, username VARCHAR(16) PRIMARY KEY, email VARCHAR(50), password VARCHAR(100) NOT NULL, city VARCHAR(30), address VARCHAR(256));",
    function (err, result) {
      if (err) throw err;
      console.log("Table 'Users' created");
  });

  db_connection.query(
    "CREATE TABLE IF NOT EXISTS Books (id VARCHAR(16) PRIMARY KEY, title VARCHAR(100) NOT NULL, subtitle VARCHAR(100), publisher VARCHAR(100), published_date VARCHAR(16), language VARCHAR(30), price INT, authors VARCHAR(256), description VARCHAR(512), categories VARCHAR(512), availability INT);",
    function (err, result) {
      if (err) throw err;
      console.log("Table 'Books' created");    
  });


  db_connection.query(
    "CREATE TABLE IF NOT EXISTS Sells (id VARCHAR(16) PRIMARY KEY, username VARCHAR(16) NOT NULL, Foreign Key (username) References Users(username) ON DELETE CASCADE, book_id VARCHAR(16) NOT NULL, Foreign Key (book_id) References Books(id), price INT NOT NULL, description VARCHAR(512) NOT NULL, status BOOL);",
    function (err, result) {
      if (err) throw err;
      console.log("Table 'Sells' created");    
  });


  db_connection.query(
    "CREATE TABLE IF NOT EXISTS Wishlists (id VARCHAR(16) PRIMARY KEY, username VARCHAR(16) NOT NULL, Foreign Key (username) References Users(username) ON DELETE CASCADE, book_id VARCHAR(16) NOT NULL, Foreign Key (book_id) References Books(id), available BOOL);",
    function (err, result) {
      if (err) throw err;
      console.log("Table 'Wishlists' created");    
  });


  db_connection.query(
    "CREATE TABLE IF NOT EXISTS DeliveryUsers (name VARCHAR(50) NOT NULL, username VARCHAR(16) PRIMARY KEY, email VARCHAR(50), password VARCHAR(100) NOT NULL, city VARCHAR(30), status BOOL);",
    function (err, result) {
      if (err) throw err;
      console.log("Table 'DeliveryUsers' created");    
  });


  db_connection.query(
    "CREATE TABLE IF NOT EXISTS BuyRequests (id VARCHAR(16) PRIMARY KEY, username VARCHAR(16) NOT NULL, Foreign Key (username) References Users(username) ON DELETE CASCADE, sell_id VARCHAR(16) NOT NULL, Foreign Key (sell_id) References Sells(id), status VARCHAR(10));",
    function (err, result) {
      if (err) throw err;
      console.log("Table 'BuyRequests' created");    
  });


  db_connection.query(
    "CREATE TABLE IF NOT EXISTS DeliveryStatus (id VARCHAR(16) PRIMARY KEY, username VARCHAR(16) NOT NULL, Foreign Key (username) References DeliveryUsers(username) ON DELETE CASCADE, buyrequest_id VARCHAR(16) NOT NULL, Foreign Key (buyrequest_id) References BuyRequests(id), status VARCHAR(10));",
    function (err, result) {
      if (err) throw err;
      console.log("Table 'DeliveryStatus'created");    
  });
      
});

module.exports = db_connection;