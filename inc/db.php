<?php
/**
* @author: UP737044
*/
$option = array(
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_PERSISTENT => true
);

  public function extractVars($method = INPUT_GET)
  {
      $out = array();
      foreach ($_REQUEST as $key => $value) {
          $out[$key] = stripslashes(strip_tags(urldecode(filter_input($method,$key, FILTER_SANITIZE_STRING))));
      }

      return $out; // $_REQUEST;
  }

  public function insert($in){
    $table = $in["table"];
    switch ($table) {
      case 'Owner':
        $binds = array($in["ID"], $in["Name"], $in["Email"]);
        $query = "INSERT INTO $table (ID, Name, Email) VALUES (?,?,?);";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, $option);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump($failure);
        }
        break;

      case 'Project':
        $binds = array($in["ID"], $in["Name"], $in["Owner_ID"]);
        $query = "INSERT INTO $table (ID, Name, Owner_ID) VALUES (?,?,?);";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, $option);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump($failure);
              }
        break;

      case 'Object':
        $binds = array($in["ID"], $in["Name"], $in["Slack"], $in["Duration"],
        $in["Earliest_Start"], $in["Earliest_End"], $in["Latest_Start"],
        $in["Latest_End"], $in["Parent_Object"], $in["Project_id"]);
        $query = "INSERT INTO $table (ID, Name, Slack, Duration, Earliest_Start,
        Earliest_End, Latest_Start, Latest_End, Parent_object, Project_id) VALUES
         (?,?,?,?,?,?,?,?,?,?);";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, $option);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump($failure);
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
      $DB = new PDO(DSN, DBUSER, DBPASS, $option);
      $results = $DB->query($query);
      $DB = null;
    }catch(PDOException $failure){
      var_dump($failure);
    }
  }

  public function getProjectData($projectID){
    $query = "SELECT * FROM Project WHERE ID = $projectID;";
    try{
      $DB = new PDO(DSN, DBUSER, DBPASS, $option);
      $results = $DB->query($query);
      $DB = null;
    }catch(PDOException $failure){
      var_dump($failure);
    }
  }

  public function delete(){
    //not implemented
  }

  public function update($in){
    $table = $in["table"];
    switch ($table) {
      case 'Owner':
        $binds = array($in["ID"], $in["Name"], $in["Email"]);
        $query = "UPDATE Owner SET Name=?, Email=? WHERE ID=?;";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, $option);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump($failure);
        }
        break;

      case 'Project':
        $binds = array($in["ID"], $in["Name"], $in["Owner_ID"]);
        $query = "UPDATE Project SET Name=? WHERE ID=?;";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, $option);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump($failure);
        }
        break;

      case 'Object':
        $binds = array($in["ID"], $in["Name"], $in["Slack"], $in["Duration"],
        $in["Earliest_Start"], $in["Earliest_End"], $in["Latest_Start"],
        $in["Latest_End"], $in["Parent_Object"], $in["Project_id"]);
        $query = "UPDATE Object SET Name=?, Slack=?, Duration=?, Earliest_Start=?,
        Earliest_End=?, Latest_Start=?, Latest_End=?, Parent_object=? WHERE ID=?;";
        try{
          $DB = new PDO(DSN, DBUSER, DBPASS, $option);
          $results = $DB->query($query, $binds);
          $DB = null;
        }catch(PDOException $failure){
          var_dump($failure);
        }
        break;
    }
  }
