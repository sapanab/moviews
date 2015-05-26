angular.module('starter', ['ionic', 'starter.controllers', 'jagruticontroller'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
        app.initialize();
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $httpProvider.defaults.withCredentials = true;
    //$ionicConfigProvider.scrolling.jsScrolling(false);
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
                templateUrl: "templates/setting.html",
                controller: 'SettingsCtrl'
            }
        }
    })

    .state('app.edit', {
        url: "/edit",
        views: {
            'menuContent': {
                templateUrl: "templates/edit.html",
                controller: 'EditCtrl'
            }
        }
    })

    .state('app.terms', {
        url: "/terms",
        views: {
            'menuContent': {
                templateUrl: "templates/terms.html",
                controller: 'TermsCtrl'
            }
        }
    })

    .state('app.privacypolicy', {
        url: "/privacypolicy",
        views: {
            'menuContent': {
                templateUrl: "templates/privacypolicy.html",
                controller: 'PrivacyCtrl'
            }
        }
    })

    .state('app.changepassword', {
        url: "/changepassword",
        views: {
            'menuContent': {
                templateUrl: "templates/changepassword.html",
                controller: 'ChangepasswordCtrl'
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
    $urlRouterProvider.otherwise('/app/featured');
});