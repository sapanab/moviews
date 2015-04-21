angular.module('starter.controllers', ['myservices'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function($scope, $stateParams,MyServices,$location) {
    $scope.first = 1;
//    $scope.userdetails={watchcount:"50"};
    var onusersuccess=function(data,status) {
        $scope.userdetails=data;
        console.log(data);
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

.controller('DetailCtrl', function($scope, $stateParams,MyServices,$location,$ionicPopup) {
    $scope.movieid=$stateParams.id;
    console.log($scope.movieid);
    
    var detailscallback=function(data,status) {
        if(data=="false")
        {
            console.log(data);
            console.log("No Movie");
        }
        else
        {
            $scope.movie=data;
//            $location.path("/app/home");
            console.log($scope.movie);
        }
            
    };
    MyServices.getmoviedetails($scope.movieid,detailscallback);
//    $scope.onmovie=function(movieid) {
//        MyServices.getmoviedetails(movieid,detailscallback);
//    };
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
  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });
  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
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
            $location.path("/login");
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
