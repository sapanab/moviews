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
    
    var logoutcallback=function(data,status) {
        if(data=="false")
        {
            console.log("Logout Failed");
        }
        else
        {
            console.log("Logged Out");
            $location.path("/landingpage");
        }
            
    };
    $scope.signout=function(){
        MyServices.logout(logoutcallback);
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

.controller('DetailCtrl', function($scope, $stateParams,MyServices,$location,$ionicPopup,$timeout,$window,$filter) {
    $scope.first=1;
    $scope.second=2;
    $scope.movieid=$stateParams.id;
    console.log($scope.movieid);
    $scope.star=[];
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
            $scope.star.rate=$window.Math.round(parseFloat($scope.movie.averagerating));
            console.log("Rounded="+$scope.star.rate);
        }
            
    };
    MyServices.getmoviedetails($scope.movieid,detailscallback);
    
    var onusersuccess=function(data,status) {
        $scope.userdetails=data;
        console.log($scope.userdetails);
        console.log("Length="+$scope.userdetails.watched.length);
        
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
            console.log("Rating Saved");
        }
            
    };
    
    $scope.starrate=function(rate){
        $scope.star.rate=rate;
        $scope.closepopup();
        MyServices.setuserrating($scope.movieid,rate,ratingcallback);
        MyServices.getmoviedetails($scope.movieid,detailscallback);
    }
    
    $scope.showPopup = function() {
    $scope.data = {}

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    templateUrl: 'templates/rating.html',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
     
    ]
  });
       $scope.closepopup=function(){
           myPopup.close();
       }
    myPopup.then(function(res) {
    console.log('Tapped!', res);
  });
  
 };
    
    var setcommentscallback=function(data,status) {
        if(data=="0")
        {
            console.log(data);
            console.log("No Comments");
        }
        else
        {
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
        if(data=="0")
        {
            console.log("Not Saved in Watchedlist");
        }
        else
        {
            console.log("Saved in Watchlist");
        }
            
    };
    $scope.setwatched=function(){
        MyServices.setuserwatch($scope.movieid,setwatchedcallback);
        MyServices.getmoviedetails($scope.movieid,detailscallback);
    };
})

.controller('LoginCtrl', function($scope, $stateParams,MyServices,$location) {

    $.jStorage.flush();
    
    var logincallback=function(data,status) {
        if(data=="false")
        {
            console.log(data);
            console.log("Login Failed");
        }
        else
        {
            user=data;
            console.log(user);
            $.jStorage.set("user",data);
//            var myPopup = $ionicPopup.show({
//                templateUrl: 'templates/rating.html',
//                scope: $scope,
//            });
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
            console.log($scope.intheatre);
//            $location.path("/login");
        }
            
    };
    MyServices.getmoviesintheatre(featuredcallback);
    
})
