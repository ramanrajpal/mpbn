// the app/scripts/main.js file, which defines our RequireJS config
require.config({
paths: {
angular: 'vendor/angular',
jquery: 'vendor/jquery-2.1.1',
twitter: 'vendor/bootstrap-3.2.0-dist',
domReady: 'vendor/domReady',
angularResource: 'vendor/angular-resource',
//highstocks:'vendor/highcharts',
highcharts:'vendor/highcharts',
'highcharts-ng':'vendor/highcharts-ng',
'highcharts-more':'vendor/highcharts-more',
'solid-gauge':'vendor/solid-gauge',
'ui.bootstrap':'vendor/ui-bootstrap-tpls-0.12.0',
/*'ui.bootstrap':'vendor/ui-bootstrap.min',
*/
angularCookie:'vendor/angular-cookies.min',
'ui.grid':'vendor/ui-grid-unstable',
//'ui.grid':'vendor/ui-grid.min',
'angular-animate':'vendor/angular-animate.min',
'angular-touch':'vendor/angular-touch.min'
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
//highchartsng:
 //       {
   //         deps:['highstocks']
     //   },

'highcharts-ng': {           // This allows users to only import highcharts 
               //   Define dependecies of the highchart-ng module here...angular, jquery and yes it depends upoin highcharts.js as well
            deps: ['angular','jquery','highcharts','highcharts-more','solid-gauge']
         },  

highcharts: {           // This allows users to only import highcharts 
               //   without theme or exporting module.
            deps: ['jquery']
         },
'highcharts-more': {           // This allows users to only import highcharts 
               //   without theme or exporting module.
            deps: ['jquery','highcharts']
         },
'solid-gauge': {
			deps: ['jquery','highcharts','highcharts-more']
			},
'ui.bootstrap': {
				 deps: ['angular','jquery']
         },
/*'ui.bootstrap': {
				 deps: ['angular','jquery']
         },

*/
angularCookie: { deps:['angular'] },
'ui.grid': { deps:['angular','jquery'] },
'angular-animate': { deps:['angular'] },
'angular-touch': { deps:['angular','jquery'] },
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
'services/getoidList',
'services/snmpgaugeget',
'services/snmpgauges',
'services/nodePortConfigFile',
'services/alertViewDetails',
'services/alertResourceService',
'services/updateAlertDetails',
'services/postAlertUpdateserv',
'services/configureAlertServ',
'services/configureAlertAction',
'controllers/Snmp_dials',
'controllers/Snmp_interfaces',
'controllers/CCCVCVC',
'services/plot_traceresource_serv',
'services/plot_trace_kpiservice',
'controllers/alertAddCtrl',
'controllers/testGridCtrl',
'controllers/mainMonitoringCtrl',
//'controllers/TestCtrl'
]);