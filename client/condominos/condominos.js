


angular.module("privadas")
.controller("CondominosCtrl", CondominosCtrl);
function  CondominosCtrl ($scope, $meteor, $reactive, $state, toastr) {
    
    
    let rc = $reactive(this).attach($scope);

  	this.action = true;
  	this.condomino = {};


  	this.subscribe('users', () =>{
		return [ {} ]
	});    //subscripcion

  	this.helpers({
	  condominos : () => {
		  return Meteor.users.find();
	  }
	});

  	//$scope.condominos = $scope.$meteorCollection(function (){
    //	return Condominos.find();
	//}).subscribe("condominos");
  
  	this.guardar = function (condomino) {
  	
  		
		this.condomino.estatus = true;
		
		//Condominos.insert(rc.condomino, function (err, condomino){
			Meteor.call('createUsuario', condomino, 'condomino');
			toastr.success('Condomino guardado.');
			this.condomino = {};
			
      	//});		
	};
	
	this.nuevoCondomino = function () {
	    this.action = true;
	    this.condomino = {};    
	};
  
  	this.tomarFoto = function () {
		$meteor.getPicture().then(function(data){
			rc.condomino.fotografia = data;
		})
	};
		
	/*
	this.cambiarEstatus = function (id) {
		var condomino = $scope.$meteorObject(Condominos, id, false);
		condomino.estatus = !condomino.estatus;
		condomino.save();
	};	
	*/
		
};