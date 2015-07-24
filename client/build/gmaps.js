(function() {
  var initialize;

  initialize = function() {
    var mapOptions;
    mapOptions = {
      center: {
        lat: 59.9445994,
        lng: 30.3101993
      },
      zoom: 12
    };
    return window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  };

  google.maps.event.addDomListener(window, 'load', initialize);

}).call(this);
