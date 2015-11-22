<?php
error_reporting(E_ALL & ~E_DEPRECATED);
error_reporting(E_ALL || ~E_NOTICE);
header('Content-Type: text/xml');//定义编码Javascript
header("Cache-Control: no-cache, must-revalidate");//当前页面不进行缓存，每次访问的时间必须从服务器上读取最新的数据
//A date in the past
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");//内容过期时间,故意写一个过期时间目的也是让浏览器去重新读取页面内容

$id=$_GET["id"];
$day=$_GET["day"];

//$con = mysql_connect('localhost', 'root', '584007');
$con = mysql_connect('localhost', 'root', 'root');
if (!$con)
 {
 die('Could not connect: ' . mysql_error());
 }

mysql_select_db("vc2015", $con);
//$time=28891;
//$id=39012;
//$day=2;
//$sql="SELECT * FROM ttt WHERE id = ".$id."";
$sql="SELECT x,y,time FROM fri WHERE id = ".$id." ORDER BY time " ;
if($day==0){
	global $sql;
	$sql="SELECT x,y,time FROM fri WHERE id = ".$id." ORDER BY time " ;
}elseif($day==1){
	global $sql;
	$sql="SELECT x,y,time FROM sat WHERE id = ".$id." ORDER BY time " ;
}else{
	global $sql;
	$sql="SELECT x,y,time FROM sun WHERE id = ".$id." ORDER BY time " ;
	
}

//$sql1="SELECT x,y from sun where time<".$time." AND id = ".$id."";
$result = mysql_unbuffered_query($sql);

echo '<?xml version="1.0" encoding="utf-8"?>
<person>';
while($row = mysql_fetch_array($result))
 {
 echo "<x>" . $row['x'] . "</x>";
 echo "<y>" . $row['y'] . "</y>";
 echo "<time>" . $row['time'] . "</time>";

 }
echo "</person>";

mysql_close($con);
?>
