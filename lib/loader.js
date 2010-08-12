/**
 * Copyright (c) 2010 VZnet Netzwerke Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author Tim Eggert <teggert@vz.net>
 * @copyright 2010 VZnet Netzwerke Ltd.
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 */

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

