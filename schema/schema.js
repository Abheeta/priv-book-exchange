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
    "CREATE TABLE IF NOT EXISTS Sells (id int PRIMARY KEY, username VARCHAR(16) NOT NULL, Foreign Key (username) References Users(username) ON DELETE CASCADE, book_id VARCHAR(16) NOT NULL, Foreign Key (book_id) References Books(id), price INT NOT NULL, description VARCHAR(512) NOT NULL, status BOOL);",
    function (err, result) {
      if (err) throw err;
      console.log("Table 'Sells' created");    
  });


  db_connection.query(
    "CREATE TABLE IF NOT EXISTS Wishlists (id int PRIMARY KEY, username VARCHAR(16) NOT NULL, Foreign Key (username) References Users(username) ON DELETE CASCADE, book_id VARCHAR(16) NOT NULL, Foreign Key (book_id) References Books(id), available BOOL);",
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
    "CREATE TABLE IF NOT EXISTS BuyRequests (id int PRIMARY KEY, username VARCHAR(16) NOT NULL, Foreign Key (username) References Users(username) ON DELETE CASCADE, sell_id int NOT NULL, Foreign Key (sell_id) References Sells(id), status VARCHAR(10));",
    function (err, result) {
      if (err) throw err;
      console.log("Table 'BuyRequests' created");    
  });


  db_connection.query(
    "CREATE TABLE IF NOT EXISTS DeliveryStatus (id int PRIMARY KEY, username VARCHAR(16) NOT NULL, Foreign Key (username) References DeliveryUsers(username) ON DELETE CASCADE, buyrequest_id int NOT NULL, Foreign Key (buyrequest_id) References BuyRequests(id), status VARCHAR(10));",
    function (err, result) {
      if (err) throw err;
      console.log("Table 'DeliveryStatus' created");    
  });

  db_connection.query(
    "CREATE TRIGGER `sells_BEFORE_INSERT` BEFORE INSERT ON `sells` FOR EACH ROW BEGIN\nIF (NEW.status = 1) THEN\nUPDATE Books SET availability = availability+1 WHERE id = NEW.book_id;\nEND IF;\nEND;",
    function (err, result) {
      if (err) console.log(err.sqlMessage);
      else console.log("Trigger Created for Before Insert on Sells");    
  });

  db_connection.query(
    "CREATE TRIGGER `books_BEFORE_UPDATE` BEFORE UPDATE ON `books` FOR EACH ROW BEGIN IF (NEW.availability > 0) THEN UPDATE Wishlists SET available = 1 WHERE (book_id = NEW.id); ELSE UPDATE Wishlists SET available = 0 WHERE (book_id = NEW.id); END IF; END",
    function (err, result) {
      if (err) console.log(err.sqlMessage);
      else console.log("Trigger Created for Before Update on Books");
  });
});

module.exports = db_connection;