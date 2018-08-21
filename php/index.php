<?php

function encodeURIComponent($str) {
    $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
    return strtr(rawurlencode($str), $revert);
}

$texto =  $_POST["textoa"];
$texto = encodeURIComponent($texto);


$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text={$texto}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

curl_setopt($ch, CURLOPT_USERPWD, "902d6228-8e62-4c1e-8aa3-cb81d6f55cc2" . ":" . "CBoYepyVoWjS");

$result = curl_exec($ch);
json_encode($result);
echo $result;
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);
?>
