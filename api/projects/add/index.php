<?php
include __DIR__.'/../../../inc/all.php';
$in = extractVars(INPUT_POST);
$results = insert($in);
