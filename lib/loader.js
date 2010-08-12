var loadScriptAsync = function(url) {
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
                'script.src="' + url + '";' + 
                'document.getElementsByTagName("head")[0].appendChild(script);' +
            '}' +
        '</script>' +
        '<body onload="appendScriptTag()">');
    doc.close();
}

