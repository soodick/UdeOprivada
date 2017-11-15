Areacomun 						= new Mongo.Collection("areacomun");
Areacomun.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});