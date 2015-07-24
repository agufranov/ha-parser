initialize = ->
  mapOptions =
    center: lat: 59.9445994, lng: 30.3101993
    zoom: 12
  window.map = new google.maps.Map document.getElementById('map-canvas'), mapOptions
google.maps.event.addDomListener(window, 'load', initialize)
