## jQuery GEO API Plugin

This plugin contains 2 function:

### jQuery.geoSupport
Return true if your browser have GEO API support, false if not.
Example:

<pre>
$('#checkSupport').click(function () {
  if ($.geoSupport()) {
    setMessage('You browser have GEO API');
  } else {
    setMessage('You browser don\'t have GEO API');
  }
});
</pre>

### jQuery.geo
Using this function with two parameter: <pre>jQuery.geo(successCallback, errorCallback)</pre>

- first parameter is successCallback: If your browser have GEO API support, **jQuery.geo** will call this function with two arguments: latitude and longitude of your position
- second parameter is optional, if have and when GEO API call have error, **jQuery.geo** will call this function with one arguments: error return from GEO API

Example:

- with only one parameter:

<pre>
$('#getGeoLocation').click(function () {
  $.geo(function (latitude, longitude) {
    setMessage('Your latitude position: ' + latitude + '<br />and longitude position: ' + longitude);
  });
});
</pre>
- with two parameter, first parameter is function has been define:

<pre>
function callback (latitude, longitude) {
  setMessage('Your latitude position: ' + latitude + '<br />and longitude position: ' + longitude);
}
        
$('#getGeoLocationError').click(function () {
  $.geo(callback, function (error) {
    setMessage(error.toString());
  });
});
</pre>


See more at: http://apps.sanglt.com/jgeo/
