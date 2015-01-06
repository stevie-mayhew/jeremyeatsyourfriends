
var React = require('react'),
    JeremyEatsYourFriends = require('./jeremysface/jeremyeatsyourfriends.js');

var facebookIsUnavailable = true;

function facebookReady()
{
    if (document.getElementById('JeremysFace')) {
        React.render(
            <JeremyEatsYourFriends facebookIsUnavailable={facebookIsUnavailable} />,
            document.getElementById('JeremysFace')
        );
    }
}

document.addEventListener("DOMContentLoaded", function(event) {


    var checkLoaded = setInterval(function() {
        if (window.FB || facebookIsUnavailable) {
            clearInterval(checkLoaded);
            facebookReady();
        }
    },500); // TODO make this work better, wait for FB load somehow?

});
