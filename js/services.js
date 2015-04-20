var adminbase = "http://localhost/moviebackend/";
var adminurl=adminbase+"index.php/json/";
var myservices = angular.module('myservices', []);
var user=$.jStorage.get("user");

myservices.factory('MyServices', function ($http) {
  
    var returnval={};
    
    returnval.userdetails=function(callback) {
        console.log("Demo");
        $http.get(adminurl + "userdetails?user="+user.id).success(callback);
    },
        
        returnval.login=function(user,logincallback) {
        console.log("Demo");
        $http.get(adminurl + "login?email="+user.email+"&password="+user.password,{}).success(logincallback);
    };
   
    return returnval;
});
//
//
//myservices.login('MyServicess', function ($http) {
//  
//    var returnval={};
//    
//    returnval.login=function(email,password,callback) {
//        console.log("Demo");
//        $http.get(adminurl + "login?email="+email+"&password="+password).success(callback);
//    };
//   
//    return returnval;
//});