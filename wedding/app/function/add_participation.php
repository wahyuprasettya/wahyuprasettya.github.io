<?php

	// Check If form submitted, insert form data into users table.
	if(isset($_POST['submit'])) {
		$name = $_POST['name'];
		$greetings = $_POST['greetings'];

        echo $name;
		
    

		// include database connection file
		include_once("db.php");
				
		// Insert data into table
		$result = mysqli_query($mysqli, "INSERT INTO tbl_greetings(name,greetings) VALUES('$name','$greetings')");

        if($result !== true){
            echo "<script>alert('Failed Updated'); window.location = '/wahyuprasettya.github.io/wedding/';</script>";
        }
        echo "<script>alert('Successfully Updated'); window.location = '/wahyuprasettya.github.io/wedding/';</script>";
    
	}
?>