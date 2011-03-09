jQuery Ajax Progress
==================
> Push chunks of data from the backend and handle them in the frontend before the ajax request is actually finished

Example: 
// In the javascript
	$ajax({
		type: "GET",
		url: 'example.php',
		progress: function(update){
			// update contains a string of the newly received data
			console.log(update);
		},
	})
	
// In example.php
	<?php
	yield('Starting a heavy operation...');
	// Do some slow stuff
	sleep(10);
	yield('The task is completed!');
	?>
	
What's the data format? The first line is a separator string. Each chunk of data is fallowed by the separator line. See the helper function defined in [yield.php](https://github.com/sash/jquery-ajax-progress/blob/master/yield.php).

For a complete working example checkout the repo and open [example.html](https://github.com/sash/jquery-ajax-progress/blob/master/example.html) in your browser.