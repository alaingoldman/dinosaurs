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


// a = Meteor.users.findOne({ emails[0].address: "alain.goldman@gmail.com" });
// emails[0].address

//a = Meteor.users.findOne({ 'emails.address' : "alain.goldman@gmail.com" });

// x = $("#login-email").val();
// a  = Meteor.users.findOne({ 'emails.address' : x });