define(['controllers/controllers'], function(controllers) {
controllers.controller('testGridCtrl',['$scope', '$cookies', 'uiGridConstants','alertViewDetails', 'updateAlertDetails', function($scope,$cookies,uiGridConstants,alertViewDetails,updateAlertDetails) {
console.log("loading $$$$$$$$$$$$$$$ contoller-------------------");
//get the details from the DB
/*
alertViewDetails.getAllAlerts().then(function (response) {
$scope.myData = response;
});
*/
var obj = {
ID:323233,
Severity:"Major",
NodeName:"zmpd02",
"Alarm Description":"Hello World I am here as an alert to check upon the regular lives how they look when they are mundane",
"Alarm IN Time": "2014-01-10 23:11:33",
"Alarm Count": 3,
"Alarm Status": "Active"
};
var obj1 = {
ID:323233,
Severity:"Minor",
NodeName:"zmpd02",
"Alarm Description":"Hello World I am here as an alert to check upon the regular lives how they look when they are mundane",
"Alarm IN Time": "2014-01-14 23:11:33",
"Alarm Count": 3,
"Alarm Status": "Active"
};
$scope.myData = [obj,obj1,obj];
//$scope.myData = response;
// $scope.mySelections = [];
//$scope.gridOptions = { data: 'myData' };
//$scope.gridOptions.data = myData;
var rowtpl='<div ng-class="{\'minor\':row.entity.Severity==\'Minor\', \'major\':row.entity.Severity==\'Major\' }"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';
$scope.choices = ["Active","Acknowledge"];
$scope.gridOptions = {
data: 'myData',
//selectedItems: $scope.mySelections,
//enableRowHeaderSelection: false,
//enableCellEdit: false,
//enableRowSelection: true,
//enableCellEditOnFocus:true,
//enableSelectAll: true,
rowHeight: 80,
headerRowHeight: 30,
showFooter: true,
enablePinning: true,
enableColumnResize:true,
multiSelect: true,
enableHighlighting: true,

/*
afterSelectionChange: function (row, event) {
                console.log("Event: " + event);
                console.log("Row: " + row.rowIndex);
            },
			*/
selectWithCheckboxOnly: true,
showSelectionCheckbox: true,
enableFiltering: true,
exporterMenuCsv: true,
enableGridMenu: true,
rowTemplate:rowtpl,
enablePaginationControls: false,
cellEditableCondition:true,
paginationPageSize: 3,
columnDefs: [
// default
{ field: 'ID', enableFiltering: false,
width: '10%',
},
{ field: 'Severity',
width: '10%',
//enableFiltering: false,
/*
filters: [
{
condition: uiGridConstants.filter.GREATER_THAN,
placeholder: 'greater than'
},
{
condition: uiGridConstants.filter.LESS_THAN,
placeholder: 'less than'
}
]
*/
},
{ field: 'Alarm Status',
enableCellEdit:true,
enableFiltering: false,
width: '20%',
editType: 'dropdown',
//cellTemplate:"<div>{{row.getProperty(col.field)}}</div>",
editableCellTemplate:'<div> <select ui-grid-edit-dropdown ng-class="\'colt\' + col.index" ng-model="MODEL_COL_FIELD"><option value="Acknowledge">Acknowledge</option><option value="Active">Active</option></select></div>'
},
{field: 'NodeName',
width: '10%',
//enableFiltering: false,
},
/*
{	
                field: 'Check',
                width: '5%',
				enableFiltering: false,
				enableCellEdit:false,
                cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-model="MODEL_COL_FIELD" ng-checked="row.selected" /></div>'
            },
		*/	
{ field: "Alarm Description", enableFiltering: false,
width: '30%',
field: "Alarm Description",
cellEditableCondition:false,
},
{ field: "Alarm IN Time", enableFiltering: false,
width: '15%',
sortFn: function (aDate, bDate) {
           //debugger;
           var a=new Date(aDate);
           var b=new Date(bDate);
		    if (a < b) {
             return -1;
           }
           else if (a > b) {
             return 1;
           }
		   }
},
{ field: 'Alarm Count',
width: '10%',
enableFiltering: false,
/*
filters: [
{
condition: uiGridConstants.filter.GREATER_THAN,
placeholder: 'greater than'
},
{
condition: uiGridConstants.filter.LESS_THAN,
placeholder: 'less than'
}
*/
},


// multiple filters
/*
{ field: 'age', 
 cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {

// console.log("this is the row: " + row.entity.name + "rowrendederindex: "+ colContainer);
 /*
if (grid.getCellValue(row,col) > 30) {
return 'blue';
}

},
filters: [
{
condition: uiGridConstants.filter.GREATER_THAN,
placeholder: 'greater than'
},
{
condition: uiGridConstants.filter.LESS_THAN,
placeholder: 'less than'
}
]}
*/

],

};
$scope.update_alarmStatus = function () {
console.log("HIIIIIII");
//iterate over all the selected rows here and fetch the values of the ALERT ID  and the alert status selected.
	var post_reqObject = {};
	var selectedRows = $scope.gridApi.selection.getSelectedGridRows();
	for(var t = 0;t< selectedRows.length;t++) {
		console.log(  selectedRows[t].entity["Alarm Status"]);
		post_reqObject[selectedRows[t].entity.ID] = selectedRows[t].entity["Alarm Status"];
		//post_reqObject["ID"] = selectedRows[t].entity.ID;
		}
	//test the post_reqObject
	for (var key in post_reqObject) {
		console.log("this is the key: " + key + " value is : " + post_reqObject[key]);
		}
	//uodate the object into the DB here--
	updateAlertDetails.postAlert(post_reqObject);
};
$scope.gridOptions.onRegisterApi = function (gridApi) {
$scope.gridApi2 = gridApi;
 $scope.gridApi = gridApi;

gridApi.selection.on.rowSelectionChanged($scope,function(row){
    //var msg = 'row selected ' + row.isSelected;
	/*if (row.isSelected) {
	
	//row.grid.options.cellEditableCondition = true;
	row.grid.options.columnDefs[3].cellEditableCondition = true;
	//row.grid.options.enableCellEditOnFocus = true;

	} else {
	//row.grid.options.cellEditableCondition = false;
	row.grid.options.columnDefs[3].cellEditableCondition = false;
	//row.grid.options.enableCellEditOnFocus = false;

	
	}
	//console.log(row.rowIndex);
    console.log(row);
	row.grid.selection[selectedCount]
	*/
	//disable all rows first and then enable them
	/*
	for (var t = 0;t<row.grid.options.selectedItems.length;t++) {
		//if (row.grid.rows[t].isSelected) {
			//set the cell enable edition here
			console.log("yeeyyeyeyey");
			console.log(row);
			row.grid.rows[t].grid.options.cellEditableCondition = true;
			row.grid.rows[t].grid.options.columnDefs[3].cellEditableCondition = true;
			console.log(row);
			//} else 
			//}
		}
		*/
		
		for(var t = 0;t<gridApi.selection.getSelectedGridRows().length;t++) {
		/*for(var p in gridApi.selection.getSelectedGridRows()[t]) {
			console.log(gridApi.selection.getSelectedGridRows()[t]);
			}
		*/	
			
			console.log(gridApi.selection.getSelectedGridRows()[t]);
			gridApi.selection.getSelectedGridRows()[t].grid.options.cellEditableCondition = true;
			gridApi.selection.getSelectedGridRows()[t].grid.options.columnDefs[3].cellEditableCondition = true;
			}
		console.log(gridApi);
	
});


} 


}]);
});;