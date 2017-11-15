angular.module("privadas").run(function ($rootScope, $state, toastr) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('anon.login');
        break;
      case "FORBIDDEN":
        //$state.go('root.home');
        break;
      case "UNAUTHORIZED":
      	toastr.error("Acceso Denegado");
				toastr.error("No tiene permiso para ver esta opción");
        break;
      default:
        $state.go('internal-client-error');
    }
/*
    if (error === 'AUTH_REQUIRED') {
      $state.go('anon.login');
    }
*/
  });
});

angular.module('privadas').config(['$injector', function ($injector) {
  var $stateProvider = $injector.get('$stateProvider');
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $locationProvider = $injector.get('$locationProvider');

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  /***************************
   * Anonymous Routes
   ***************************/
  $stateProvider
    .state('anon', {
      url: '',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('anon.login', {
      url: '/login',
      templateUrl: 'client/login/login.ng.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc'
    })
    .state('anon.logout', {
      url: '/logout',
      resolve: {
        'logout': ['$meteor', '$state', 'toastr', function ($meteor, $state, toastr) {
          return $meteor.logout().then(
            function () {
	            toastr.success("Vuelva pronto.");
              $state.go('anon.login');
            },
            function (error) {
              toastr.error(error.reason);
            }
          );
        }]
      }
    });

  /***************************
   * Login Users Routes
   ***************************/
  $stateProvider
    .state('root', {
      url: '',
      abstract: true,
      templateUrl: 'client/layouts/root.ng.html',
      controller: 'RootCtrl',
    })
    .state('root.home', {
      url: '/',
      templateUrl: 'client/home/home.ng.html',      
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    .state('root.listamantenimiento', {
      url: '/condominos/mantenimientos/:id',
      templateUrl: 'client/mantenimiento/listamantenimiento.ng.html',
      controller: 'MantenimientoCtrl as mp',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "condomino" || user.roles[0] == "admin"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}
         });
       }]
      }
    })

     .state('root.mantenimientopagos', {  
      url: '/mantenimiento/pagos',
      templateUrl: 'client/mantenimiento/mantenimientopagos.ng.html',
      controller: 'MantenimientoPagosCtrl as mp',
      resolve: {
        "currentUser": ["$meteor", "toastr", function($meteor, toastr){
          return $meteor.requireValidUser(function(user) {
            if(user.roles[0] == "condomino" || user.roles[0] == "admin"){
              return true;
            }else{
              return 'UNAUTHORIZED'; 
            }
         });
       }]
      }
    })


    .state('root.areacomun', {
      url: '/areacomun',
      templateUrl: 'client/areacomun/areacomun.ng.html',
      controller: 'areaComunCtrl',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "condomino" || user.roles[0] == "admin"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}
         });
       }]
      }
    })
    .state('root.servicios', {
      url: '/pagos',
      templateUrl: 'client/servicios/servicios.ng.html',
      controller: 'ServiciosCtrl',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "admin"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}
         });
       }]
      }
    })
    .state('root.nuevocondomino', {
      url: '/condominos/nuevo',
      templateUrl: 'client/condominos/form.ng.html',
      controller: 'CondominosCtrl as con',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "admin"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}
         });
       }]
      }
    })
    .state('root.editarCondomino', {
      url: '/condominos/editar/:id',
      templateUrl: 'client/condominos/form.ng.html',
      controller: 'CondominoDetalleCtrl as con',
      resolve: {
				"currentUser": ["$meteor", "toastr", function($meteor, toastr){
					return $meteor.requireValidUser(function(user) {
						if(user.roles[0] == "condomino" || user.roles[0] == "admin"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}
         });
       }]
      }
    })
    .state('root.condominos', {
      url: '/condominos',
      templateUrl: 'client/condominos/listacondominos.ng.html',
      controller: 'CondominosCtrl as con',
      resolve: {
	  			"currentUser": ["$meteor", "toastr", function($meteor, toastr){
	  				return $meteor.requireValidUser(function(user) {
	  					if(user.roles[0] == "admin"){
							return true;
						}else{
							return 'UNAUTHORIZED'; 
						}
         });
       }]
      }
    }); 
}]);
 