<?php

    // CONNECT TO THE DATABASE SERVER
    $option = array(
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_PERSISTENT => true
    );

    //check if database exists
    $showquery = "show databases like '".DBNAME."'";
    try{
        $DB = new PDO(DSN, DBNAME, DBPASS, $option);
        $showresult = $DB->query($showquery);
        if($showresult->fetch()){
        $DB->exec("USE".DBNAME."");
     }else{
         //create database if it doesnt exist
        $DB->query("CREATE DATABASE".DBNAME."");
        $DB->exec("USE".DBNAME."");
        $DB->exec(OWNERTABLE);
        $DB->exec(PROJECTTABLE);
        $DB->exec(OBJECTTABLE);
     }
    }catch(PDOException $failure){
      var_dump ($failure);
    }
?>
