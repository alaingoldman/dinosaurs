Meteor.startup(function() {

  return Meteor.methods({
  		  registerUsers: function(options){
		    Accounts.createUser({
		      username: options.username,
		      email: 	options.email,
		      password: options.password
		    });
		  },
		  emailUserVerification: function(email){
		  	found_user = Meteor.users.findOne({ 'emails.address' : email });
		  	if(found_user){
		  		Accounts.sendVerificationEmail(found_user._id);
		  	}
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
		  },
		  checkEmailVerification: function(email) {
		    found_user = Meteor.users.findOne({ 'emails.address' : email })
		    // is there a user first
		    if(found_user){
		    	if(found_user.emails[0].verified == true){
		    		return "verified";
		    	}else{
		    		return "unverified";
		    	}
		    }else{
		    	return "notfound";
		    }
		  }
		});
});