angular
  .module("test", [])

  .controller("testctrl", function ($scope) {
    $scope.nbMails = 5;
    //0$scope.perso = require('./../sourcePerso/perso.json');

    $scope.plusUnMail = function () {
      $scope.nbMails++;
    };
  });
