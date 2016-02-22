<?php

    // CONNECT TO THE DATABASE SERVER
    $dsn = "mysql:".DBHOST.";dbname=".DBNAME.";";
    $option = array(
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_PERSISTENT => true
    );
    $showquery = "show databases like '".DBNAME."'";
    try{
     $DB = new PDO($dsn, "root", "root", $option);
     $showresult = $DB->query($showquery);
     if($showresult->fetch()){
     $DB->exec("USE".DBNAME."");
     //$DB->exec($insert);
     }else{
      $DB->query("CREATE DATABASE".DBNAME."");
      $DB->exec("USE".DBNAME."");
      $DB->exec(DBTABLES);
     // $DB->exec($insert);
     }
    }catch(PDOException $failure){
    }
?>
