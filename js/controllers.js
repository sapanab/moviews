angular.module('starter.controllers', [ 'myservices','ionic.rating','ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaGeolocation, MyServices, $location) {
    $scope.uname = $.jStorage.get("user");
    
    
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
    }, function(err) {
      // error
    });


  var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
  });


//  watch.clearWatch();
//  // OR
//  $cordovaGeolocation.clearWatch(watch)
//      .then(function(result) {
//      // success
//      }, function (error) {
//      // error
//    });
//    console.log($scope.location);
    
//    var logoutcallback=function(data,status) {
//        if(data=="false")
//        {
//            console.log("Logout Failed");
//        }
//        else
//        {
//            console.log("Logged Out");
//            $location.path("/landingpage");
//        }
//            
//    };
    $scope.signout=function(){
//        $.jStorage.flush();
//        MyServices.logout();
        $location.path("/landingpage");
    };
    
})

.controller('HomeCtrl', function($scope, $stateParams,MyServices,$location, $filter) {
    $scope.first = 1;
//    $scope.userdetails={watchcount:"50"};
    var onusersuccess=function(data,status) {
        $scope.userdetails=data;
        console.log("Length="+$scope.userdetails.watched.length);
        for(var i=0;i<$scope.userdetails.watched.length;i++)
        {
            $scope.userdetails.watched[i].dateofrelease=$filter('date')($scope.userdetails.watched[i].dateofrelease, "dd MMM yyyy");
            $scope.userdetails.watched[i].image=imgpath+$scope.userdetails.watched[i].image;
        }
        for(var i=0;i<$scope.userdetails.reviewed.length;i++)
        {
            $scope.userdetails.reviewed[i].dateofrelease=$filter('date')($scope.userdetails.reviewed[i].dateofrelease, "dd MMM yyyy");
            $scope.userdetails.reviewed[i].image=imgpath+$scope.userdetails.reviewed[i].image;
        }
        for(var i=0;i<$scope.userdetails.recommended.length;i++)
        {
            $scope.userdetails.recommended[i].dateofrelease=$filter('date')($scope.userdetails.recommended[i].dateofrelease, "dd MMM yyyy");
            $scope.userdetails.recommended[i].image=imgpath+$scope.userdetails.recommended[i].image;
        }
        for(var i=0;i<$scope.userdetails.ratings.length;i++)
        {
            $scope.userdetails.ratings[i].dateofrelease=$filter('date')($scope.userdetails.ratings[i].dateofrelease, "dd MMM yyyy");
            $scope.userdetails.ratings[i].image=imgpath+$scope.userdetails.ratings[i].image;
        }

        console.log($scope.userdetails);
    };
    
    if(!user)
    {
        $location.path("/login");
    }
    else
    {
        $scope.user=user;
    }
    
    MyServices.userdetails(onusersuccess);
})

.controller('ConnectCtrl', function($scope, $stateParams) {})
.controller('SearchCtrl', function($scope, $stateParams) {})

