

angular.module("privadas")
.controller("CondominoDetalleCtrl", CondominoDetalleCtrl);
function  CondominoDetalleCtrl ($scope, $meteor, $reactive, $state, $stateParams, toastr) 
{

	let rc = $reactive(this).attach($scope);
	this.user_id = $stateParams.id;
	this.ver = true;
	
	/*
	this.condomino_id = $stateParams.id;
	this.subscribe('condominos', () => {s
		//return [ this.getReactively('condomino_id') ]
		return [{nombreUsuario: Meteor.user().username}]
	}); 
	*/
	
	this.subscribe('users', () =>{
		return [ this.user_id ]
	}); 
	
	this.helpers({
	  condomino: ()=>{
		  return Meteor.users.findOne(this.user_id);
	  }
	});
	
	//$scope.condomino = $meteor.object(Condominos, {nombreUsuario: Meteor.user().username}).subscribe("condominos");
	this.actualizar = function(condomino)
	{
		//var idTemp = condomino._id;
		//delete condomino._id;		
		//Condominos.update({_id:idTemp},{$set:condomino});
		
		console.log(condomino);
        Meteor.users.update({_id: this.user_id}, {$set:{profile: condomino.profile}});
        this.user = Meteor.users.findOne();
        //this.edit = false;
 
		//$('.collapse').collapse('hide');
		//this.nuevo = true;
		toastr.success('Condomino Actualizado.');
				
	};

	/*
	this.actualizar = function(condomino)
	{
			
		this.condomino.save();
		/*Meteor.users.update({_id: Meteor.userId()}, {$set: {"username": condomino.nombreUsuario,
												 		    "password": condomino.contrasena,
														 	"profile": condomino
														    }
													});
		
		toastr.success('Condomino Actualizado.');
		//$state.go("root.editarCondomino",{"id":condomino._id});
	};
	*/
	this.tomarFoto = function () {
		$meteor.getPicture().then(function(data){
			rc.condomino.fotografia = data;
		})
	};
};