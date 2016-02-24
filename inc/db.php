<?php
/**
* @author: UP737044
*/


  public function insert($binds, $table){
    $query = "INSERT INTO $table"
    switch ($table) {
      case 'Owner':

        $query = "INSERT INTO $table (ID, Name, Email) VALUES (?,?,?);";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, OPTION);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump $failure
        }
        break;

      case 'Project':

        $query = "INSERT INTO $table (ID, Name, Owner_ID) VALUES (?,?,?);";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, OPTION);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump $failure
              }
        break;

      case 'Object':

        $query = "INSERT INTO $table (ID, Name, Slack, Duration, Earliest_Start,
        Earliest_End, Latest_Start, Latest_End, Parent_object, Project_id) VALUES
         (?,?,?,?,?,?,?,?,?,?);";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, OPTION);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump $failure
        }
        break;



      default:
        # code...
        break;
    }
  }

  public function getUserProjects($ownerID){
    $query = "SELECT (ID, Name) FROM Project WHERE Owner_ID = $ownerID;";
    try{
      $DB = new PDO(DSN, DBUSER, DBPASS, OPTION);
      $results = $DB->query($query);
      $DB = null;
    }catch(PDOException $failure){
      var_dump $failure
    }
  }

  public function getProjectData($projectID){
    $query = "SELECT * FROM Project WHERE ID = $projectID;";
    try{
      $DB = new PDO(DSN, DBUSER, DBPASS, OPTION);
      $results = $DB->query($query);
      $DB = null;
    }catch(PDOException $failure){
      var_dump $failure
    }
  }

  public function delete(){
    //not implemented
  }

  public function update($table, $binds){
    switch ($table) {
      case 'Owner':
        $query = "UPDATE Owner SET Name=?, Email=? WHERE ID=?;";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, OPTION);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump $failure
        }
        break;

      case 'Project':
        $query = "UPDATE Project SET Name=? WHERE ID=?;";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, OPTION);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump $failure
        }
        break;

      case 'Object':
        $query = "UPDATE Object SET Name=?, Slack=?, Duration=?, Earliest_Start=?,
        Earliest_End=?, Latest_Start=?, Latest_End=?, Parent_object=? WHERE ID=?;";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, OPTION);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump $failure
        }
        break;
    }
  }
