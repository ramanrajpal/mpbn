// The app/scripts/app.js file, which defines our AngularJS app
define(['angular', 'angularResource','angularCookie','highcharts-ng','ui.bootstrap','ui.grid','exporting','controllers/controllers','services/services'], function (angular) {
var p = angular.module('testMe', ['ngResource','ngCookies','highcharts-ng','ui.bootstrap','ui.grid','ui.grid.selection','ui.grid.exporter','ui.grid.moveColumns','ui.grid.pagination','ui.grid.resizeColumns','ui.grid.edit','controllers', 'services']);
console.log('kkkkkkkkkkkkkkkkkkkkkkk');
return p;
});