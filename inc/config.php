<?php
/**
* @author: UP745065
* @author: UP737044
*/

/*Databse Information*/
const DBHOST = "localhost";     // Host Name
const DBUSER= "root";           // Username for the databse
const DBPASS = "root";              // Database Password
const DBNAME = "insewincy";   // Database Name

const DSN = "mysql:".DBHOST.";dbname=".DBNAME.";";
const OPTION = array(
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_PERSISTENT => true
);

/*Database Tables*/

const DBTABLES = "CREATE TABLE Owner(
  ID INT PRIMARY KEY,
  Name VARCHAR(45) NOT NULL,
  Email VARCHAR(45) NOT NULL
)";
  "CREATE TABLE Project (
  ID INT PRIMARY KEY,
  Name VARCHAR(45),
  Owner-ID INT,
  FOREIGN KEY (Owner-ID) REFERENCES Owner(ID)
)";
  "CREATE TABLE Object (
  ID INT PRIMARY KEY,
  Name VARCHAR(100),
  Slack TIME,
  Duration TIME,
  Earliest_Start DATE,
  Earliest_End DATE,
  Latest_Start DATE,
  Latest_End DATE,
  Parent_object INT,
  Project_id INT,
  FOREIGN KEY (Project_id) REFERENCES Project(ID),
  FOREIGN KEY (Parent_object) REFERENCES Object(ID)
)";
?>
