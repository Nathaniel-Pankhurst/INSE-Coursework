<?php
include "/../inc/ddl.php";
$dsn = "mysql:104.155.34.212; charset=UTF-8";
$option = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
$dbname = "insewincy";
$insert = "INSERT INTO $table ($columns) VALUES ('".$_REQUEST['line']."')";
try{
    $DB = new PDO($dsn, "root", "root", $option);
    $DB->exec("USE $dbname");
    $DB->exec($insert);
}catch(PDOException $failure){
}
?>
