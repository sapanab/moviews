angular.module('starter.controllers', ['myservices', 'ionic.rating', 'ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $cordovaGeolocation, MyServices, $location) {
    $scope.uname = $.jStorage.get("user");
    $scope.ul = $.jStorage.get("userlocation");
    $scope.signout = function () {
        //        $.jStorage.flush();
        //        MyServices.logout();
        $location.path("/landingpage");
    };

})

.controller('HomeCtrl', function ($scope, $stateParams, MyServices, $location, $filter, $ionicLoading) {
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-light"></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.show();

    $scope.first = 1;
    //    $scope.userdetails={watchcount:"50"};

    $scope.myVar = false;
    $scope.toggle = function () {
        $scope.myVar = !$scope.myVar;
    }

    $scope.searchmovie = {};

    $scope.getsearchres = function (keyEvent) {
        if (keyEvent.which === 13) {
            console.log($scope.searchmovie.s);
            $.jStorage.set("searchmovie", $scope.searchmovie.s);
            $location.path("/app/search");
        }
    }

    var onusersuccess = function (data, status) {
        $scope.userdetails = data;
        console.log("Length=" + $scope.userdetails.watched.length);
        for (var i = 0; i < $scope.userdetails.watched.length; i++) {
            $scope.userdetails.watched[i].dateofrelease = $filter('date')($scope.userdetails.watched[i].dateofrelease, "dd MMM yyyy");
            $scope.userdetails.watched[i].image = imgpath + $scope.userdetails.watched[i].image;
        }
        for (var i = 0; i < $scope.userdetails.reviewed.length; i++) {
            $scope.userdetails.reviewed[i].dateofrelease = $filter('date')($scope.userdetails.reviewed[i].dateofrelease, "dd MMM yyyy");
            $scope.userdetails.reviewed[i].image = imgpath + $scope.userdetails.reviewed[i].image;
        }
        for (var i = 0; i < $scope.userdetails.comment.length; i++) {

            $scope.userdetails.comment[i].image = imgpath + $scope.userdetails.comment[i].image;
        }
        for (var i = 0; i < $scope.userdetails.recommended.length; i++) {
            $scope.userdetails.recommended[i].dateofrelease = $filter('date')($scope.userdetails.recommended[i].dateofrelease, "dd MMM yyyy");
            $scope.userdetails.recommended[i].image = imgpath + $scope.userdetails.recommended[i].image;
        }
        for (var i = 0; i < $scope.userdetails.ratings.length; i++) {
            $scope.userdetails.ratings[i].dateofrelease = $filter('date')($scope.userdetails.ratings[i].dateofrelease, "dd MMM yyyy");
            $scope.userdetails.ratings[i].image = imgpath + $scope.userdetails.ratings[i].image;
        }
        console.log("Comment Length=" + $scope.userdetails.comment.length);
        for (var i = 0; i < $scope.userdetails.comment.length; i++) {
            var scope = this;
            scope.firstdate = $filter('date')($scope.userdetails.comment[i].timestamp, 'dd/MM/yyyy');
            console.log("firstdate=" + firstdate)
            scope.sdate = new Date();
            scope.seconddate = $filter('date')(sdate, 'dd/MM/yyyy');
            console.log("seconddate=" + seconddate);
            scope.data_before = [];
            var dt1 = scope.firstdate.split('/'),
                dt2 = scope.seconddate.split('/'),
                one = new Date(dt1[2], dt1[1] - 1, dt1[0]),
                two = new Date(dt2[2], dt2[1] - 1, dt2[0]);

            var millisecondsPerDay = 1000 * 60 * 60 * 24;
            var millisBetween = two.getTime() - one.getTime();
            var days = millisBetween / millisecondsPerDay;
            if (days == 0)
                days = "Today";
            else
                days = days + "d";
            $scope.userdetails.comment[i].timestamp = days;
        }

        console.log($scope.userdetails);
        $scope.hide();
    };

    if (!user) {
        $location.path("/login");
    } else {
        $scope.user = user;
    }

    MyServices.userdetails(onusersuccess);

    var scope = this;
    scope.firstdate = '01/01/2013';
    scope.seconddate = '10/01/2013';
    scope.data_before = [];
    scope.differenceInDays = function () {

        var dt1 = scope.firstdate.split('/'),
            dt2 = scope.seconddate.split('/'),
            one = new Date(dt1[2], dt1[1] - 1, dt1[0]),
            two = new Date(dt2[2], dt2[1] - 1, dt2[0]);

        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = millisBetween / millisecondsPerDay;

        return Math.floor(days);
    };

})

