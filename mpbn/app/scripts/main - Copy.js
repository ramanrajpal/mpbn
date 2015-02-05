// the app/scripts/main.js file, which defines our RequireJS config
require.config({
paths: {
angular: 'vendor/angular',
jquery: 'vendor/jquery-2.1.1',
twitter: 'vendor/bootstrap-3.2.0-dist',
domReady: 'vendor/domReady',
angularResource: 'vendor/angular-resource',
},
shim: {
'twitter/js/bootstrap': {
deps: ['jquery']
},
angular: {
deps: [ 'jquery','twitter/js/bootstrap'],
exports: 'angular'
},
angularResource: { deps:['angular'] },
}
});
require([
'app',
'bootstrap',
'services/services',
'services/myresourceserv',
'services/myfetchNames',
'services/myfetchAllNames',
'services/myextrafetchNames',
'controllers/controllers',
'controllers/NameCtrl',
'controllers/NameCtrlList',
'services/mynameallresourceserv',
'services/myfetchNamesdetails',
'services/mynamedetailsresourceserv',
'services/selectfetchAllDetails',
'services/selectnamedetailresourceserv',
'controllers/NameCtrlNew',
'services/selectfetchNamesid',
'services/selectnamedetailsresserv',
'services/snmpinterfaceresourceserv',
'services/snmpnodenameresourceserv',
'services/snmpinterfacedetails',
'services/snmpnodedetails',
'controllers/Snmp_Ctrl',
'services/snmpoidget',
'services/getoidList'


//'controllers/TestCtrl'
]);