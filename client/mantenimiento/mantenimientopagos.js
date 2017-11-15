angular
  .module('privadas')
  .controller('MantenimientoPagosCtrl', MantenimientoPagosCtrl);
 

function MantenimientoPagosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);	
	
	//this.mantenimientos = $meteor.collection(Mantenimientos).subscribe("mantenimientos");
	this.meses = ['Enero','Febrero','Marzo','Abril','Mayo', 'Junio' , 'Julio' , 'Agosto' , 'Septiembre' , 'Octubre' , 'Noviembre' , 'Diciembre' ];
	this.mantenimiento={};
	//this.mantenimiento.meses=[];
	this.pagos = [];
    this.con = 0;
    this.total = 0;
    this.mes = {};
    
    
	this.subscribe('mantenimientos');
	
	this.helpers({
	  mantenimientos : () => {
		  return Mantenimientos.find();
	  }
	});
	
	this.agregarPago = function(){
		//Validar que no venga vacio
		if (this.mes==null) 
		{
			toastr.error('Seleccionar Mes.');
			return;
		}	
		//validar que vengan mes y cantidad
		if (this.mes.nombre == null || this.mes.cantidad == null) 
		{
			toastr.error('Seleccionar Mes y Cantidad');
			return;
		}	
		
		//incremeneto
		this.con = this.con + 1;
		this.mes.num = this.con;
		
		//Sumar total
		this.total = this.total + this.mes.cantidad;
		
		this.pagos.push(this.mes);	
		this.mes={};
	};

	this.quitar = function(numero)
	{
		pos = functiontofindIndexByKeyValue(this.pagos, "num", numero);
	    this.pagos.splice(pos, 1);
	    if (this.pagos.length == 0) this.con = 0;
	    //reorganiza el consecutivo     
	    functiontoOrginiceNum(this.pagos, "num");
	};
	
	this.guardar = function(){
		
		var d = new Date();
		var n = d.getFullYear();
		
		this.mantenimiento.idusuario = Meteor.userId();
		this.mantenimiento.fecha = d;
		
		this.mantenimiento.estatus = 1;	//estatus = 1 -> Pendiente de aplicar 
										//		  = 2 -> Aplicado
										//		  = 3 -> Cancelado
	
		//console.log(this.pagos);
											
		this.mantenimiento.meses =  angular.copy(this.pagos);		
		
		//console.log(this.mantenimiento);
		
		this.mantenimiento.total = this.total;
		
		Mantenimientos.insert(this.mantenimiento);
		this.mantenimiento={};
		toastr.success('pagos  guardado.');
		this.pagos = [];
		this.mantenimiento.meses = [];
		$state.go("root.listamantenimiento");
		
	};

	//busca un elemento en el arreglo
	function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
	    for (var i = 0; i < arraytosearch.length; i++) {
	    	if (arraytosearch[i][key] == valuetosearch) {
				return i;
			}
	    }
	    return null;
    };
    
    //Obtener el mayor
	function functiontoOrginiceNum(arraytosearch, key) {
		var mayor = 0;
	    for (var i = 0; i < arraytosearch.length; i++) {
	    	arraytosearch[i][key] = i + 1;	
	    }
    };
    
    
    this.uploadFiles = function(file) {
    	
	  var reader  = new FileReader();
	  console.Log("Enttro");
	  reader.onloadstart("load", function () {
		alert('Hello World');
	    this.mantenimiento.image = reader.result;
	  }, false);
	  if (file) {
	    reader.readAsDataURL(file);
	  }   
	};
	
};