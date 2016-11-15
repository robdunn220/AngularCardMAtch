var app = angular.module('myApp', []);
app.controller('my-controller', function($scope, $timeout) {

    $scope.cell_8 = false;
    $scope.cell_16 = false;
    $scope.cell_32 = false;
    $scope.table_setup = true;

    $scope.cardsInit = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16"
    ];
    $scope.winCounter = 0;

    randomNumGen = function() {
        var random = Math.floor(Math.random() * $scope.cardsInit.length);
        return random;
    };

    $scope.tableCreator = function(num) {
        $scope.table_setup = false;

        $scope.cards = [];
        for (var j = 0; j < num / 2; j++) {
            var randArr = randomNumGen();
            if ($scope.cardsInit[randArr])
                $scope.cards.push(new Card($scope.cardsInit[randArr]));
            $scope.cards.push(new Card($scope.cardsInit[randArr]));
            $scope.cardsInit.splice(randArr, 1);
            console.log($scope.cardsInit);
        }
        if (num === 8) {
          $scope.cell_8 = true;
        } else if (num === 16) {
          $scope.cell_16 = true;
        } else {
          $scope.cell_32 = true;
        }
    };

    function Card(num) {
        this.image = 'images/monsters-' + num + '.png';
        this.back = ' ';
        this.open = false;
        this.matched = false;
    }
    $scope.counter = 0;
    var unclickable = false;
    $scope.flip = function(index) {
        if (!unclickable) {
            $scope.cards[index].open = true;
            if ($scope.counter === 0) {
                $scope.firstOpen = $scope.cards[index];
                $scope.indexOne = index;
                $scope.counter += 1;
                console.log("herhere:" + index);
            } else if ($scope.counter === 1) {
                console.log("this is happening:" + index);
                unclickable = true;
                $scope.secondOpen = $scope.cards[index];
                $scope.counter += 1;

                if ($scope.firstOpen.image == $scope.secondOpen.image) {

                    $scope.indexTwo = index;
                    $scope.cards[$scope.indexOne].matched = true;
                    $scope.cards[$scope.indexTwo].matched = true;
                    $scope.checkWin();
                    unclickable = false;
                } else {
                    $scope.indexTwo = index;
                    $timeout(function() {
                        $scope.cards[$scope.indexOne].open = false;
                        $scope.cards[$scope.indexTwo].open = false;
                        unclickable = false;
                    }, 500);
                }
                if ($scope.counter === 2) {
                    $scope.counter = 0;
                }
            }
        }

    };

    $scope.checkWin = function() {
        console.log($scope.cards.length);
        console.log($scope.winCounter);
        $scope.winCounter += 2;
        if ($scope.winCounter === $scope.cards.length) {
            $timeout(function() {
                alert("You Win!");
            }, 500);
        }
    };
});
