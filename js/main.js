var itemsManage = angular
    .module('itemsManage', [])
    .directive('ctrlEnterSubmit', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('keydown', function(event) {
                    if (event.keyCode === 13 && event.ctrlKey) {
                        scope.$apply(attrs.ctrlEnterSubmit);
                    }
                });
            }
        }
    })
    .controller('ItemsManageCtrl', function ($scope) {
        $scope.itemsList = {};
        $scope.itemName = '';
        $scope.itemComment = '';
        $scope.currentItem = '';
        $scope.currentComment = '';

        $scope.addItem = function () {
            if ($scope.itemName) {
                $scope.itemsList[$scope.itemName] = [];
            } else {
                toastr.error("Item name couldn't be empty!");
            }

            localStorage.setItem("items", JSON.stringify($scope.itemsList));

            $scope.itemName = '';
        };

        $scope.addComment = function () {
            if ($scope.itemComment) {
                $scope.itemsList[$scope.currentItem].push($scope.itemComment);
            } else {
                toastr.error("Comment couldn't be empty!");
            }

            localStorage.setItem("items", JSON.stringify($scope.itemsList));

            $scope.itemComment = '';
        };

        readFromLocalStorage = function () {
            let data = JSON.parse(localStorage.getItem('items')) || {};

            $scope.itemsList = data;
        };

        $scope.loadComments = function (item, $event) {
            $scope.currentComment = '';
                $scope.currentItem = item;

            $(".li_item").css("border-left", "4px solid transparent");
            let currentLi = angular.element($event.currentTarget).parent();
            currentLi.css("border-left", "4px solid red");

            $(".comments_panel").removeClass('visibility');

            for (key in $scope.itemsList) {
                if (key === item) {
                    $scope.commentsList = $scope.itemsList[key];
                }
            }
        };

        $scope.removeItem = function (item) {
            delete $scope.itemsList[item];
            localStorage.setItem("items", JSON.stringify($scope.itemsList));

            $(".comments_panel").addClass('visibility');
        };

        $scope.showCurrComment = function ($index, $event) {
            $scope.currentComment = $index+1;

            $(".comment_icon").css({"background-color": "#ff8a00", "transition": "background .4s"});
            let currentComm = angular.element($event.currentTarget).find('.comment_icon');
            currentComm.css({"background-color": "#47568c", "transition": "background .4s"});
        };

        readFromLocalStorage();
    });