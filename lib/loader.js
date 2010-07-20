var isReady = false;

var ready = function() {
    if ( !isReady ) {
        // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
        if ( !document.body ) {
            return setTimeout( ready, 13 );
        }

        // Remember that the DOM is ready
        isReady = true;
        
        var body = document.body;
        var div  = document.createElement('div');
        div.style.display = 'none';
        body.insertBefore(div, body.firstChild);
        
        var iframe = document.createElement('iframe');
        iframe.frameborder = 0;
        
        // seems like the meebo guys use this "m" tag for some magic I don't guess right now
        // so I won't use it until I see a use case for that
        // var m = div.appendChild(document.createElement('m'));
        
        // use the obvious method instead
        div.appendChild(iframe);
       
        // iframe.contentWindow is accessible since we appended the iframe to the DOM 
        var doc = iframe.contentWindow.document;

        // let's write some crazy script stuff ;)
        doc.open().writeln(
            '<script type="text/javascript">' +
                'function appendScriptTag () {' +
                    'var script = document.createElement("script");' +
                    'script.type="text/javascript";' +
                    'script.src="http://127.0.0.1:8124/";' + 
                    'document.getElementsByTagName("head")[0].appendChild(script);' +
                '}' +
            '</script>' +
            '<body onload="appendScriptTag()">');
        doc.close();
    }
}

// actually this stuff is only for the DOMContentLoaded event ... u should use a library here instead
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
