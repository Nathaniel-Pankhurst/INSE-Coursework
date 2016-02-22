<?php
/**
* @author: UP745065
*/

/*Databse Information*/
const DBHOST = "localhost";     // Host Name
const DBUSER= "root";           // Username for the databse
const DBPASS = "";              // Database Password
const DBNAME = "audioSphere";   // Database Name

/*Database Tables*/

const DBTABLES =

"CREATE TABLE Account(
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL
);

CREATE TABLE Genre(
id INT PRIMARY KEY AUTO_INCREMENT,
genre_name VARCHAR(50) NOT NULL,
genre_description TEXT NOT NULL
);

CREATE TABLE Post(
id INT PRIMARY KEY AUTO_INCREMENT,
userID INT NOT NULL,
genreID INT NOT NULL,
postInfomation TEXT NOT NULL,
timeCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT userIDFK FOREIGN KEY (userID) REFERENCES Account(id),
CONSTRAINT genreIDFK FOREIGN KEY (genreID) REFERENCES Genre(id)
);

CREATE TABLE Comment(
id INT PRIMARY KEY AUTO_INCREMENT,
userID INT NOT NULL,
postID INT NOT NULL,
commentInformation TEXT NOT NULL,
timeCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT userIDFK FOREIGN KEY (userID) REFERENCES Account(id),
CONSTRAINT postIDFK FOREIGN KEY (postID) REFERENCES Post(id)
);"
?>
