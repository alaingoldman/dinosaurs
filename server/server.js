Meteor.startup(function() {

	return Meteor.methods({
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