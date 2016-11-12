var app = angular.module('myApp', []);
app.controller('my-controller', function($scope, $timeout) {
  var randNum = Math.random();
  $scope.cards = [
                  new Card("11"),
                  new Card("12"),
                  new Card("01"),
                  new Card("06"),
                  new Card("12"),
                  new Card("07"),
                  new Card("11"),
                  new Card("06"),
                  new Card("07"),
                  new Card("01")
                ];

  $scope.winCounter = 0;
  $scope.counter = 0;
  console.log($scope.cards);

  function Card(num) {
      this.image = 'images/monsters-' + num + '.png';
      this.back = ' ';
      this.open = false;
      this.matched = false;
  }

  $scope.flip = function(index) {
      $scope.cards[index].open = true;
      if ($scope.counter === 0) {
          $scope.firstOpen = $scope.cards[index];
          $scope.indexOne = index;
          $scope.counter += 1;
      } else if ($scope.counter === 1) {
          $scope.secondOpen = $scope.cards[index];
          $scope.counter += 1;
          if ($scope.firstOpen.image == $scope.secondOpen.image) {
              $scope.indexTwo = index;
              $scope.cards[$scope.indexOne].matched = true;
              $scope.cards[$scope.indexTwo].matched = true;
              $scope.checkWin();
          } else {
              $scope.indexTwo = index;
              $timeout(function() {
                  $scope.cards[$scope.indexOne].open = false;
                  $scope.cards[$scope.indexTwo].open = false;
              }, 500);
          }
          if ($scope.counter === 2) {
              $scope.counter = 0;
          }
      }
  };

  $scope.checkWin = function() {
      $scope.winCounter += 2;
      if ($scope.winCounter === $scope.cards.length) {
          $timeout(function() {
              alert("You Win!");
          }, 500);
      }
  };
});
