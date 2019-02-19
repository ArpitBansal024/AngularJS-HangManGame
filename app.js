var myApp = angular.module('AngJSApp', []);


myApp.controller('HangManCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.guessesCount;
    $scope.displayWord = '';
    $scope.correctGuessesList = [];
    $scope.inCorrectGuessesList = [];
    $scope.guessValue = {
        letter: ''
    };
    var selectedWord = '';
    $scope.title = 'HangMan Game';
    var hangmanList = ['cat', 'mat', 'rat', 'tea','max','min'];


    $scope.check = function () {
        if ($scope.guessValue.letter === '') {
            alert('Value can not be blank');
            return;
        }
        for (var i = 0; i < $scope.correctGuessesList.length; i++) {
            if ($scope.guessValue.letter.toLowerCase() === $scope.correctGuessesList[i].toLowerCase()) {
                $scope.guessValue.letter = '';
                return;
            }
        }
        for (var i = 0; i < $scope.inCorrectGuessesList.length; i++) {
            if ($scope.guessValue.letter.toLowerCase() === $scope.inCorrectGuessesList[i].toLowerCase()) {
                $scope.guessValue.letter = '';
                return;
            }
        }
        var correct = false;

        for (var i = 0; i < selectedWord.length; i++) {
            if ($scope.guessValue.letter.toLowerCase() === selectedWord[i].toLowerCase()) {
                $scope.displayWord = $scope.displayWord.slice(0, i).toLowerCase() + $scope.guessValue.letter.toLocaleLowerCase() + $scope.displayWord.slice(i + 1);
                correct = true;
            }
        }

        if (correct) {
            $scope.correctGuessesList.push($scope.guessValue.letter.toLowerCase());
        } else {
            $scope.guessesCount--;
            $scope.inCorrectGuessesList.push($scope.guessValue.letter.toLowerCase());
        }
        $scope.guessValue.letter = '';
        if ($scope.guessesCount === 0) {
            alert('Ohhh You Lost!!!')
            $timeout(function () {
                newGame();
            }, 200);
        }
        if ($scope.displayWord.indexOf('*') === -1) {
            alert('Yeah you Won!!!');
            $timeout(function () {
                newGame();
            }, 200);
        }
    }

    var newGame = function () {
        $scope.guessesCount;
        $scope.displayWord = '';
        $scope.correctGuessesList = [];
        $scope.inCorrectGuessesList = [];

        selectedWord = selectRandomWord();
        var tempWord = '';
        for (var i = 0; i < selectedWord.length; i++) {
            tempWord += '*';
        }
        $scope.displayWord = tempWord;
        $scope.guessesCount = selectedWord.length + 1;
    }

    var selectRandomWord = function () {
        var index = Math.round(Math.random() * hangmanList.length);
        return hangmanList[index];
    }

    newGame();
}]);
