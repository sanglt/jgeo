// Use shorthand $ for jQuery on anomynous function
(function ($) {
// Define successCallback and errorCallback
var sc = null,
    ec = null;

/**
 * Handler for BlackBerry Mobile Phone
 */
var bb = {
  // Init
  init: function () {
    // Call to bb.update when update location
    blackberry.location.onLocationUpdate("bb.update()");
    blackberry.location.setAidMode(2); // Active GPS function
    blackberry.location.refreshLocation(); // Refesh location
  },
  // Update
  update: function () {
    // Call to observer update
    observer.update(blackberry.location.latitude, blackberry.location.longitude);
  }
};
function positionSucceeded(location) {
  alert(location);
}
/**
 * Handler geo for nokia, iphone, android and browser have geo api
 */
var geo = {
  GEOLOCATION_OPTIONS: {
    enableHighAccuracy: true,
    maximumAge:         600000,
    timeout:            30000   // 30 seconds
  },
  WATCH_ID: null,
  // init
  init: function (geolocation) {
    WATCH_ID = geolocation.watchPosition(
      geo.positionSucceeded,
      geo.positionFailed,
      geo.GEOLOCATION_OPTIONS
    );
  },
  positionSucceeded: function (position) {
    alert(position);
    observer.update(position.coords.latitude, position.coords.longitude);
  },
  positionFailed: function (error) {
    var message = "Can't get location";
    // Detect error code
    switch (error.code) {
      case 0:
        break;
      case 1:
        message += " (permission denied)";
        break;
      case 2:
        message += " (unavailable)";
        break;
      case 3:
      default:
        message += " (timeout)";
        break;
    }
    observer.fail(message);
  }
}

/**
 * Create observer
 */
var observer = {
  // Call successCallback function with this == jQuery
  update: function (latitude, longitude) {
    sc.call($, latitude, longitude);
  },
  fail: function (message) {
    // Call to errorCallback
    $.isFunction(ec) ? ec.call($, message) : '';
  }
};


var location = {
  support: false,
  geo: null,
  bb: null,
  init: function () {
    var geo = navigator.geolocation; // get geo object
    if (typeof geo === 'undefined') {
      // Try to use google location if avariable
      if (typeof google !== 'undefined' && google.gears && google.gears.factory.create) {
        geo = google.gears.factory.create('beta.geolocation');
      }
    }
    
    // Check geo object again
    if (typeof geo !== 'undefined') {
      location.support = true;
      location.geo = geo;
    } else if (window.blackberry && blackberry.location && blackberry.location.GPSSupported) {
      location.support = true;
      location.bb = true;
    } else {
      // @TODO: Use google geo api (detect from IP address) if need
      location.support = false;
    }
  },
  get: function () {
    if (location.support) {
     if (typeof location.geo === 'object') {
       geo.init(location.geo);
     } else if (location.bb == true) {
       bb.init();
     }
    }
  }
}

location.init();
/**
 * Check browser geo api support
 */
$.geoSupport = function () {
  return location.support;
}

/**
 * get geo location
 */
$.geo = function (successCallback, errorCallback) {
  if ($.isFunction(successCallback) && $.geoSupport()) {
    sc = successCallback;
    ec = errorCallback;
    location.get();
  }
}

})(jQuery);