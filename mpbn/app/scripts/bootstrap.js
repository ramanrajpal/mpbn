// The app/scripts/bootstrap.js file which tells AngularJS
// to go ahead and bootstrap when the DOM is loaded
define(['angular', 'domReady','app'], function(angular, domReady) {
domReady(function() {
angular.bootstrap(document, ['testMe']);
});
});