<?php
$directory = 'img/gallery/thumbnails';

$allowed_types=array('jpg','jpeg','gif','png');
$file_parts=array();
$ext='';
$title='';
$i=0;

$dir_handle = @opendir($directory) or die("There is an error with your image directory!");
$filesArray = array();
while ($file = readdir($dir_handle)) 
{
	if($file=='.' || $file == '..') continue;
	
	$file_parts = explode('.',$file);
	$ext = strtolower(array_pop($file_parts));

	if(in_array($ext,$allowed_types))
	{
        $filesArray[]=$file;
	}
}

closedir($dir_handle);

sort($filesArray);
$dataarray=array("filesArray"=>$filesArray);
echo json_encode($dataarray);
?>