.controller('DetailCtrl', function($scope, $stateParams,MyServices,$location,$ionicPopup,$timeout,$window,$filter,$ionicModal) {
    
    $scope.first=1;
    $scope.second=2;
    $scope.movieid=$stateParams.id;
    console.log($scope.movieid);
    $scope.star=[];
    $scope.star1=[];
    $scope.nocomments=2;
    
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
    
    var detailscallback=function(data,status) {
        if(data=="false")
        {
            console.log(data);
            console.log("No Movie");
        }
        else
        {
            $scope.movie=data;
            console.log($scope.movie);
            $scope.releasedate = $filter('date')($scope.movie.description.dateofrelease, "dd MMM yyyy");
            console.log("Formatted Date="+$scope.releasedate);
            $scope.movie.description.image=imgpath+$scope.movie.description.image;
            //console.log($scope.movie.description.image);
            
            $scope.star1.rate=$window.Math.round(parseFloat($scope.movie.averageexpertrating));
            console.log("Rounded="+$scope.star1.rate);
            if($scope.movie.reviews.length==0)
                $scope.nocomments=1;
            else
                $scope.nocomments=0;
        }
            
    };
    MyServices.getmoviedetails($scope.movieid,detailscallback);
    
    var onusersuccess=function(data,status) {
        $scope.userdetails=data;
        console.log($scope.userdetails);
        console.log("Length="+$scope.userdetails.watched.length);
        
//        console.log("RLength="+$scope.userdetails.ratings.length);
        for(var i=0;i<$scope.userdetails.ratings.length;i++)
        {
            if($scope.userdetails.ratings[i].id==$scope.movieid)
            {
//                $scope.star.rate=$window.Math.round(parseFloat($scope.userdetails.ratings[i].rating));
                $scope.star.rate=$scope.userdetails.ratings[i].rating;
//                console.log("Rounded="+$scope.star.rate);
            }
        }
        
        
        if($scope.userdetails.watched==0)
            $scope.iswatched="0";
        
        for(var i=0;i<$scope.userdetails.watched.length;i++)
        {
            if($scope.userdetails.watched[i].id==$scope.movieid)
            {
                $scope.iswatched="1";
                break;
            }
            else
            {
                $scope.iswatched="0";
            }
        }
        console.log("iswatched="+$scope.iswatched);

    };
    MyServices.userdetails(onusersuccess);
    

    var commentscallback=function(data,status) {
        if(data=="false")
        {
            console.log(data);
            console.log("No Comments");
        }
        else
        {
            console.log("comments");
            $scope.comments=data;
            $scope.name=user.name;
            console.log($scope.comments);
            if($scope.comments.length==0)
                $scope.nocomments=1;
            else
                $scope.nocomments=0;
        }
            
    };
    MyServices.getusercomments(commentscallback);
    
    var ratingcallback=function(data,status) {
        if(data=="false")
        {
            console.log("Rating not saved");
        }
        else
        {
            //MyServices.getmoviedetails($scope.movieid,detailscallback);
            console.log("Rating Saved");
            var alertPopup = $ionicPopup.show({
                title: 'Your Rating is Saved. Thank You !!',
//                template: 'Login Successfull'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
        }
            
    };
    
    $scope.starrate=function(rate){
        $scope.star.rate=rate;
        console.log(rate);
        $scope.closeModal();
        MyServices.setuserrating($scope.movieid,rate,ratingcallback);
    }
    
    
    var setcommentscallback=function(data,status) {
        if(data=="0")
        {
            console.log(data);
            console.log("No Comments");
        }
        else
        {
            var alertPopup = $ionicPopup.show({
                title: 'Your comment is saved. Thank You !!',
//                template: 'Login Successfull'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
            MyServices.getusercomments(commentscallback);
            console.log("id");
            console.log($scope.comments);
        }
            
    };
    $scope.insertcomment=function(){
        console.log($scope.movie.comment);
        MyServices.setusercomments($scope.movieid,$scope.movie.comment,setcommentscallback);
        $scope.movie.comment="";
    };
    
    var setwatchedcallback=function(data,status) {
        console.log("in success");
        if(data=="0")
        {
            console.log("Not Saved in Watchedlist");
        }
        else
        {
            MyServices.userdetails(onusersuccess);
            MyServices.getmoviedetails($scope.movieid,detailscallback);
            console.log("Saved in Watchlist");
            var alertPopup = $ionicPopup.show({
                title: 'Added to your watchlist. Thank You !!',
//                template: 'Login Successfull'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
        }
            
    };
    $scope.setwatched=function(){
        MyServices.setuserwatch($scope.movieid,setwatchedcallback);
    };
    
    $scope.inwatch=function(){
    
        var alertPopup = $ionicPopup.show({
                title: 'Already in your watchlist.',
//                template: 'Login Successfull'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
    }
    
    var twittercallback=function(data,status) {
        if(data=="0")
        {
            console.log("Not feeds");
        }
        else
        {
            $scope.tweets=data;
            console.log("feeds");
            console.log($scope.tweets);
        }
            
    };
    MyServices.gettwitterfeeds($scope.movieid,twittercallback);
})

.controller('LoginCtrl', function($scope, $stateParams,MyServices,$location,$ionicPopup,$timeout) {

    $.jStorage.flush();
    
    var logincallback=function(data,status) {
        if(data=="false")
        {
            console.log(data);
            console.log("Login Failed");
            var alertPopup = $ionicPopup.show({
//                title: 'Login Successfull',
                template: 'Sorry ! Invalid Login Credentials'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
            
        }
        else
        {
            user=data;
            console.log(user);
            $.jStorage.set("user",data);
            var alertPopup = $ionicPopup.show({
//                title: 'Login Successfull',
                template: 'Login Successfull'
           });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
            $location.path("/app/featured");    
        }
            
    };
    
    $scope.onlogin=function(user) {
        MyServices.login(user,logincallback);
    };
    
})

.controller('SignupCtrl', function($scope, $stateParams,MyServices,$location) {

    var signupcallback=function(data,status) {
        if(data=="false")
        {
            console.log(data);
            console.log("Sign Up Failed");
        }
        else
        {
            console.log(data);
            $.jStorage.set("user",data);
            //$location.path("/login");
            console.log($.jStorage.get("user"));
            $location.path("/app/featured");
        }
            
    };
    
    $scope.onsignup=function(user1) {
        MyServices.signup(user1,signupcallback);
    };
})

.controller('WelcomeCtrl', function($scope, $stateParams) {})

.controller('LandingCtrl', function($scope, $stateParams,MyServices,$location) {

        $.jStorage.flush();
        console.log($.jStorage.get("user"));
        $location.path("/landingpage");
})

.controller('FeaturedCtrl', function($scope, $stateParams,MyServices,$location) {

    var onusersuccess=function(data,status) {
        $scope.userdetails=data;
        console.log($scope.userdetails);
    };
    MyServices.userdetails(onusersuccess);
    
    var featuredcallback=function(data,status) {
        if(data=="false")
        {
            console.log(data);
            console.log("No Movies");
        }
        else
        {
            $scope.intheatre=data;
//            console.log($scope.intheatre);
            for(var i=0;i<$scope.intheatre.theatresthisweek.length;i++)
            {
                $scope.intheatre.theatresthisweek[i].image=imgpath+$scope.intheatre.theatresthisweek[i].image;
            }
            console.log($scope.intheatre);
        }
            
    };
    MyServices.getmoviesintheatre(featuredcallback);
    
})
