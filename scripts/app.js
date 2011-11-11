$(document).bind("mobileinit", function() {
  $.extend($.mobile, {
    defaultPageTransition: 'none'
  });
});

if (typeof phonegap != 'undefined') {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  $(document).ready(onDeviceReady);
}

function onDeviceReady () {
  var captureSuccess = function(mediaFiles) {
    var i, src;
    for (i in mediaFiles) {
      // Check for the W3C property `url` first.
      // If not found, try PhoneGap's `fullPath` property (correct as of 1.2)
      src = data[i].url || data[i].fullPath
      if (src) $('body').append($('img').attr('src', src));
    }
  }

  var captureError = function(error) {
    alert(error.message);
  };

  var captureImage = function() {
    try {
      navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
    } catch (e) {
      alert(e.message)
    }
  };

  alert(navigator.device)
  $('#camera').on('click', captureImage);
}
