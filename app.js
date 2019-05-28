var myApp = angular.module('AngJSApp', ['ui.bootstrap']);



myApp.directive('disableRightClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('contextmenu', function (e) {
                e.preventDefault();
            })
        }
    }
});

myApp.constant('config', {  
appName: 'HangMan',  
appVersion: '1.5'  
});

myApp.controller('HangManCtrl', ['$scope', '$timeout', '$uibModal','config', function ($scope, $timeout, $uibModal,config) {
    $scope.ApplicationName = config.appName;
    $scope.Version = config.appVersion; 
    $scope.guessesCount;
    $scope.displayWord = '';
    $scope.correctGuessesList = [];
    $scope.inCorrectGuessesList = [];
    $scope.guessValue = {
        letter: ''
    };
    var selectedWord = '';
    $scope.title = 'HangMan Game';
    var hangmanList = ['cat', 'mat', 'rat', 'tea', 'max', 'min'];


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
            Swal.fire({
                title: 'Ohhh You Lost!!!',
                width: 600,
                padding: '3em',
                background: '#fff url(images/trees.png)',
                backdrop: `
    rgba(0,0,123,0.4)
    url("images/nyan-cat.gif")
    center left
    no-repeat
  `
            });
            $timeout(function () {
                newGame();
            }, 200);
        }
        if ($scope.displayWord.indexOf('*') === -1) {
            // alert('Yeah you Won!!!');
            Swal.fire({
                title: 'Yeah you Won!!!',
                width: 600,
                padding: '3em',
                background: '#fff url(images/trees.png)',
                backdrop: `
    rgba(0,0,123,0.4)
    url("images/nyan-cat.gif")
    center left
    no-repeat
  `
            });
            $timeout(function () {
                newGame();
            }, 200);
        }
        angular.element("#letter").focus();
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

    $scope.getkeys = function (e) {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            if ($scope.guessValue.letter.length > 1) {
                $scope.guessValue.letter = $scope.guessValue.letter[0];
            }
        }
        else {
            $scope.guessValue.letter='';
        }
    }

    newGame();
}]);
