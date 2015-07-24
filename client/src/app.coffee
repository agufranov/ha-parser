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