.controller('ConnectCtrl', function ($scope, $stateParams) {})
    .controller('EditCtrl', function ($scope, $stateParams) {})
    .controller('TermsCtrl', function ($scope, $stateParams) {})
    .controller('PrivacyCtrl', function ($scope, $stateParams) {})
    .controller('ChangepasswordCtrl', function ($scope, $stateParams) {})
    .controller('SearchCtrl', function ($scope, $stateParams, MyServices, $ionicLoading) {

        $scope.show = function () {
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-light"></ion-spinner>'
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide();
        };
        $scope.show();
        var onusersuccess = function (data, status) {
            $scope.userdetails = data;
        };
        MyServices.userdetails(onusersuccess);

        $scope.search = $.jStorage.get("searchmovie");
        console.log("In search=" + $scope.search);

        var searchcallback = function (data, status) {
            if (data == "false") {
                console.log(data);
                console.log("No Movie");
            } else {
                $scope.movieres = data;
                if ($scope.movieres.moviesearch.length == 0) {
                    $scope.nomovies = 1;
                } else {
                    $scope.nomovies = 0;
                }
                for (var i = 0; i < $scope.movieres.moviesearch.length; i++) {
                    $scope.movieres.moviesearch[i].image = imgpath + $scope.movieres.moviesearch[i].image;
                }
                console.log($scope.movieres);
                $scope.hide();
            }

        };
        MyServices.getmoviesearch($scope.search, searchcallback);
    })


