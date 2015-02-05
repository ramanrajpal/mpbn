define(['services/services'], function(services) {
	services.factory('subscriberdetails', ['$q', 'subscriberaction',function($q,subscriberaction) {
		var funref = function () {
			var deferred = $q.defer();
			subscriberaction.query(function(details) {
			deferred.resolve(details);
			return deferred.promise;
			});
		return funref;
		}
	}]);
});