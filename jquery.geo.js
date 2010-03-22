// $Id$

// Use shorthand $ for jQuery on anomynous function
(function ($) {
// Define successCallback and errorCallback
var sc = null, ec = null;

/**
 * callback to successCallback if get geo location success
 */
function getPositionOK(position) {
  // Assign jQuery == this on successCallback function
  sc.call($, position.coords.latitude, position.coords.longitude);
}

/**
 * Handler error
 */
function getPositionFail(error) {
  // call errorCallback if exits
  $.isFunction(ec) ? ec.call($, error) : '';
}

/**
 * Check browser geo api support
 */
$.geoSupport = function () {
  return navigator.geolocation && $.isFunction(navigator.geolocation.getCurrentPosition);
}

/**
 * get geo location
 */
$.geo = function (successCallback, errorCallback) {
  if ($.isFunction(successCallback)) {
    sc = successCallback;
    ec = errorCallback;
    // Get API for GEO
    $.geoSupport() ? navigator.geolocation.getCurrentPosition(getPositionOK, getPositionFail, {timeout: 0}) : getPositionFail('Your browser doesnot support geo api');
  }
}

})(jQuery);
