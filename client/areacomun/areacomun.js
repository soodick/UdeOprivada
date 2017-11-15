angular.module("privadas").controller("areaComunCtrl", ['$scope', '$meteor', '$state', 'toastr', function($scope, $meteor, $state, toastr) {
	
	/*
  	$scope.action = true;
  	$scope.condomino = {};


  	$scope.condominos = $scope.$meteorCollection(function (){
    	return Condominos.find();
	}).subscribe("condominos");
  
  	$scope.guardar = function (condomino) {
		$scope.condomino.estatus = true;
		$scope.$meteorCollection(Condominos).save(condomino).then(function (docto) {
			Meteor.call('createUsuario', condomino, 'condomino');
			toastr.success('Condomino guardado.');
      	});		
	};
	
	$scope.nuevoCondomino = function () {
	    $scope.action = true;
	    $scope.condomino = {};    
	};
  
  	$scope.tomarFoto = function () {
		$meteor.getPicture().then(function(data){
			$scope.condomino.fotografia = data;
		})
	};
	
	$scope.cambiarEstatus = function (id) {
		var condomino = $scope.$meteorObject(Condominos, id, false);
		condomino.estatus = !condomino.estatus;
		condomino.save();
	};	
	*/
}]);