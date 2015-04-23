var adminbase = "http://localhost/moviebackend/";
var adminurl=adminbase+"index.php/json/";
var myservices = angular.module('myservices', []);
var user=$.jStorage.get("user");

myservices.factory('MyServices', function ($http) {
  
    var returnval={};
    
    returnval.userdetails=function(callback) {
//        console.log("Demo");
        $http.get(adminurl + "userdetails?user="+user.id).success(callback);
    },
        
        returnval.login=function(user,logincallback) {
//        console.log("Demo");
        $http.get(adminurl + "login?email="+user.email+"&password="+user.password,{}).success(logincallback);
    },
        returnval.signup=function(user1,signupcallback) {
//        console.log("Demo");
        $http.get(adminurl + "signup?name="+user1.name+"&email="+user1.email+"&password="+user1.password,{}).success(signupcallback);
    },
        returnval.getmoviedetails=function(movieid,detailscallback) {
//        console.log("Demo");
        $http.get(adminurl + "moviedetails?movie="+movieid,{}).success(detailscallback);
    },
        returnval.getmoviesintheatre=function(featuredscallback) {
//        console.log("Demo");
        $http.get(adminurl + "theatresthisweek",{}).success(featuredscallback);
    },
        returnval.getusercomments=function(commentscallback) {
//        console.log(adminurl + "getsingleusercomment?id="+user.id);
        $http.get(adminurl + "getsingleusercomment?user="+user.id,{}).success(commentscallback);
    };
   
    return returnval;
});
