Mantenimientos 						= new Mongo.Collection("mantenimientos");
Mantenimientos.allow({
  insert: function () { return true; },
  update: function () { return true; }, 
  remove: function () { return true; }
});