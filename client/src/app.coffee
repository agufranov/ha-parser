app = angular.module 'app', []

app.controller 'mainCtrl', ['$scope', '$http', ($scope, $http) ->
  $scope.q = {}

  $http url: 'storage/db.json'
    .success (data, status) ->
      $scope.items = R.values data

      # Prepare filters
      diff = (a, b) -> a.localeCompare b
      $scope.stations = R.sort diff, R.uniq R.pluck 'station', $scope.items

      window.data = data # debug
]

window.getLatLng = (address, latlng, cb) ->
  options = { address: address }
  options.latlng = [latlng.lat(), latlng.lng()].join() if latlng
  q = $.param options
  $.get "http://maps.google.com/maps/api/geocode/json?#{q}", (response) ->
    console.log "Results:", response.results.length
    location = response.results[0].geometry.location
    latlng = new google.maps.LatLng location.lat, location.lng
    console.log location, latlng
    cb latlng if cb

window.getLatLngHinted = (address, hintAddress, cb) ->
  getLatLng hintAddress, null, (hintLatLng) ->
    getLatLng address, null, (latlng) ->
      console.log 'hinted', latlng
      cb latlng if cb
