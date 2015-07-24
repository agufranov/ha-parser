(function() {
  var app;

  app = angular.module('app', []);

  app.controller('mainCtrl', [
    '$scope', '$http', function($scope, $http) {
      $scope.q = {};
      return $http({
        url: 'storage/db.json'
      }).success(function(data, status) {
        var diff;
        $scope.items = R.values(data);
        diff = function(a, b) {
          return a.localeCompare(b);
        };
        $scope.stations = R.sort(diff, R.uniq(R.pluck('station', $scope.items)));
        return window.data = data;
      });
    }
  ]);

  window.getLatLng = function(address, latlng, cb) {
    var options, q;
    options = {
      address: address
    };
    if (latlng) {
      options.latlng = [latlng.lat(), latlng.lng()].join();
    }
    q = $.param(options);
    return $.get("http://maps.google.com/maps/api/geocode/json?" + q, function(response) {
      var location;
      console.log("Results:", response.results.length);
      location = response.results[0].geometry.location;
      latlng = new google.maps.LatLng(location.lat, location.lng);
      console.log(location, latlng);
      if (cb) {
        return cb(latlng);
      }
    });
  };

  window.getLatLngHinted = function(address, hintAddress, cb) {
    return getLatLng(hintAddress, null, function(hintLatLng) {
      return getLatLng(address, null, function(latlng) {
        console.log('hinted', latlng);
        if (cb) {
          return cb(latlng);
        }
      });
    });
  };

}).call(this);
