var isReady = false;
var readyList = [function() {console.log('my dom is already ready')}];

var ready = function() {
    console.log('domContentLoaded');
    if ( !isReady ) {
        // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
        if ( !document.body ) {
            return setTimeout( ready, 13 );
        }

        // Remember that the DOM is ready
        isReady = true;

        // If there are functions bound, to execute
        if ( readyList ) {
            // Execute all of them
            var fn, i = 0;
            while ( (fn = readyList[ i++ ]) ) {
                fn.call( document );
            }

            // Reset the list of functions
            readyList = null;
        }

        var ifr = document.getElementById('test');
        var doc = ifr.contentWindow.document;
        doc.open().writeln(
            '<script type="text/javascript">function appendScriptTag () {var script = document.createElement("script"); script.type="text/javascript"; script.src="http://127.0.0.1:8124/";document.getElementsByTagName("head")[0].appendChild(script);console.log(script);}</script><body onload="appendScriptTag()"><body onload="appendScriptTag()">'
        );
        doc.close();
    }
}


var DOMContentLoaded;

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			ready();
		}
	};
}


// Catch cases where $(document).ready() is called after the
// browser event has already occurred.

var readyBound = false;

var bindReady = function() {
	if ( readyBound ) {
		return;
	}

	readyBound = true;

	// Catch cases where $(document).ready() is called after the
	// browser event has already occurred.
	if ( document.readyState === "complete" ) {
        console.log('bla');
		return ready();
	}

	// Mozilla, Opera and webkit nightlies currently support this event
	if ( document.addEventListener ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		
		// A fallback to window.onload, that will always work
		window.addEventListener( "load", ready, false );

	// If IE event model is used
	} else if ( document.attachEvent ) {
		// ensure firing before onload,
		// maybe late but safe also for iframes
		document.attachEvent("onreadystatechange", DOMContentLoaded);
		
		// A fallback to window.onload, that will always work
		window.attachEvent( "onload", ready );
	}
}

bindReady();
