Meteor.methods({
  createUsuario: function (usuario, rol, grupo) {
		var usuario_id = Accounts.createUser({
			username: usuario.nombreUsuario,
			password: usuario.contrasena,			
			profile: {
				nombreUsuario: usuario.profile.nombreUsuario,
				nombre: usuario.profile.nombre,
				apellidos: usuario.profile.apPaterno + " " + usuario.profile.apMaterno,
				apPaterno: usuario.profile.apPaterno,
				apMaterno: usuario.profile.apMaterno,
				nombreCompleto : usuario.profile.nombre  + " " + usuario.profile.apPaterno + " " + usuario.profile.apMaterno,
				sexo: usuario.profile.sexo,
				correo: usuario.profile.correo,
				fotografia : usuario.profile.fotografia,
				calleNum : usuario.profile.calleNum,
				tel1 : usuario.profile.tel1,
				tel2 : usuario.profile.tel2,
				estatus : usuario.estatus
			}
		});
		
		Roles.addUsersToRoles(usuario_id, rol, grupo);
		
	},
	userIsInRole: function(usuario, rol, grupo, vista){
		if (!Roles.userIsInRole(usuario, rol, grupo)) {
	    throw new Meteor.Error(403, "Usted no tiene permiso para entrar a " + vista);
	  }
	},
		updateUsuario: function (usuario, rol) {
	  var user = Meteor.users.findOne({"username" : usuario.username});
	  Meteor.users.update({_id: user._id}, {$set:{
			username: usuario.username,
			roles: [rol],
			profile: usuario.profile
		}});
		
		Accounts.setPassword(user._id, usuario.password, {logout: false});
	}
});