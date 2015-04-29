// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'jagruticontroller'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $httpProvider.defaults.withCredentials = true;
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.details', {
        url: "/details/:id",
        views: {
            'menuContent': {
                templateUrl: "templates/details.html",
                controller: 'DetailCtrl'
            }
        }
    })
        
    .state('app.search', {
        url: "/search",
        views: {
            'menuContent': {
                templateUrl: "templates/search.html",
                controller: 'SearchCtrl'
            }
        }
    })

    .state('app.setting', {
        url: "/setting",
        views: {
            'menuContent': {
                templateUrl: "templates/setting.html"
            }
        }
    })

    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            }
        }
    })


    .state('app.featured', {
        url: "/featured",
        views: {
            'menuContent': {
                templateUrl: "templates/featured.html",
                controller: 'FeaturedCtrl'
            }
        }
    })
    
    .state('app.rating', {
        url: "/rating",
        views: {
            'menuContent': {
                templateUrl: "templates/rating.html",
                controller: 'DetailCtrl'
            }
        }
    })

    /**** static pages****/
    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
    })

    .state('signup', {
        url: "/signup",
        templateUrl: "templates/signup.html",
        controller: 'SignupCtrl'
    })

    .state('welcome', {
        url: "/welcomescreen",
        templateUrl: "templates/welcomescreen.html",
        controller: 'WelcomeCtrl'
    })

    .state('landing', {
        url: "/landingpage",
        templateUrl: "templates/landingpage.html",
        controller: 'LandingCtrl'
    })


    .state('connect', {
        url: "/connect",
        templateUrl: "templates/connect.html",
        controller: 'ConnectCtrl'
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/landingpage');
});