.controller('DetailCtrl', function ($scope, $stateParams, MyServices, $location, $ionicPopup, $timeout, $window, $filter, $ionicModal, $ionicLoading) {

    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-light"></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };

    $scope.show();
    $scope.first = 1;
    $scope.second = 1;
    $scope.movieid = $stateParams.id;
    console.log($scope.movieid);
    $scope.star = [];
    $scope.star1 = [];
    $scope.nocomments = 2;
    var comcount = false;

    $ionicModal.fromTemplateUrl('templates/rating.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function () {
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $ionicModal.fromTemplateUrl('templates/fbfriends.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modalfb) {
        $scope.modalfb = modalfb;
    });

    $scope.openeditfb = function () {
        $scope.modalfb.show();
    };

    $scope.closeModalfb = function () {
        $scope.modalfb.hide();
    };

    var detailscallback = function (data, status) {
        if (data == "false") {
            console.log(data);
            console.log("No Movie");
        } else {
            $scope.movie = data;
            console.log($scope.movie);
            $scope.releasedate = $filter('date')($scope.movie.description.dateofrelease, "dd MMM yyyy");
            console.log("Formatted Date=" + $scope.releasedate);
            $scope.movie.description.image = imgpath + $scope.movie.description.image;
            //console.log($scope.movie.description.image);

            $scope.star1.rate = $window.Math.round(parseFloat($scope.movie.averageexpertrating));
            console.log("Rounded=" + $scope.star1.rate);
            $scope.hide();
        }

    };
    MyServices.getmoviedetails($scope.movieid, detailscallback);

    var onusersuccess = function (data, status) {
        $scope.userdetails = data;
        console.log($scope.userdetails);
        console.log("Length=" + $scope.userdetails.watched.length);

        //        console.log("RLength="+$scope.userdetails.ratings.length);
        for (var i = 0; i < $scope.userdetails.ratings.length; i++) {
            if ($scope.userdetails.ratings[i].id == $scope.movieid) {
                //                $scope.star.rate=$window.Math.round(parseFloat($scope.userdetails.ratings[i].rating));
                $scope.star.rate = $scope.userdetails.ratings[i].rating;
                //                console.log("Rounded="+$scope.star.rate);
            }
        }


        if ($scope.userdetails.watched == 0)
            $scope.iswatched = "0";

        for (var i = 0; i < $scope.userdetails.watched.length; i++) {
            if ($scope.userdetails.watched[i].id == $scope.movieid) {
                $scope.iswatched = "1";
                break;
            } else {
                $scope.iswatched = "0";
            }
        }
        console.log("iswatched=" + $scope.iswatched);

    };
    MyServices.userdetails(onusersuccess);


    var commentscallback = function (data, status) {
        if (data == "false") {
            console.log(data);
            console.log("No Comments");
        } else {
            $scope.comments = data;
            $scope.name = user.name;
            console.log("Comment Length=" + $scope.comments.usercomment.length);
            for(var i = 0; i < $scope.comments.usercomment.length; i++)
            {
                if($scope.comments.usercomment.movie==$scope.movieid)
                {
                    $scope.nocomments=0;
                    break;
                }
            }
            for (var i = 0; i < $scope.comments.usercomment.length; i++) {
                var scope = this;
                scope.firstdate = $filter('date')($scope.comments.usercomment[i].timestamp, 'dd/MM/yyyy');
                console.log("firstdate=" + firstdate)
                scope.sdate = new Date();
                scope.seconddate = $filter('date')(sdate, 'dd/MM/yyyy');
                console.log("seconddate=" + seconddate);
                scope.data_before = [];
                var dt1 = scope.firstdate.split('/'),
                    dt2 = scope.seconddate.split('/'),
                    one = new Date(dt1[2], dt1[1] - 1, dt1[0]),
                    two = new Date(dt2[2], dt2[1] - 1, dt2[0]);

                var millisecondsPerDay = 1000 * 60 * 60 * 24;
                var millisBetween = two.getTime() - one.getTime();
                var days = millisBetween / millisecondsPerDay;
                if (days == 0)
                    days = "Today";
                else
                    days = days + "d";
                $scope.comments.usercomment[i].timestamp = days;
            }
            console.log($scope.comments);
        }


    };
    MyServices.getusercomments($scope.movieid,commentscallback);

    var ratingcallback = function (data, status) {
        if (data == "false") {
            console.log("Rating not saved");
        } else {
            //MyServices.getmoviedetails($scope.movieid,detailscallback);
            console.log("Rating Saved");
            var alertPopup = $ionicPopup.show({
                title: 'Cheers!',
            });
            $timeout(function () {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        }

    };

    $scope.starrate = function (rate) {
        $scope.star.rate = rate;
        console.log(rate);
        $scope.closeModal();
        MyServices.setuserrating($scope.movieid, rate, ratingcallback);
    }


    var setcommentscallback = function (data, status) {
        if (data == "0") {
            console.log(data);
            console.log("No Comments");
        } else {
            var alertPopup = $ionicPopup.show({
                title: 'ahh.. Thanks!',
                //                template: 'Login Successfull'
            });
            $timeout(function () {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
            MyServices.getusercomments($scope.movieid,commentscallback);
        }

    };
    $scope.insertcomment = function () {
        $scope.nocomments=0;
        MyServices.setusercomments($scope.movieid, $scope.movie.comment, setcommentscallback);
        $scope.movie.comment = "";
    };

    var setwatchedcallback = function (data, status) {
        console.log("in success");
        if (data == "0") {
            console.log("Not Saved in Watchedlist");
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.show({
                title: "Not saved in your 'watched' movie history in your profile!",
                //                template: 'Login Successfull'
            });
            $timeout(function () {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        } else {
            MyServices.userdetails(onusersuccess);
            MyServices.getmoviedetails($scope.movieid, detailscallback);
            console.log("Saved in Watchlist");
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.show({
                title: "Saved in your 'watched' movie history in your profile!",
                //                template: 'Login Successfull'
            });
            $timeout(function () {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        }

    };
    $scope.setwatched = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-light"></ion-spinner>'
        });
        MyServices.setuserwatch($scope.movieid, setwatchedcallback);
    };

    $scope.share = function () {
        //window.plugins.socialsharing.share('I recommend to use Moviews.')
    };

    $scope.inwatch = function () {

        var alertPopup = $ionicPopup.show({
            title: "You've already added this movie!",
            //                template: 'Login Successfull'
        });
        $timeout(function () {
            alertPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
    }

    var twittercallback = function (data, status) {
        if (data == "0") {
            console.log("Not feeds");
        } else {
            $scope.tweets = data;
            //            console.log("Tweets Length="+$scope.tweets.statuses.length);
            //            for(var i=0; i<$scope.tweets.statuses.length; i++)
            //            {
            //                var scope = this;
            //                scope.firstdate = $filter('date')($scope.tweets.statuses[i].created_at, 'dd/MM/yyyy');
            //                console.log("firstdate="+firstdate)
            //                scope.sdate = new Date();
            //                scope.seconddate = $filter('date')(sdate, 'dd/MM/yyyy');
            ////                console.log("seconddate="+seconddate);
            //                scope.data_before = [];
            //                var dt1 = scope.firstdate.split('/'),
            //                    dt2 = scope.seconddate.split('/'),
            //                    one = new Date(dt1[2], dt1[1]-1, dt1[0]),
            //                    two = new Date(dt2[2], dt2[1]-1, dt2[0]);
            //
            //                var millisecondsPerDay = 1000 * 60 * 60 * 24;
            //                var millisBetween = two.getTime() - one.getTime();
            //                var days = millisBetween / millisecondsPerDay;
            //                if(days==0)
            //                    days="Today";
            //                else
            //                    days=days+"d";
            //                $scope.tweets.statuses[i].created_at=days;
            //            }
            console.log("feeds");
            console.log($scope.tweets);
        }

    };
    MyServices.gettwitterfeeds($scope.movieid, twittercallback);
})

.controller('LoginCtrl', function ($scope, $stateParams, MyServices, $location, $ionicPopup, $timeout, $ionicLoading) {

    $.jStorage.flush();

    var logincallback = function (data, status) {
        if (data == "false") {
            console.log(data);
            console.log("Login Failed");
            var alertPopup = $ionicPopup.show({
                //                title: 'Login Successfull',
                template: 'Sorry ! Invalid Login Credentials'
            });
            $timeout(function () {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);

        } else {
            user = data;
            console.log(user);
            $.jStorage.set("user", data);
            $location.path("/app/featured");
        }

    };

    $scope.onlogin = function (user) {
        MyServices.login(user, logincallback);
    };

})

.controller('SignupCtrl', function ($scope, $stateParams, MyServices, $location) {

    var signupcallback = function (data, status) {
        if (data == "false") {
            console.log(data);
            console.log("Sign Up Failed");
        } else {
            console.log(data);
            $.jStorage.set("user", data);
            //$location.path("/login");
            console.log($.jStorage.get("user"));
            $location.path("/app/featured");
        }

    };

    $scope.onsignup = function (user1) {
        MyServices.signup(user1, signupcallback);
    };
})

.controller('WelcomeCtrl', function ($scope, $stateParams) {})

.controller('LandingCtrl', function ($scope, $stateParams, MyServices, $location) {

    $.jStorage.flush();
    console.log($.jStorage.get("user"));
    $location.path("/landingpage");
})

.controller('FeaturedCtrl', function ($scope, $stateParams, MyServices, $window, $location, $ionicLoading, $ionicPopup, $timeout) {

        $scope.show = function () {
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-light"></ion-spinner>'
            });
        };

        if (!user) {
            $location.path("/landingpage");
        }

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show();

        $scope.myVar = false;
        $scope.toggle = function () {
            $scope.myVar = !$scope.myVar;
        }
        var onusersuccess = function (data, status) {
            $scope.userdetails = data;
            $.jStorage.set("userlocation", $scope.userdetails.userdetails);
            console.log($scope.userdetails);
        };
        MyServices.userdetails(onusersuccess);

        var featuredcallback = function (data, status) {
            if (data == "false") {
                console.log(data);
                console.log("No Movies");
            } else {
                $scope.intheatre = data;
                //            console.log($scope.intheatre);
                for (var i = 0; i < $scope.intheatre.theatresthisweek.length; i++) {
                    if ($scope.intheatre.theatresthisweek.isfeatured == "1") {
                        $scope.featuredcount = 1;
                    }
                }
                for (var i = 0; i < $scope.intheatre.theatresthisweek.length; i++) {
                    $scope.intheatre.theatresthisweek[i].image = imgpath + $scope.intheatre.theatresthisweek[i].image;
                }
                console.log($scope.intheatre);
                $scope.hide();
            }

        };
        MyServices.getmoviesintheatre(featuredcallback);

        var allavgsuccess = function (data, status) {
            for (var i = 0; i < data.allavgrating.length; i++) {
                data.allavgrating[i].avg = $window.Math.round(parseFloat(data.allavgrating[i].avg));
            }
            $scope.avgrate = data;
            console.log($scope.avgrate);
        }
        MyServices.getallavgrating(allavgsuccess);

        $scope.searchmovie = {};

        $scope.getsearchres = function (keyEvent) {
            if (keyEvent.which === 13) {
                console.log($scope.searchmovie.s);
                $.jStorage.set("searchmovie", $scope.searchmovie.s);
                $location.path("/app/search");
            }
        }
        var setwatchedcallback = function (data, status) {
            console.log("in success");
            if (data == "0") {
                console.log("Not Saved in Watchedlist");
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.show({
                    title: "Not saved in your 'watched' movie history in your profile!",
                    //                template: 'Login Successfull'
                });
                $timeout(function () {
                    alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
            } else {
                MyServices.userdetails(onusersuccess);
                console.log("Saved in Watchlist");
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.show({
                    title: "Saved in your 'watched' movie history in your profile!",
                    //                template: 'Login Successfull'
                });
                $timeout(function () {
                    alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
            }

        };
        $scope.setwatched = function (movieid) {
            console.log(movieid);
            MyServices.setuserwatch(movieid, setwatchedcallback);
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-light"></ion-spinner>'
            });
        };
        $scope.inwatch = function () {

            var alertPopup = $ionicPopup.show({
                title: "You've already added this movie!",
                //                template: 'Login Successfull'
            });
            $timeout(function () {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        }
    })
    .controller('SettingsCtrl', function ($scope, $stateParams) {
        $scope.uname = $.jStorage.get("user");
    })