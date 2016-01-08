Meteor.startup(function() {

  return Meteor.methods({
  		registerUsers: function(options){
		  Accounts.createUser({
		  	  username: options.username,
		      email: 	options.email,
		      password: options.password
		  });
		}
  });
});