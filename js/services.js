var adminbase = "http://moviewsapp.com/admin/";
//var adminbase = "http://localhost/moviebackend/";
//var adminbase = "http://wohlig.co.in/moviebackend/";
var adminurl = adminbase + "index.php/json/";
var imgpath = adminbase + "uploads/";
var myservices = angular.module('myservices', []);
var user = $.jStorage.get("user");

myservices.factory('MyServices', function ($http) {

    var returnval = {};

    returnval.userdetails = function (callback) {
            //        console.log("Demo");
            $http.get(adminurl + "userdetails?user=" + user.id).success(callback);
        },

        returnval.login = function (user, logincallback) {
            //        console.log("Demo");
            $http.get(adminurl + "login?email=" + user.email + "&password=" + user.password, {}).success(logincallback);
        },
        returnval.signup = function (user1, signupcallback) {
            //        console.log("Demo");
            $http.get(adminurl + "signup?name=" + user1.name + "&email=" + user1.email + "&password=" + user1.password, {}).success(signupcallback);
        },
        returnval.getmoviedetails = function (movieid, detailscallback) {
            //        console.log("Demo");
            $http.get(adminurl + "moviedetails?movie=" + movieid, {}).success(detailscallback);
        },
        returnval.getmoviesintheatre = function (featuredscallback) {
            //        console.log("Demo");
            $http.get(adminurl + "theatresthisweek", {}).success(featuredscallback);
        },
        returnval.getusercomments = function (movieid, commentscallback) {
            //        console.log(adminurl + "getsingleusercomment?id="+user.id);
            $http.get(adminurl + "getsingleusercomment?user=" + user.id + "&movie=" + movieid, {}).success(commentscallback);
        },
        returnval.setusercomments = function (movieid, comment, setcommentscallback) {
            //        console.log(adminurl + "usercomment?user="+user.id+"&movie="+movieid+"&comment="+comment);
            $http.get(adminurl + "usercomment?user=" + user.id + "&movie=" + movieid + "&comment=" + comment, {}).success(setcommentscallback);
        },
        returnval.setuserrating = function (movieid, rate, ratingcallback) {
            console.log("userrating?user=" + user.id + "&movie=" + movieid + "&rating=" + rate);
            $http.get(adminurl + "userrating?user=" + user.id + "&movie=" + movieid + "&rating=" + rate, {}).success(ratingcallback);
        },
        returnval.setuserwatch = function (movieid, setwatchedcallback) {
            //        console.log(adminurl + "usercomment?user="+user.id+"&movie="+movieid+"&comment="+comment);
            $http.get(adminurl + "watched?user=" + user.id + "&movie=" + movieid, {}).success(setwatchedcallback);
        },
        returnval.logout = function () {
            //        console.log(adminurl + "usercomment?user="+user.id+"&movie="+movieid+"&comment="+comment);
            $http.get(adminurl + "logout", {});
        },
        returnval.gettwitterfeeds = function (movieid, twittercallback) {
            //        console.log("twitterfeeds?movie="+movieid);
            $http.get(adminurl + "twitterfeeds?movie=" + movieid, {}).success(twittercallback);
        },
        returnval.getmoviesearch = function (moviekeyword, searchcallback) {
            //        console.log("twitterfeeds?movie="+movieid);
            $http.get(adminurl + "moviesearch?moviename=" + moviekeyword, {}).success(searchcallback);
        },
        returnval.getallavgrating = function (allavgsuccess) {
            //        console.log("twitterfeeds?movie="+movieid);
            $http.get(adminurl + "allavgrating", {}).success(allavgsuccess);
        };

    return returnval;
});