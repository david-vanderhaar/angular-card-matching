
function fillTable($scope) {

    $scope.cards = [];
    //max cards open is 2
    $scope.cardsOpen = [];
    $scope.cardsMatched1 = [];
    $scope.cardsMatched2 = [];

    //players
    $scope.player1Turn = true;

    $scope.score1 = 0;
    $scope.score2 = 0;

    for (var i = 0; i < 52; i++) {

        if (Math.floor(i%4) == 0) {
            $scope.cards.push({'cardVal':(i%13) + 1, 'suit':'hearts', 'index':i, 'reveal': false, 'player':0});
        } else if (Math.floor(i%4) == 1) {
            $scope.cards.push({'cardVal':(i%13) + 1, 'suit':'spades', 'index':i, 'reveal': false, 'player':0});
        } else if (Math.floor(i%4) == 2) {
            $scope.cards.push({'cardVal':(i%13) + 1, 'suit':'diamonds', 'index':i, 'reveal': false, 'player':0});
        } else if (Math.floor(i%4) == 3) {
            $scope.cards.push({'cardVal':(i%13) + 1, 'suit':'clubs', 'index':i, 'reveal': false, 'player':0});
        }
       // $scope.cards.push({'cardVal':i, 'suit':Math.floor(i/3)});
        $scope.cardsShuffled = $scope.cards.sort(function(a, b){return 0.5 - Math.random()});
    }

    
        $scope.set1 = $scope.cards.slice(0,13);
        $scope.set2 = $scope.cards.slice(13,13*2);
        $scope.set3 = $scope.cards.slice(13*2,13*3);
        $scope.set4 = $scope.cards.slice(13*3,13*4);
    

        // console.log($scope.cards);
        // console.log($scope.set1)
        // console.log($scope.set2);

        function hide () {
            console.log($scope.cardsOpen);            
            $scope.cardsOpen[0].reveal = false;
            $scope.cardsOpen[1].reveal = false;
            $scope.cardsOpen = [];
            console.log('hide');
        }

        function handleOpen () {

            //if 2 cards open 
                //if 2 cards match
                    //add to player matched
                //else
                    //clear cards open
            //else 
                //reveal cards open

            $scope.cardsOpen.map(a => a.reveal = true);

            if ($scope.cardsOpen.length == 2) {
                // if ($scope.cardsOpen.map((a, b) => a.cardVal == b.cardVal)) {
                if ($scope.cardsOpen[0].cardVal == $scope.cardsOpen[1].cardVal) {    
                    if ($scope.player1Turn == true) {
                        $scope.cardsMatched1.push($scope.cardsOpen[0]);
                        $scope.cardsMatched1.push($scope.cardsOpen[1]);
                        $scope.cardsOpen[0].player = 1;
                        $scope.cardsOpen[1].player = 1;
                        $scope.score1 = $scope.cardsMatched1.length/2;
                    } else {
                        $scope.cardsMatched2.push($scope.cardsOpen[0]);
                        $scope.cardsMatched2.push($scope.cardsOpen[1]);
                        $scope.cardsOpen[0].player = 2;
                        $scope.cardsOpen[1].player = 2;
                        $scope.score2 = $scope.cardsMatched2.length/2;
                    }
                    console.log('match 1 ' + $scope.cardsMatched1);
                    console.log('match 2 ' + $scope.cardsMatched2);
                    $scope.cardsOpen = [];
                } else {
                    // $scope.cardsOpen[0].reveal = false;
                    // $scope.cardsOpen[1].reveal = false;
                    setTimeout(hide, 500)
                    $scope.player1Turn = !$scope.player1Turn


                }
                
            }
            //$scope.cardsOpen.map(a => a.reveal = true);
            console.log('playerTurn ' + $scope.player1Turn);
        }

        $scope.open = function (card) {
                
                if (card.reveal == false) {
                    $scope.cardsOpen.push(card);
                    handleOpen();  
                    console.log($scope.cardsOpen);
                }
                
                // card.reveal = true;
                // if ($scope.cardsOpen.length == 2) {
                //     $scope.cardsOpen = [];
                // }
                //card.reveal = !card.reveal; 

            
        }

        


}


angular.module('myApp', []).controller('myCtrl', fillTable);
