<?php
include __DIR__.'/../../../inc/all.php';
$in = extractVars(INPUT_POST);
$results = getProjectData($in["ID"]);
