/**
 * Provides a callback for each newly delivered content even before the request is complete.
 */

jQuery.ajaxPrefilter(function( options, _, jqXHR ) {
	
    if ( jQuery.isFunction( options.progress ) ) {
    	
        var xhrFactory = options.xhr,
            interval,
            processed = "",
            unprocessed = "",
            delimiter="",
            count=0,
            scanned = "";
        	updater =  function (responseText){
	        	if ( responseText && ( responseText.length > scanned.length ) ) {
	            	scanned = responseText
	                unprocessed = responseText.substr(processed.length);
	            	if (!delimiter && unprocessed.indexOf("\n") > 0){
	            		delimiter = unprocessed.substr(0, unprocessed.indexOf("\n")+1)
	            		processed = responseText.substr(0, delimiter.length)
	            		return;
	            	}
	            	if (delimiter){
	            		
	            		updates = unprocessed.split(delimiter)
	            		if (jqXHR.readyState!=4) updates.pop(); // the last update is considered unfinished at least untill the request is running
	            		if (updates.length){
	                		
	                		jQuery.each(updates, function(k, v){
	                			if (jQuery.trim(v).length)
	                				options.progress(v)
	                		})
	                		count += updates.length
	                		
	                		processed += updates.join(delimiter)+delimiter;
	            		}
	            	}
	            }
	        }
        options.xhr = function() {
        	
            var xhr = xhrFactory.apply( this, arguments );
                
            interval = setInterval(function() {

                var responseText,
                    updates;

                try {

                    updater(xhr.responseText);
                    
                } catch(e) {
                    console.log(e);
                }
            }, options.progressInterval || 1 );

            return xhr;
        };
        function stop() {
            if ( interval ) {
               clearInterval( interval );
            }
        }
        
        jqXHR.then( stop, stop );
        jqXHR.done(function (jx){updater(jx)})
    }
});
