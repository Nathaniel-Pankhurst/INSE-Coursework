<?php
include "/../inc/ddl.php";
$dsn = "mysql:104.155.34.212; charset=UTF-8";
$option = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
$dbname = "insewincy";
$query = "SELECT * FROM $table";
try{
  $DB = new PDO($dsn, "root", "root", $option);
  $DB->exec("USE $dbname");
  $results = $DB->query($query);
  $results->setFetchMode(PDO::FETCH_ASSOC);
  while ($row = $results->fetch()){
    foreach ($row as $cellname => $cell) {
      echo $cell;
    }
  }
}catch(PDOException $failure){

}   //    … read and echo a line
?>
