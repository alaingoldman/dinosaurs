Meteor.startup(function() {

  return Meteor.methods({
  		  registerUsers: function(options){
		    Accounts.createUser({
		      username: options.username,
		      email: 	options.email,
		      password: options.password
		    });
		  },
		  removeAllProducts: function() {
		    return Products.remove({});
		  },
		  removeAllImages: function() {
		    return Images.remove({});
		  },
		  removeThisImage: function(id){
		  	return Images.remove(id);
		  },
		  removeAllUsers: function(){
		  	return Meteor.users.remove({});
		  }
		});
});