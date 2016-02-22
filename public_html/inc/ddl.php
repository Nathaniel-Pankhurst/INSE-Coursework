<?php
const DBINIT = "CREATE TABLE Owner(
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
